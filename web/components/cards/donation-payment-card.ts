import { inlineJSOnce, inlineSASSOnce } from "page-compiler";
import { Tr } from "../../translations/tr";
import billingDetails from "../forms/billing-details";
import loader from "../loaders/loader";
import card from "./base/card";

type DonationPaymentCard = {
  tr: Tr;
  paymentMethod: string;
  svgIconPath: string;
  title: string;
  extraFormFields?: string;
  confirmButtonText: string;
  paymentProcessingScript: string;
};

export default async ({ tr, ...props }: DonationPaymentCard) =>
  await card({
    svgIconPath: props.svgIconPath,
    backButton: true,
    title: props.title.replace("{}", '<span id="amount"></span>'),
    tabs: [
      {
        name: props.paymentMethod,
        content: /* html */ `
        ${await inlineSASSOnce("components/cards/donation-payment-card.sass")}
        ${await inlineJSOnce("scripts/stripe.js")}
        ${await inlineJSOnce("scripts/donation-payment-card.js")}
        <form id="payment-form" onsubmit="onPaymentFormSubmit(); return false;">
          ${await billingDetails({ tr })}
          ${props.extraFormFields ? props.extraFormFields : ""}
          <br>
          <p class="privacy-policy">
            ${tr("donationPaymentCard.privacy-policy").replace(/\{(.*)\}/, `<a href="/privacy-policy">$1</a>`)}
          </p>
          <input
              value="${props.confirmButtonText}"
              type="submit"
              id="confirm-button">
          ${await loader({ id: "loader", defaultHidden: true })}
          <p id="error-message"></p>
        </form>
        ${await inlineJSOnce("scripts/donation-payment-card.js")}
        ${await inlineJSOnce(props.paymentProcessingScript)}
      `,
      },
    ],
  });
