"use client";
import React, { useState, useEffect } from "react";
import { FormPageNav, FormPage } from "./FormPage";
import { useVehicleRegistration } from "./VehicleProvider";
import { CarsItemList, CarsItem } from "./CarsItemList";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import { useWizard } from "./MulitPageForm";
import Image from "next/image";
import { Item, ItemContent } from "./ui/item";
import { User } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const registrationPrice = 250;

export const ContactInfoItem = ({ contact }) => {
  //console.log(contact);
  const { firstName, lastName, email, phone, orgName, address } = contact;
  const { goTo } = useWizard();

  return (
    <Item variant="outline">
      <ItemContent className="flex flex-row w-full items-center gap-8">
        <div>
          <User className="h-10 w-10" />
        </div>
        <div>
          <p className="font-bold">
            {firstName} {lastName}
          </p>
          <p>{orgName}</p>
          <p>{address}</p>
          <p>{phone}</p>
        </div>
        <Button variant="ghost" onClick={() => goTo(0)} className="ml-auto">
          <Image
            src="/icons/icon/edit.png"
            alt="edit contact information"
            width={24}
            height={24}
          />
        </Button>
      </ItemContent>
    </Item>
  );
};

const ReviewPage = ({ contact }) => {
  const { state, startEdit, remove } = useVehicleRegistration();
  const wizard = useWizard();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    state.items.length == 0 && wizard.goTo(1);
  }, [state]);
  return (
    <FormPage
      title="Review Information"
      description="Please carefully review all informaiton to check to accuracy."
    >
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex justify-start gap-3 items-center">
            <Image
              src="/icons/icon/home.png"
              alt="company"
              width={24}
              height={24}
            />
            <p>Company Informaiton</p>
          </div>
          <ContactInfoItem contact={contact} />
        </div>

        <div>
          <div className="flex justify-start gap-3 items-center">
            <Image
              src="/icons/icon/car.png"
              alt="company"
              width={30}
              height={30}
            />
            <p>Vehicle Entries</p>
          </div>
          <CarsItemList cars={state.items}>
            {state.items.map((car, i) => {
              return (
                <CarsItem
                  key={`car-${i}`}
                  car={car}
                  handleEdit={() => {
                    startEdit(i);
                    wizard.goTo(1);
                  }}
                  handleDelete={() => remove(i)}
                />
              );
            })}
          </CarsItemList>
        </div>
        <div className="w-full text-right">
          Total: {state.items.length * registrationPrice}
        </div>

        <div className="flex items-center gap-3">
          <Checkbox
            id="terms"
            checked={checked}
            onCheckedChange={() => setChecked(!checked)}
          />
          <Label htmlFor="terms">
            I agree that I have read and will abide by the Trucks Show rules.
          </Label>
        </div>
        <Separator />
        <FormPageNav>
          <Button
            disabled={wizard.isFirst}
            onClick={wizard.goPrev}
            variant="outline"
          >
            Prev
          </Button>

          <Button onClick={wizard.goNext} disabled={!checked}>
            Continue To Pay
          </Button>
        </FormPageNav>
      </div>
    </FormPage>
  );
};

export default ReviewPage;
