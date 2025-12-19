"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormPage, FormPageNav } from "./FormPage";
import { useWizard } from "@/components/MulitPageForm";

type ContactInfo = {
  orgName: string;
  address: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type ContactInfoPageProps = {
  value: ContactInfo;
  onChange: (patch: Partial<ContactInfo>) => void;
};

export default function ContactInfoPage({
  value,
  onChange,
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
        />
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
        />
      </div>

      {/* 3) First Name */}
      <div className="space-y-1.5">
        <Label htmlFor="firstName">First name</Label>
        <Input
          id="firstName"
          value={value.firstName}
          onChange={(e) => onChange({ firstName: e.target.value })}
          autoComplete="given-name"
        />
      </div>

      {/* 4) Last Name */}
      <div className="space-y-1.5">
        <Label htmlFor="lastName">Last name</Label>
        <Input
          id="lastName"
          value={value.lastName}
          onChange={(e) => onChange({ lastName: e.target.value })}
          autoComplete="family-name"
        />
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
        />
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
        />
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

  return (
    <FormPage
      title="Contact Information"
      description="Tell us who to reach out to."
    >
      <ContactInfoPage
        value={contact}
        onChange={(patch) => setContact((prev) => ({ ...prev, ...patch }))}
      />

      <FormPageNav>
        <Button
          disabled={wizard.isFirst}
          onClick={wizard.goPrev}
          variant="outline"
        >
          Prev
        </Button>

        <Button onClick={wizard.goNext} disabled={wizard.isLast}>
          Next
        </Button>
      </FormPageNav>
    </FormPage>
  );
}
