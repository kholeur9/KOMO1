"use server";

import * as z from "zod";

import { convertCreditSchema } from "@/secure/credit";

export const ConvertCredit = async ( formData : z.infer<typeof convertCreditSchema> ) => {
  console.log(formData)

  const validateFields = convertCreditSchema.safeParse(formData);
  if (!validateFields.success) {
    return { success : "Refusé"}
  }
}