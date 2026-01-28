import { NextRequest, NextResponse } from "next/server";

import { connectMongo } from "@/lib/mongoose";
import { Questionnaire } from "@/models/Questionnaire";
import { Question } from "@/models/Question";
import { QuestionOption } from "@/models/QuestionOption";

type RouteContext = {
  params: { questionnaireId: string };
};

// POST /api/admin/questionnaires/:questionnaireId/questions
// Creates a question and its options in one call
export async function POST(req: NextRequest, context: RouteContext) {
  try {
    await connectMongo();

    const { questionnaireId } = context.params;
    const body = await req.json();

    const {
      qNo,
      section,
      prompt,
      helpText,
      signalTag,
      isRequired = true,
      options = [],
    } = body ?? {};

    if (!qNo || !section || !prompt || !signalTag) {
      return NextResponse.json(
        { error: "qNo, section, prompt and signalTag are required" },
        { status: 400 }
      );
    }

    const questionnaire = await Questionnaire.findById(questionnaireId).lean();
    if (!questionnaire) {
      return NextResponse.json(
        { error: "Questionnaire not found" },
        { status: 404 }
      );
    }

    const session = await Question.startSession();
    let createdQuestion;
    let createdOptions: any[] = [];

    await session.withTransaction(async () => {
      createdQuestion = await Question.create(
        [
          {
            questionnaireId: questionnaire._id,
            qNo,
            section,
            prompt,
            helpText: helpText ?? null,
            signalTag,
            isRequired,
          },
        ],
        { session }
      ).then((docs) => docs[0]);

      if (Array.isArray(options) && options.length > 0) {
        createdOptions = await QuestionOption.insertMany(
          options.map((opt: any) => ({
            questionId: createdQuestion._id,
            optionKey: opt.optionKey,
            optionText: opt.optionText,
            score: opt.score,
          })),
          { session }
        );
      }
    });

    return NextResponse.json(
      {
        ...createdQuestion.toObject(),
        options: createdOptions.map((o) => o.toObject()),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "POST /api/admin/questionnaires/:questionnaireId/questions error:",
      error
    );
    return NextResponse.json(
      { error: "Failed to create question" },
      { status: 500 }
    );
  }
}

