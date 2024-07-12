'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from "next/navigation";

import * as z from "zod";

import { fileSchema } from "@/secure/file-schema";

import { userTable } from "@/db/schema";
import { forfaits } from "@/db/schema";
import { credits } from "@/db/schema";
import { totalCredit } from "@/db/schema";
import { db } from "@/db";

import { getUser } from "@/data/user";
import { getForfaitByUserId } from "@/data/user";
//import { getCreditByForfaitId } from "@/data/user";
import { userTotalCredit } from "@/data/user";

import { eq } from "drizzle-orm";

export const uploadFile = async (value: z.infer<typeof fileSchema>) => {

  const validateFile = fileSchema.safeParse(value)
  if (!validateFile.success) {
    return {
      error: 'Erreur lors de la validation du fichier',
    }
  }

  const { file } = validateFile.data;

  try {
    for (let row of file) {
      
      let user = await getUser(row[0])

      if (!user) {
        const createdThisUser = await createUser(row[0])
        user = await getUser(row[0])

        const initializeTotalCredit = await db.insert(totalCredit).values({
          userId: createdThisUser.id,
          total_credit: 0,
        })
        if (!initializeTotalCredit) {
          console.log('Failed to create total credit')
        }
      }

      //console.log('user : ', user)

      await db.transaction(async (tx) => {

        // Créer le forfait pour cet utilisateur
        const insertedForfaitThisUser = await tx.insert(forfaits).values({
          userId: user.id,
          forfait: row[2]
        }).returning({
          id: forfaits.id,
          userId: forfaits.userId,
          forfait: forfaits.forfait,
        })
        /** console.log('insertedForfaitThisUser : ', { 
          id: insertedForfaitThisUser[0].id,
          userId: insertedForfaitThisUser[0].userId,
          forfait: insertedForfaitThisUser[0].forfait
        })*/
        if (!insertedForfaitThisUser) {
          console.log('Erreur lors de la création du forfait')
        }

        // Créer le crédit pour ce forfait : thisForfait * 0.07
        const thisForfaitId = insertedForfaitThisUser[0].id;
        const thisForfaitUserId = insertedForfaitThisUser[0].userId;
        const thisForfait = insertedForfaitThisUser[0].forfait;
        const calcul = Math.floor(thisForfait * 0.07)

        const insertedCreditThisForfait = await tx.insert(credits).values({
          userId: thisForfaitUserId,
          forfaitId: thisForfaitId,
          credit: calcul,
        }).returning({
          userId: credits.userId,
          forfaitId: credits.forfaitId,
          credit: credits.credit,
        })
        /**console.log('insertedCreditThisForfait : ', {
          userId: insertedCreditThisForfait[0].userId,
          forfaitId: insertedCreditThisForfait[0].forfaitId,
          credit: insertedCreditThisForfait[0].credit,
        })*/

        if (!insertedCreditThisForfait) {
          console.log('Erreur lors de la création du crédit')
        }

        // Mettre à jour le totalCredit de l'utilisateur
        const thisCreditUserId = insertedCreditThisForfait[0].userId;
        const thisCreditCredit = insertedCreditThisForfait[0].credit;
        
        const totalCreditThisUser = await userTotalCredit(thisCreditUserId)

        if (!totalCreditThisUser) {
          console.log('Erreur lors de la mise à jour.')
        }

        const updatedUserTotalCredit = await tx.update(totalCredit).set({
          total_credit: totalCreditThisUser.total_credit + thisCreditCredit
        }).where(eq(totalCredit.id, totalCreditThisUser.id)).returning({
          userId: totalCredit.userId,
          total_credit: totalCredit.total_credit,
        }) 
        /*console.log('totalCreditThisUser : ', {
          userId: updatedUserTotalCredit[0].userId,
          totalCredit: updatedUserTotalCredit[0].total_credit,
        })*/

        if (!updatedUserTotalCredit) {
          console.log('Erreur lors de la mise à jour du total credit.')
        }
      });
    }
  } catch (error) {
    console.log('Erreur lors de la transaction', error)
    throw new Error('Erreur lors du chargement du fichier Excel')
  }
  
  revalidatePath('/register-data')
  redirect('/admin')
}

async function createUser(username: string) {
  try {
    const result = await db.insert(userTable).values({
      username: username,
    }).returning({
      id: userTable.id,
      username: userTable.username,
    })
    return result[0]
  } catch (error) {
    console.log('Erreur lors de la création du compte', error)
    throw new Error('Erreur lors de la création du compte')
  }
}