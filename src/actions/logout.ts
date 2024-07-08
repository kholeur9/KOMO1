'use server';

import { lucia } from "@/lib/auth";
import { validateRequest } from "@/data/current-user"
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

interface ActionResult {
  error: string;
}

export async function logout(): Promise<ActionResult> {
  const { session, user } = await validateRequest();
  if (!session) {
    return {
      error: 'Vous devez être connecté pour vous déconnecter.',
    }
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  /** if (session.userId === user.id) {
    if (user.role === 'admin') {
      redirect('/login/admin');
    } else if (user.role === 'client') {
      redirect('/login/client');
    }
  }*/
  return redirect(`/login/${user.role}`);
}