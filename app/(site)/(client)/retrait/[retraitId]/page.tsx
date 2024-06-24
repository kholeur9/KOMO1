import { CreditMenu } from "@/features/site/client/credit-menu";
import { DashboardInfo } from "@/features/site/client/dashboard-info";

import { auth } from "@/auth";

import { userTotalCredit } from "@/data/user";

export default async function RetraitPage({
  params,
} : {
  params: any,
  retraitId: string;
}) {
  const session = await auth();
  const all_credit = session?.user ? await userTotalCredit(session.user.id) : null;
  console.log('all_credit', all_credit);
  
  return (
    <div className="flex flex-col py-0.5">
      
      <DashboardInfo all_credit={all_credit} session={session} />
      
      <section className="w-full flex flex-col items-center px-4 py-2 space-y-4">
        <h1 className="w-full flex items-center text-gray-200 text-md font-[600] gap-2">Crédit</h1>
        <div className="w-full grid grid-cols-1 gap-2.5">
          <CreditMenu all_credit={all_credit} session={session} />
        </div>
      </section>
      
    </div>
  )
}