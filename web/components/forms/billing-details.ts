import { inlineJSOnce } from "page-compiler";
import { Tr } from "../../translations/tr";
import { countries } from "../../util/countries";
import selectInput from "./inputs/select-input";
import textInput from "./inputs/text-input";

type BillingDetailsProps = { tr: Tr };

export default async ({ tr }: BillingDetailsProps) => /* html */ `
  ${await textInput({
    label: tr("billingDetails.fields.email.label"),
    formName: "email",
    placeholder: tr("billingDetails.fields.email.placeholder"),
    required: true,
    info: tr("billingDetails.fields.email.tooltip"),
  })}
  ${await textInput({
    label: tr("billingDetails.fields.name.label"),
    formName: "name",
    placeholder: tr("billingDetails.fields.name.placeholder"),
    required: true,
    info: tr("billingDetails.fields.name.tooltip"),
  })}
  ${await textInput({
    label: tr("billingDetails.fields.addressLine.label"),
    formName: "address-line",
    placeholder: tr("billingDetails.fields.addressLine.placeholder"),
    info: tr("billingDetails.fields.addressLine.tooltip"),
  })}
  ${await textInput({
    label: tr("billingDetails.fields.city.label"),
    formName: "city",
    placeholder: tr("billingDetails.fields.city.placeholder"),
    info: tr("billingDetails.fields.city.tooltip"),
  })}
  ${await textInput({
    label: tr("billingDetails.fields.postalCode.label"),
    formName: "postal-code",
    placeholder: tr("billingDetails.fields.postalCode.placeholder"),
    info: tr("billingDetails.fields.postalCode.tooltip"),
  })}
  ${await selectInput({
    label: tr("billingDetails.fields.country.label"),
    formName: "country",
    options: countries[tr("langCode") as keyof typeof countries].map(
      (country) => ({
        label: country.name,
        value: country.code,
      })
    ).sort((a, b) => a.label.localeCompare(b.label)),
    info: tr("billingDetails.fields.country.tooltip"),
  })}
  ${await textInput({
    label: tr("billingDetails.fields.phone.label"),
    formName: "phone",
    placeholder: tr("billingDetails.fields.phone.placeholder"),
    info: tr("billingDetails.fields.phone.tooltip"),
  })}
  ${await inlineJSOnce("scripts/billing-details.js")}
`;
