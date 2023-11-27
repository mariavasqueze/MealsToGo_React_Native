/* eslint-disable indent */
/* eslint-disable prettier/prettier */
module.exports.payRequest = (request, response, stripeClient) => {
  // const body = JSON.parse(request.body);
  // console.log("pay function", body);\
  // eslint-disable-next-line max-len
  const body = typeof request.body === "string" ? JSON.parse(request.body) : request.body;
  const {token, amount} = body;
  stripeClient.paymentIntents
    .create({
      amount,
      currency: "USD",
      payment_method_types: ["card"],
      payment_method_data: {
        type: "card",
        card: {
          token,
        },
      },
      confirm: true,
    })
    .then((paymentIntent) => {
      console.log("pay function", paymentIntent);
      response.json(paymentIntent);
    })
    .catch((e) => {
      console.log(e);
      response.status(400);
      response.send(e);
    });
};
