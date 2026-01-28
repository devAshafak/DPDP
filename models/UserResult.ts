import mongoose, { Schema } from "mongoose";

import type { RiskLevel, SectionScore } from "@/types/assessment";

export type UserResultDoc = {
  userId: string;
  totalScore: number;
  maxScore: number;
  riskLevel: RiskLevel;
  sectionBreakdown: SectionScore[];
  createdAt: Date;
  updatedAt: Date;
};

const UserResultSchema = new Schema<UserResultDoc>(
  {
    userId: { type: String, required: true, index: true, unique: true },
    totalScore: { type: Number, required: true },
    maxScore: { type: Number, required: true },
    riskLevel: { type: String, required: true, enum: ["High", "Medium", "Good"] },
    sectionBreakdown: { type: Array, required: true, default: [] },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
  },
  { collection: "dpdp_user_results" }
);

export const UserResult =
  mongoose.models.UserResult ||
  mongoose.model<UserResultDoc>("UserResult", UserResultSchema);

