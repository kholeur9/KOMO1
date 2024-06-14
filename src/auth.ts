import NextAuth from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import Credentials from "next-auth/providers/credentials";
import { authConfig } from './auth.config';
import { z } from 'zod';
//import { sql } from '@vercel/postgres';
//import type { User } from '@/app/lib/definitions';
import { db } from "@/db";


export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});