(() => {
  const elements = stripe.elements();
  const ideal = elements.create("idealBank", {
    style: {
      base: {
        padding: "16px 16px",
      }
    }
  });
  ideal.mount("#ideal-bank");

  let selectedBank: Bank;

  ideal.addEventListener("change", (el) => {
    selectedBank = el.value as Bank;
  });

  type Fields = {
    billingDetails: BillingDetails;
    bank: Bank;
    valid: boolean;
  };

  const validateForm = (form: HTMLFormElement) => {
    const billingDetails = validateBillingDetails(form);
    const fields = {
      billingDetails,
      bank: selectedBank,
      valid: billingDetails.valid,
    };

    if (!selectedBank) {
      document.querySelector("#ideal-bank").classList.add("error");
      fields.valid = false;
    } else {
      document.querySelector("#ideal-bank").classList.remove("error");
    }

    return fields;
  };

  const handlePayment = async (fields: Fields) => {
    const request: IdealPaymentRequest = {
      returnUrl: `${location.origin}${langUrlPart}/donate/once/completed?amount=${amount}`,
      currency: "eur", // TODO make this dynamic
      amount: amount * 100,
      bank: fields.bank,
      email: fields.billingDetails.email,
      name: fields.billingDetails.name,
      addressLine: fields.billingDetails.addressLine,
      city: fields.billingDetails.city,
      postalCode: fields.billingDetails.postalCode,
      country: fields.billingDetails.country,
      phone: fields.billingDetails.phone,
    };

    showLoader();

    const response = (await (
      await fetch("/api/ideal-payment", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json()) as IdealPaymentResponse;

    if (response.error) {
      showErrorMessage(response.error);
      hideLoader();
      return;
    }

    location.href = response.redirectUrl;
  };

  window.onPaymentFormSubmit = async () => {
    const form = document.getElementById("payment-form") as HTMLFormElement;
    hideErrorMessage();

    const fields = validateForm(form);

    if (fields.valid) {
      await handlePayment(fields);
    }
  };
})();
