import React, { Dispatch } from "react";
import { Item, ItemContent } from "@/components/ui/item";
import Image from "next/image";
import { Button } from "./ui/button";
import { Car } from "lucide-react";

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

const CarsItem = ({
  car,
  setEditState,
}: {
  car: Car;
  setEditState: Dispatch<boolean>;
}) => {
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
          <Button variant="ghost" onClick={() => setEditState(true)}>
            <Image
              src="/icons/icon/edit.png"
              alt="edit car"
              width={24}
              height={24}
            />
          </Button>
          <Button variant="ghost">
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

const CarsItemList = ({
  cars,
  setEditState,
}: {
  cars: Car[];
  setEditState: Dispatch<boolean>;
}) => {
  return (
    <>
      <ul className="space-y-2">
        {cars.map((car, i) => {
          return (
            <CarsItem key={`car-${i}`} car={car} setEditState={setEditState} />
          );
        })}
      </ul>
      <Button
        disabled={cars.length >= 5}
        className="w-full bg-gray-50"
        variant={"outline"}
        onClick={() => {
          setEditState(true);
        }}
      >
        Add Car
      </Button>
    </>
  );
};

export { CarsItem, CarsItemList };
