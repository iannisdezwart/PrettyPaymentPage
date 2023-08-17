import { RequestHandler } from "express";
import Stripe from "stripe";
import { stripe } from "../stripe-config";

const buildInternalServerErrorResponse = (
  err: Error
): IdealSubscriptionResponse => ({
  error: `Internal server error: ${err.message}`,
});

const buildResponse = (
  session: Stripe.Checkout.Session
): IdealSubscriptionResponse => {
  return { redirectUrl: session.url };
};

export const idealSubscriptionEndpoint: RequestHandler = async (req, res) => {
  const body = req.body as IdealSubscriptionRequest;

  try {
    const customer = await stripe.customers.create({
      name: body.name,
      address: {
        line1: body.addressLine,
        city: body.city,
        postal_code: body.postalCode,
        country: body.country,
      },
      email: body.email,
      phone: body.phone,
      preferred_locales: [
        body.preferredLocaleForEmails,
        "en",
      ],
    });

    const price = await stripe.prices.create({
      currency: "eur",
      unit_amount: body.amount,
      product_data: {
        name: `${body.amount / 100} EUR donation every ${body.frequency}`,
      },
      active: true,
      recurring: {
        interval: body.frequency,
      },
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["ideal"],
      success_url: body.returnUrl,
      cancel_url: body.returnUrl, // TODO
      customer: customer.id,
      currency: "eur",
      line_items: [
        {
          price: price.id,
          quantity: 1,
        }
      ],
      mode: "subscription",
    });

    res.status(200).send(buildResponse(session));
  } catch (err) {
    res.status(500).send(buildInternalServerErrorResponse(err));
    console.error("Error while creating payment intent.");
    console.error("Error:", err);
    console.error(`Amount: ${body.amount}`);
    console.error(`Currency: ${body.currency}`);
  }
};
