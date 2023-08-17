import { RequestHandler } from "express";
import Stripe from "stripe";
import { stripe } from "../stripe-config";

const buildInternalServerErrorResponse = (
  err: Error
): PaypalPaymentResponse => ({
  error: `Internal server error: ${err.message}`,
});

const buildResponse = (
  paymentIntent: Stripe.PaymentIntent
): PaypalPaymentResponse => {
  return { redirectUrl: paymentIntent.next_action.redirect_to_url.url };
};

export const paypalPaymentHandler: RequestHandler = async (req, res) => {
  const body = req.body as PaypalPaymentRequest;

  try {
    const paymentMethod = await stripe.paymentMethods.create({
      type: "paypal",
      billing_details: {
        name: body.name,
        address: {
          line1: body.addressLine,
          city: body.city,
          postal_code: body.postalCode,
          country: body.country,
        },
        email: body.email,
        phone: body.phone,
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: body.amount,
      currency: body.currency,
      payment_method: paymentMethod.id,
      payment_method_types: ["paypal"],
      receipt_email: body.email,
      return_url: body.returnUrl,
      confirm: true,
    });

    res.status(200).send(buildResponse(paymentIntent));
  } catch (err) {
    res.status(500).send(buildInternalServerErrorResponse(err));
    console.error("Error while creating payment intent.");
    console.error(`Error: ${err}`);
    console.error(`Amount: ${body.amount}`);
    console.error(`Currency: ${body.currency}`);
  }
};
