"use server";

import { headers } from "next/headers";
import stripe from "@/lib/stripe";

export async function fetchClientSecret(quantity: number) {
  const origin = (await headers()).get("origin");

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    line_items: [
      {
        // Provide the exact Price ID (for example, price_1234) of
        // the product you want to sell
        price: "price_1Spas62XFaBBy7JxVAmMceGb",
        quantity: quantity,
      },
    ],
    branding_settings: {
      display_name: "Powdur",
      font_family: "roboto",
      border_style: "rounded",
      background_color: "#ffffff",
      button_color: "#000000",
    },
    mode: "payment",
    return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
  });

  return session.client_secret;
}


