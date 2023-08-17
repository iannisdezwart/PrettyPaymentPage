import { Router } from "express";
import { idealPaymentEndpoint } from "./donation-payment/ideal-payment-endpoint";
import { paypalPaymentHandler } from "./donation-payment/paypal-payment-endpoint";
import { validateBillingDetailsMiddleware } from "./util/validate-billing-details-middleware";
import { privacyPolicyEndpoint } from "./web-content/privacy-policy";

export const apiRouter = Router();

apiRouter.post(
  "/ideal-payment",
  validateBillingDetailsMiddleware,
  idealPaymentEndpoint
);

apiRouter.post(
  "/paypal-payment",
  validateBillingDetailsMiddleware,
  paypalPaymentHandler
);

apiRouter.get("/privacy-policy", privacyPolicyEndpoint);

// apiRouter.post(
//   "/ideal-subscription",
//   validateBillingDetailsMiddleware,
//   idealSubscriptionEndpoint
// );

// apiRouter.post("/cancel-subscription", subscriptionCancelEndpoint);
