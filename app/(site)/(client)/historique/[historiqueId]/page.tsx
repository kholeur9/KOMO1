//import { SignOut } from "@/data/signout";
import Link from "next/link";

import { validateRequest } from "@/data/current-user";
import { redirect } from "next/navigation";

interface HistoriquePageProps {
  params: { historiqueId: string };
}

export default async function HistoriquePage({
  params,
} : HistoriquePageProps) {

  const { user } = await validateRequest();
  
  if (user?.role === 'admin') {
    redirect('/admin');
  } else if (!user) {
    redirect('/login/client')
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold text-white">Historique: Client ID : {params.historiqueId}</h1>
      <p className="text-gray-300">
        Cette page est en cours de développement.
      </p>
      <Link className="flex items-center justify-center px-6 h-8 bg-blue-500 text-white mt-4 rounded-md" href="/">Retour</Link>
    </div>
  )
}