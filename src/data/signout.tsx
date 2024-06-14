import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { GoSignOut } from "react-icons/go";

export const SignOut = () => {
  return (
    <div className="flex items-center">
      <form action={async () => {
        "use server";

        await signOut();
      }}>
        <Button size="icon" type="submit" className="flex gap-1.5 font-800 rounded-full bg-gray-800 w-auto w-[35px] h-[35px]">
          <GoSignOut size={20} />
        </Button>
      </form>
    </div>
  )
}