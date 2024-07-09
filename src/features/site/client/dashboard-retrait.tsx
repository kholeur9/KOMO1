import { Badge } from "@/components/ui/badge";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { getLastWithDraw } from "@/data/user";

interface DashboardProps {
  numero: string;
  total_credit: number;
  total_credit_id: number;
  credit_minimum: number;
}

export const Dashboard = async ({ numero, total_credit, total_credit_id, credit_minimum } : DashboardProps ) => {

  const lastWithdraw = await getLastWithDraw(total_credit_id);
  
  return (
    <section className="w-full flex flex-col items-center px-4 py-2 mb-6">
      <div className="relative h-[70px] flex flex-col w-full bg-[#2A3E54] p-2 rounded-md">
        <div className="w-full flex items-center justify-between gap-1.5 px-1.5">
          <div className="flex gap-1.5">
            <span className="text-[13px] text-white font-[600]">Numéro : </span>
            <p className="text-[13px] text-white font-[600]">{numero}</p>
          </div>
            {total_credit >= credit_minimum && !lastWithdraw?.allowWithdraw ? (
              <Badge className="bg-green-400 gap-1 text-emerald-700">
                <CheckCircledIcon className="w-4 h-4" />
                <span className="text-[12px] font-[600]">Echange Disponible</span>
              </Badge>
            ) : (
              <Badge variant="destructive" className="gap-1 text-red-200">
                <ExclamationTriangleIcon className="w-4 h-4" />
                <span className="text-[12px] font-[600]">Echange indisponible</span>
              </Badge>
            )}
        </div>
        <div className="w-full absolute bottom-[-30px] left-0 right-0 grid grid-cols-2 px-3 gap-2.5">
          <div className="flex flex-col h-auto bg-[#0390D0] justify-between p-1.5 rounded-lg">
            <span className="text-[13px] text-white text-start font-[500]">
              Crédits cumulés
            </span>
            <span className="text-[16px] text-white font-[600] text-end">
              {total_credit}
            </span>
          </div>
          <div className="flex flex-col h-auto bg-[#0390D0] justify-between p-1.5 rounded-lg">
            <span className="text-[13px] text-white text-start font-[500]">
              Crédits minimum à retirer
            </span>
            <span className="text-[16px] text-white font-[600] text-end">
              {credit_minimum}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}