"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormPage, FormPageNav } from "./FormPage";
import { useWizard } from "@/components/MulitPageForm";
import { contactSchema } from "./utils/contactSchema";
import { validateFormFields } from "./utils/vehicleSchema";

type ContactInfo = {
  orgName: string;
  address: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

// each field can have multiple messages (zod often does)
type FieldErrors<T> = Partial<Record<keyof T, string[]>>;

type ContactInfoPageProps = {
  value: ContactInfo;
  onChange: (patch: Partial<ContactInfo>) => void;
  errors?: FieldErrors<ContactInfo>;
};

function FieldError({ message }: { message?: string }) {
  // Always reserve space so the layout doesn't jump
  return <p className="text-xs text-red-600">{message ?? ""}</p>;
}

export default function ContactInfoPage({
  value,
  onChange,
  errors,
}: ContactInfoPageProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* 1) Company / Org Name (spans full width on md+) */}
      <div className="md:col-span-2 space-y-1.5">
        <Label htmlFor="orgName">Company / Organization</Label>
        <Input
          id="orgName"
          value={value.orgName}
          onChange={(e) => onChange({ orgName: e.target.value })}
          placeholder="e.g., Lopezed LLC"
          autoComplete="organization"
          aria-invalid={!!errors?.orgName?.length}
        />
        <FieldError message={errors?.orgName?.[0]} />
      </div>

      {/* 2) Address (spans full width on md+) */}
      <div className="md:col-span-2 space-y-1.5">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={value.address}
          onChange={(e) => onChange({ address: e.target.value })}
          placeholder="Street, City, State, ZIP"
          autoComplete="street-address"
          aria-invalid={!!errors?.address?.length}
        />
        <FieldError message={errors?.address?.[0]} />
      </div>

      {/* 3) First Name */}
      <div className="space-y-1.5">
        <Label htmlFor="firstName">First name</Label>
        <Input
          id="firstName"
          value={value.firstName}
          onChange={(e) => onChange({ firstName: e.target.value })}
          autoComplete="given-name"
          aria-invalid={!!errors?.firstName?.length}
        />
        <FieldError message={errors?.firstName?.[0]} />
      </div>

      {/* 4) Last Name */}
      <div className="space-y-1.5">
        <Label htmlFor="lastName">Last name</Label>
        <Input
          id="lastName"
          value={value.lastName}
          onChange={(e) => onChange({ lastName: e.target.value })}
          autoComplete="family-name"
          aria-invalid={!!errors?.lastName?.length}
        />
        <FieldError message={errors?.lastName?.[0]} />
      </div>

      {/* 5) Email */}
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={value.email}
          onChange={(e) => onChange({ email: e.target.value })}
          autoComplete="email"
          placeholder="name@company.com"
          aria-invalid={!!errors?.email?.length}
        />
        <FieldError message={errors?.email?.[0]} />
      </div>

      {/* 6) Phone */}
      <div className="space-y-1.5">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          value={value.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
          autoComplete="tel"
          placeholder="(555) 555-5555"
          aria-invalid={!!errors?.phone?.length}
        />
        <FieldError message={errors?.phone?.[0]} />
      </div>
    </div>
  );
}

export function ContactInfoStep({
  contact,
  setContact,
}: {
  contact: ContactInfo;
  setContact: React.Dispatch<React.SetStateAction<ContactInfo>>;
}) {
  const wizard = useWizard();

  const [contactErrs, setContactErrs] = useState<FieldErrors<ContactInfo>>({});

  const patchContact = (patch: Partial<ContactInfo>) => {
    // update values
    setContact((prev) => ({ ...prev, ...patch }));

    // optional: clear errors for fields being edited
    setContactErrs((prev) => {
      const next = { ...prev };
      (Object.keys(patch) as (keyof ContactInfo)[]).forEach((k) => {
        delete next[k];
      });
      return next;
    });
  };

  const onNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const validatedResult = validateFormFields(contactSchema, contact);

    if (validatedResult.isValidated) {
      setContactErrs({});
      wizard.goNext();
    } else {
      // expected shape: { [fieldName]: string[] }
      setContactErrs(validatedResult.errors as FieldErrors<ContactInfo>);
    }
  };

  return (
    <FormPage
      title="Contact Information"
      description="Tell us who to reach out to."
    >
      <ContactInfoPage
        value={contact}
        errors={contactErrs}
        onChange={patchContact}
      />

      <FormPageNav>
        <Button
          disabled={wizard.isFirst}
          onClick={wizard.goPrev}
          variant="outline"
        >
          Prev
        </Button>

        <Button onClick={onNext} disabled={wizard.isLast}>
          Next
        </Button>
      </FormPageNav>
    </FormPage>
  );
}
