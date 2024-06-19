'use server';

import { db } from "@/db";
import { totalCredit } from "@/db/schema";
import { credits } from "@/db/schema";
import { sum, eq, sql } from "drizzle-orm";

import { getUniqueTotalCredit } from "@/data/user";

export async function getTotalCredit(user: any) {
  console.log(`Looking for user : ${user.id}`);
  try {
    
    const existTotalCredit = await getUniqueTotalCredit(user);

    if (!existTotalCredit){
      await db.insert(totalCredit).values({
        userId: user.id,
        total_credit: user.credit
      })
    }

    await db.update(totalCredit).set({
      total_credit: user.credit
    }).where(eq(totalCredit.userId, user.id))
    
    
  } catch (error) {
    console.log(error);
  }
}