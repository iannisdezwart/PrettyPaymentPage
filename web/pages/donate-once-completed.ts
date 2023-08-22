import { inlineJS, inlineSASS } from "page-compiler";
import card from "../components/cards/base/card";
import shell from "../components/shell";
import { Tr } from "../translations/tr";

export default async (tr: Tr) =>
  shell(
    tr("donateOnceCompleted.title"),
    /* html */ `
      ${await inlineSASS("pages/donate-once-completed.sass")}
      <div class="page">
        <div id="success" class="hidden">
          ${await card({
            svgIconPath: "icons/heart.svg",
            title: tr("donateOnceCompleted.success.title"),
            headerContent: /* html */ `
              <p id="header-text">
                ${tr("donateOnceCompleted.success.headerText").replace(
                  "{org name}",
                  process.env["ORG_NAME"]
                )}
              </p>
              <br>
              <a id="done-button" href="#"> <!-- TODO -->
                ${tr("donateOnceCompleted.success.doneButtonText")}
              </a>
            `,
          })}
        </div>
        <div id="failure" class="hidden">
          ${await card({
            svgIconPath: "icons/cross.svg",
            title: tr("donateOnceCompleted.failure.title"),
            headerContent: /* html */ `
              <p id="header-text">
                ${tr("donateOnceCompleted.failure.headerText")}
              </p>
              <br>
              <a id="done-button" href="/">
                ${tr("donateOnceCompleted.failure.doneButtonText")}
              </a>
            `,
          })}
        </div>
      </div>
      ${await inlineJS("scripts/donation-completed.js")}
    `,
    tr("langCode")
  );
