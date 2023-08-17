import { randomUUID } from "crypto";
import { inlineJSOnce, inlineSASSOnce, inlineSVG } from "page-compiler";
import tabButton from "./tab-button";

type CardTab = {
  name: string;
  content: string;
};

type CardProps = {
  svgIconPath: string;
  backButton?: boolean;
  title: string;
  subtitle?: string;
  headerContent?: string;
  tabs?: CardTab[];
};

export default async (props: CardProps) => {
  const cardId = `card-${randomUUID()}`;

  return /* html */ `
    ${await inlineSASSOnce("components/cards/base/card.sass")}
    ${await inlineJSOnce("scripts/card.js")}
    <div class="card" id="${cardId}">
      <div class="card-header">
        <div class="card-header-icon">
          ${inlineSVG(props.svgIconPath)}
        </div>
        ${
          props.backButton
            ? /* html */ `
              <div class="card-header-back-button" onclick="onCardBackClicked()">
                ${inlineSVG("icons/back.svg")} Back
              </div>
            `
            : ""
        }
        <h2 class="card-header-title">
            ${props.title}
        </h2>
        <p class="card-header-subtitle">
          ${ props.subtitle ? props.subtitle : "" }
        </p>
        ${
          props.headerContent
            ? /* html */ `
              <div class="card-header-content">
                ${props.headerContent}
              </div>
            `
            : ""
        }
        <div class="card-header-tabs">
          ${
            props.tabs && props.tabs.length > 1
              ? (
                  await Promise.all(
                    props.tabs.map(
                      async ({ name }, i) =>
                        await tabButton({
                          name,
                          cardId,
                          defaultSelected: i == 0,
                        })
                    )
                  )
                ).join("")
              : ""
          }
        </div>
      </div>
      ${
        props.tabs
          ? /* html */ `
            <div class="card-content">
              ${(
                await Promise.all(
                  props.tabs.map(
                    async (tab, i) => /* html */ `
                      <div
                          class="card-content-tab ${i == 0 ? "selected" : ""}"
                          data-tab-name="${tab.name}">
                        <div class="card-content-tab-inner">
                          ${tab.content}
                        </div>
                      </div>
                    `
                  )
                )
              ).join("")}
            </div>
          `
          : ""
      }
    </div>
  `;
};
