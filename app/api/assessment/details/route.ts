import { NextRequest, NextResponse } from "next/server";

import { connectMongo } from "@/lib/mongoose";
import { AssessmentUserDetails } from "@/models/AssessmentUserDetails";

type DetailsPayload = {
  userId: string;
  fullName: string;
  workEmail: string;
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

    const { userId, fullName, workEmail, organizationType } = body;

    await AssessmentUserDetails.updateOne(
      { userId },
      {
        $set: {
          fullName,
          workEmail,
          organizationType,
          completedAt: new Date(),
          createdAt: new Date(),
        },
      },
      { upsert: true }
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

