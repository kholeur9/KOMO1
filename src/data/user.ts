import { db } from "@/db";

import { userTable } from "@/db/schema";
import { totalCredit } from "@/db/schema";
import { retraitCredit } from "@/db/schema";
import { forfaits } from "@/db/schema";
import { credits } from "@/db/schema";

import { eq, sum, desc, asc, count, ne } from "drizzle-orm";

import { DateTime } from "luxon";

export const getUser = async (username: string) => {
  try {
    /**const user = await db.select().from(userTable).where(
        eq(userTable.username, username),
    );*/
    const user = await db.query.userTable.findMany({
      where: eq(userTable.username, username)
    })
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const getUserById = async (id : number ) => {
  try {
    const user = await db.query.userTable.findMany({
      where: eq(userTable.id, id)
    })
    return user[0];
  } catch (error) {
    throw new Error('Failed to fetch user.');
  }
}

export const getForfaitByUserId = async (id : number ) => {
  try {
    const forfaitUserId = await db.query.forfaits.findMany({
      where: eq(forfaits.userId, id),
      orderBy: [desc(forfaits.date)],
    })

    return forfaitUserId[0];
  } catch (error) {
    throw new Error('Failed to fetch user.');
  }
}

export const getCreditByForfaitId = async ( id : any ) => {
  try {
    const creditForfaitId = await db.query.credits.findMany({
      where: eq(credits.forfaitId, id),
    })
    return creditForfaitId[0];
  } catch (error) {
    throw new Error('Failed to fetch Credit.');
  }
}

export const countAllUsers = async (id: any) => {
  try {
    const countUser = await db.select({value: count()}).from(userTable).where(ne(userTable.id, id))

    const counted = countUser.map(user => user.value)

    return {
      value: counted,
    }
  } catch (error) {
    throw new Error('Failed to fetch user.');
  }
}

export const countedUserByDate = async () => {
  try {
    const countUserToday = await db.select({
      createdAt : userTable.createdAt,
    }).from(userTable)
    
    const counted = countUserToday.map((user) => {
      const date = DateTime.fromJSDate(user.createdAt, { zone: 'Africa/Libreville' }).toFormat('yyyy-MM-dd')
      const equal = date === DateTime.now().toFormat('yyyy-MM-dd')
      //if (equal) {
        //array.push(date)
      //}
      return equal;
    })
    //if (counted.length > 0) {
//array.push(counted.filter(Boolean).length)
    //}
    return counted.length ?? 'Aucun ajout aujourd\'hui';
  } catch (error) {
    throw new Error('Failed to fetch counted user by date.');
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

export const countedForfaitByDate = async () => {
  try {
    const countForfaitToday = await db.select({
      date : forfaits.date,
    }).from(forfaits)

    const counted = countForfaitToday.map((forfait) => {
      const date = DateTime.fromJSDate(forfait.date, { zone: 'Africa/Libreville' }).toFormat('yyyy-MM-dd')
      const equal = date === DateTime.now().toFormat('yyyy-MM-dd')
      //if (equal) {
        //array.push(date)
      //}
      return equal;
    })
    //if (counted.length > 0) {
//array.push(counted.filter(Boolean).length)
    //}
    return counted.length ?? 'Aucun ajout aujourd\'hui';
  } catch (error) {
    throw new Error('Failed to fetch counted user by date.');
  }
}

export const countAllCredits = async () => {
  try {
    const countCredit = await db.select({ value : sum(totalCredit.total_credit) }).from(totalCredit)
    const counted = countCredit.map(total_credit => total_credit.value === null ? 0 : total_credit.value)
    return counted;
  } catch (error) {
    throw new Error('Failed to fetch All credit.');
  }
}

export const countedAllCreditByDate = async () => {
  try {
    const countCredit = await db.select({ value : sum(credits.credit) }).from(credits)
    const counted = countCredit.map(credit => credit.value === null ? 0 : credit.value)
    return counted;
  } catch (error) {
    throw new Error('Failed to fetch counted all credit by date.')
  }
}

export const sumRetraitCredit = async () => {
  try {
    const sumRetrait = await db.select({ value: sum(retraitCredit.quantity) }).from(retraitCredit)
    const summed = sumRetrait.map(retrait => retrait.value === null ? 0 : retrait.value);
    
    return summed;
  } catch (error) {
    throw new Error('Failed to fetch All retrait credit.')
  }
}

export const countedRetraitByDate = async () => {
  try {
    const countRetraitToday = await db.select({
      date : retraitCredit.date,
    }).from(retraitCredit)

    const counted = countRetraitToday.map((retrait) => {
      const date = DateTime.fromJSDate(retrait.date, { zone: 'Africa/Libreville' }).toFormat('yyyy-MM-dd')
      const equal = date === DateTime.now().toFormat('yyyy-MM-dd')
      //if (equal) {
        //array.push(date)
      //}
      //return equal;
    })
    //if (counted.length > 0) {
//array.push(counted.filter(Boolean).length)
    //}
    return counted.length ?? 'Aucun ajout aujourd\'hui';
  } catch (error) {
    throw new Error('Failed to fetch counted user by date.');
  }
}

export const getUniqueTotalCredit = async ( user : any ) => {
  try {
    const getCredit = await db.select().from(totalCredit).where(eq(totalCredit.userId, user.id))
    
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

export const getLastWithDraw = async ( id : number ) => {
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

    if (!lastWithdraw){
      return null;
    }

    const result = lastWithdraw.map( item => {
      try {
        // Get time of last withdraw this client
        const formattedDate = DateTime.fromJSDate(item.date, { zone: 'Africa/Libreville' })
        // parse this tims in millisecond
        //const parseInMillis = formattedDate.toMillis();

        // Get date today
        const toDay = DateTime.local({ zone: 'Africa/Libreville' });
        // parse today in millisecond
        //const zoneToday = toDay.toMillis();

        // Get difference between today and last withdraw
        const diffTimeByLuxon = toDay.diff(formattedDate);

        // Verify if the difference is less than 24 hours
        const allowWithdraw = diffTimeByLuxon.as('milliseconds') < 86400000;
        
        return {
          allowWithdraw,
          quantity: item.quantity,
        };
      } catch (error) {
        throw new Error('Erreur de formatage de date');
      }
    })
    
    return result[0]
  } catch (error) {
    throw new Error('Erreur lors de la récupération du dernier retrait.');
  }
};