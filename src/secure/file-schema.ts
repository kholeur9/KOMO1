import * as z from "zod";

export const fileSchema = z.object({
  file: z.string().min(1).max(255),
})