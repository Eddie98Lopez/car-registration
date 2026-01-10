"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Truck, User } from "lucide-react";
import { useVehicleRegistration } from "./VehicleProvider";
import { vehicleSchema, driverSchema } from "./utils/vehicleSchema";
import { VehicleErrors } from "./VehicleProvider";
import { validateFormFields } from "./utils/vehicleSchema";
import { checkForExistingPlate } from "./utils/vehicleSchema";
import { omit } from "zod/mini";

function omitKey<T extends Record<string, any>>(
  original: T,
  keyToRemove: string
): Omit<T, typeof keyToRemove> {
  const { [keyToRemove]: _, ...rest } = original;
  return rest;
}

export default function CarRegistrationForm() {
  const { state, updateDriverField, updateField, save, cancel, updateErrors } =
    useVehicleRegistration();
  const values = state.formValues;
  const errors = state.formValueErrs;
  console.log(errors);
  const lic_plates = state.items.map((item) => item.lic_plate_num);

  // 🔹 top-level fields (make, model, year, etc.)
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateField(name, value);
  };

  // 🔹 nested driver fields
  const handleDriverChange = (e) => {
    const { name, value } = e.target;
    updateDriverField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationResult = validateFormFields(vehicleSchema, values);
    // Todo configure seperate schema just for validating driver const validatedDriver = validateFormFields(driverSchema, values.driver);
    const isPlateDuplicated = checkForExistingPlate(
      lic_plates,
      values.lic_plate_num
    );
    let updatedErrs: VehicleErrors = {};

    console.log(validationResult);
    console.log(errors.driver);

    if (!validationResult.isValdiated) {
      updatedErrs = {
        ...validationResult.errors,
      };
    }
    if (
      isPlateDuplicated &&
      lic_plates.indexOf(values.lic_plate_num) !== state.editIndex
    ) {
      updatedErrs.lic_plate_num = ["License plate already registered"];
    }

    if (Object.keys(updatedErrs).length > 0) {
      updateErrors(updatedErrs);
      return;
    }

    save();
  };

  const handleCancel = (e) => {
    cancel();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* =======================
          1) Truck Information
         ======================= */}
      <div className="rounded-xl border p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Header */}
          <div className="md:col-span-2 flex items-center gap-3 pb-2">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Truck Information</h3>
              <p className="text-sm text-muted-foreground">
                Enter the vehicle details for judging.
              </p>
            </div>
          </div>

          {/* Make */}
          <div className="space-y-1.5">
            <Label htmlFor="make">Make</Label>
            <Input
              id="make"
              name="make"
              value={values.make}
              onChange={handleChange}
              placeholder="e.g., Ford"
            />
            <p className="text-xs text-red-600">{errors.make[0]}</p>
          </div>

          {/* Model */}
          <div className="space-y-1.5">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              name="model"
              value={values.model}
              onChange={handleChange}
              placeholder="e.g., F-100"
            />
            <p className="text-xs text-red-600">{errors.model[0]}</p>
          </div>

          {/* Year */}
          <div className="space-y-1.5">
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              name="year"
              type="number"
              value={values.year}
              onChange={handleChange}
              placeholder="e.g., 1967"
            />
            <p className="text-xs text-red-600">{errors.year[0]}</p>
          </div>

          {/* License Plate */}
          <div className="space-y-1.5">
            <Label htmlFor="licensePlate">License Plate</Label>
            <Input
              id="licensePlate"
              name="lic_plate_num"
              value={values.lic_plate_num}
              onChange={handleChange}
              placeholder="e.g., 7ABC123"
            />
            <p className="text-xs text-red-600">{errors.lic_plate_num[0]}</p>
          </div>

          {/* Judging Category */}
          <div className="md:col-span-2 space-y-1.5">
            <Label htmlFor="judgeCategory">Judging Category</Label>
            <select
              id="judgeCategory"
              name="judge_category"
              value={values.judge_category}
              onChange={handleChange}
              className="h-10 w-full rounded-md border bg-background px-3 text-sm"
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="classic">Classic</option>
              <option value="custom">Custom</option>
              <option value="restomod">Restomod</option>
              <option value="workTruck">Work Truck</option>
              <option value="offRoad">Off-Road</option>
            </select>
            <p className="text-xs text-red-600">{errors.judge_category[0]}</p>
          </div>
        </div>
      </div>

      {/* =======================
          2) Driver Information
         ======================= */}
      <div className="rounded-xl border p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Header */}
          <div className="md:col-span-2 flex items-center gap-3 pb-2">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Driver Information</h3>
              <p className="text-sm text-muted-foreground">
                Who’s responsible for this entry?
              </p>
            </div>
          </div>

          {/* First Name */}
          <div className="space-y-1.5">
            <Label htmlFor="driverFirstName">First name</Label>
            <Input
              id="driverFirstName"
              name="firstName"
              value={values.driver.firstName}
              onChange={handleDriverChange}
              placeholder="e.g., Eduardo"
            />
            <p className="text-xs text-red-600">{errors.driver["0"]}</p>
          </div>

          {/* Last Name */}
          <div className="space-y-1.5">
            <Label htmlFor="driverLastName">Last name</Label>
            <Input
              id="driverLastName"
              name="lastName"
              value={values.driver.lastName}
              onChange={handleDriverChange}
              placeholder="e.g., Lopez"
            />
            <p className="text-xs text-red-600">{errors.driver["1"]}</p>
          </div>

          {/* Phone */}
          <div className="md:col-span-2 space-y-1.5">
            <Label htmlFor="driverPhone">Phone</Label>
            <Input
              id="driverPhone"
              name="phone"
              type="tel"
              value={values.driver.phone}
              onChange={handleDriverChange}
              placeholder="e.g., (555) 555-5555"
            />
            <p className="text-xs text-red-600">{errors.driver["2"]}</p>
          </div>
        </div>
      </div>

      {/* =======================
          3) Actions
         ======================= */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Entry</Button>
      </div>
    </form>
  );
}
