import { z } from "zod";
import { asOptionalField } from "../utils";
import { v4 as uuidv4 } from "uuid";
export const genderOptions = ["Male", "Female", "Other"] as const;

export const statusOptions = [
  "Under Treatment",
  "Recovered",
  "Under Observation",
] as const;

export const readUploadedFileAsText = (inputFile: any) => {
  const temporaryFileReader = new FileReader();

  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException("Problem parsing input file."));
    };

    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result);
    };
    temporaryFileReader.readAsDataURL(inputFile);
  });
};

export const patientSchema = z
  .object({
    id: z
      .string()
      .uuid()
      .default(() => uuidv4()),
    name: z.string().min(2, { message: "Required" }),
    email: asOptionalField(z.string().email()),
    gender: z.enum(genderOptions, { message: "Required" }),
    bg: asOptionalField(z.string().min(2)),
    age: z.coerce.number().int().positive({ message: "Required" }).max(100),
    bp: asOptionalField(z.coerce.number().positive()),
    sugar: asOptionalField(z.coerce.number().positive()),
    dob: asOptionalField(z.coerce.date()),
    doa: z.coerce
      .date({ required_error: "Required" })
      .default(() => new Date()),
    dod: asOptionalField(z.coerce.date()),
    phone: z.string().min(10, { message: "Required" }),
    address: z.string().min(2, { message: "Required" }),
    doctor: z.string().min(2, { message: "Required" }),
    symptoms: z.string().min(2, { message: "Required" }),
    status: z.enum(statusOptions, { message: "Required" }),
    photo: z
      .any()
      .refine((file) => file[0] instanceof File, "Please upload an image file.")
      .refine(
        (file) => file[0].type.startsWith("image"),
        "Only image files are allowed."
      ),
  })
  .transform(async (value, ctx) => {
    const file = value.photo;
    if (file) {
      const fileContents = await readUploadedFileAsText(file[0]);
      return { ...value, photo: fileContents };
    }
  });

export type PatientType = z.infer<typeof patientSchema>; // string
