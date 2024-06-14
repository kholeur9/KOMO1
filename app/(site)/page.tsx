import { Header } from "@/features/site/header";
import { Badge } from "@/components/ui/badge"

import { auth } from "@/auth"

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col gap-2.5">
      <Header session={session} />
      <section className="flex items-center justify-between px-6">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Numéro</span>
          <span className="text-lg text-white">{session?.user.email}</span>
        </div>
        <Badge variant="destructive" className="flex gap-0.5 text-lg rounded-lg bg-[#036394]">
          <span>0</span>
          <span>Crédit</span>
        </Badge>
      </section>
    </div>
  );
}
