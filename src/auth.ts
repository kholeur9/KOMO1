import NextAuth from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { authConfig } from './auth.config';
//import { sql } from '@vercel/postgres';
//import type { User } from '@/app/lib/definitions';
import { db } from "@/db";
import { getUserById } from "@/data/user";


export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      console.log('session', token);
      if (token.sub && session.user){
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as 'admin' | 'client' | string;
      }
      
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;
      
      return token;
    },
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});