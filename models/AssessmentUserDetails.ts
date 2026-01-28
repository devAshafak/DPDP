import mongoose, { Schema, Types } from "mongoose";

export type OrganizationType =
  | "Startup"
  | "SME"
  | "Enterprise"
  | "Freelancer / Consultant"
  | "Non-profit"
  | "Other";

export type AssessmentUserDetailsDoc = {
  sessionId: Types.ObjectId;
  fullName: string;
  workEmail: string;
  organizationType: OrganizationType;
  completedAt: Date;
  createdAt: Date;
};

const AssessmentUserDetailsSchema = new Schema<AssessmentUserDetailsDoc>(
  {
    sessionId: {
      type: Schema.Types.ObjectId,
      ref: "AssessmentSession",
      required: true,
      index: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },
    workEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    organizationType: {
      type: String,
      required: true,
      enum: [
        "Startup",
        "SME",
        "Enterprise",
        "Freelancer / Consultant",
        "Non-profit",
        "Other",
      ],
    },
    completedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { collection: "dpdp_assessment_user_details" }
);

AssessmentUserDetailsSchema.index({ workEmail: 1, organizationType: 1 });

export const AssessmentUserDetails =
  mongoose.models.AssessmentUserDetails ||
  mongoose.model<AssessmentUserDetailsDoc>(
    "AssessmentUserDetails",
    AssessmentUserDetailsSchema
  );

