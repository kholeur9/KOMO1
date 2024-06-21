import { HeaderClient } from "@/features/site/client/header";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <HeaderClient />
      {children}
    </div>
  );
}
