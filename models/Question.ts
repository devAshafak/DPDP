import mongoose, { Schema, Types } from "mongoose";

export type DpdpSection =
  | "DATA_AWARENESS"
  | "ACCESS_SECURITY"
  | "DATA_SHARING"
  | "DSAR_READINESS"
  | "INCIDENT_PREPAREDNESS"
  | "GOVERNANCE";

export type QuestionDoc = {
  questionnaireId: Types.ObjectId;
  qNo: number; // 1..15
  section: DpdpSection;
  prompt: string;
  helpText?: string | null;
  signalTag: string; // e.g. "DSAR_READINESS"
  isRequired: boolean;
  createdAt: Date;
};

const QuestionSchema = new Schema<QuestionDoc>(
  {
    questionnaireId: {
      type: Schema.Types.ObjectId,
      ref: "Questionnaire",
      required: true,
      index: true,
    },
    qNo: { type: Number, required: true, min: 1 },
    section: {
      type: String,
      required: true,
      enum: [
        "DATA_AWARENESS",
        "ACCESS_SECURITY",
        "DATA_SHARING",
        "DSAR_READINESS",
        "INCIDENT_PREPAREDNESS",
        "GOVERNANCE",
      ],
      index: true,
    },
    prompt: { type: String, required: true },
    helpText: { type: String, default: null },
    signalTag: { type: String, required: true, index: true },
    isRequired: { type: Boolean, required: true, default: true },
    createdAt: { type: Date, required: true, default: Date.now },
  },
  { collection: "dpdp_questions" }
);

QuestionSchema.index({ questionnaireId: 1, qNo: 1 }, { unique: true });

export const Question =
  mongoose.models.Question || mongoose.model<QuestionDoc>("Question", QuestionSchema);


