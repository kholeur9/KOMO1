import { Credit } from "@/features/site/client/credit";

export const CreditMenu = () => {
  return (
    <>
      <Credit withdraw={50} quantity={'100'} value={'item-1'} id={'c1'} />
      <Credit withdraw={75} quantity={'150'} value={"item-2"} id={'c2'} />
      <Credit withdraw={100} quantity={'200'} value={"item-3"} id={'c3'} />
      <Credit withdraw={125} quantity={'250'} value={"item-4"} id={'c4'} />
      <Credit withdraw={150} quantity={'300'} value={'item-5'} id={'c5'} />
      <Credit withdraw={175} quantity={'350'} value={'item-6'} id={'c6'} />
      <Credit withdraw={200} quantity={'400'} value={'item-7'} id={'c7'} />
    </>
  )
}