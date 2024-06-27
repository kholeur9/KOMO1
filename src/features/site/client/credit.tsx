'use client';

import { useState } from 'react';
import { ChevronDown } from "lucide-react"

interface CreditProps {
  idx: string;
  withdraw: number;
  lastQuantity: number;
  allowWithdraw: boolean;
  quantity: string;
  value: string;
  numero: string;
  ci: string;
  total: number;
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { TransactionForm } from "@/features/site/client/transaction-form";

export const Credit = ({ withdraw, lastQuantity, allowWithdraw, quantity, value, idx, numero, ci, total } : CreditProps ) => {
  const [ activeAccordion, setActiveAccordion ] = useState<string | null>(null);

  const handleAccordionClick = ( accordionId: string ) => {
    setActiveAccordion(activeAccordion === accordionId ? null : accordionId);
  }

  const handleFormSubmit = (formData : { withdraw: number, quantity: string }) => {
    console.log('form submit', formData);
  }

  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={value}>
          <AccordionTrigger onClick={() => handleAccordionClick(idx)}>
            <div className="w-full h-[60px] px-1.5 py-1.5 flex gap-1.5 bg-[#2A3E54] rounded-md gap-2.5 overflow-hidden transition-all [&[data-state=open]>svg]:rotate-180">
              <span className="flex flex-row h-full justify-center items-center w-6 h-6 rounded-full">
                <i className="flex text-[15px] fi fi-rr-bonus-star text-gray-400"></i>
              </span>
              <div className="flex-1 flex flex-col items-start justify-between h-full gap-1.5">
                <span className="font-[600] text-gray-200 text-[14px]">{withdraw} crédits</span>
                {allowWithdraw && lastQuantity === withdraw ? (
      <p className="text-[10px] text-red-500 font-[600]">
        Ce retrait a été fait dans les 24 heures.
      </p>
                ) : (
      <p className="text-[10px] text-gray-200">
        {allowWithdraw && lastQuantity !== withdraw ? <span className="text-red-500 font-[600]">Indisponible</span> : 'Disponibilité' } : un retrait une fois par jour.
      </p>
                )}
              </div>
              <span className="flex flex-row h-full justify-center items-center gap-0.5">
                <span className="flex text-[12px] font-[600] gap-0.5 text-gray-300">{quantity} <span className="ml-0.5 text-[#0390D0]">Mo</span></span>
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
              </span>
            </div>
          </AccordionTrigger>
          {activeAccordion === idx && (
            <AccordionContent>
               <TransactionForm
                 withdraw={withdraw}
                 quantity={quantity}
                 numero={numero}
                 ci={ci}
                 total={total}
                 onSubmit={handleFormSubmit}
                />
            </AccordionContent>
          )}
        </AccordionItem>
      </Accordion>
    </>
  )
}