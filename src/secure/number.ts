import * as z from "zod";

export const FormSchema = z.object({
  username: z.string().min(1, {
    message: "L'identifiant est vide."
  }),
  password_hash: z.string().min(4, { 
    message: "Veuillez entrer un mot de passe."
  }),
})