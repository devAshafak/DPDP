import mongoose, { Schema, Types } from "mongoose";

export type RiskBand = "HIGH" | "MEDIUM" | "AWARENESS_READY";

export type AssessmentResultDoc = {
  sessionId: Types.ObjectId;
  totalQuestions: number; // default 15
  maxScore: number; // default 45
  scoreObtained: number; // 0..45
  riskBand: RiskBand;
  summaryText: string; // 2-3 lines
  gapSignals: string[]; // e.g. ["DSAR","VENDOR_GOV"]
  recommendedNext: unknown[]; // flexible list of CTAs/actions
  computedAt: Date;
};

const AssessmentResultSchema = new Schema<AssessmentResultDoc>(
  {
    sessionId: {
      type: Schema.Types.ObjectId,
      ref: "AssessmentSession",
      required: true,
      unique: true,
      index: true,
    },
    totalQuestions: { type: Number, required: true, default: 15, min: 1 },
    maxScore: { type: Number, required: true, default: 45, min: 1 },
    scoreObtained: { type: Number, required: true, min: 0, max: 45, index: true },
    riskBand: {
      type: String,
      required: true,
      enum: ["HIGH", "MEDIUM", "AWARENESS_READY"],
      index: true,
    },
    summaryText: { type: String, required: true },
    gapSignals: { type: [String], required: true, default: [] },
    recommendedNext: { type: [Schema.Types.Mixed], required: true, default: [] },
    computedAt: { type: Date, required: true, default: Date.now },
  },
  { collection: "dpdp_assessment_results" }
);

export const AssessmentResult =
  mongoose.models.AssessmentResult ||
  mongoose.model<AssessmentResultDoc>("AssessmentResult", AssessmentResultSchema);


