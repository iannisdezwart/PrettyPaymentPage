let autoFormatCustomAmountInputValueTimeout: ReturnType<typeof setTimeout>;

const getDecimalSeparator = () => {
  return Intl.NumberFormat(navigator.language)
    .formatToParts(1.1)
    .find((part) => part.type === "decimal").value;
};

const localeFormattedNumberToFloat = (value: string) => {
  return (
    parseFloat(
      getDecimalSeparator() == "."
        ? value.replace(/,/g, "")
        : value.replace(/\./g, "").replace(/,/g, ".")
    ) || 0
  );
};

const rerenderDonationAmountButton = (donationAmountButton: Element) => {
  const amount = parseFloat(donationAmountButton.getAttribute("data-amount"));
  const currency = donationAmountButton.getAttribute("data-currency");
  const currencySymbol = (0)
    .toLocaleString(navigator.language, {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    .replace(/\d/g, "")
    .trim();

  donationAmountButton.innerHTML = amount
    .toLocaleString(navigator.language, {
      style: "currency",
      currency,
    })
    .replace(
      currencySymbol,
      /* html */ `<span class="currency-symbol">${currencySymbol}</span>`
    );
};

const rerenderDonatePrompt = (donatePrompt: Element) => {
  const textFormat = donatePrompt.getAttribute("data-text-format");
  const amount = parseFloat(donatePrompt.getAttribute("data-amount"));
  const currency = donatePrompt.getAttribute("data-currency");

  donatePrompt.innerHTML = textFormat.replace(
    /\{\}/g,
    /* html */ `
    <span class="donation-amount-card-amount">${amount.toLocaleString(
      navigator.language,
      {
        style: "currency",
        currency,
      }
    )}</span>
  `
  );
};

const onDonationAmountButtonClick = (
  donationCardTabId: string,
  amount: number
) => {
  const donationCardTab = document.getElementById(donationCardTabId);

  const donationAmountButtons = donationCardTab.getElementsByClassName(
    "donation-amount-button"
  );

  let buttonFound = false;

  for (const donationAmountButton of donationAmountButtons) {
    if (
      donationAmountButton.getAttribute("data-amount") === amount.toString()
    ) {
      donationAmountButton.classList.add("selected");
      buttonFound = true;
      continue;
    }

    donationAmountButton.classList.remove("selected");
  }

  const donatePrompt =
    donationCardTab.getElementsByClassName("donate-prompt")[0];

  donatePrompt.setAttribute("data-amount", amount.toString());

  rerenderDonatePrompt(donatePrompt);

  if (buttonFound) {
    const customAmountInput = donationCardTab.querySelector(
      ".custom-amount"
    ) as HTMLInputElement;

    clearTimeout(autoFormatCustomAmountInputValueTimeout);
    customAmountInput.value = "";
  }
};

const onPaymentMethodClick = (
  donationCardTabId: string,
  frequency: DonationFrequency,
  paymentMethod: string
) => {
  const donationAmountButtonsContainer =
    document.getElementById(donationCardTabId);

  const donationAmountButtons =
    donationAmountButtonsContainer.getElementsByClassName(
      "donation-amount-button"
    );

  let amount: number;

  const customAmountInput = donationAmountButtonsContainer.querySelector(
    ".custom-amount"
  ) as HTMLInputElement;

  if (customAmountInput.value !== "") {
    amount = localeFormattedNumberToFloat(customAmountInput.value);
  } else {
    for (const donationAmountButton of donationAmountButtons) {
      if (donationAmountButton.classList.contains("selected")) {
        amount = parseFloat(donationAmountButton.getAttribute("data-amount"));
      }
    }
  }

  if (amount === undefined) {
    throw "No donation amount selected";
  }

  if (amount >= 1) {
    location.href = `${langUrlPart}/donate/${frequency}/${paymentMethod}?amount=${amount}`;
  }
};

addEventListener("DOMContentLoaded", () => {
  const donationAmountCards = document.getElementsByClassName(
    "donation-amount-card-content"
  );

  for (const donationAmountCard of donationAmountCards) {
    const donationCardTabId = donationAmountCard.getAttribute("id");

    // Initialise donation amount button.

    const donationAmountButtons = donationAmountCard.getElementsByClassName(
      "donation-amount-button"
    );

    for (const donationAmountButton of donationAmountButtons) {
      rerenderDonationAmountButton(donationAmountButton);
    }

    // Initialise donate prompt.

    const donatePrompt = donationAmountCard.querySelector(".donate-prompt");
    rerenderDonatePrompt(donatePrompt);

    // Initialise custom amount input placeholder.

    const customAmountInput = donationAmountCard.querySelector(
      ".custom-amount"
    ) as HTMLInputElement;
    customAmountInput.value = ""; // Can be set by the browser on navigation back.

    const placeholderAmount = parseFloat(
      customAmountInput.getAttribute("placeholder")
    );
    const currency = customAmountInput.getAttribute("data-currency");
    const digits = Intl.NumberFormat(navigator.language, {
      style: "currency",
      currency,
    }).resolvedOptions().maximumFractionDigits;

    const placeholder = placeholderAmount.toLocaleString(navigator.language, {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits,
    });

    customAmountInput.setAttribute("placeholder", placeholder);

    // Initialise custom amount input error message.

    const errTooLow =
      donationAmountCard.parentElement.querySelector(".err-too-low");

    errTooLow.innerHTML = errTooLow.innerHTML.replace(
      "{}",
      (1).toLocaleString(navigator.language, {
        style: "currency",
        currency,
      })
    );

    const checkCustomAmountForError = () => {
      const val = localeFormattedNumberToFloat(customAmountInput.value);

      if (customAmountInput.value != "" && val < 1) {
        customAmountInput.classList.add("error");
        errTooLow.classList.add("visible");
      } else {
        customAmountInput.classList.remove("error");
        errTooLow.classList.remove("visible");
      }
    };

    customAmountInput.addEventListener("change", checkCustomAmountForError);

    const formatAndSetCustomAmountInputValue = (
      customAmountInput: HTMLInputElement,
      digits: number,
      donationCardTabId: string
    ) => {
      const value = localeFormattedNumberToFloat(customAmountInput.value);
      const formattedValue = value.toLocaleString(navigator.language, {
        maximumFractionDigits: digits,
        minimumFractionDigits: digits,
      });

      customAmountInput.value = formattedValue;
      onDonationAmountButtonClick(donationCardTabId, value);
      checkCustomAmountForError();
    };

    // Initialise custom amount currency symbol.

    const currencySymbol = (0)
      .toLocaleString(navigator.language, {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
      .replace(/\d/g, "")
      .trim();

    const unitElement =
      customAmountInput.parentElement.querySelector(".leading-unit");
    unitElement.innerHTML = currencySymbol;

    // Initialise custom amount input validation.

    const decimalSeparator = Intl.NumberFormat(navigator.language)
      .formatToParts(1.1)
      .find((part) => part.type === "decimal").value;
    const wrongDecimalSeparator = decimalSeparator === "." ? "," : ".";

    customAmountInput.addEventListener("keypress", (e) => {
      if (
        (e.key === decimalSeparator || e.key == wrongDecimalSeparator) &&
        customAmountInput.value.includes(decimalSeparator)
      ) {
        e.preventDefault();
      } else if (e.key === wrongDecimalSeparator) {
        e.preventDefault();
        customAmountInput.value = `${customAmountInput.value.slice(
          0,
          customAmountInput.selectionStart
        )}${decimalSeparator}${customAmountInput.value.slice(
          customAmountInput.selectionEnd
        )}`;
        checkCustomAmountForError();
      } else if (e.key === "Enter") {
        e.preventDefault();
        clearTimeout(autoFormatCustomAmountInputValueTimeout);
        customAmountInput.blur();
      }
    });

    customAmountInput.addEventListener("input", (e) => {
      if (customAmountInput.value.match(/^[0-9]+([\.,][0-9]+)?$/) == null) {
        customAmountInput.value = customAmountInput.value.replace(
          /[^0-9\.,]/g,
          ""
        );
        checkCustomAmountForError();
      }

      // After 3 sec of inactivity, format and set the input value.

      clearTimeout(autoFormatCustomAmountInputValueTimeout);
      autoFormatCustomAmountInputValueTimeout = setTimeout(() => {
        formatAndSetCustomAmountInputValue(
          customAmountInput,
          digits,
          donationCardTabId
        );
      }, 3000);
    });

    // Initialise custom amount input formatting and setting on blur.

    customAmountInput.addEventListener("blur", () =>
      formatAndSetCustomAmountInputValue(
        customAmountInput,
        digits,
        donationCardTabId
      )
    );
  }
});
