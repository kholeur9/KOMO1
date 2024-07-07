import { Lucia } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";

import { db } from "@/db";
import { users, sessionTable } from "@/db/schema";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, users); // your adapter

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production"
    }
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      username: attributes.username,
      role: attributes.role,
    };
  }
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    UserId: number;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  username: string;
  role: string;
}