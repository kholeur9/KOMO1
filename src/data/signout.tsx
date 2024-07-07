import { ButtonSignOut } from "@/features/auth/button-sign-out";

import { logout } from "@/actions/logout"

export const SignOut = () => {
  return (
    <div className="flex items-center">
      <form action={logout}>
        <ButtonSignOut />
      </form>
    </div>
  )
}