import { NameSection } from "@/features/site/admin/name-section";
import { ExcelForm } from "@/features/site/admin/excel-form";

import { validateRequest } from "@/data/current-user";


import { redirect } from "next/navigation";

export default async function RegisterDataPage() {
  const { user } = await validateRequest();

  if (user?.role !== 'admin' || !user) {
    redirect('/login/admin');
  }
  
  return (
    <div className="flex flex-col gap-4">
      <NameSection 
        name_section="Gestion des données" 
        description="Téléverser les données dans la base de données"
      />
      <ExcelForm />
    </div>
  )
}