import { headers } from "next/headers";
import stripe from "@/lib/stripe";
import { NextResponse, NextRequest } from "next/server";

const endpointSecret = process.env.STRIPEWEBHOOKSECRET;

if (!endpointSecret) {
  throw Error("enpoint secret needed");
}

export async function POST(req) {
  const payload = await req.body;
  const sig = (await headers()).get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }

  if (
    event.type === "checkout.session.completed" ||
    "checkout.session.async_payment_succeeded"
  ) {
    fulfillCheckout(event.data.object.id);
  }

  return NextResponse.json("");
}

export async function fulfillCheckout(sessionId: string) {
  console.log("fulfilling checkout for sessionID: " + sessionId);

  // Normally stripe would suggest to add logic here to check for an existing fulfullment.
  // Given this is not a physical product but a fee for participation we dont have an orders table in the same way an ecommerce store might.
  // We are binding "draft"/"upaid"/"paid" statuses with every form submission
  // This is subject to change... SupabaseDB table schemas are still a WIP

  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });

  if (checkoutSession.payment_status !== "unpaid") {
    // const {data,error} = await supabase.from("table").update({status:"paid"}).eq("sessionId", sessionId).select()
  }
}
