import baseInput from "./base-input";

type Option = {
  value: string;
  label: string;
  default?: boolean;
  placeholder?: boolean;
};

type SelectInputProps = {
  label: string;
  options: Option[];
  formName?: string;
  required?: boolean;
  info?: string;
};

export default async (props: SelectInputProps) =>
  await baseInput({
    label: props.label,
    inputBuilder: async () => /* html */ `
      <select
          ${props.formName ? `name=${props.formName}` : ""}>
        ${props.options.map(
          (option) => /* html */ `
            <option
                value="${option.value}"
                ${option.default ? "selected" : ""}
                ${option.placeholder ? "disabled" : ""}>
              ${option.label}
            </option>
          `
        ).join("")}
      </select>
    `,
    required: props.required,
    info: props.info,
  });
