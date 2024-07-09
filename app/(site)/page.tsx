import Link from "next/link";

import { Header } from "@/features/site/header";
import { HeaderInfo } from "@/features/site/header-info";
import { LayoutGrid } from 'lucide-react';

import { MenuClient } from "@/features/site/menu-client";

import { validateRequest } from "@/data/current-user";

import { redirect } from "next/navigation";

export default async function Home() {
  const { user } = await validateRequest();

  if (user?.role === 'admin') {
    redirect('/admin');
  } else if (!user) {
    redirect('/login/client')
  }
  
  return (
    <div className="flex flex-col gap-2.5">
      <Header />
      <HeaderInfo />
      <section className="w-full flex flex-col items-center px-6 py-2 space-y-6">
        <h1 className="w-full flex items-center text-gray-200 text-xl font-[600] gap-2"><LayoutGrid className="h-[20px] w-[20px] text-blue-500" />Dashboard</h1>
        <div className="w-full grid grid-cols-1 gap-2.5">
          <MenuClient />
        </div>
      </section>
    </div>
  );
}
