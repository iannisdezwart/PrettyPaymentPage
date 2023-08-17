if (localStorage.getItem("lang-selected") != "true") {
  localStorage.setItem("lang-selected", "true");
  const preferredLang = navigator.language.split("-")[0];

  switch (preferredLang) {
    default:
    case "en":
      window.location.href = "/";
      break;
    case "nl":
      window.location.href = "/nl";
      break;
  }
}
