import mongoose, { Schema } from "mongoose";

export type QuestionnaireDoc = {
  code: string; // e.g. "DPDP_CHECK_V1"
  title: string;
  description?: string | null;
  isActive: boolean;
  createdAt: Date;
};

const QuestionnaireSchema = new Schema<QuestionnaireDoc>(
  {
    code: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: null },
    isActive: { type: Boolean, required: true, default: true },
    createdAt: { type: Date, required: true, default: Date.now },
  },
  { collection: "dpdp_questionnaires" }
);

export const Questionnaire =
  mongoose.models.Questionnaire ||
  mongoose.model<QuestionnaireDoc>("Questionnaire", QuestionnaireSchema);


