import { DPDP_QUESTIONNAIRE_CODE } from "./frontendConfig";

export type DpdpQuestionnaireResponse =
  | {
      ok: true;
      data: any;
    }
  | {
      ok: false;
      error: string;
      status: number;
    };

export async function fetchDpdpQuestionnaire(): Promise<DpdpQuestionnaireResponse> {
  try {
    const res = await fetch(
      `/api/public/questionnaires/${encodeURIComponent(
        DPDP_QUESTIONNAIRE_CODE
      )}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!res.ok) {
      let message = "Failed to load DPDP questionnaire";
      try {
        const body = await res.json();
        if (body && typeof body.error === "string") {
          message = body.error;
        }
      } catch {
        // ignore parse errors
      }

      return { ok: false, error: message, status: res.status };
    }

    const data = await res.json();
    return { ok: true, data };
  } catch (error) {
    console.error("Error calling DPDP questionnaire API", error);
    return {
      ok: false,
      error:
        "Unable to reach the DPDP questionnaire service. Please try again shortly.",
      status: 0,
    };
  }
}

