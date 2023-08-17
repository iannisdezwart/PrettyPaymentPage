(() => {
  const validateForm = (form: HTMLFormElement) => {
    return validateBillingDetails(form);
  };

  const handlePayment = async (billingDetails: BillingDetails) => {
    const request: PaypalPaymentRequest = {
      returnUrl: `${location.origin}${langUrlPart}/donate/once/completed?amount=${amount}`,
      currency: "eur", // TODO make this dynamic
      amount: amount * 100,
      email: billingDetails.email,
      name: billingDetails.name,
      addressLine: billingDetails.addressLine,
      city: billingDetails.city,
      postalCode: billingDetails.postalCode,
      country: billingDetails.country,
      phone: billingDetails.phone,
    };

    showLoader();

    const response = (await (
      await fetch("/api/paypal-payment", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json()) as PaypalPaymentResponse;

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

    const billingDetails = validateForm(form);

    if (billingDetails.valid) {
      await handlePayment(billingDetails);
    }
  };
})();
