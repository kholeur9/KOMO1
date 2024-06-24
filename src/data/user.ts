import { db } from "@/db";
import { users } from "@/db/schema";
import { totalCredit } from "@/db/schema";
import { retraitCredit } from "@/db/schema";
import { eq, sum, asc, sql, desc } from "drizzle-orm";

import { DateTime } from "luxon";

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

export const getUserById = async (id : string ) => {
  try {
    console.log(`Looking for user by Id : ${id}`);
    const user = await db.query.users.findMany({
      where: eq(users.id, id)
    })
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const getUniqueTotalCredit = async ( user : any ) => {
  console.log(`Looking for unique `, user?.id)
  try {
    const getCredit = await db.query.totalCredit.findMany({
      where: eq(totalCredit.userId, user?.id)
    })
    console.log(`Found unique `, getCredit)
    return getCredit[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const userTotalCredit = async ( id : any ) => {
  console.log(`Looking for user by Total Credit : ${id}`)
  try {
    const getTotalCredit = await db.query.totalCredit.findMany({
      where: eq(totalCredit.userId, id)
    })
    console.log(`Found : `, getTotalCredit);
    return getTotalCredit[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

const getLastWithDraw = async () => {
  const lastWithdraw = await db.select({
    id: retraitCredit.id,
    totalCreditId: retraitCredit.totalCreditId,
    quantity: retraitCredit.quantity,
    data_forfait: retraitCredit.data_forfait,
    status: retraitCredit.status,
}).from(retraitCredit).where(eq(retraitCredit.id, 33)).orderBy(desc(retraitCredit.date)).limit(1);

  console.log(`Last Withdraw : `, lastWithdraw);
}

console.log(getLastWithDraw())