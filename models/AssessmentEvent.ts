import mongoose, { Schema, Types } from "mongoose";

export type AssessmentEventDoc = {
  sessionId: Types.ObjectId;
  eventName: string; // "START","ANSWERED","COMPLETED","CTA_CLICKED", ...
  eventPayload: Record<string, unknown>;
  createdAt: Date;
};

const AssessmentEventSchema = new Schema<AssessmentEventDoc>(
  {
    sessionId: {
      type: Schema.Types.ObjectId,
      ref: "AssessmentSession",
      required: true,
      index: true,
    },
    eventName: { type: String, required: true, index: true },
    eventPayload: { type: Schema.Types.Mixed, required: true, default: {} },
    createdAt: { type: Date, required: true, default: Date.now },
  },
  { collection: "dpdp_assessment_events" }
);

export const AssessmentEvent =
  mongoose.models.AssessmentEvent ||
  mongoose.model<AssessmentEventDoc>("AssessmentEvent", AssessmentEventSchema);


