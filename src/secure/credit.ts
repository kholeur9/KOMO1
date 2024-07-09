import * as z from "zod";

export const convertCreditSchema = z.object({
  ci: z.number(),
  numero: z.string(),
  total: z.number(),
  withdraw: z.number(),
  quantity: z.string(),
})