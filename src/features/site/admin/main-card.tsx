import { CardInfo } from "./card-info";

import { getCurrentUser } from "@/data/current-user";
import { countAllUsers } from "@/data/user";
import { countAllForfaits } from "@/data/user";

export const MainCard = async () => {
  const forfaits = await countAllForfaits();
  const session = await getCurrentUser();
  const users = await countAllUsers(session?.id);
  
  return (
    <section className="grid grid-cols-2 my-2.5 px-6 gap-2.5">
      <CardInfo
        title={'Client enregistré'}
        description={"Toute période"}
        colorContent={"text-orange-500"}
        icon={<i class="fi fi-rs-users text-[12px]"></i>}
        footer="+200"
      >
        {users}
      </CardInfo>
      <CardInfo
        colorContent={"text-[#3A86FF]"}
        title={"Transaction"}
        description={"Toute période"}
        icon={<i class="fi fi-rr-wallet-arrow text-[12px]"></i>}
        footer={"+ 200"}
      >
        {forfaits}
      </CardInfo>
    </section>
  )
}