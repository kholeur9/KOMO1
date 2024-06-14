import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUser } from "@/data/user";
import { FormSchema } from "@/secure/number";

export const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {

        const valideFields = FormSchema.safeParse(credentials);
        console.log("Auth_Config : ", valideFields);

        if (valideFields.success) {
          const { email, password } = valideFields.data;

          const user = await getUser(email);

          if (!user) {
            return null;
          }

          if (user) {
            const passwordsMatch = await user.password === password;
            if (passwordsMatch) {
              return user;
            }
          } else {
            return null;
          }

        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
  /**callbacks: {
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