import { validateRequest } from "@/data/current-user";
import { userTotalCredit } from "@/data/user";
import { BadgeCredits } from "@/features/site/badge";

export const HeaderInfo = async () => {
  const { user } = await validateRequest();
  const all_credit = user ? await userTotalCredit(user?.id) : 0;
  
  return (
    <section className="flex items-center justify-between px-6">
      <div className="flex flex-col items-center">
        <span className="text-xs text-gray-500">Numéro {user?.role} : {user?.id}</span>
        <span className="text-md text-white">{user?.username}</span>
      </div>
      <BadgeCredits all_credit={all_credit} />
    </section>
  )
}