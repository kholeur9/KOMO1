'use server';

import * as z from "zod";

import { fileSchema } from "@/secure/file-schema";

export const uploadFile = async (value: z.infer<typeof fileSchema>) => {
  console.log('uploadFile ::: value : ', JSON.stringify(value));

  const valideFile = fileSchema.safeParse(value);
  if (!valideFile.success) {
    return {
      error: 'Erreur lors de la validation du fichier',
    }
  }
}