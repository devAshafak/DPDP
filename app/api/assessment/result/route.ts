import { NextRequest, NextResponse } from "next/server";

import { connectMongo } from "@/lib/mongoose";
import { UserResult } from "@/models/UserResult";
import type { FinalResult } from "@/types/assessment";

type ResultPayload = {
  userId: string;
  result: FinalResult;
};

export async function POST(req: NextRequest) {
  try {
    await connectMongo();

    const body = (await req.json()) as ResultPayload;

    if (!body?.userId || !body?.result) {
      return NextResponse.json(
        { error: "userId and result are required" },
        { status: 400 }
      );
    }

    const { userId, result } = body;

    await UserResult.updateOne(
      { userId },
      {
        $set: {
          totalScore: result.totalScore,
          maxScore: result.maxScore,
          riskLevel: result.riskLevel,
          sectionBreakdown: result.sectionBreakdown,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("POST /api/assessment/result error:", error);
    return NextResponse.json(
      { error: "Failed to record assessment result" },
      { status: 500 }
    );
  }
}

