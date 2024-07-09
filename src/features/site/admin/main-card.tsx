import { CardInfo } from "./card-info";

import { validateRequest } from "@/data/current-user";
import { countAllUsers } from "@/data/user";
import { countAllForfaits } from "@/data/user";
import { countAllCredits } from "@/data/user";
import { sumRetraitCredit } from "@/data/user";
import { countedUserByDate } from "@/data/user";
import { countedForfaitByDate } from "@/data/user";
import { countedAllCreditByDate } from "@/data/user";
import { countedRetraitByDate } from "@/data/user";

export const MainCard = async () => {
  const forfaits = await countAllForfaits();
  const { user } = await validateRequest();
  const users = await countAllUsers(user?.id);
  const credits = await countAllCredits();
  const retraits = await sumRetraitCredit();
  const countedUser = await countedUserByDate();
  const countedForfait = await countedForfaitByDate();
  const countedAllCredit = await countedAllCreditByDate();
  const countedRetrait = await countedRetraitByDate();
  
  
  return (
    <section className="grid grid-cols-2 my-2.5 px-6 gap-2.5">
      <CardInfo
        title={'Client enregistré'}
        description={"Toute période"}
        colorContent={"text-orange-500"}
        icon={<i className="fi fi-rs-users text-[15px]"></i>}
        //footer={`+ ${countedUser}`}
      >
        {users.value}
      </CardInfo>
      <CardInfo
        colorContent={"text-[#3A86FF]"}
        title={"Transaction"}
        description={"Toute période"}
        icon={<i className="fi fi-rr-wallet-arrow text-[15px]"></i>}
        //footer={`+ ${countedForfait}`}
      >
        {forfaits}
      </CardInfo>
      <CardInfo
        colorContent={"text-red-500"}
        title={"Crédits en cours"}
        description={"Toute période"}
        icon={<i className="fi fi-bs-stopwatch text-[15px]"></i>}
        //footer={countedAllCredit}
      >
        {credits}
      </CardInfo>
      <CardInfo
        colorContent={"text-green-500"}
        title={"Retrait traîté"}
        description={"Toute période"}
        icon={<i className="fi fi-sr-checkbox text-[15px]"></i>}
        //footer={countedRetrait}
      >
        {retraits}
      </CardInfo>
    </section>
  )
}