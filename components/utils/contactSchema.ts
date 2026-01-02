import * as z from "zod";

export const contactSchema = z.object({
  orgName: z.string().trim().min(2, "Org name too short").optional(),
  address: z.string().trim().min(5, "Address required"),
  firstName: z.string().trim().min(2, "First name too short"),
  lastName: z.string().trim().min(2, "Last name too short"),
  email: z.string().trim().email("Invalid email"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9()\-\s]{7,}$/, "Invalid phone"),
});
