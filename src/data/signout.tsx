import { signOut } from "@/auth";
import { ButtonSignOut } from "@/features/auth/button-sign-out";

export const SignOut = () => {
  return (
    <div className="flex items-center">
      <form action={async () => {
        "use server";

        await signOut();
      }}>
        <ButtonSignOut />
      </form>
    </div>
  )
}