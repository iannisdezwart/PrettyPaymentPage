const redirectStatus = new URLSearchParams(window.location.search).get(
  "redirect_status"
);

switch (redirectStatus) {
  case "succeeded":
    document.getElementById("success").classList.remove("hidden");
    break;
  case "failed":
    document.getElementById("failure").classList.remove("hidden");
    break;
  default:
    throw `Invalid redirect status: ${redirectStatus}`;
}
