import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUser } from "@/data/user";
import { FormSchema } from "@/secure/number";
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing

export const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validateFields = FormSchema.safeParse(credentials);

        if (validateFields.success) {
          const { name, password } = validateFields.data;
          
          const user = await getUser(name);
          if (!user || !user.password) {
            return null;
          }
          
          const passwordsMatch = password === user.password;
          
          if (passwordsMatch) {
            return user;
          }
        }
        return null;
      }
    })
  ],
  /** callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }
      return true;
    },
  },*/
  // Add providers with an empty array for now
} satisfies NextAuthConfig;