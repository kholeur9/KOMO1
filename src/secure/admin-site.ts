import * as z from "zod";

export const FormAdminSchema = z.object({
  name: z.string({ message: "Entrez un identifiant valide."}),
  password: z.string().min(9, { message: "Veuillez entrer 9 caractères"}),
})