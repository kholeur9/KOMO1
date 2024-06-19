import * as z from "zod";

export const FormSchema = z.object({
  name: z.string().regex(/^\d{9}$/, { message: "Veuillez entrer 9 chiffres."}),
  password: z.string().regex(/^\d{4}$/, { message: "Veuillez entrer 4 chiffres"}),
})