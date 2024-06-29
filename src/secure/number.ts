import * as z from "zod";

export const FormSchema = z.object({
  name: z.string(),
  password: z.string().min(4, { message: "Veuillez entrer un mot de passe."}),
})