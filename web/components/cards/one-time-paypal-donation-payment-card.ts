import { Tr } from "../../translations/tr";
import donationPaymentCard from "./donation-payment-card";

type OneTimeIdealDonationPaymentCard = { tr: Tr };

export default async ({ tr }: OneTimeIdealDonationPaymentCard) =>
  await donationPaymentCard({
    tr,
    confirmButtonText: tr(
      "oneTimeDonationPaymentCard.paymentOptions.paypal.confirmButton"
    ),
    paymentMethod: tr("oneTimeDonationPaymentCard.paymentOptions.paypal.title"),
    svgIconPath: "icons/paypal.svg",
    title: tr("oneTimeDonationPaymentCard.title"),
    paymentProcessingScript: "scripts/paypal-payment.js",
  });
