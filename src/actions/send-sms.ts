'use server';

import { revalidatePath } from "next/cache";

export const sendSms = async ( message: any ) => {
  
  try{
    //const api_key = process.env.API_TECH_KEY;
    const api_key = process.env.API_AVLY_TEXT_KEY;

    const response = await fetch(`https://api.avlytext.com/v1/sms?api_key=${api_key}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        //'action': 'send-sms',
        'api_key': api_key,
        'recipient': '24174871292',
        'sender': 'MyApp',
        'text': message,
      })
    });
    const data = await response.json();
    console.log('Response data:', data);
    if (data.message && data.message.includes('Insufficient balance')) {
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Action Send Sms ::: Erreur lors de l\'envoi du SMS : ', error);
  }
}