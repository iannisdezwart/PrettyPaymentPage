import dotenv from "dotenv";
import express from "express";
import Stripe from "stripe";

dotenv.config();

const app = express();
app.use(express.static("web/root"));
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

app.post("/checkout", async (req, res) => {
  const currency = req.body.currency;
  const amount = req.body.amount;

  if (!currency || !amount) {
    res.status(400).send({
      error: "Missing fields",
      code: 400,
    });
    return;
  }

  const parsedAmount = parseInt(amount);

  if (Number.isNaN(amount) || amount < 50) {
    res.status(400).send({
      error: "Amount too low",
    });
    return;
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parsedAmount,
      currency: currency,
      payment_method_types: ["ideal"],
    });

    res.status(200).send(paymentIntent);
  } catch (err) {
    res.status(500).send({
      error: "Internal server error",
    });
    console.error("Error while creating payment intent.");
    console.error(`Error: ${err}`);
    console.error(`Amount: ${amount}`);
    console.error(`Currency: ${currency}`);
  }
});

app.listen(4242, () => console.log("Running on port 4242"));
