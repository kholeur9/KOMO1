'use client';

import { useFormStatus } from 'react-dom';

import { Button } from "@/components/ui/button";
import { GoSignOut } from "react-icons/go";
import { Loader } from "@/components/ui/loader";


export const ButtonSignOut = () => {
  const { pending } = useFormStatus();
  
  return (
    <>
    {pending ? (
      <Button disabled={pending} size="default" className="flex gap-1.5 font-800 bg-gray-800 text-sm text-red-600 border-1 border border-red-500">
        <Loader className="h-4 w-4 mr-2"/>
        <span>déconnexion...</span>
      </Button>
    ) : (
      <Button size="icon" type="submit" className="flex gap-1.5 font-800 rounded-full bg-gray-800 w-auto w-[33px] h-[33px]">
        <GoSignOut size={18} />
      </Button>
    )}
    </>
  )
}