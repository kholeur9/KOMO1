import { MainCard } from "@/features/site/admin/main-card";
import { NameSection } from "@/features/site/admin/name-section";

import { redirect } from "next/navigation";
import { validateRequest } from "@/data/current-user";

export default async function AdminPage() {
  const { user } = await validateRequest();

  if (user?.role !== 'admin') {
    redirect('/');
  }
  
  return (
    <>
      <NameSection name_section="Dashboard" />
      <MainCard />
    </>
  )
}