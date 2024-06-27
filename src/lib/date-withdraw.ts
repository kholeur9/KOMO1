import { DateTime } from "luxon";

export const dateWithdraw = ( getDateWithdraw: any ) => {

  try {
    const formattedDate = DateTime.fromJSDate(getDateWithdraw, { zone: 'Africa/Libreville'})

    const clientWithdrawDate = formattedDate.toMillis();

    const today = DateTime.local().toMillis();

    const timeElapsed = today - clientWithdrawDate;

    console.log(`Time elapsed : ${timeElapsed}`);
  } catch (error) {
    console.error('Erreur de formatage de date', error)
    throw new Error('Formt de date invalide pour l\'élément récupéré.');
  }
}