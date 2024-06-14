import Image from "next/image";

import { SignOut } from "@/data/signout";

export const Header = ({ session }) => {
  return (
    <header className="flex flex-row items-center justify-between p-2.5 px-6 overflow-hidden">
      <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
        <Image src="/logo.jpeg" alt="KOMO1" width={100} height={100} className="w-full" />
      </div>
      <SignOut />
    </header>
  )
}