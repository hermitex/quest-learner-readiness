import { ReadinessDashboard } from "@/src/components/dashboard/readiness-dashboard";
import { SkillDrawer } from "@/src/components/layout/side-drawer/skill-drawer";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <>
      <ReadinessDashboard />
      <SkillDrawer />
    </>
  );
}
