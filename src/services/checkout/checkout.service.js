import createStripe from "stripe-client";
import { payHost } from "../../utils/envs";

const stripe = createStripe(
  "pk_test_51LfXn2HPC3lPV1iUvQ4yJjZgcEQYi3UVukTtkdg4VMOAy7bvp6KbBys0KzTK5LsT6cJeS32OAwHJ5e0qwgTVYdc500Bq5dHuEs",
);

export const cardTokenRequest = (card) => stripe.createToken({ card });

export const payRequest = (token, amount, name) => {
  return fetch(`${payHost}/pay`, {
    body: JSON.stringify({
      token,
      name,
      amount,
    }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.STRIPE_API_KEY}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((error) => {
          return Promise.reject(error.message || "Something went wrong");
        });
      }
      return res.json();
    })
    .catch((err) => {
      return Promise.reject("Something went wrong", err);
    });
};
