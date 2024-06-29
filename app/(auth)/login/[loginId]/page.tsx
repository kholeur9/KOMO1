import { Login } from "@/features/auth/login";
import Image from "next/image";

export default function LoginPage({
  params,
} : {
  params: any,
  loginId: string;
}) {
  const admin = params.loginId === "admin";
  const client = params.loginId === "client";
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center py-1.5 gap-2.5  absolute bottom-[-10px] right-0 left-0">
        <div className="w-full flex items-center justify-center gap-6">
          <div className="flex items-center gap-1">
            <div className="w-[30px] h-30px] rounded-full overflow-hidden">
              <Image src="/logo.jpeg" alt="KOMO1" width={100} height={100} className="w-full" />
            </div>
            <p className="text-sm text-gray-400">Komo1</p>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-[30px] h-30px] rounded-full overflow-hidden">
              <Image src="/prima.jpeg" alt="PRIMA" width={100} height={100} className="w-full" />
            </div>
            <p className="text-sm text-gray-400">Prima-Tech</p>
          </div>
        </div>
        <div className="w-full flex items-center justify-center gap-2.5">
          <p className="text-white text-[9px] text-center">
            <a href="#">
            2024 Komo1 - Tous les droits réservés.
            </a>
          </p>
          <p className="text-white text-[9px] text-center">
            <a href="#">
              Powered and Secured by Prima-Tech.
            </a>
          </p>
        </div>
      </div>
      <div className="flex flex-col p-2.5 px-6 h-screen">
        <div className="flex flex-col">
          <div className="w-[50px] h-50px] rounded-full overflow-hidden">
            <Image src="/logo.jpeg" alt="KOMO1" width={100} height={100} className="w-full" />
          </div>
          <h1 className="text-[30px] font-bold tracking-tight text-white sm:text-4xl md:text-4xl">
            { admin && "Bienvenue Admin"}
            { client && "Bienvenue sur Komo1"}
          </h1>
          <p className="mt-0.5 max-w-md text-md text-white sm:text-xl md:mt-0.5 md:text-xl md:max-w-3xl">
            { params.loginId === 'admin' && "Connectez-vous pour accéder à votre espace administrateur."}
            { params.loginId === 'client' && "Echanger vos crédits en forfait internet."}
          </p>
        </div>
        <Login admin={admin} />
      </div>
    </>
  )
}