import Image from "next/image";

import { SignOut } from "@/data/signout";

export const Header = () => {
  return (
    <header className="flex flex-row items-center justify-between p-2.5 px-6 overflow-hidden">
      <div className="w-[40px] h-[40px] rounded-lg overflow-hidden flex justify-center">
        <Image src="/logo.jpeg" alt="KOMO1" width={80} height={80} className="w-full" />
      </div>
      <SignOut />
    </header>
  )
}