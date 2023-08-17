import baseInput from "./base-input";

type TextInputProps = {
  label: string;
  leadingUnit?: string;
  formName?: string;
  required?: boolean;
  placeholder?: string;
  info?: string;
  customAttrs?: Record<string, string>;
};

export default async (props: TextInputProps) =>
  await baseInput({
    label: props.label,
    leadingUnit: props.leadingUnit,
    inputBuilder: async () => /* html */ `
      <input
          type="text"
          ${props.formName ? `name=${props.formName}` : ""}
          ${
            Object.entries(props.customAttrs ?? {})
              .map(([key, value]) => `${key}="${value}"`)
              .join(" ") ?? ""
          }
          placeholder="${props.placeholder ?? ""}" />
    `,
    required: props.required,
    info: props.info,
  });
