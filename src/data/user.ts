import { db } from "@/db";
import { users } from "@/db/schema";
import { totalCredit } from "@/db/schema";
import { eq, sum, asc, sql } from "drizzle-orm";

export const getUser = async (name: string) => {
  try {
    const user = await db.query.users.findMany({
      where: eq(users.name, name)
    })
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const getUserById = async (id: any ) => {
  try {
    console.log(`Looking for user : ${JSON.stringify(id)}`);
    const user = await db.query.users.findMany({
      where: eq(users.id, id)
    })
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const getUniqueTotalCredit = async (user : any) => {
  try {
    const getCredit = await db.query.totalCredit.findMany({
      where: eq(totalCredit.userId, user.id)
    })
    return getCredit[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}