import { inlineSASSOnce } from "page-compiler";
import { Tr } from "../../translations/tr";
import donationPaymentCard from "./donation-payment-card";

type OneTimeIdealDonationPaymentCard = { tr: Tr };

export default async ({ tr }: OneTimeIdealDonationPaymentCard) =>
  await donationPaymentCard({
    tr,
    confirmButtonText: tr(
      "oneTimeDonationPaymentCard.paymentOptions.ideal.confirmButton"
    ),
    extraFormFields: /* html */ `
      ${await inlineSASSOnce(
        "components/cards/one-time-ideal-donation-payment-card.sass"
      )}
      <div id="ideal-bank">
        <!-- A Stripe Element will be inserted here. -->
      </div>
    `,
    paymentMethod: tr("oneTimeDonationPaymentCard.paymentOptions.ideal.title"),
    svgIconPath: "icons/ideal.svg",
    title: tr("oneTimeDonationPaymentCard.title"),
    paymentProcessingScript: "scripts/ideal-payment.js",
  });

// export default async ({ tr }: OneTimeIdealDonationPaymentCard) =>
//   await card({
//     svgIconPath: "icons/ideal.svg",
//     backButton: true,
//     title: tr("oneTimeDonationPaymentCard.title").replace(
//       "{}",
//       '<span id="amount"></span>'
//     ),
//     tabs: [
//       {
//         name: tr("oneTimeDonationPaymentCard.paymentOptions.ideal.title"),
//         content: /* html */ `
//         ${await inlineSASSOnce(
//           "components/cards/one-time-ideal-donation-payment-card.sass"
//         )}
//         <form id="payment-form" onsubmit="onPaymentFormSubmit(); return false;">
//           ${await billingDetails({ tr })}
//           <div id="ideal-bank">
//             <!-- A Stripe Element will be inserted here. -->
//           </div>
//           <br>
//           <input
//               value="${tr(
//                 "oneTimeDonationPaymentCard.paymentOptions.ideal.confirmButton"
//               )}"
//               type="submit"
//               id="confirm-button">
//           ${await loader({ id: "loader", defaultHidden: true })}
//           <p id="error-message"></p>
//         </form>
//         ${await inlineJSOnce("scripts/ideal-payment.js")}
//       `,
//       },
//     ],
//   });
