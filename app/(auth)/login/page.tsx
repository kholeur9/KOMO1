import { Login } from "@/features/auth/login";
import Image from "next/image";

export default function LoginPage() {
  return (
    <>
    <div className="absolute bottom-0 right-6">
      <p className="text-white text-[9px]">
        <a href="#">
          Powered by Prima-Tech
        </a>
      </p>
    </div>
    <div className="flex flex-col p-2.5 px-6 h-screen">
      <div className="flex flex-col">
        <div className="w-[50px] h-50px] rounded-full overflow-hidden">
          <Image src="/logo.jpeg" alt="KOMO1" width={100} height={100} className="w-full" />
        </div>
        <h1 className="text-[30px] font-bold tracking-tight text-white sm:text-4xl md:text-4xl">
          Bienvenue sur komo1
        </h1>
        <p className="mt-0.5 max-w-md text-md text-white sm:text-xl md:mt-0.5 md:text-xl md:max-w-3xl">
            Echanger vos crédits en forfait internet.
        </p>
      </div>
      <Login />
    </div>
    </>
  )
}