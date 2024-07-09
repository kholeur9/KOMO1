import { HeaderClient } from "@/features/site/client/header";

import { Toaster } from "sonner";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <Toaster expand={true} position="top-right" richColors />
      <HeaderClient />
      {children}
    </div>
  );
}
