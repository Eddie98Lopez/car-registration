// import React, { useState } from "react";
import { CarsItemList, CarsItem } from "./CarsItemList";
import { FormPageNav, FormPage } from "./FormPage";
import { Button } from "./ui/button";
import { useWizard } from "@/components/MulitPageForm";
import CarRegistrationForm from "./CarRegistrationForm";
import { useVehicleRegistration } from "./VehicleProvider";

const CarRegistrationPage = () => {
  // const [editState, setEditState] = useState(false);
  const { state, startCreate, startEdit, remove } = useVehicleRegistration();

  const wizard = useWizard();
  const disabled = !(state.items.length >= 1);

  return (
    <FormPage
      title="Car Show Registration"
      description="You can enter a maximum of 5 vehicles into the show."
    >
      {state.mode == "list" && (
        <CarsItemList cars={state.items}>
          {state.items.map((car, i) => {
            return (
              <CarsItem
                key={`car-${i}`}
                car={car}
                handleEdit={() => startEdit(i)}
                handleDelete={() => remove(i)}
              />
            );
          })}
        </CarsItemList>
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
