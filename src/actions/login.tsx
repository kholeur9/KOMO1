'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { DEFAULT_LOGIN_REDIRECT } from '../../routes';
import * as z from 'zod';
import { FormSchema } from "@/secure/number";

export async function authenticate(
  values: z.infer<typeof FormSchema>
) {
  console.log('authenticate', values);
  try {
    const valideFields = FormSchema.safeParse(values);
    const { email, password } = valideFields.data;
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    
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