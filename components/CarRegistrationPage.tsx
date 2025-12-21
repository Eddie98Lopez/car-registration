import React, { useState } from "react";
import { CarsItemList, Cars } from "./CarsItemList";
import { FormPageNav, FormPage } from "./FormPage";
import { Button } from "./ui/button";
import { useWizard } from "@/components/MulitPageForm";
import CarRegistrationForm from "./CarRegistrationForm";

const dummyCars = [
  {
    make: "string",
    model: "string",
    year: 2009,
    lic_plate_num: "string",
    judge_category: "string",
    driver: { firstName: "Driver", lastName: "Name", phone: "5594445555" },
  },
];

const CarRegistrationPage = ({ registeredVehicles }) => {
  const [editState, setEditState] = useState(false);
  const { items, setItems } = registeredVehicles;
  const wizard = useWizard();

  return (
    <FormPage>
      {!editState && <CarsItemList cars={items} setEditState={setEditState} />}
      {editState && (
        <CarRegistrationForm
          registeredVehicles={registeredVehicles}
          editState={{ editState, setEditState }}
        />
      )}
      {!editState && (
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
      )}
    </FormPage>
  );
};

export default CarRegistrationPage;
