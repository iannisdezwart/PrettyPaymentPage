type BasePaymentRequest = {
  returnUrl: string;
  currency: string;
  amount: number;
  email: string;
  name: string;
  addressLine?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
};

type BasePaymentResponse = {
  error?: string;
};

// iDEAL

type Bank =
  | "abn_amro"
  | "asn_bank"
  | "bunq"
  | "handelsbanken"
  | "ing"
  | "knab"
  | "moneyou"
  | "rabobank"
  | "regiobank"
  | "revolut"
  | "sns_bank"
  | "triodos_bank"
  | "van_lanschot"
  | "yoursafe";

type IdealPaymentRequest = BasePaymentRequest & {
  bank: Bank;
};

type IdealPaymentResponse = BasePaymentResponse & {
  redirectUrl?: string;
};

// Paypal

type PaypalPaymentRequest = BasePaymentRequest;

type PaypalPaymentResponse = BasePaymentResponse & {
  redirectUrl?: string;
};

// iDEAL subscription

type IdealSubscriptionRequest = BasePaymentRequest & {
  bank: Bank;
  frequency: "day" | "month" | "year";
  preferredLocaleForEmails: string;
};

type IdealSubscriptionResponse = BasePaymentResponse & {
  redirectUrl?: string;
};

// Cancel subscription

type SubscriptionCancelRequest = {
  subscriptionId?: string;
}

type SubscriptionCancelResponse = {}
