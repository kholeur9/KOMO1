'use client';

import { Credit } from "@/features/site/client/credit";


export const CreditMenu = ({ session, all_credit } : { session : any, all_credit : any }) => {
  return (
    <>
    <Credit withdraw={50} quantity={'100'} value={"item-2"} idx={'c1'} numero={session?.user?.name} ci={session?.user?.id} total={all_credit?.total_credit} />
     <Credit withdraw={75} quantity={'150'} value={"item-2"} idx={'c2'} numero={session?.user?.name} ci={session?.user?.id} total={all_credit?.total_credit} />
      <Credit withdraw={100} quantity={'200'} value={"item-3"} idx={'c3'} numero={session?.user?.name} ci={session?.user?.id} total={all_credit?.total_credit} />
      <Credit withdraw={125} quantity={'250'} value={"item-4"} idx={'c4'} numero={session?.user?.name} ci={session?.user?.id} total={all_credit?.total_credit} />
      <Credit withdraw={150} quantity={'300'} value={'item-5'} idx={'c5'} numero={session?.user?.name} ci={session?.user?.id} total={all_credit?.total_credit} />
      <Credit withdraw={175} quantity={'350'} value={'item-6'} idx={'c6'} numero={session?.user?.name} ci={session?.user?.id} total={all_credit?.total_credit} />
      <Credit withdraw={200} quantity={'400'} value={'item-7'} idx={'c7'} numero={session?.user?.name} ci={session?.user?.id} total={all_credit?.total_credit} />
    </>
  )
}