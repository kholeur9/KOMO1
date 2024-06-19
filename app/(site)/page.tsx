import Link from "next/link";

import { Header } from "@/features/site/header";
import { BadgeCredits } from "@/features/site/badge";
import { LayoutGrid } from 'lucide-react';

import { ToastAlert } from "@/features/site/unvailable";
import { MenuClient } from "@/features/site/menu-client";


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
      <section className="w-full flex flex-col items-center px-6 py-2 space-y-6">
        <h1 className="w-full flex items-center text-gray-200 text-xl font-[600] gap-2"><LayoutGrid className="h-[20px] w-[20px] text-blue-500" />Dashboard</h1>
        <div className="w-full grid grid-cols-1 gap-2.5">
          <MenuClient />
        </div>
      </section>
    </div>
  );
}
