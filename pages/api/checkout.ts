import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const params: Stripe.Checkout.SessionCreateParams = {
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: 1000,
          product_data: {
            name: "Oishi Payment",
            description: "Payment for your order",
          },
        },
        quantity: 1,
      },
    ],
    client_reference_id: req.body.orderId,
    metadata: {
      workflowId: req.body.workflowId,
    },
    success_url: `${req.headers.origin}/order/${req.body.orderId}`,
    cancel_url: `${req.headers.origin}`,
  };

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create(params);

  res.status(200).json(checkoutSession);
}
