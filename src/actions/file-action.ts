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

  try {
    const { file } = validateFile.data;

    console.log('file : ', file[0])
    for (let row of file) {
      const user = await getUser(row[0])
      const conversion = parseInt(row[2], 10)
      const calcul = Math.floor(conversion * 0.07)

      if (user) {
        try {
          const fofaitInserted = await db.insert(forfaits).values({
            userId: user.id,
            forfait: row[2],
          })
          
          const forfaitId = await getForfaitByUserId(user.id);
          
          if (fofaitInserted) {
            const creditCreated = await db.insert(credits).values({
              userId: user.id,
              forfaitId: forfaitId.id,
              credit: calcul,
            })

            const getUniqueTotalcredit = await userTotalCredit(user.id)
            
            if (creditCreated) {
              await db.update(totalCredit).set({
                total_credit: getUniqueTotalcredit.total_credit + calcul,
              }).where(eq(totalCredit.id, getUniqueTotalcredit.id))
            }
          }

          continue;
        } catch (error) {
          console.log('Erreur lors de l\'insertion des forfaits', error)
          throw new Error('Erreur lors de l\'insertion des données')
        }
      } else {
        // créer l'utilisateur
        try {
          const createdUser = await db.insert(userTable).values({
            username: row[0],
          })

          // créer le forfait
          const createdUserWithId = await getUser(row[0])
          if (createdUser) {
            const forfaitCreated = await db.insert(forfaits).values({
              userId: createdUserWithId.id,
              forfait: row[2],
            })

            // créer le crédit
            const forfaitCreatedWithId = await getForfaitByUserId(createdUserWithId.id)
            if (forfaitCreated) {
              const creditCreated = await db.insert(credits).values({
                userId: createdUserWithId.id,
                forfaitId: forfaitCreatedWithId.id,
                credit: calcul,
              })

              if (creditCreated) {
                await db.insert(totalCredit).values({
                  userId: createdUserWithId.id,
                  total_credit: calcul,
                })
              }
            }
          }
          continue;
        } catch (error) {
          console.log('Erreur lors de la création de l\'utilisateur', error)
          throw new Error('Erreur lors de la création de l\'utilisateur')
        }
      }
    }

  } catch (error) {
    throw new Error('Erreur lors du chargement du fichier Excel')
  }

  revalidatePath('/register-data')
  redirect('/admin')
}