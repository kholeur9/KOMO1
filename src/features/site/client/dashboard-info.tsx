import { Dashboard } from "@/features/site/client/dashboard-retrait";

export const DashboardInfo = ({ session, all_credit } : { session: any, all_credit : any }) => {
  return (
    <Dashboard 
      numero={session?.user?.name}
      total_credit={all_credit?.total_credit}
      credit_minimum={50}
    />
  )
}