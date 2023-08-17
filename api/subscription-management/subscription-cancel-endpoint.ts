import { RequestHandler } from "express";
import { stripe } from "../stripe-config";

const okResponse: SubscriptionCancelRequest = {};

const buildInternalServerErrorResponse = (
  err: Error
): SubscriptionCancelResponse => ({
  error: `Internal server error: ${err.message}`,
});

export const subscriptionCancelEndpoint: RequestHandler = async (req, res) => {
  const body = req.body as SubscriptionCancelRequest;

  try {
    stripe.subscriptions.cancel(body.subscriptionId, {
      invoice_now: false,
    });

    res.status(200).send(okResponse);
  } catch (err) {
    res.status(500).send(buildInternalServerErrorResponse(err));
  }
};
