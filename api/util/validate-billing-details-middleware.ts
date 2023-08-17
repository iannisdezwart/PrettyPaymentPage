import { RequestHandler } from "express";

const missingFieldsResponse: IdealPaymentResponse = {
  error: "Missing fields",
};

const buildAmountTooLowResponse = (minimum: string): IdealPaymentResponse => ({
  error: `Amount too low. Minimum is ${minimum}.`,
});

const emailInvalidResponse: IdealPaymentResponse = {
  error: "Email invalid",
};

const phoneInvalidResponse: IdealPaymentResponse = {
  error: "Phone invalid",
};

export const validateBillingDetailsMiddleware: RequestHandler = (
  req,
  res,
  next
) => {
  const body = req.body as BasePaymentRequest;

  const currency = body.currency;
  const amount = body.amount;

  if (!currency || !amount) {
    res.status(400).send(missingFieldsResponse);
    return;
  }

  if (Number.isNaN(amount) || amount < 50) {
    res.status(400).send(buildAmountTooLowResponse(`0.50 ${currency}`));
    return;
  }

  if (!body.email || !body.name || body.name == "") {
    res.status(400).send(missingFieldsResponse);
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (body.email.match(emailRegex) == null) {
    res.status(400).send(emailInvalidResponse);
    return;
  }

  const phoneRegex =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  if (body.phone && body.phone.match(phoneRegex) == null) {
    res.status(400).send(phoneInvalidResponse);
    return;
  }

  next();
};
