import NextAuth, { DefaultSession } from 'next-auth';

export type ExtendUser = DefaultSession['user'] & {
  role: 'admin' | 'client';
}

declare module 'next-auth' {
  interface Session {
    user: ExtendUser;
  }
}