import { NextRequest, NextResponse } from "next/server";

import { connectMongo } from "@/lib/mongoose";
import { UserAnswer } from "@/models/UserAnswer";

type BulkAnswerPayload = {
  userId: string;
  answers: {
    questionId: string;
    selectedOption: "A" | "B" | "C" | "D";
    score: number;
  }[];
};

export async function POST(req: NextRequest) {
  try {
    await connectMongo();

    const body = (await req.json()) as BulkAnswerPayload;

    if (!body?.userId || !Array.isArray(body.answers)) {
      return NextResponse.json(
        { error: "userId and answers are required" },
        { status: 400 }
      );
    }

    const { userId, answers } = body;

    for (const ans of answers) {
      if (!ans.questionId || !ans.selectedOption) continue;

      await UserAnswer.updateOne(
        { userId, questionId: ans.questionId },
        {
          $set: {
            selectedOption: ans.selectedOption,
            score: ans.score,
            updatedAt: new Date(),
          },
          $setOnInsert: {
            createdAt: new Date(),
          },
        },
        { upsert: true }
      );
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("POST /api/answers/bulk error:", error);
    return NextResponse.json(
      { error: "Failed to record answers" },
      { status: 500 }
    );
  }
}

