import { auth } from "@/auth";
//import { cache } from "react";

export const getCurrentUser = async () => {

  const session = await auth();
  
  const user = session?.user;

  return user;
}