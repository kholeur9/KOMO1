'use client';

import { useFormStatus } from 'react-dom';

import { Button } from "@/components/ui/button";
import { GoSignOut } from "react-icons/go";
import { Loader } from "@/components/ui/loader";


export const ButtonSignOut = () => {
  const { pending } = useFormStatus();
  
  return (
    <div className="flex flex-col items-center">
      <Button size="icon" type="submit" className="flex gap-1.5 font-800 rounded-full bg-gray-800 w-auto w-[30px] h-[30px]">
        {pending ? <Loader className="h-4 w-4" /> : <GoSignOut size={18} />}
      </Button>
      <span className="text-[9px] text-gray-300">
        {pending ? ('Déconnexion...') : 'Déconnexion'}
      </span>
    </div>
  )
}