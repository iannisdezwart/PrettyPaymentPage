fetch(`/api/privacy-policy?langCode=${document.documentElement.lang}`)
  .then((res) => res.text())
  .then((text) => {
    document.querySelector("#privacy-policy").innerHTML = text;
  });

const onPrivacyPolicyBackClicked = () => {
  history.back();
};
