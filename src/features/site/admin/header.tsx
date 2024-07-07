import { validateRequest } from "@/data/current-user";
import { SignOut } from "@/data/signout";
import Link from "next/link";

export const HeaderAdmin = async () => {
  const { user } = await validateRequest();
  
  return (
    <header>
      <div className="px-6 navbar bg-[#0E1525]">
          <div className="gap-4 navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn text-white btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <Link href="/admin" className="text-white">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href={"/register-data"} className="text-white">
                    Gestion des données
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white">
                    Reclamation
                  </Link>
                </li>
              </ul>
            </div>
          <p className="ml-0.5 text-white text-lg">{user?.username}</p>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a>Item 1</a></li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </details>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        <div className="navbar-end">
          <SignOut />
        </div>
      </div>
    </header>
  )
}