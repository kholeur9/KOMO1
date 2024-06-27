'use client';

import { Credit } from "@/features/site/client/credit";


export const CreditMenu = ({ session, all_credit, lastQuantity } : { session : any, all_credit : any, lastQuantity: any }) => {
  return (
    <>
    <Credit withdraw={50} quantity={'100'} lastQuantity={lastQuantity.quantity} allowWithdraw={lastQuantity.allowWithdraw} value={"item-2"} idx={'c1'} numero={session.name} ci={session.id} total={all_credit.total_credit} />
     <Credit withdraw={75} lastQuantity={lastQuantity.quantity} allowWithdraw={lastQuantity.allowWithdraw} quantity={'150'} value={"item-2"} idx={'c2'} numero={session.name} ci={session.id} total={all_credit?.total_credit} />
      <Credit withdraw={100} lastQuantity={lastQuantity.quantity} allowWithdraw={lastQuantity.allowWithdraw} quantity={'200'} value={"item-3"} idx={'c3'} numero={session.name} ci={session.id} total={all_credit?.total_credit} />
      <Credit withdraw={125} lastQuantity={lastQuantity.quantity} allowWithdraw={lastQuantity.allowWithdraw} quantity={'250'} value={"item-4"} idx={'c4'} numero={session.name} ci={session.id} total={all_credit?.total_credit} />
      <Credit withdraw={150} lastQuantity={lastQuantity.quantity} allowWithdraw={lastQuantity.allowWithdraw} quantity={'300'} value={'item-5'} idx={'c5'} numero={session.name} ci={session.id} total={all_credit?.total_credit} />
      <Credit withdraw={175} lastQuantity={lastQuantity.quantity} allowWithdraw={lastQuantity.allowWithdraw} quantity={'350'} value={'item-6'} idx={'c6'} numero={session.name} ci={session.id} total={all_credit?.total_credit} />
      <Credit withdraw={200} lastQuantity={lastQuantity.quantity} allowWithdraw={lastQuantity.allowWithdraw} quantity={'400'} value={'item-7'} idx={'c7'} numero={session.name} ci={session.id} total={all_credit?.total_credit} />
    </>
  )
}