"use client";

import React, { useState } from "react";
import MultiPageForm from "@/components/MulitPageForm";
import { ContactInfoStep } from "@/components/ContactInfoForm";
//import { ExampleSaveStep } from "@/components/ExampleSaveStep";
import CarRegistrationPage from "@/components/CarRegistrationPage";
import { VehicleRegistrationProvider } from "@/components/VehicleProvider";
import ReviewPage from "@/components/ReviewPage";

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
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <MultiPageForm
          steps={[
            {
              id: "contact",
              render: () => (
                <ContactInfoStep contact={contact} setContact={setContact} />
              ),
            },

            {
              id: "register",
              render: () => <CarRegistrationPage />,
            },
            {
              id: "review",
              render: () => <ReviewPage contact={contact} />,
            },
          ]}
        />
      </div>
    </VehicleRegistrationProvider>
  );
}
