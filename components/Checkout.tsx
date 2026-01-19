"use client";

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";

import { fetchClientSecret } from "../actions/stripe";
if (!process.env.NEXT_PUBLIC_STRIPE_KEY) {
  throw new Error("STRIPE_PUBLISHABLE_KEY is not set");
}
import { useVehicleRegistration } from "./VehicleProvider";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export default function Checkout() {
  const { length } = useVehicleRegistration().state.items;
  const options = async () => {
    return await fetchClientSecret(length);
  };
  return (
    <div id="checkout" className="p-0 m-0">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{
          fetchClientSecret: () => fetchClientSecret(length),
        }}
      >
        <EmbeddedCheckout className="p-0 m-0" />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
