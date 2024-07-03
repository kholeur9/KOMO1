import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUser } from "@/data/user";
import { FormSchema } from "@/secure/number";

export const authConfig = {
  providers: [
    Credentials({
      //id: 'form-client',
      async authorize(credentials) {

        const valideFields = FormSchema.safeParse(credentials);
        console.log("Auth_Config : ", valideFields);

        if (valideFields.success) {
          const { name, password } = valideFields.data;

          const user = await getUser(name);

          if (!user) {
            return null;
          }

          const passwordsMatch = user.password === password;
          
          if (passwordsMatch) {
              return user;
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