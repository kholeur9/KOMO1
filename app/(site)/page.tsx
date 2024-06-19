import { Header } from "@/features/site/header";
import { BadgeCredits } from "@/features/site/badge";
import { Badge } from "@/components/ui/badge"

import { auth } from "@/auth";


export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col gap-2.5">
      <Header />
      <section className="flex items-center justify-between px-6">
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-500">Numéro {session?.user?.role} : {session?.user?.id}</span>
          <span className="text-md text-white">{session?.user?.name}</span>
        </div>
        <BadgeCredits session={session} />
      </section>
    </div>
  );
}
