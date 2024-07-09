import { Menu, SubMenu } from "@/features/site/menu";

/** interface MenuClientProps {
  session: any;
}*/

import { validateRequest } from "@/data/current-user";

export const MenuClient = async () => {
  const { user } = await validateRequest();
  return (
    <>
      <Menu
        className="hover:border-orange-500"
        href={`/retrait/${user?.id}`}
        description={'Cliquer et convertisser vos crédits en forfaits.'}
        header={'Retrait de crédits'}
        >
        <i className="fi fi-rr-bonus-star text-orange-500"></i>
      </Menu>
      <Menu
        className="hover:border-blue-500"
        href={`/historique/${user?.id}`}
        description={'Cliquer et regarder votre historique de retraits.'}
        header={'Historique'}
        >
        <i className="fi fi-sr-daily-calendar text-blue-500"></i>
      </Menu>
      <h2 className="font-[600] text-lg text-white mt-2">Pour vous</h2>
      <div className="w-full grid grid-cols-2 gap-2.5">
        <SubMenu
          className="hover:border-green-300"
          href={`/membre/${user?.id}`}
          header={'Membre'}
          description={'Cliquer et devenez membre.'}
          >
          <i className="fi fi-sr-heart-partner-handshake text-green-300"></i>
        </SubMenu>
        <SubMenu
          className="hover:border-red-500"
          href={'/aide'}
          header={'Aide'}
          description={'Cliquer et dites nous comment vois aider.'}
          >
          <i className="fi fi-ss-user-headset text-red-500"></i>
        </SubMenu>
      </div>
    </>
  )
}