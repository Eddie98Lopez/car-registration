"use client";

import React, { useState } from "react";
import MultiPageForm from "@/components/MulitPageForm";
import { ContactInfoStep } from "@/components/ContactInfoForm";
//import { ExampleSaveStep } from "@/components/ExampleSaveStep";

export default function VendorWizard() {
  const [contact, setContact] = useState({
    orgName: "",
    address: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  //const [items, setItems] = useState<Array<{ id: string; note: string }>>([]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <MultiPageForm
        title="Vendor Registration"
        steps={[
          {
            id: "contact",
            render: () => (
              <ContactInfoStep contact={contact} setContact={setContact} />
            ),
          },

          {
            id: "review",
            render: () => <div>Review step (contact: {contact.email})</div>,
          },
        ]}
      />
    </div>
  );
}
