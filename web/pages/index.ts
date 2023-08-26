import { inlineSASS } from "page-compiler";
import donationAmountCard from "../components/cards/donation-amount-card";
import shell from "../components/shell";
import { Tr } from "../translations/tr";

export default async (tr: Tr) =>
  await shell(
    tr("home.title"),
    /* html */ `
      ${await inlineSASS("pages/index.sass")}
      <div class="page">
        ${await donationAmountCard({
          tr,
          items: [
            {
              tabName: tr("home.donationOptions.oneTime.title"),
              currency: "EUR",
              amounts: [10, 20, 50, 100],
              defaultAmount: 20,
              placeholderCustomAmount: 30,
              promptText: tr("home.donationOptions.oneTime.promptText"),
              frequency: "once",
              paymentMethods: [
                {
                  id: "ideal",
                  svgIconPath: "icons/ideal.svg",
                },
                {
                  id: "paypal",
                  svgIconPath: "icons/paypal.svg",
                },
              ],
            },
            // {
            //   tabName: tr("home.donationOptions.monthly.title"),
            //   currency: "EUR",
            //   amounts: [2.5, 5, 10, 20],
            //   defaultAmount: 5,
            //   placeholderCustomAmount: 7.5,
            //   promptText: tr("home.donationOptions.monthly.promptText"),
            //   frequency: "monthly",
            //   paymentMethods: [],
            // },
          ],
        })}
      </div>
    `,
    tr("langCode")
  );
