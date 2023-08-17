const amount = parseFloat(
  new URLSearchParams(window.location.search).get("amount")
);

document.getElementById("amount").innerHTML = amount.toLocaleString(
  navigator.language,
  { style: "currency", currency: "EUR" }
);

const showLoader = () => {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("confirm-button").classList.add("disabled");
};

const hideLoader = () => {
  document.getElementById("loader").classList.add("hidden");
  document.getElementById("confirm-button").classList.remove("disabled");
};

const showErrorMessage = (errMessage: string) => {
  document.querySelector("#error-message").innerHTML = errMessage;
};

const hideErrorMessage = () => {
  document.querySelector("#error-message").innerHTML = "";
};

type BillingDetails = {
  name: string;
  email: string;
  addressLine?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
  valid: boolean;
};

const validateBillingDetails = (form: HTMLFormElement) => {
  const nameInput = form.elements.namedItem("name") as HTMLInputElement;
  const emailInput = form.elements.namedItem("email") as HTMLInputElement;
  const addressLineInput = form.elements.namedItem(
    "address-line"
  ) as HTMLInputElement;
  const cityInput = form.elements.namedItem("city") as HTMLInputElement;
  const postalCodeInput = form.elements.namedItem(
    "postal-code"
  ) as HTMLInputElement;
  const countryInput = form.elements.namedItem("country") as HTMLInputElement;
  const phoneInput = form.elements.namedItem("phone") as HTMLInputElement;

  const billingDetails = {
    name: nameInput.value,
    email: emailInput.value,
    addressLine: addressLineInput.value,
    city: cityInput.value,
    postalCode: postalCodeInput.value,
    country: countryInput.value,
    phone: phoneInput.value,
    valid: true,
  };

  if (nameInput.value == "") {
    nameInput.classList.add("error");
    billingDetails.valid = false;
  } else {
    nameInput.classList.remove("error");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput.value.match(emailRegex) == null) {
    emailInput.classList.add("error");
    billingDetails.valid = false;
  } else {
    emailInput.classList.remove("error");
  }

  const phoneRegex =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  if (phoneInput.value.match(phoneRegex) == null) {
    phoneInput.classList.add("error");
    billingDetails.valid = false;
  } else {
    phoneInput.classList.remove("error");
  }

  return billingDetails;
};

interface Window {
  onPaymentFormSubmit: () => void;
}
