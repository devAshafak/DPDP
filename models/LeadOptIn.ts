import mongoose, { Schema, Types } from "mongoose";

export type LeadOptInDoc = {
  sessionId: Types.ObjectId;
  fullName?: string | null;
  email?: string | null;
  phone?: string | null;
  companyName?: string | null;
  consentToContact: boolean;
  consentText?: string | null;
  consentedAt?: Date | null;
  createdAt: Date;
};

const LeadOptInSchema = new Schema<LeadOptInDoc>(
  {
    sessionId: {
      type: Schema.Types.ObjectId,
      ref: "AssessmentSession",
      required: true,
      unique: true,
      index: true,
    },
    fullName: { type: String, default: null },
    email: { type: String, default: null, index: true },
    phone: { type: String, default: null },
    companyName: { type: String, default: null },
    consentToContact: { type: Boolean, required: true, default: false },
    consentText: { type: String, default: null },
    consentedAt: { type: Date, default: null },
    createdAt: { type: Date, required: true, default: Date.now },
  },
  { collection: "dpdp_lead_optins" }
);

export const LeadOptIn =
  mongoose.models.LeadOptIn || mongoose.model<LeadOptInDoc>("LeadOptIn", LeadOptInSchema);


