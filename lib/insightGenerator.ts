import type { FinalResult, SectionScore } from "../types/assessment";

function buildSectionInsight(section: SectionScore): string {
  const baseName = section.sectionName;

  if (section.maturityLevel === "Weak") {
    return `Gaps identified in ${baseName}, indicating limited controls and documentation.`;
  }

  if (section.maturityLevel === "Moderate") {
    return `Basic practices exist in ${baseName}, but formalization is recommended.`;
  }

  return `Strong foundations observed in ${baseName}; continue to maintain and periodically validate controls.`;
}

export function generateInsights(
  partialResult: Omit<FinalResult, "insights" | "disclaimer">
): string[] {
  const insights: string[] = [];

  const weakSections = partialResult.sectionBreakdown.filter(
    (section) => section.maturityLevel === "Weak"
  );
  const moderateSections = partialResult.sectionBreakdown.filter(
    (section) => section.maturityLevel === "Moderate"
  );

  // Global risk-level insights
  if (partialResult.riskLevel === "High") {
    insights.push(
      "Overall DPDP readiness appears low. Significant compliance and operational gaps are likely and should be addressed as a priority."
    );
  } else if (partialResult.riskLevel === "Medium") {
    insights.push(
      "Core DPDP readiness elements are partially in place, but several areas require stronger controls and clearer documentation."
    );
  } else if (partialResult.riskLevel === "Good") {
    insights.push(
      "Your answers indicate good DPDP awareness and initial control implementation, but this should not be treated as verified compliance."
    );
  }

  // Section-specific insights
  weakSections.forEach((section) => {
    insights.push(buildSectionInsight(section));
  });

  moderateSections.forEach((section) => {
    insights.push(buildSectionInsight(section));
  });

  return insights;
}

