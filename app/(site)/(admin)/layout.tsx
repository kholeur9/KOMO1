import { HeaderAdmin } from "@/features/site/admin/header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <HeaderAdmin />
      {children}
    </div>
  );
}
