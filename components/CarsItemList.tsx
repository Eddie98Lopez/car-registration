import React, { Dispatch } from "react";
import { Item, ItemContent } from "@/components/ui/item";
import Image from "next/image";
import { Button } from "./ui/button";
import { Car } from "lucide-react";
import { useVehicleRegistration } from "./VehicleProvider";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";

export type Driver = {
  firstName: string;
  lastName: string;
  phone?: string;
};

export type Car = {
  make: string;
  model: string;
  year: number;
  lic_plate_num: string;
  judge_category: string;
  driver: Driver;
};

const CarsItem = ({ car, handleEdit, handleDelete }) => {
  const { make, model, year, driver, lic_plate_num, judge_category } = car;
  return (
    <Item variant="outline">
      <ItemContent className="flex flex-row w-full items-center gap-8">
        <div>
          <Image
            src="/icons/icon/car.png"
            height={50}
            width={50}
            alt="car-icon"
          />
        </div>

        <div>
          <p>
            {make}-{model}-{year}
          </p>
          <p>
            {driver.firstName} {driver.lastName}
          </p>
          <p>{judge_category}</p>

          <p>{lic_plate_num}</p>
        </div>

        <div className="ml-auto flex items-center">
          <Button variant="ghost" onClick={handleEdit}>
            <Image
              src="/icons/icon/edit.png"
              alt="edit car"
              width={24}
              height={24}
            />
          </Button>
          <Button variant="ghost" onClick={handleDelete}>
            <Image
              src="/icons/icon/trash-2.png"
              alt="delete car"
              width={24}
              height={24}
            />
          </Button>
        </div>
      </ItemContent>
    </Item>
  );
};

const CarsItemList = ({ cars, children }) => {
  const { remove, startEdit, startCreate } = useVehicleRegistration();
  return (
    <>
      <ul className="flex flex-col gap-3">
        {cars.length === 0 && (
          <Empty className="mb-0">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Image
                  src="/icons/icon/car.png"
                  height={24}
                  width={24}
                  alt="car-icon"
                />
              </EmptyMedia>
              <EmptyTitle>Registered Vehicles</EmptyTitle>
              <EmptyDescription>
                You haven&apos;t registered any vehicles for the show yet. Get
                started by adding your first vehicle.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
        {children}
      </ul>
    </>
  );
};

export { CarsItem, CarsItemList };
