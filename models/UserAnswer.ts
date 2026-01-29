import mongoose, { Schema } from "mongoose";

import type { OptionLabel } from "@/data/dpdpQuestions";

export type UserAnswerDoc = {
  userId: string;
  questionId: string;
  selectedOption: OptionLabel;
  score: number; // 0..3
  createdAt: Date;
  updatedAt: Date;
};

const UserAnswerSchema = new Schema<UserAnswerDoc>(
  {
    userId: { type: String, required: true, index: true },
    questionId: { type: String, required: true, index: true },
    selectedOption: {
      type: String,
      required: true,
      enum: ["A", "B", "C", "D"],
    },
    score: { type: Number, required: true, min: 0, max: 3 },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
  },
  { collection: "dpdp_user_answers" }
);

UserAnswerSchema.index({ userId: 1, questionId: 1 }, { unique: true });

export const UserAnswer =
  mongoose.models.UserAnswer ||
  mongoose.model<UserAnswerDoc>("UserAnswer", UserAnswerSchema);

