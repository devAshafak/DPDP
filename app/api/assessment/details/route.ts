import { NextRequest, NextResponse } from "next/server";

import { connectMongo } from "@/lib/mongoose";
import { AssessmentUserDetails } from "@/models/AssessmentUserDetails";
import { sendAssessmentDetailsEmail } from "@/lib/email";

type DetailsPayload = {
  userId: string;
  fullName: string;
  workEmail: string;
  organizationName?: string;
  organizationType: string;
};

export async function POST(req: NextRequest) {
  try {
    await connectMongo();

    const body = (await req.json()) as DetailsPayload;

    if (!body?.userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const { userId, fullName, workEmail, organizationName, organizationType } = body;

    await AssessmentUserDetails.updateOne(
      { userId },
      {
        $set: {
          fullName,
          workEmail,
          organizationName: organizationName || undefined,
          organizationType,
          completedAt: new Date(),
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    // Send email notification in background (fire-and-forget)
    sendAssessmentDetailsEmail({
      fullName,
      workEmail,
      organizationName: organizationName || undefined,
      organizationType,
    }).catch((error) =>
      console.error("Failed to send assessment details email", error)
    );

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("POST /api/assessment/details error:", error);
    return NextResponse.json(
      { error: "Failed to record assessment details" },
      { status: 500 }
    );
  }
}

