import { Badge } from "@/components/ui/badge";

interface BadgeCreditsProps {
  all_credit: any;
}

export const BadgeCredits = async ({ all_credit } : BadgeCreditsProps) => {

  return (
    <Badge variant="destructive" className="flex gap-1.5 text-md rounded-lg bg-[#036394]">
      <span>{all_credit?.total_credit}</span>
      <span>crédits</span>
    </Badge>
  )
}