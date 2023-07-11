const stripe = Stripe(
  "pk_test_51NOPK3GiURD55wBnBM1QaEkhcJDOn5Fakcj5BDE4orvFd1US13wx5ME4PSteVZBHRgF2Lj7eC3pxpXnjYlHHBdwO00gtFlVMKu"
);

const elements = stripe.elements();
const ideal = elements.create("idealBank");
ideal.mount("#ideal-bank");

const onPaymentFormSubmit = async () => {
  const response = await fetch("/checkout", {
    method: "POST",
    body: JSON.stringify({ currency: "eur", amount: "1000" }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { client_secret: clientSecret } = await response.json();

  const { error, paymentIntent } = await stripe.confirmIdealPayment(
    clientSecret,
    {
      payment_method: {
        ideal,
        billing_details: {
          name: "Henk de Vries",
          address: {
            line1: "Korte Leidsedwarsstraat 12-1",
            city: "Amsterdam",
            postal_code: "1017 RC",
            country: "NL",
          },
          email: "h.devries@outlook.nl",
          phone: "+31612345678",
        }
      },
      return_url: "https://example.com",
    }
  );

  if (error) {
    console.error(error);
  }

  console.log(paymentIntent);
}