import { NextRequest, NextResponse } from "next/server";

import { connectMongo } from "@/lib/mongoose";
import { Questionnaire } from "@/models/Questionnaire";
import { Question } from "@/models/Question";
import { QuestionOption } from "@/models/QuestionOption";

type RouteContext = {
  params: Promise<{ code: string }>;
};

// GET /api/public/questionnaires/:code
// Public endpoint for the website to fetch an active questionnaire
// with its questions and options in answering order.
export async function GET(_req: NextRequest, context: RouteContext) {
  try {
    await connectMongo();

    const { code } = await context.params;

    const questionnaire = await Questionnaire.findOne({
      code,
      isActive: true,
    }).lean();

    if (!questionnaire) {
      return NextResponse.json(
        { error: "Questionnaire not found or inactive" },
        { status: 404 }
      );
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
      questionnaire: {
        _id: questionnaire._id,
        code: questionnaire.code,
        title: questionnaire.title,
        description: questionnaire.description,
        isActive: questionnaire.isActive,
        createdAt: questionnaire.createdAt,
      },
      questions: questionsWithOptions,
    });
  } catch (error) {
    console.error("GET /api/public/questionnaires/:code error:", error);
    return NextResponse.json(
      { error: "Failed to load questionnaire" },
      { status: 500 }
    );
  }
}

