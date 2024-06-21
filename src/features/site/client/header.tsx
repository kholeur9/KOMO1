import { SignOut } from "@/data/signout";
import Link from "next/link";

export const HeaderClient = () => {
  return (
    <div className="w-full flex items-center justify-between p-2.5 px-6 overflow-hidden">
      <div className="flex flex-row items-center justify-center py-0.5">
        <Link href="/" className="flex flex-row gap-0.5 h-full justify-center items-center mr-2.5 bg-gray-300 rounded-full px-0.5 py-0.5">
          <i className="flex text-[25px] fi fi-ss-arrow-circle-left text-gray-800"></i>
          <span className="text-gray-800 text-[9px]">Dashboard</span>
        </Link>
        <h1 className="text-lg text-gray-400 font-[600]">Retrait</h1>
      </div>
      <SignOut />
    </div>
  )
}