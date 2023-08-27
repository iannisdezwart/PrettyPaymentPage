import { inlineSASS } from "page-compiler";
import oneTimeIdealDonationPaymentCard from "../components/cards/one-time-ideal-donation-payment-card";
import shell from "../components/shell";
import { Tr } from "../translations/tr";

export default async (tr: Tr) =>
  shell(
    tr("donateOnce.title").replace("{org name}", process.env["ORG_NAME"]),
    /* html */ `
      ${await inlineSASS("pages/donate-once-ideal.sass")}
      <div class="page">
        ${await oneTimeIdealDonationPaymentCard({ tr })}
      </div>
    `,
    tr("langCode")
  );
