import type { OptionLabel, Question } from "../data/dpdpQuestions";
import type {
  Answer,
  FinalResult,
  MaturityLevel,
  RiskLevel,
  SectionScore,
} from "../types/assessment";
import { generateInsights } from "./insightGenerator";

// Locked rules
const OPTION_SCORE_MAP: Record<OptionLabel, number> = {
  A: 3,
  B: 2,
  C: 1,
  D: 0,
};

export const MAX_TOTAL_SCORE = 45;
export const TOTAL_SECTIONS = 6;

export function optionToScore(option: OptionLabel): number {
  return OPTION_SCORE_MAP[option];
}

export function mapPercentageToMaturity(percentage: number): MaturityLevel {
  if (percentage >= 70) return "Strong";
  if (percentage >= 40) return "Moderate";
  return "Weak";
}

export function mapScoreToRiskLevel(score: number): RiskLevel {
  if (score <= 15) return "High";
  if (score <= 30) return "Medium";
  return "Good";
}

export type RawAnswerMap = Record<string, OptionLabel>;

export function normalizeAnswers(
  raw: RawAnswerMap,
  questions: Question[]
): Answer[] {
  return questions.map((question) => {
    const selectedOption = raw[question.id];
    if (
      !selectedOption ||
      !["A", "B", "C", "D"].includes(selectedOption)
    ) {
      throw new Error(`Invalid or missing option for question ${question.id}`);
    }

    const score = optionToScore(selectedOption);

    return {
      questionId: question.id,
      section: question.sectionTitle,
      selectedOption,
      score,
    };
  });
}

export function calculateSectionScores(
  answers: Answer[],
  questions: Question[]
): SectionScore[] {
  const sectionMap = new Map<string, { obtained: number; max: number; count: number }>();

  answers.forEach((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) return;

    const maxForQuestion = Math.max(...question.options.map((o) => o.score));
    const key = question.sectionTitle;

    const existing = sectionMap.get(key) ?? { obtained: 0, max: 0, count: 0 };
    existing.obtained += answer.score;
    existing.max += maxForQuestion;
    existing.count += 1;
    sectionMap.set(key, existing);
  });

  const sections: SectionScore[] = [];

  sectionMap.forEach((value, sectionName) => {
    const percentage =
      value.max > 0 ? (value.obtained / value.max) * 100 : 0;
    sections.push({
      sectionName,
      maxScore: value.max,
      obtainedScore: value.obtained,
      percentage,
      maturityLevel: mapPercentageToMaturity(percentage),
    });
  });

  return sections;
}

export function computeFinalResult(
  rawAnswers: RawAnswerMap,
  questions: Question[]
): FinalResult {
  // Validate completeness
  const answeredIds = Object.keys(rawAnswers);
  if (answeredIds.length !== questions.length) {
    throw new Error("Incomplete answers: all questions must be answered.");
  }

  const answers = normalizeAnswers(rawAnswers, questions);

  // Validate score ranges
  answers.forEach((answer) => {
    if (answer.score < 0 || answer.score > 3) {
      throw new Error("Score out of allowed range 0–3.");
    }
  });

  const totalScore = answers.reduce(
    (acc, curr) => acc + curr.score,
    0
  );

  const sectionBreakdown = calculateSectionScores(answers, questions);

  const riskLevel = mapScoreToRiskLevel(totalScore);

  const baseResult: Omit<FinalResult, "insights" | "disclaimer"> = {
    totalScore,
    maxScore: MAX_TOTAL_SCORE,
    riskLevel,
    sectionBreakdown,
  };

  const insights = generateInsights(baseResult);

  const disclaimer =
    "This score reflects self-declared DPDP readiness and is not a technical or legal verification.";

  return {
    ...baseResult,
    insights,
    disclaimer,
  };
}

