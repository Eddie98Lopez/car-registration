import React, { useState } from "react";
import { CarsItemList, Cars } from "./CarsItemList";
import { FormPageNav, FormPage } from "./FormPage";
import { Button } from "./ui/button";
import { useWizard } from "@/components/MulitPageForm";
import CarRegistrationForm from "./CarRegistrationForm";
import { useVehicleRegistration } from "./VehicleProvider";

const CarRegistrationPage = () => {
  const [editState, setEditState] = useState(false);
  const { state, startCreate } = useVehicleRegistration();

  const wizard = useWizard();
  const disabled = !(state.items.length >= 1);

  return (
    <FormPage>
      {state.mode == "list" && (
        <CarsItemList cars={state.items} handleAddClick={startCreate} />
      )}
      {state.mode == "form" && <CarRegistrationForm />}

      {state.mode === "list" && state.items.length < 5 && (
        <Button
          disabled={state.items.length >= 5}
          className="w-full bg-gray-50"
          variant={"outline"}
          onClick={() => startCreate()}
        >
          Add Car
        </Button>
      )}
      {state.mode == "list" && (
        <FormPageNav>
          <Button
            disabled={wizard.isFirst}
            onClick={wizard.goPrev}
            variant="outline"
          >
            Prev
          </Button>

          <Button onClick={wizard.goNext} disabled={disabled}>
            Next
          </Button>
        </FormPageNav>
      )}
    </FormPage>
  );
};

export default CarRegistrationPage;
