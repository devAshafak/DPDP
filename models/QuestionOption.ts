import mongoose, { Schema, Types } from "mongoose";

export type OptionKey = "A" | "B" | "C" | "D";

export type QuestionOptionDoc = {
  questionId: Types.ObjectId;
  optionKey: OptionKey;
  optionText: string;
  score: number; // 0..3
  createdAt: Date;
};

const QuestionOptionSchema = new Schema<QuestionOptionDoc>(
  {
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
      index: true,
    },
    optionKey: { type: String, required: true, enum: ["A", "B", "C", "D"] },
    optionText: { type: String, required: true },
    score: { type: Number, required: true, min: 0, max: 3 },
    createdAt: { type: Date, required: true, default: Date.now },
  },
  { collection: "dpdp_question_options" }
);

QuestionOptionSchema.index({ questionId: 1, optionKey: 1 }, { unique: true });

export const QuestionOption =
  mongoose.models.QuestionOption ||
  mongoose.model<QuestionOptionDoc>("QuestionOption", QuestionOptionSchema);


