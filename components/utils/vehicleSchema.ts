import * as z from "zod";

export const vehicleSchema = z.object({
  make: z.string().min(2, "At least 2 characters are required"),
  model: z.string().min(2, "At least 2 characters are required"),
  year: z.string().min(2, "At least 2 characters are required"), // keep as z.string() for inputs; cast later
  lic_plate_num: z.string().min(2, "At least 2 characters are required"),
  judge_category: z.enum(
    ["classic", "custom", "restomod", "workTruck", "offRoad"],
    "Please select one of the given categories"
  ),
  driver: z.object({
    firstName: z.string().min(2, "At least 2 characters are required"),
    lastName: z.string().min(2, "At least 2 characters are required"),
    phone: z.string().min(2, "At least 2 characters are required"),
  }),
});

export const flattenError = (zodError: z.ZodError) => {
  return z.flattenError(zodError);
};
