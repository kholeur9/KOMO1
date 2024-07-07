'use server';

import { revalidatePath } from 'next/cache';

import * as z from "zod";
import * as fs from "fs/promises";

import * as XLSX from "xlsx";

import { fileSchema } from "@/secure/file-schema";
//import { sendData } from "@/lib/excel";

import { users } from "@/db/schema";
import { forfaits } from "@/db/schema";
import { credits } from "@/db/schema";
import { db } from "@/db";

import { getUser } from "@/data/user";
import { getForfaitByUserId } from "@/data/user";

import { DateTime } from "luxon";

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
            await db.insert(credits).values({
              userId: user.id,
              forfaitId: forfaitId.id,
              credit: calcul,
            })
          }

          continue;
        } catch (error) {
          console.log('Erreur lors de l\'insertion des forfaits', error)
          throw new Error('Erreur lors de l\'insertion des données')
        }
      } else {
        // créer l'utilisateur
        try {
          const createdUser = await db.insert(users).values({
            username: row[0],
          })

          // créer le forfait
          const createdUserWithId = await getUser(row[0])

          const forfaitCreated = await db.insert(forfaits).values({
            userId: createdUserWithId.id,
            forfait: row[2],
          })

          // créer le crédit
          const forfaitCreatedWithId = await getForfaitByUserId(createdUserWithId.id)
          const creditCreated = await db.insert(credits).values({
            userId: createdUserWithId.id,
            forfaitId: forfaitCreatedWithId.id,
            credit: calcul,
          })
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
}