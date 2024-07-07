'use server';

import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";


import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { DEFAULT_LOGIN_REDIRECT } from '../../routes';
import * as z from 'zod';
import { FormSchema } from "@/secure/number";

import { getUser } from "@/data/user";

interface ActionResult {
  error: string;
}

export async function authenticate(
  values: z.infer<typeof FormSchema>
): Promise<ActionResult> {
  console.log('authenticate', values);

  const validateFields = FormSchema.safeParse(values);
  
  if (!validateFields.success){
    return { error : "Identifiant invalide not success."}
  }
  
  const { username, password_hash } = validateFields.data;

  const existingUser = await getUser(username);

  if (!existingUser) {
    return { error : 'Identifiant invalide, no existing user.'}
  }

  const passwordsMatch = existingUser.password_hash === password_hash;

  if (!passwordsMatch) {
    return { error : 'Mot de passe invalide.'}
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return redirect("/"); 
}