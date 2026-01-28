import mongoose, { Schema, Types } from "mongoose";

export type SessionStatus = "STARTED" | "COMPLETED" | "ABANDONED";

export type AssessmentSessionDoc = {
  questionnaireId: Types.ObjectId;
  status: SessionStatus;

  // Optional context (non-PII)
  orgType?: "Startup" | "MSME" | "Enterprise" | null;
  industry?: string | null;
  companySizeBand?: string | null; // "1-10","11-50","51-200","200+"
  usesCloud?: boolean | null;
  cloudProvider?: "AWS" | "Azure" | "GCP" | "Other" | null;
  usesAws?: boolean | null;

  // Technical metadata (privacy-safe)
  userLocale?: string | null; // "en-IN"
  countryHint?: string | null; // "IN"
  userAgent?: string | null;
  referrer?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;

  startedAt: Date;
  completedAt?: Date | null;
  lastSeenAt: Date;
};

const AssessmentSessionSchema = new Schema<AssessmentSessionDoc>(
  {
    questionnaireId: {
      type: Schema.Types.ObjectId,
      ref: "Questionnaire",
      required: true,
      index: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["STARTED", "COMPLETED", "ABANDONED"],
      default: "STARTED",
      index: true,
    },

    orgType: { type: String, default: null, enum: ["Startup", "MSME", "Enterprise"] },
    industry: { type: String, default: null },
    companySizeBand: { type: String, default: null },
    usesCloud: { type: Boolean, default: null },
    cloudProvider: { type: String, default: null, enum: ["AWS", "Azure", "GCP", "Other"] },
    usesAws: { type: Boolean, default: null },

    userLocale: { type: String, default: null },
    countryHint: { type: String, default: null },
    userAgent: { type: String, default: null },
    referrer: { type: String, default: null },
    utmSource: { type: String, default: null },
    utmMedium: { type: String, default: null },
    utmCampaign: { type: String, default: null },

    startedAt: { type: Date, required: true, default: Date.now, index: true },
    completedAt: { type: Date, default: null },
    lastSeenAt: { type: Date, required: true, default: Date.now },
  },
  { collection: "dpdp_assessment_sessions" }
);

AssessmentSessionSchema.index({ utmSource: 1, utmCampaign: 1 });

export const AssessmentSession =
  mongoose.models.AssessmentSession ||
  mongoose.model<AssessmentSessionDoc>("AssessmentSession", AssessmentSessionSchema);


