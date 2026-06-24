"use client";

import React, { useState } from "react";
import MultiPageForm from "@/components/MulitPageForm";
import { ContactInfoStep } from "@/components/ContactInfoForm";
import CarRegistrationPage from "@/components/CarRegistrationPage";
import { VehicleRegistrationProvider } from "@/components/VehicleProvider";
import ReviewPage from "@/components/ReviewPage";
import Checkout from "@/components/Checkout";

export default function Register() {
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
      <div className="flex min-h-screen items-start justify-center font-sans p-10">
        <MultiPageForm
          steps={[
            {
              id: "contact",
              title: "Contact",
              render: () => (
                <ContactInfoStep contact={contact} setContact={setContact} />
              ),
            },

            {
              id: "register",
              render: () => <CarRegistrationPage />,
              title: "Trucks",
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
