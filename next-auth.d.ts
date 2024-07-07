import NextAuth, { DefaultSession } from 'next-auth';

export type ExtendUser = DefaultSession['user'] & {
  // Add any additional properties you want to add to the user object
  role: 'admin' | 'client' | string;
}

declare module 'next-auth' {
  interface Session {
    user: {
      ExtendUser;
      id: string;
      name: string;
    }
  };
}