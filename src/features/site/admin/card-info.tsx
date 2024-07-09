import clsx from "clsx";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardInfoProps {
  title: string;
  description: string;
  footer?: number | string;
  children: React.ReactNode;
  colorContent: string;
  icon?: React.ReactNode;
}


export const CardInfo = ( { title, description, footer, children, colorContent, icon } : CardInfoProps ) => {
  return (
    <Card className="bg-[#2A3E54] border-transparent">
      <CardHeader>
        <CardTitle className={`${colorContent} flex items-center text-sm justify-between`}>
          {title}
          {icon}
        </CardTitle>
        <CardDescription className="text-xs text-gray-400">
            {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className={clsx(`text-2xl font-[700]`, colorContent)}>{children}</p>
      </CardContent>
      <CardFooter>
        <p className="text-white text-xs">{footer}</p>
      </CardFooter>
    </Card>
  )
}