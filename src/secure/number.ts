import * as z from "zod";

export const FormSchema = z.object({
  email: z.string().email(),
  //email: z.string().regex(/^\d{9}$/, { message: "Veuillez entrer 9 chiffres."}),
  password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractère."})
})