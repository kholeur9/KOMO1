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

import { Toaster } from 'sonner';
import { toast } from 'sonner';

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
  const [ success, setSuccess ] = useState<boolean>(false);
  const [ error, setError ] = useState<boolean>(false);

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
    setSuccess(false)
    setError(false)

    startTransition(() => {
      ConvertCredit(values)
        .then(data => {
          if (data && data.error){
            toast.error(data.error)
            setError(true)
          } else if (data && data.success) {
            toast.success(data.success)
            setSuccess(true)
          }
        })
      
      onSubmit(formData);
    })
  }

  return (
      <div className={clsx(`w-full flex flex-row items-center justify-between px-2.5 py-2.5 bg-[#90CAF9] rounded-md`)}>
        <Toaster expand={true} position="top-right" richColors />
        <div>
          <span className="text-[13px] text-[#036394] font-[700]">Echanger <span className="ml-1 mr-1 font-[900]">{withdraw}</span>crédits pour<span className="ml-1 font-[900]">{quantity} Mo</span></span>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(creditSubmit)}>
            <Button disabled={isPending} type="submit" className={clsx(`w-full h-[25px] ${error ? "bg-red-300" : "bg-[#0390D0]"} hover:bg-[#036394]`)}>
              {isPending ? 
              <div className="flex items-center">
                <Loader className="mr-3 h-4 w-4"/>
                traitement
              </div>
               : (error ? "échec" : "valider")}
            </Button>
          </form>
        </Form>
      </div>
  )
}