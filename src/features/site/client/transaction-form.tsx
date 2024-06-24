"use client";

import { clsx } from "clsx";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

import { useState, useTransition } from 'react';
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { FormSuccess } from "@/features/auth/form-success";
import { FormError } from "@/features/auth/form-error";

import { Loader } from "@/components/ui/loader";

import { ConvertCredit } from "@/actions/convert-credit";
import { convertCreditSchema } from "@/secure/credit";

interface TransactionFormProps {
  onSubmit: (formData : { withdraw: number, quantity: string }) => void;
  withdraw: number;
  quantity: string;
  numero: string;
  ci: string;
  total: number;
}

export const TransactionForm = ({ onSubmit, withdraw, quantity, numero, ci, total } : TransactionFormProps ) => {
  const [ formData, setormData ] = useState({ withdraw: 0, quantity: '' });
  const [ isPending, startTransition ] = useTransition();
  const [ success, setSuccess ] = useState<string>("");
  const [ error, setError ] = useState<string>("");

  const form = useForm<z.infer<typeof convertCreditSchema>>({
    resolver: zodResolver(convertCreditSchema),
    defaultValues: {
      withdraw: withdraw,
      quantity: quantity,
      numero: numero,
      ci: ci,
      total: total,
    }
  })

  const creditSubmit = (values: z.infer<typeof convertCreditSchema>) => {
    setSuccess("")
    setError("")

    startTransition(() => {
      ConvertCredit(values)
        .then(data => {
          if (data && data.error){
            setError(data.error)
          } else if (data && data.success) {
            setSuccess(data.success)
          }
        })
      
      onSubmit(formData);
    })
  }

  return (
      <div className={clsx(`w-full flex ${error ? `flex-col` : `flex-row`} items-center justify-between px-2.5 py-2.5 bg-[#90CAF9] rounded-md`)}>
        <div>
          <span className="text-[13px] text-[#036394] font-[700]">Echanger <span className="ml-1 mr-1 font-[900]">{withdraw}</span>crédits pour<span className="ml-1 font-[900]">{quantity} Mo</span></span>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(creditSubmit)}>
            {success ? ( <FormSuccess message={success} />) : error ? ( <FormError message={error} /> ) : ( <Button disabled={isPending} type="submit" className="w-full h-[25px] bg-[#0390D0] hover:bg-[#036394]">
              {isPending ? 
              <div className="flex items-center">
                <Loader className="mr-2 h-4 w-4"/>
                convertion
              </div>
               : "valider"}
            </Button>)}
          </form>
        </Form>
      </div>
  )
}