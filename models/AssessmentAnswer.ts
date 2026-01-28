import mongoose, { Schema, Types } from "mongoose";

export type OptionKey = "A" | "B" | "C" | "D";

export type AssessmentAnswerDoc = {
  sessionId: Types.ObjectId;
  questionId: Types.ObjectId;
  optionId: Types.ObjectId;
  optionKey: OptionKey;
  score: number; // 0..3
  answeredAt: Date;
};

const AssessmentAnswerSchema = new Schema<AssessmentAnswerDoc>(
  {
    sessionId: {
      type: Schema.Types.ObjectId,
      ref: "AssessmentSession",
      required: true,
      index: true,
    },
    questionId: { type: Schema.Types.ObjectId, ref: "Question", required: true, index: true },
    optionId: { type: Schema.Types.ObjectId, ref: "QuestionOption", required: true },
    optionKey: { type: String, required: true, enum: ["A", "B", "C", "D"] },
    score: { type: Number, required: true, min: 0, max: 3 },
    answeredAt: { type: Date, required: true, default: Date.now },
  },
  { collection: "dpdp_assessment_answers" }
);

AssessmentAnswerSchema.index({ sessionId: 1, questionId: 1 }, { unique: true });

export const AssessmentAnswer =
  mongoose.models.AssessmentAnswer ||
  mongoose.model<AssessmentAnswerDoc>("AssessmentAnswer", AssessmentAnswerSchema);


