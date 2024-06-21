import * as z from "zod";

export const convertCreditSchema = z.object({
  withdraw: z.number(),
  quantity: z.string(),
})