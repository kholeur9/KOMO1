'use client';

import Link from 'next/link';
import clsx from 'clsx';

interface MenuProps {
  href: string;
  children: React.ReactNode;
  description: string;
  header: string;
  className: string;
}

interface SubMenuProps {
  children: React.ReactNode;
  description: string;
  header: string;
  onClick?: () => void;
  className: string;
}

export const Menu = ({ href, children, header, description, className } : MenuProps ) => {
  return (
    <Link href={href} className={clsx("h-[90px] bg-[#1C2333] p-2.5 rounded-md flex flex-row gap-3 items-start hover:border hover:border-1 hover:border-orange-500 border-box", className)}>
      <span className="text-[35px]">
        {children}
      </span>
      <div className="w-full flex flex-col gap-0.5 justify-center">
        <p className="text-white font-[600] text-lg">{header}</p>
        <p className="text-sm text-gray-500 text-start">{description}</p>
      </div>
    </Link>
  )
}

export const SubMenu = ({ children, header, description, onClick, className } : SubMenuProps ) => {
  
  return (
    <div onClick={onClick} className={clsx("h-auto border-box bg-[#1C2333] p-2.5 rounded-md flex flex-row gap-3 items-start hover:border hover:border-1 overflow-hidden hover:h-[110px]", className)}>
      <span className="text-[30px]">
        {children}
      </span>
      <div className="w-full flex flex-col gap-0.5 justify-center">
        <p className="text-white font-[600] text-lg">{header}</p>
        <p className="text-sm text-gray-500 text-start">{description}</p>
      </div>
    </div>
  )
}