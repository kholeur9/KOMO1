import { NameSection } from "@/features/site/admin/name-section";
import { ExcelForm } from "@/features/site/admin/excel-form";

export default function RegisterDataPage() {
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