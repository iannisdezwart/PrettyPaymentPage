import { randomUUID } from "crypto";
import { inlineJSOnce, inlineSASSOnce, inlineSVG } from "page-compiler";
import { Tr } from "../../translations/tr";
import textInput from "../forms/inputs/text-input";
import card from "./base/card";

type PaymentMethod = {
  id: string;
  svgIconPath: string;
};

type DonationAmountCardItem = {
  tabName: string;
  currency: string;
  amounts: number[];
  defaultAmount: number;
  placeholderCustomAmount: number;
  promptText: string;
  frequency: DonationFrequency;
  paymentMethods: PaymentMethod[];
};

type DonationAmountCardProps = {
  tr: Tr;
  items: DonationAmountCardItem[];
};

const button = async (
  donationAmountButtonsId: string,
  currency: string,
  amount: number,
  defaultSelected: boolean
) => /* html */ `
    <button
        class="donation-amount-button ${defaultSelected ? "selected" : ""}"
        data-amount="${amount}"
        data-currency="${currency}"
        onclick="onDonationAmountButtonClick('${donationAmountButtonsId}', '${amount}')">
    </button>
  `;

export default async (props: DonationAmountCardProps) => {
  return await card({
    svgIconPath: "icons/donate.svg",
    title: props.tr("donationAmountCard.title"),
    subtitle: props
      .tr("donationAmountCard.subtitle")
      .replace("{org name}", process.env["ORG_NAME"]),
    tabs: await Promise.all(
      props.items.map(async (item) => {
        const donationCardTabId = `donation-amount-card-${randomUUID()}`;

        return {
          name: item.tabName,
          content: /* html */ `
            ${await inlineSASSOnce(
              "components/cards/donation-amount-card.sass"
            )}
            ${await inlineJSOnce("scripts/donation-amount-card.js")}
            <div class="donation-amount-card-content" id="${donationCardTabId}">
              <div class="donation-amount-buttons">
                  ${(
                    await Promise.all(
                      item.amounts.map(
                        async (amount) =>
                          await button(
                            donationCardTabId,
                            item.currency,
                            amount,
                            amount == item.defaultAmount
                          )
                      )
                    )
                  ).join("")}
              </div>
              <br>
              ${await textInput({
                label: props.tr("donationAmountCard.customAmountLabel"),
                leadingUnit: "&nbsp;", // Filled in by JS.
                placeholder: item.placeholderCustomAmount.toString(), // Formatted by JS.
                customAttrs: {
                  class: "custom-amount",
                  "data-currency": item.currency,
                },
              })}
              <p class="err-too-low">${props.tr(
                "donationAmountCard.customAmountTooLow"
              )}</p>
              <p class="donate-prompt"
                  data-text-format="${item.promptText}"
                  data-amount="${item.defaultAmount}"
                  data-currency="${item.currency}">
              </p>
              <div class="payment-methods">
                ${item.paymentMethods
                  .map(
                    (paymentMethod) => /* html */ `
                      <button
                          class="payment-method-button"
                          onclick="onPaymentMethodClick('${donationCardTabId}',
                            '${item.frequency}', '${paymentMethod.id}')">
                        ${inlineSVG(paymentMethod.svgIconPath)}
                      </button>
                    `
                  )
                  .join("")}
                </div>
            </div>
          `,
        };
      })
    ),
  });
};
