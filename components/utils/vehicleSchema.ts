import * as z from "zod";

const licensePlateRegex = /^(?=.{2,8}$)[A-Z0-9]+(?:[ -]?[A-Z0-9]+)*$/i;

export const vehicleSchema = z.object({
  make: z.string().trim().min(2, "At least 2 characters are required"),
  model: z.string().trim().min(2, "At least 2 characters are required"),
  year: z.string().trim().min(2, "At least 2 characters are required"), // keep as z.string() for inputs; cast later
  lic_plate_num: z
    .string()
    .trim()
    .regex(licensePlateRegex, "Invalid license plate format"),
  judge_category: z.enum(
    ["classic", "custom", "restomod", "workTruck", "offRoad"],
    "Please select one of the given categories"
  ),
  driver: z.object({
    firstName: z.string().trim().min(2, "At least 2 characters are required"),
    lastName: z.string().trim().min(2, "At least 2 characters are required"),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[0-9()\-\s]{7,}$/, "Invalid phone")
      .optional(),
  }),
});

export const flattenError = (zodError: z.ZodError) => {
  return z.flattenError(zodError);
};

export const validateFormFields = (schema: z.Schema, values) => {
  const validatedResult = schema.safeParse(values);

  if (!validatedResult.success) {
    const error_messages = flattenError(validatedResult.error).fieldErrors;
    return { isValdiated: false, errors: error_messages };
  } else {
    return { isValidated: true, values };
  }
};
