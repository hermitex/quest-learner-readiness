export type SkillKey = "academics" | "career" | "life" | "entrepreneurship";

export type Skill = {
  id: string;
  label: string;
  score: number;
};

export type ReadinessData = {
  overallScore: number;
  skills: Skill[];
};

export type ReadinessMeaning = {
  status: string;
  message: string;
};

export type DrawerMode = "view" | "create" | "edit" | "delete";
