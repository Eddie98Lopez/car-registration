"use client";

import React, { useState } from "react";
import MultiPageForm from "@/components/MulitPageForm";
import { ContactInfoStep } from "@/components/ContactInfoForm";
import CarRegistrationPage from "@/components/CarRegistrationPage";
import { VehicleRegistrationProvider } from "@/components/VehicleProvider";
import ReviewPage from "@/components/ReviewPage";
import PayPage from "@/components/PayPage";
import Checkout from "@/components/Checkout";

export default function VendorWizard() {
  const [contact, setContact] = useState({
    orgName: "",
    address: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  return (
    <VehicleRegistrationProvider>
      <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
        <MultiPageForm
          steps={[
            {
              id: "contact",
              title: "Contact Information",
              render: () => (
                <ContactInfoStep contact={contact} setContact={setContact} />
              ),
            },

            {
              id: "register",
              render: () => <CarRegistrationPage />,
              title: "Vehicle Registration",
            },
            {
              id: "review",
              render: () => <ReviewPage contact={contact} />,
              title: "Review",
            },
            {
              id: "pay",
              render: () => <Checkout />,
              title: "Pay",
            },
          ]}
        />
      </div>
    </VehicleRegistrationProvider>
  );
}
