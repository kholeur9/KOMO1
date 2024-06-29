import { db } from "@/db";

import { users } from "@/db/schema";
import { totalCredit } from "@/db/schema";
import { retraitCredit } from "@/db/schema";
import { forfaits } from "@/db/schema";

import { eq, sum, asc, sql, desc, count, ne } from "drizzle-orm";

import { DateTime } from "luxon";

export const getUser = async (name: string) => {
  try {
    const user = await db.query.users.findMany({
      where: eq(users.name, name)
    })
    return user[0];
  } catch (error) {
    throw new Error('Failed to fetch user.');
  }
}

export const getUserById = async (id : string ) => {
  try {
    const user = await db.query.users.findMany({
      where: eq(users.id, id)
    })
    return user[0];
  } catch (error) {
    throw new Error('Failed to fetch user.');
  }
}

export const countAllUsers = async (id: any) => {
  try {
    const countUser = await db.select({ value: count() }).from(users).where(ne(users.id, id))

    const counted = countUser.map(user => user.value)
    return counted;
  } catch (error) {
    throw new Error('Failed to fetch user.');
  }
}

export const countAllForfaits = async () => {
  try {
    const countForfait = await db.select({ value: count() }).from(forfaits)

    const counted = countForfait.map(forfait => forfait.value)

    return counted;
  } catch (error) {
    throw new Error('Failed to fetch forfait.');
  }
}

export const getUniqueTotalCredit = async ( user : any ) => {
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
  try {
    const getTotalCredit = await db.query.totalCredit.findMany({
      where: eq(totalCredit.userId, id)
    })
    return getTotalCredit[0];
  } catch (error) {
    throw new Error('Failed to fetch user.');
  }
}

export const getLastWithDraw = async ( id : any ) => {
  try {
    const lastWithdraw = await db.select({
      id: retraitCredit.id,
      quantity: retraitCredit.quantity,
      data_forfait: retraitCredit.data_forfait,
      status: retraitCredit.status,
      date: retraitCredit.date,
    })
      .from(retraitCredit)
      .where(
        eq(retraitCredit.totalCreditId, id
          ),
      )
      .orderBy(desc(retraitCredit.date))
      .limit(1);

    if (lastWithdraw.length <= 0){
      return null;
    }

    const result = lastWithdraw.map( item => {
      try {
        // Get time of last withdraw this client
        const formattedDate = DateTime.fromJSDate(item.date, { zone: 'Africa/Libreville' })
        // parse this tims in millisecond
        const parseInMillis = formattedDate.toMillis();

        // Get date today
        const toDay = DateTime.local({ zone: 'Africa/Libreville' });
        // parse today in millisecond
        const zoneToday = toDay.toMillis();

        // Get difference between today and last withdraw
        const diffTimeByLuxon = toDay.diff(formattedDate);

        // Verify if the difference is less than 24 hours
        const allowWithdraw = diffTimeByLuxon.as('milliseconds') < 86400000;
        
        return {
          allowWithdraw,
          quantity: item.quantity,
        };
      } catch (error) {
        console.error('Erreur de formatage de date', error)
        throw new Error('Erreur de formatage de date');
      }
    })
    
    return result[0]
  } catch (error) {
    console.log(`Erreur lors de la récupération du dernier retrait : `, error);
    throw new Error('Erreur lors de la récupération du dernier retrait.');
  }
};