import { inlineSASS } from "page-compiler";
import oneTimePaypalDonationPaymentCard from "../components/cards/one-time-paypal-donation-payment-card";
import shell from "../components/shell";
import { Tr } from "../translations/tr";

export default async (tr: Tr) =>
  shell(
    tr("donateOnce.title").replace("{org name}", process.env["ORG_NAME"]),
    /* html */ `
      ${await inlineSASS("pages/donate-once-paypal.sass")}
      <div class="page">
        ${await oneTimePaypalDonationPaymentCard({ tr })}
      </div>
    `,
    tr("langCode")
  );
