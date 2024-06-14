import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getUser = async (email: string) => {
  try {
    console.log(`Looking for user : ${email}`);
    const user = await db.query.users.findMany({
      where: eq(users.email, email)
    })
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

/** export const getUserByNumber = async ( email ) => {
  console.log(`Searching for user with number : ${email}`)
  // Define this helper somewhere in your codebase:
  const takeUniqueOrThrow = <T extends any[]>(values: T): T[number] => {
    if (values.lenght !== 1) throw new Error(`Found non unique or inexistent value", ${values}`)
    return values[0]!
  }

  // Use it in a query as follows:
  const user = await db.select().from(users).where(eq(users.email, email)).then(takeUniqueOrThrow);
 
  console.log(`Found users : ${user}`)

  /** if (user.length === 0) {
    console.error(`User not Found`)
    throw new Error(`User not found`)
  } else if (user.length > 1) {
    console.error(`Found non unique value`)
    throw new Error(`Found non unique value`)
  }
  
  return user;
}*/

