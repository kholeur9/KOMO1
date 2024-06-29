import { MainCard } from "@/features/site/admin/main-card";
import { NameSection } from "@/features/site/admin/name-section";

export default function AdminPage() {
  return (
    <>
      <NameSection name_section="Dashboard" />
      <MainCard />
    </>
  )
}