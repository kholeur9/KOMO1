import Link from "next/link"

import { CreditMenu } from "@/features/site/client/credit-menu";

export default function RetraitPage({
  params,
} : {
  params: any,
  retraitId: string;
}) {
  return (
    <div className="flex flex-col py-0.5">
      <section className="w-full flex flex-col items-center px-4 py-2 mb-6">
        <div className="relative h-[70px] flex flex-col w-full bg-[#2A3E54] p-2 rounded-md">
          <span className="text-[9px] text-gray-400">Client ID : {params?.retraitId}</span>
          <span className="text-[13px] text-white font-[600]">Retrait crédit pour 074937413</span>
          <div className="w-full absolute bottom-[-30px] left-0 right-0 grid grid-cols-2 px-3 gap-2.5">
            <div className="flex flex-col h-auto bg-[#0390D0] justify-between p-1.5 rounded-lg">
              <span className="text-[13px] text-white text-start font-[500]">
                Crédits cumulés
              </span>
              <span className="text-[14px] text-white font-[600] text-end">
                100
              </span>
            </div>
            <div className="flex flex-col h-auto bg-[#0390D0] justify-between p-1.5 rounded-lg">
              <span className="text-[13px] text-white text-start font-[500]">
                Crédits minimum à retirer
              </span>
              <span className="text-[14px] text-white font-[600] text-end">
                50
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full flex flex-col items-center px-4 py-2 space-y-4">
        <h1 className="w-full flex items-center text-gray-200 text-md font-[600] gap-2">Crédit</h1>
        <div className="w-full grid grid-cols-1 gap-2.5">
          <CreditMenu />
        </div>
      </section>
    </div>
  )
}