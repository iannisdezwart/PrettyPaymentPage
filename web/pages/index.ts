import { inlineJS } from "page-compiler";

export default async () => /* html */ `
  <h1>Checkout</h1>
  <form id="payment-form" onsubmit="onPaymentFormSubmit(); return false;">
    <div id="ideal-bank">
      <!-- A Stripe Element will be inserted here. -->
    </div>
    <input type="submit">Submit</input>
  </form>
  ${await inlineJS("scripts/checkout.js")}
`;
