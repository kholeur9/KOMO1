'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { DEFAULT_LOGIN_REDIRECT } from '../../routes';
import * as z from 'zod';
import { FormSchema } from "@/secure/number";

import { useRouter } from "next/navigation";


export async function authenticate(
  values: z.infer<typeof FormSchema>
) {
  console.log('authenticate', values);

  const validateFields = FormSchema.safeParse(values);
  
  if (!validateFields.success){
    return { error : "Numéro invalide."}
  }
  
  try {
    if (validateFields.success) {
      const { name, password } = validateFields.data;
      await signIn('credentials', {
        name,
        password,
        redirectTo: DEFAULT_LOGIN_REDIRECT,
      });
    } else {
      return { error : "Le numéro ne sera validé que si il a une historique d'achat de forfait"}
    }
    
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error : 'Invalid credentials.'};
        case 'CredentialsSignin':
          throw error;
        default:
          return { error : 'Something went wrong.'};
      }
    }
    throw error;
  }
}