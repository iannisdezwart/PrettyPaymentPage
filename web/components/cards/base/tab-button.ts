import { inlineSASSOnce } from "page-compiler";

type TabButtonProps = {
  name: string;
  cardId: string;
  defaultSelected: boolean;
};

export default async (props: TabButtonProps) => {
  return /* html */ `
        ${await inlineSASSOnce("components/cards/base/tab-button.sass")}
        <button
                class="tab-button ${props.defaultSelected ? "selected" : ""}"
                onclick="onCardTabClick('${props.cardId}', '${props.name}')"
                data-tab-name="${props.name}">
            ${props.name}
        </button>
    `;
};
