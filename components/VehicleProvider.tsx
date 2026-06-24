"use client";

import React, { createContext, useContext, useReducer } from "react";

export type Driver = {
  firstName?: string;
  lastName?: string;
  phone?: string;
};

export type DriverErrors = {
  0?: string[];
  1?: string[];
  2?: string[];
};

export type Vehicle = {
  make: string;
  model: string;
  year: string; // keep as string for inputs; cast later
  lic_plate_num: string;
  judge_category: string;
  driver: Driver;
};

export type VehicleErrors = {
  make?: string[];
  model?: string[];
  year?: string[]; // keep as string for inputs; cast later
  lic_plate_num?: string[];
  judge_category?: string[];
  driver?: DriverErrors;
};

export const defaultVehicle: Vehicle = {
  make: "",
  model: "",
  year: "",
  lic_plate_num: "",
  judge_category: "",
  driver: { firstName: "", lastName: "", phone: "" },
};

const defaultErrors = {
  make: [""],
  model: [""],
  year: [""], // keep as string for inputs; cast later
  lic_plate_num: [""],
  judge_category: [""],
  driver: { 0: [""], 1: [""], 2: [""] },
};

type Mode = "list" | "form";

type State = {
  items: Vehicle[];
  formValues: Vehicle;
  formValueErrs: VehicleErrors;
  mode: Mode;
  editIndex: number | null;
};

type Action =
  | { type: "START_CREATE" }
  | { type: "START_EDIT"; index: number }
  | { type: "CANCEL" }
  | { type: "UPDATE_FIELD"; name: keyof Omit<Vehicle, "driver">; value: string }
  | { type: "UPDATE_DRIVER_FIELD"; name: keyof Driver; value: string }
  | { type: "UPDATE_ALL"; vehicle: Vehicle }
  | { type: "SAVE" }
  | { type: "SET_ITEMS"; items: Vehicle[] }
  | { type: "REMOVE"; index: number }
  | {
      type: "UPDATE_VEHICLE_ERRS";
      errors: VehicleErrors;
    };

function cloneVehicle(v: Vehicle): Vehicle {
  // structuredClone exists in modern browsers; JSON fallback is fine for plain data
  // @ts-expect-ignore
  return typeof structuredClone === "function"
    ? // @ts-expect-ignore
      structuredClone(v)
    : JSON.parse(JSON.stringify(v));
}

function createInitialState(initialItems: Vehicle[] = []): State {
  return {
    items: initialItems,
    formValues: defaultVehicle,
    formValueErrs: defaultErrors,
    mode: "list",
    editIndex: null,
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "START_CREATE":
      return {
        ...state,
        mode: "form",
        editIndex: null,
        formValues: defaultVehicle,
        formValueErrs: defaultErrors,
      };

    case "START_EDIT": {
      const item = state.items[action.index];
      if (!item) return state;

      return {
        ...state,
        mode: "form",
        editIndex: action.index,
        formValues: cloneVehicle(item),
      };
    }

    case "CANCEL":
      // cancel just resets to create
      return {
        ...state,
        mode: "list",
        editIndex: null,
        formValues: defaultVehicle,
        formValueErrs: defaultErrors,
      };

    case "UPDATE_FIELD":
      return {
        ...state,
        formValues: {
          ...state.formValues,
          [action.name]: action.value,
        },
      };
    case "UPDATE_VEHICLE_ERRS":
      return {
        ...state,
        formValueErrs: { ...defaultErrors, ...action.errors },
      };

    case "UPDATE_DRIVER_FIELD":
      return {
        ...state,
        formValues: {
          ...state.formValues,
          driver: {
            ...state.formValues.driver,
            [action.name]: action.value,
          },
        },
      };

    case "UPDATE_ALL":
      return { ...state, formValues: action.vehicle };

    case "SAVE": {
      if (state.mode === "form" && state.editIndex === null) {
        return {
          ...state,
          items: [...state.items, state.formValues],
          mode: "list",
          editIndex: null,
          formValues: defaultVehicle,
          formValueErrs: defaultErrors,
        };
      }

      const nextItems = state.items.map((v, i) =>
        i === state.editIndex ? state.formValues : v,
      );

      return {
        ...state,
        items: nextItems,
        mode: "list",
        editIndex: null,
        formValues: defaultVehicle,
      };
    }

    case "SET_ITEMS":
      return { ...state, items: action.items };

    case "REMOVE": {
      const next = state.items.filter((_, i) => i !== action.index);

      // if you removed the thing you're editing, bounce to create
      const editingRemoved =
        state.mode === "form" && state.editIndex === action.index;

      return {
        ...state,
        items: next,
        ...(editingRemoved
          ? {
              mode: "list" as const,
              editIndex: null,
              formValues: defaultVehicle,
            }
          : {}),
      };
    }

    default:
      return state;
  }
}

type Ctx = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const VehicleRegContext = createContext<Ctx | null>(null);

export function VehicleRegistrationProvider({
  children,
  initialItems = [],
}: {
  children: React.ReactNode;
  initialItems?: Vehicle[];
}) {
  const [state, dispatch] = useReducer(
    reducer,
    initialItems,
    createInitialState,
  );

  return (
    <VehicleRegContext.Provider value={{ state, dispatch }}>
      {children}
    </VehicleRegContext.Provider>
  );
}

export function useVehicleRegistration() {
  const ctx = useContext(VehicleRegContext);
  if (!ctx) {
    throw new Error(
      "useVehicleRegistration must be used within VehicleRegistrationProvider",
    );
  }

  const { state, dispatch } = ctx;

  // optional: convenience action creators so components stay clean
  const actions = {
    startCreate: () => dispatch({ type: "START_CREATE" }),
    startEdit: (index: number) => dispatch({ type: "START_EDIT", index }),
    cancel: () => dispatch({ type: "CANCEL" }),
    updateField: (name: keyof Omit<Vehicle, "driver">, value: string) =>
      dispatch({ type: "UPDATE_FIELD", name, value }),
    updateDriverField: (name: keyof Driver, value: string) =>
      dispatch({ type: "UPDATE_DRIVER_FIELD", name, value }),
    updateAll: (vehicle: Vehicle) => dispatch({ type: "UPDATE_ALL", vehicle }),
    save: () => dispatch({ type: "SAVE" }),
    setItems: (items: Vehicle[]) => dispatch({ type: "SET_ITEMS", items }),
    remove: (index: number) => dispatch({ type: "REMOVE", index }),
    updateErrors: (fieldErrors: VehicleErrors) =>
      dispatch({ type: "UPDATE_VEHICLE_ERRS", errors: fieldErrors }),
  };

  return { state, ...actions };
}
