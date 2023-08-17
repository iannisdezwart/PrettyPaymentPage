import { inlineSASSOnce } from "page-compiler";

type BaseInputProps = {
  label: string;
  leadingUnit?: string;
  inputBuilder: () => Promise<string>;
  required?: boolean;
  info?: string;
};

export default async (props: BaseInputProps) => /* html */ `
  ${await inlineSASSOnce("components/forms/inputs/base-input.sass")}
  <div class="text-input ${props.leadingUnit ? "has-leading-unit" : ""}">
    <label>
      ${props.label}
      ${props.required ? /* html */ `<span class="required">*</span>` : ""}
    </label>
    <span class="leading-unit">${props.leadingUnit ?? ""}</span>
    ${await props.inputBuilder()}
    ${
      props.info
        ? /* html */ `
          <div class="info-container">
            <div class="info"></div>
            <div class="tooltip">${props.info}</div>
          </div>
        `
        : ""
    }
  </div>
`;
