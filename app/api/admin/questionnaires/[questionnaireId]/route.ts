import { NextRequest, NextResponse } from "next/server";

import { connectMongo } from "@/lib/mongoose";
import { Questionnaire } from "@/models/Questionnaire";
import { Question } from "@/models/Question";
import { QuestionOption } from "@/models/QuestionOption";

type RouteContext = {
  params: Promise<{ questionnaireId: string }>;
};

// GET /api/admin/questionnaires/:questionnaireId
// Returns questionnaire with its questions and options
export async function GET(_req: NextRequest, context: RouteContext) {
  try {
    await connectMongo();

    const { questionnaireId } = await context.params;

    const questionnaire = await Questionnaire.findById(questionnaireId).lean();
    if (!questionnaire) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const questions = await Question.find({
      questionnaireId: questionnaire._id,
    })
      .sort({ qNo: 1 })
      .lean();

    const questionIds = questions.map((q) => q._id);
    const options = await QuestionOption.find({
      questionId: { $in: questionIds },
    })
      .sort({ optionKey: 1 })
      .lean();

    const optionsByQuestion = new Map<string, any[]>();
    for (const opt of options) {
      const key = String(opt.questionId);
      if (!optionsByQuestion.has(key)) {
        optionsByQuestion.set(key, []);
      }
      optionsByQuestion.get(key)!.push({
        _id: opt._id,
        optionKey: opt.optionKey,
        optionText: opt.optionText,
        score: opt.score,
        createdAt: opt.createdAt,
      });
    }

    const questionsWithOptions = questions.map((q) => ({
      ...q,
      options: optionsByQuestion.get(String(q._id)) ?? [],
    }));

    return NextResponse.json({
      ...questionnaire,
      questions: questionsWithOptions,
    });
  } catch (error) {
    console.error(
      "GET /api/admin/questionnaires/:questionnaireId error:",
      error
    );
    return NextResponse.json(
      { error: "Failed to load questionnaire" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/questionnaires/:questionnaireId
export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    await connectMongo();

    const { questionnaireId } = await context.params;
    const body = await req.json();

    const updatable: Record<string, unknown> = {};
    if ("title" in body) updatable.title = body.title;
    if ("description" in body) updatable.description = body.description;
    if ("isActive" in body) updatable.isActive = body.isActive;

    if (Object.keys(updatable).length === 0) {
      return NextResponse.json(
        { error: "No updatable fields provided" },
        { status: 400 }
      );
    }

    const updated = await Questionnaire.findByIdAndUpdate(
      questionnaireId,
      { $set: updatable },
      { new: true }
    ).lean();

    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error(
      "PATCH /api/admin/questionnaires/:questionnaireId error:",
      error
    );
    return NextResponse.json(
      { error: "Failed to update questionnaire" },
      { status: 500 }
    );
  }
}

