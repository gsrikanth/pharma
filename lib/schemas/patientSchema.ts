import { z } from "zod";
import { asOptionalField } from "../utils";
import { v4 as uuidv4 } from "uuid";
export const genderOptions = ["Male", "Female", "Other"] as const;

export const statusOptions = [
  "Under Treatment",
  "Recovered",
  "Under Observation",
] as const;

export const patientSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => uuidv4()),
  name: z.string().min(2, { message: "Required" }),
  email: asOptionalField(z.string().email()),
  gender: z.enum(genderOptions, { message: "Required" }),
  bg: asOptionalField(z.string().min(2)),
  age: z.coerce.number().int().positive({ message: "Required" }),
  bp: asOptionalField(z.coerce.number().positive()),
  sugar: asOptionalField(z.coerce.number().positive()),
  dob: asOptionalField(z.coerce.date()),
  doa: z.coerce.date({ required_error: "Required" }).default(() => new Date()),
  dod: asOptionalField(z.coerce.date()),
  phone: z.string().min(10, { message: "Required" }),
  address: z.string().min(2, { message: "Required" }),
  doctor: z.string().min(2, { message: "Required" }),
  symptoms: z.string().min(2, { message: "Required" }),
  status: z.enum(statusOptions, { message: "Required" }),
});

export type PatientType = z.infer<typeof patientSchema>; // string
