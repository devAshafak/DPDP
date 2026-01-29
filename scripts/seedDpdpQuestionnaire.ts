import mongoose from "mongoose";
import { connectMongo } from "@/lib/mongoose";
import {
  Questionnaire,
  type QuestionnaireDoc,
} from "@/models/Questionnaire";
import { Question } from "@/models/Question";
import { QuestionOption } from "@/models/QuestionOption";

async function run() {
  await connectMongo();

  const code = "dpdp-readiness";

  const existing = (await Questionnaire.findOne({ code }).lean()) as (QuestionnaireDoc & {
    _id: mongoose.Types.ObjectId;
  }) | null;
  if (existing) {
    console.log("Questionnaire already exists with id:", existing._id);
    process.exit(0);
  }

  const questionnaire = await Questionnaire.create({
    code,
    title: "DPDP Readiness Assessment",
    description:
      "Self-assessment to understand your organization’s readiness for India’s DPDP Act.",
    isActive: true,
  });

  const questionsData = [
    // Section A — Data Awareness
    {
      qNo: 1,
      section: "DATA_AWARENESS",
      prompt:
        "How clearly is personal data defined within your organization?",
      signalTag: "DATA_AWARENESS_DEFINITION",
      options: [
        {
          optionKey: "A",
          optionText:
            "We have a written definition aligned with DPDP and everyone is trained on it.",
          score: 3,
        },
        {
          optionKey: "B",
          optionText:
            "We have an internal definition, but not everyone is fully trained.",
          score: 2,
        },
        {
          optionKey: "C",
          optionText:
            "There is an informal understanding but nothing documented.",
          score: 1,
        },
        {
          optionKey: "D",
          optionText:
            "We have not defined personal data in a structured way.",
          score: 0,
        },
      ],
    },
    {
      qNo: 2,
      section: "DATA_AWARENESS",
      prompt:
        "How well do teams know where personal data is stored across systems?",
      signalTag: "DATA_AWARENESS_INVENTORY",
      options: [
        {
          optionKey: "A",
          optionText:
            "We maintain an up-to-date data inventory covering all key systems.",
          score: 3,
        },
        {
          optionKey: "B",
          optionText: "We have a partial inventory for major systems.",
          score: 2,
        },
        {
          optionKey: "C",
          optionText:
            "We rely on individual teams to know where data is stored.",
          score: 1,
        },
        {
          optionKey: "D",
          optionText:
            "We do not have a clear view of where personal data lives.",
          score: 0,
        },
      ],
    },
    {
      qNo: 3,
      section: "DATA_AWARENESS",
      prompt:
        "How frequently do you review what personal data you collect and why?",
      signalTag: "DATA_AWARENESS_MINIMISATION",
      options: [
        {
          optionKey: "A",
          optionText:
            "At least annually with documented justification for each data point.",
          score: 3,
        },
        {
          optionKey: "B",
          optionText:
            "Occasionally, usually when products or processes change.",
          score: 2,
        },
        {
          optionKey: "C",
          optionText:
            "Only when there is an issue or external request.",
          score: 1,
        },
        {
          optionKey: "D",
          optionText: "We have never formally reviewed this.",
          score: 0,
        },
      ],
    },

    // Section B — Access & Security
    {
      qNo: 4,
      section: "ACCESS_SECURITY",
      prompt:
        "Who can access personal data in your organization on a day-to-day basis?",
      signalTag: "ACCESS_CONTROL_SCOPE",
      options: [
        {
          optionKey: "A",
          optionText:
            "Access is strictly need-based, role-based, and regularly reviewed.",
          score: 3,
        },
        {
          optionKey: "B",
          optionText:
            "Access is mostly role-based but reviews are ad-hoc.",
          score: 2,
        },
        {
          optionKey: "C",
          optionText:
            "Many people have broad access beyond what they strictly need.",
          score: 1,
        },
        {
          optionKey: "D",
          optionText:
            "We do not have a structured approach to limiting access.",
          score: 0,
        },
      ],
    },
    {
      qNo: 5,
      section: "ACCESS_SECURITY",
      prompt:
        "How are authentication and login practices handled for systems with personal data?",
      signalTag: "ACCESS_SECURITY_AUTH",
      options: [
        {
          optionKey: "A",
          optionText:
            "MFA is enforced and strong password policies are consistently applied.",
          score: 3,
        },
        {
          optionKey: "B",
          optionText:
            "MFA is available but not enforced for all users.",
          score: 2,
        },
        {
          optionKey: "C",
          optionText:
            "We rely mainly on passwords with basic requirements.",
          score: 1,
        },
        {
          optionKey: "D",
          optionText:
            "There are minimal or inconsistent controls for authentication.",
          score: 0,
        },
      ],
    },
    {
      qNo: 6,
      section: "ACCESS_SECURITY",
      prompt:
        "How do you handle access when employees or vendors leave or change roles?",
      signalTag: "ACCESS_SECURITY_DEPROVISIONING",
      options: [
        {
          optionKey: "A",
          optionText:
            "We have a formal, timely offboarding process with documented checks.",
          score: 3,
        },
        {
          optionKey: "B",
          optionText:
            "We usually revoke access, but not always within a fixed timeframe.",
          score: 2,
        },
        {
          optionKey: "C",
          optionText:
            "Access is removed manually and sometimes missed.",
          score: 1,
        },
        {
          optionKey: "D",
          optionText: "There is no defined deprovisioning process.",
          score: 0,
        },
      ],
    },

    // Section C — Data Sharing & Third Parties
    {
      qNo: 7,
      section: "DATA_SHARING",
      prompt:
        "How do you evaluate third-party vendors who process personal data for you?",
      signalTag: "DATA_SHARING_DUE_DILIGENCE",
      options: [
        {
          optionKey: "A",
          optionText:
            "We conduct formal assessments and include DPDP-aligned clauses in contracts.",
          score: 3,
        },
        {
          optionKey: "B",
          optionText:
            "We review major vendors but not all smaller ones.",
          score: 2,
        },
        {
          optionKey: "C",
          optionText:
            "We rely mainly on vendor reputation or certifications.",
          score: 1,
        },
        {
          optionKey: "D",
          optionText:
            "We have no structured vendor assessment process.",
          score: 0,
        },
      ],
    },
    {
      qNo: 8,
      section: "DATA_SHARING",
      prompt:
        "How transparent are you with data principals about third parties who receive their data?",
      signalTag: "DATA_SHARING_TRANSPARENCY",
      options: [
        {
          optionKey: "A",
          optionText:
            "Our notices clearly list categories of third parties and purposes.",
          score: 3,
        },
        {
          optionKey: "B",
          optionText: "We mention third parties in general terms.",
          score: 2,
        },
        {
          optionKey: "C",
          optionText:
            "We only mention third parties in detailed legal documents.",
          score: 1,
        },
        {
          optionKey: "D",
          optionText:
            "We do not clearly communicate data sharing to users.",
          score: 0,
        },
      ],
    },
    {
      qNo: 9,
      section: "DATA_SHARING",
      prompt:
        "How do you track what data is shared with each third-party vendor?",
      signalTag: "DATA_SHARING_DATA_FLOWS",
      options: [
        {
          optionKey: "A",
          optionText:
            "We maintain a mapped record of data elements shared with each vendor.",
          score: 3,
        },
        {
          optionKey: "B",
          optionText:
            "We track data categories for most key vendors.",
          score: 2,
        },
        {
          optionKey: "C",
          optionText:
            "We rely on system owners to know what is shared.",
          score: 1,
        },
        {
          optionKey: "D",
          optionText:
            "We do not have a clear view of data shared with vendors.",
          score: 0,
        },
      ],
    },

    // Section D — DSAR Readiness
    {
      qNo: 10,
      section: "DSAR_READINESS",
      prompt:
        "How prepared are you to handle access or deletion requests from data principals?",
      signalTag: "DSAR_PROCESS",
      options: [
        {
          optionKey: "A",
          optionText:
            "We have a documented DSAR process, tooling, and clear SLAs.",
          score: 3,
        },
        {
          optionKey: "B",
          optionText:
            "We have a process, but it is partly manual and not consistently tracked.",
          score: 2,
        },
        {
          optionKey: "C",
          optionText:
            "We handle requests case-by-case without a standard process.",
          score: 1,
        },
        {
          optionKey: "D",
          optionText: "We have not planned for DSAR handling.",
          score: 0,
        },
      ],
    },
    {
      qNo: 11,
      section: "DSAR_READINESS",
      prompt:
        "How easy is it for data principals to find out how to exercise their rights with you?",
      signalTag: "DSAR_COMMUNICATION",
      options: [
        {
          optionKey: "A",
          optionText:
            "We provide clear, user-friendly guidance across key touchpoints.",
          score: 3,
        },
        {
          optionKey: "B",
          optionText:
            "Information is available but mainly in policy documents.",
          score: 2,
        },
        {
          optionKey: "C",
          optionText:
            "People must contact support to learn how to exercise rights.",
          score: 1,
        },
        {
          optionKey: "D",
          optionText:
            "We do not proactively explain how rights can be exercised.",
          score: 0,
        },
      ],
    },

    // Section E — Incident Preparedness
    {
      qNo: 12,
      section: "INCIDENT_PREPAREDNESS",
      prompt:
        "How prepared are you to identify and respond to a personal data breach?",
      signalTag: "INCIDENT_RESPONSE",
      options: [
        {
          optionKey: "A",
          optionText:
            "We have an incident response plan, roles, and run regular simulations.",
          score: 3,
        },
        {
          optionKey: "B",
          optionText: "We have a plan but rarely practice it.",
          score: 2,
        },
        {
          optionKey: "C",
          optionText:
            "We rely on general IT incident handling without DPDP specifics.",
          score: 1,
        },
        {
          optionKey: "D",
          optionText:
            "We do not have a documented incident response approach.",
          score: 0,
        },
      ],
    },
    {
      qNo: 13,
      section: "INCIDENT_PREPAREDNESS",
      prompt:
        "How do you log and review security events that could impact personal data?",
      signalTag: "INCIDENT_MONITORING",
      options: [
        {
          optionKey: "A",
          optionText:
            "We have centralized logging and regular review of relevant events.",
          score: 3,
        },
        {
          optionKey: "B",
          optionText:
            "We log events but reviews are ad-hoc or reactive.",
          score: 2,
        },
        {
          optionKey: "C",
          optionText:
            "Some systems log events, but they are rarely reviewed.",
          score: 1,
        },
        {
          optionKey: "D",
          optionText:
            "We do not systematically log or review security events.",
          score: 0,
        },
      ],
    },

    // Section F — Governance & Oversight
    {
      qNo: 14,
      section: "GOVERNANCE",
      prompt:
        "Who is accountable for DPDP compliance and privacy decisions in your organization?",
      signalTag: "GOVERNANCE_OWNERSHIP",
      options: [
        {
          optionKey: "A",
          optionText:
            "There is a clearly designated owner or committee with defined responsibilities.",
          score: 3,
        },
        {
          optionKey: "B",
          optionText:
            "Responsibility is informally assigned to one function (e.g., Legal, Security).",
          score: 2,
        },
        {
          optionKey: "C",
          optionText:
            "Accountability is shared loosely across multiple leaders.",
          score: 1,
        },
        {
          optionKey: "D",
          optionText:
            "No one is clearly accountable for DPDP-related decisions.",
          score: 0,
        },
      ],
    },
    {
      qNo: 15,
      section: "GOVERNANCE",
      prompt:
        "How often do you review your privacy posture and DPDP readiness at leadership level?",
      signalTag: "GOVERNANCE_CADENCE",
      options: [
        {
          optionKey: "A",
          optionText:
            "At least annually with documented actions and follow-up.",
          score: 3,
        },
        {
          optionKey: "B",
          optionText:
            "Occasionally, usually triggered by external events or audits.",
          score: 2,
        },
        {
          optionKey: "C",
          optionText:
            "Discussed informally but not tracked as a recurring agenda item.",
          score: 1,
        },
        {
          optionKey: "D",
          optionText:
            "Rarely or never discussed at leadership level.",
          score: 0,
        },
      ],
    },
  ];

  for (const q of questionsData) {
    const question = await Question.create({
      questionnaireId: questionnaire._id,
      qNo: q.qNo,
      section: q.section,
      prompt: q.prompt,
      helpText: null,
      signalTag: q.signalTag,
      isRequired: true,
    });

    await QuestionOption.insertMany(
      q.options.map((opt) => ({
        questionId: question._id,
        optionKey: opt.optionKey,
        optionText: opt.optionText,
        score: opt.score,
      }))
    );
  }

  console.log("Seeded DPDP questionnaire with id:", questionnaire._id);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

