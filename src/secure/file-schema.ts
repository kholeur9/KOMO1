import * as z from 'zod';


export const fileSchema = z.object({
  file: z.any()
});