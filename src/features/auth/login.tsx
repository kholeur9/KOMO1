"use client"

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Loader } from "@/components/ui/loader"

import { FormSchema } from "@/secure/number";
import { FormError } from "@/features/auth/form-error";
import { FormSuccess } from "@/features/auth/form-success";

import { authenticate } from '@/actions/login';

export const Login = ( { admin } : { admin : string }) => {
  //const router = useRouter();

  const [ success, setSuccess ] = useState<string>("");
  const [ error, setError ] = useState<string>("");
  const [ typeLogin, setTypeLogin ] = useState()
  const [ isPending, startTransition ] = useTransition()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password_hash: admin === 'admin' ? '' : '1234',
    },
  })

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      authenticate(values)
        .then((data) => {
        if (data && data.error) {
          setError(data.error);
        }
      })
    });
  }

  return (
    <div className="h-2/3 flex flex-col items-center justify-center py-3.5">
      <main className="w-full h-full flex flex-col items-center justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <div className="">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      {admin === 'admin' && 'Identifiant'}
                      {admin === 'client' && 'Numéro'}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        disabled={isPending}
                        placeholder={admin === 'admin' ? 'Identifiant' : '07*******'}
                        {...field}
                        className="w-full h-[50px] outline-none text-md bg-[#1C2333] border-transparent text-white"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />        
                    {admin !== 'admin' ? (
                      <FormDescription className="text-white text-sm">
                        Le numéro ne sera validé que si il a une historique d'achat de forfait internet via Komo1.
                      </FormDescription>
                    ) : <FormDescription>Entrer votre identifiant d'administrateur</FormDescription>}
                  </FormItem>
                )}
              />
            </div>
            {admin === 'admin' && (
              <FormField
                control={form.control}
                name="password_hash"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="****"
                        {...field}
                        className="w-full h-[50px] outline-none text-md bg-[#1C2333] border-transparent text-white"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />       
                  </FormItem>
                )}
              />
            )}
            <FormError message={error} />
            <Button disabled={isPending} type="submit" className="w-full h-[48px] bg-[#0390D0] hover:bg-[#036394]">
              {isPending ? 
              <div className="flex items-center">
                <Loader className="mr-2 h-6 w-6"/>
                vérification du numéro
              </div>
               : "valider"}
            </Button>
          </form>
        </Form>
      </main>
    </div>
  )
}