import { Dashboard } from "@/features/site/client/dashboard-retrait";

export const DashboardInfo = ({ session, all_credit } : { session: any, all_credit : any }) => {
  return (
    <Dashboard 
      numero={session.username}
      total_credit={all_credit?.total_credit}
      total_credit_id = {all_credit?.id}
      credit_minimum={50}
    />
  )
}