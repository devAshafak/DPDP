import { NextRequest, NextResponse } from "next/server";

import { connectMongo } from "@/lib/mongoose";
import { Questionnaire } from "@/models/Questionnaire";
import { Question } from "@/models/Question";
import { QuestionOption } from "@/models/QuestionOption";

// GET /api/admin/questionnaires
// Optional query: ?isActive=true
export async function GET(req: NextRequest) {
  try {
    await connectMongo();

    const { searchParams } = new URL(req.url);
    const isActiveParam = searchParams.get("isActive");

    const filter: Record<string, unknown> = {};
    if (isActiveParam !== null) {
      filter.isActive = isActiveParam === "true";
    }

    const questionnaires = await Questionnaire.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(questionnaires);
  } catch (error) {
    console.error("GET /api/admin/questionnaires error:", error);
    return NextResponse.json(
      { error: "Failed to list questionnaires" },
      { status: 500 }
    );
  }
}

// POST /api/admin/questionnaires
export async function POST(req: NextRequest) {
  try {
    await connectMongo();

    const body = await req.json();
    const { code, title, description, isActive = true } = body ?? {};

    if (!code || !title) {
      return NextResponse.json(
        { error: "code and title are required" },
        { status: 400 }
      );
    }

    const existing = await Questionnaire.findOne({ code }).lean();
    if (existing) {
      return NextResponse.json(
        { error: "Questionnaire code already exists" },
        { status: 409 }
      );
    }

    const created = await Questionnaire.create({
      code,
      title,
      description: description ?? null,
      isActive,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/questionnaires error:", error);
    return NextResponse.json(
      { error: "Failed to create questionnaire" },
      { status: 500 }
    );
  }
}

