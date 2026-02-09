import { ReadinessDashboard } from "@/src/components/dashboard/readiness-dashboard";
import { SkillDrawer } from "@/src/components/layout/side-drawer/skill-drawer";

export default function Page() {
  return (
    <>
      <ReadinessDashboard />
      <SkillDrawer />
    </>
  );
}
