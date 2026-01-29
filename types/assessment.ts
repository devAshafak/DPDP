import type { OptionLabel } from "../data/dpdpQuestions";

export type MaturityLevel = "Strong" | "Moderate" | "Weak";

export type RiskLevel = "High" | "Medium" | "Good";

export type Answer = {
  questionId: string;
  section: string;
  selectedOption: OptionLabel;
  score: number;
};

export type SectionScore = {
  sectionName: string;
  maxScore: number;
  obtainedScore: number;
  percentage: number;
  maturityLevel: MaturityLevel;
};

export type FinalResult = {
  totalScore: number;
  maxScore: number;
  riskLevel: RiskLevel;
  sectionBreakdown: SectionScore[];
  insights: string[];
  disclaimer: string;
};

