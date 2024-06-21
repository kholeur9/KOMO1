"use client";

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

import { Loader } from "@/components/ui/loader";

import { ConvertCredit } from "@/actions/convert-credit";
import { convertCreditSchema } from "@/secure/credit";

interface TransactionFormProps {
  onSubmit: (formData : { withdraw: number, quantity: string }) => void;
  withdraw: number;
  quantity: string;
}

export const TransactionForm = ({ onSubmit, withdraw, quantity} : TransactionFormProps ) => {
  const [ formData, setormData ] = useState({ withdraw: 0, quantity: '' });
  const [ isPending, startTransition ] = useTransition();
  const [ success, setSuccess ] = useState<string>("");

  const form = useForm<z.infer<typeof convertCreditSchema>>({
    resolver: zodResolver(convertCreditSchema),
    defaultValues: {
      withdraw: withdraw,
      quantity: quantity,
    }
  })

  const creditSubmit = (withdraw: z.infer<typeof convertCreditSchema>) => {
    setSuccess("")

    startTransition(() => {
      ConvertCredit({ withdraw, quantity });
    })
  }
  
  return (
      <div className="w-full flex flex-row items-center justify-between px-2.5 py-2.5 bg-[#90CAF9] rounded-md">
        <div>
          <span className="text-[13px] text-[#036394] font-[700]">Echanger <span className="ml-1 mr-1 font-[900]">{withdraw}</span>crédits pour<span className="ml-1 font-[900]">{quantity} Mo</span></span>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(creditSubmit)}>
            <FormField
              control={form.control}
              name="withdraw"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      disabled={isPending}
                      {...field}
                      className="hidden h-[50px] outline-none text-md bg-[#1C2333] border-transparent text-white"
                      type="number"
                    />
                  </FormControl>
                  <FormMessage FormSuccess={success} />
                </FormItem>
              )}
            />
            {success ? <FormSuccess message={success} /> : <Button disabled={isPending} type="submit" className="w-full h-[25px] bg-[#0390D0] hover:bg-[#036394]">
              {isPending ? 
              <div className="flex items-center">
                <Loader className="mr-2 h-4 w-4"/>
                convertion
              </div>
               : "valider"}
            </Button>}
          </form>
        </Form>
      </div>
  )
}