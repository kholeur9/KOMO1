import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { users } from "@/db/schema";
import { credits } from "@/db/schema";
import { eq, sum, asc, sql } from "drizzle-orm";

import { getTotalCredit } from "@/actions/total-credit";

type BadgeCreditsProps = {
  session: any;
  item: any;
  id: any;
}

const getCredit = (user) => {
  const credit = db.select({
    id: users.id,
    name: users.name,
    role: users.role,
    credit: sum(credits.credit),
  })
    .from(users)
    .where(eq(user.id, credits.userId))
    .leftJoin(credits, eq(users.id, credits.userId))
    .groupBy(users.id)

  return credit;
}

export const BadgeCredits = async ({ session } : BadgeCreditsProps) => {
  const credits = await getCredit(session?.user);

  credits.forEach(async (item) => {
    await getTotalCredit(item);
  })
  
  return (
    <Badge variant="destructive" className="flex gap-0.5 text-md rounded-lg bg-[#036394]">
      {credits.map((item) => (
        <span key={item.id}>
          {item.credit}
        </span>
      ))}
      <span>crédits</span>
    </Badge>
  )
}