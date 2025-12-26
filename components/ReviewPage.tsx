import React from "react";
import { FormPageNav, FormPage } from "./FormPage";
import { useVehicleRegistration } from "./VehicleProvider";
import { CarsItemList } from "./CarsItemList";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import { useWizard } from "./MulitPageForm";

const registrationPrice = 250;

const ReviewPage = () => {
  const { state } = useVehicleRegistration();
  const wizard = useWizard();
  return (
    <FormPage>
      <div className="flex flex-col gap-6">
        <div>
          <div>image and title</div>
          <div>Contact Data</div>
        </div>

        <div>
          <div>image and title</div>
          <CarsItemList cars={state.items} />
        </div>
        <div className="w-full text-right">
          Total: {state.items.length * registrationPrice}
        </div>

        <div>Checkbox for reading and agreening to rules</div>
        <Separator />
        <FormPageNav>
          <Button
            disabled={wizard.isFirst}
            onClick={wizard.goPrev}
            variant="outline"
          >
            Prev
          </Button>

          <Button onClick={wizard.goNext} disabled={wizard.isLast}>
            Continue To Pay
          </Button>
        </FormPageNav>
      </div>
    </FormPage>
  );
};

export default ReviewPage;
