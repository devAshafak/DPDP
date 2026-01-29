export type OptionLabel = "A" | "B" | "C" | "D";

export type QuestionOption = {
    label: OptionLabel;
    text: string;
    score: number;
};

export type Question = {
    id: string;
    sectionId: "A" | "B" | "C" | "D" | "E" | "F";
    sectionTitle: string;
    questionText: string;
    signal: string;
    options: QuestionOption[];
};

const scoreByLabel: Record<OptionLabel, number> = {
    A: 3,
    B: 2,
    C: 1,
    D: 0,
};

export const dpdpQuestions: Question[] = [
    // Section A — Personal Data Awareness
    {
        id: "A1",
        sectionId: "A",
        sectionTitle: "Section A — Personal Data Awareness",
        questionText: "How clearly is personal data defined within your organization?",
        signal: "Signal: Shared understanding of what counts as personal data",
        options: [
            {
                label: "A",
                text: "We have a written definition aligned with DPDP and everyone is trained on it.",
                score: scoreByLabel.A,
            },
            {
                label: "B",
                text: "We have an internal definition, but not everyone is fully trained.",
                score: scoreByLabel.B,
            },
            {
                label: "C",
                text: "There is an informal understanding but nothing documented.",
                score: scoreByLabel.C,
            },
            {
                label: "D",
                text: "We have not defined personal data in a structured way.",
                score: scoreByLabel.D,
            },
        ],
    },
    {
        id: "A2",
        sectionId: "A",
        sectionTitle: "Section A — Personal Data Awareness",
        questionText:
            "How well do teams know where personal data is stored across systems?",
        signal: "Signal: Data inventory and visibility",
        options: [
            {
                label: "A",
                text: "We maintain an up-to-date data inventory covering all key systems.",
                score: scoreByLabel.A,
            },
            {
                label: "B",
                text: "We have a partial inventory for major systems.",
                score: scoreByLabel.B,
            },
            {
                label: "C",
                text: "We rely on individual teams to know where data is stored.",
                score: scoreByLabel.C,
            },
            {
                label: "D",
                text: "We do not have a clear view of where personal data lives.",
                score: scoreByLabel.D,
            },
        ],
    },
    {
        id: "A3",
        sectionId: "A",
        sectionTitle: "Section A — Personal Data Awareness",
        questionText:
            "How frequently do you review what personal data you collect and why?",
        signal: "Signal: Data minimization discipline",
        options: [
            {
                label: "A",
                text: "At least annually with documented justification for each data point.",
                score: scoreByLabel.A,
            },
            {
                label: "B",
                text: "Occasionally, usually when products or processes change.",
                score: scoreByLabel.B,
            },
            {
                label: "C",
                text: "Only when there is an issue or external request.",
                score: scoreByLabel.C,
            },
            {
                label: "D",
                text: "We have never formally reviewed this.",
                score: scoreByLabel.D,
            },
        ],
    },

    // Section B — Access & Security Controls
    {
        id: "B1",
        sectionId: "B",
        sectionTitle: "Section B — Access & Security Controls",
        questionText:
            "Who can access personal data in your organization on a day-to-day basis?",
        signal: "Signal: Access control discipline",
        options: [
            {
                label: "A",
                text: "Access is strictly need-based, role-based, and regularly reviewed.",
                score: scoreByLabel.A,
            },
            {
                label: "B",
                text: "Access is mostly role-based but reviews are ad-hoc.",
                score: scoreByLabel.B,
            },
            {
                label: "C",
                text: "Many people have broad access beyond what they strictly need.",
                score: scoreByLabel.C,
            },
            {
                label: "D",
                text: "We do not have a structured approach to limiting access.",
                score: scoreByLabel.D,
            },
        ],
    },
    {
        id: "B2",
        sectionId: "B",
        sectionTitle: "Section B — Access & Security Controls",
        questionText:
            "How are authentication and login practices handled for systems with personal data?",
        signal: "Signal: Strength of access security",
        options: [
            {
                label: "A",
                text: "MFA is enforced and strong password policies are consistently applied.",
                score: scoreByLabel.A,
            },
            {
                label: "B",
                text: "MFA is available but not enforced for all users.",
                score: scoreByLabel.B,
            },
            {
                label: "C",
                text: "We rely mainly on passwords with basic requirements.",
                score: scoreByLabel.C,
            },
            {
                label: "D",
                text: "There are minimal or inconsistent controls for authentication.",
                score: scoreByLabel.D,
            },
        ],
    },
    {
        id: "B3",
        sectionId: "B",
        sectionTitle: "Section B — Access & Security Controls",
        questionText:
            "How do you handle access when employees or vendors leave or change roles?",
        signal: "Signal: Deprovisioning and access lifecycle",
        options: [
            {
                label: "A",
                text: "We have a formal, timely offboarding process with documented checks.",
                score: scoreByLabel.A,
            },
            {
                label: "B",
                text: "We usually revoke access, but not always within a fixed timeframe.",
                score: scoreByLabel.B,
            },
            {
                label: "C",
                text: "Access is removed manually and sometimes missed.",
                score: scoreByLabel.C,
            },
            {
                label: "D",
                text: "There is no defined deprovisioning process.",
                score: scoreByLabel.D,
            },
        ],
    },

    // Section C — Data Sharing & Third Parties
    {
        id: "C1",
        sectionId: "C",
        sectionTitle: "Section C — Data Sharing & Third Parties",
        questionText:
            "How do you evaluate third-party vendors who process personal data for you?",
        signal: "Signal: Third-party due diligence",
        options: [
            {
                label: "A",
                text: "We conduct formal assessments and include DPDP-aligned clauses in contracts.",
                score: scoreByLabel.A,
            },
            {
                label: "B",
                text: "We review major vendors but not all smaller ones.",
                score: scoreByLabel.B,
            },
            {
                label: "C",
                text: "We rely mainly on vendor reputation or certifications.",
                score: scoreByLabel.C,
            },
            {
                label: "D",
                text: "We have no structured vendor assessment process.",
                score: scoreByLabel.D,
            },
        ],
    },
    {
        id: "C2",
        sectionId: "C",
        sectionTitle: "Section C — Data Sharing & Third Parties",
        questionText:
            "How transparent are you with data principals about third parties who receive their data?",
        signal: "Signal: Clarity of data sharing practices",
        options: [
            {
                label: "A",
                text: "Our notices clearly list categories of third parties and purposes.",
                score: scoreByLabel.A,
            },
            {
                label: "B",
                text: "We mention third parties in general terms.",
                score: scoreByLabel.B,
            },
            {
                label: "C",
                text: "We only mention third parties in detailed legal documents.",
                score: scoreByLabel.C,
            },
            {
                label: "D",
                text: "We do not clearly communicate data sharing to users.",
                score: scoreByLabel.D,
            },
        ],
    },
    {
        id: "C3",
        sectionId: "C",
        sectionTitle: "Section C — Data Sharing & Third Parties",
        questionText:
            "How do you track what data is shared with each third-party vendor?",
        signal: "Signal: Control over data flows",
        options: [
            {
                label: "A",
                text: "We maintain a mapped record of data elements shared with each vendor.",
                score: scoreByLabel.A,
            },
            {
                label: "B",
                text: "We track data categories for most key vendors.",
                score: scoreByLabel.B,
            },
            {
                label: "C",
                text: "We rely on system owners to know what is shared.",
                score: scoreByLabel.C,
            },
            {
                label: "D",
                text: "We do not have a clear view of data shared with vendors.",
                score: scoreByLabel.D,
            },
        ],
    },

    // Section D — User Rights (DSAR)
    {
        id: "D1",
        sectionId: "D",
        sectionTitle: "Section D — User Rights (DSAR)",
        questionText:
            "How prepared are you to handle access or deletion requests from data principals?",
        signal: "Signal: DSAR operational readiness",
        options: [
            {
                label: "A",
                text: "We have a documented DSAR process, tooling, and clear SLAs.",
                score: scoreByLabel.A,
            },
            {
                label: "B",
                text: "We have a process, but it is partly manual and not consistently tracked.",
                score: scoreByLabel.B,
            },
            {
                label: "C",
                text: "We handle requests case-by-case without a standard process.",
                score: scoreByLabel.C,
            },
            {
                label: "D",
                text: "We have not planned for DSAR handling.",
                score: scoreByLabel.D,
            },
        ],
    },
    {
        id: "D2",
        sectionId: "D",
        sectionTitle: "Section D — User Rights (DSAR)",
        questionText:
            "How easy is it for data principals to find out how to exercise their rights with you?",
        signal: "Signal: Clarity of rights communication",
        options: [
            {
                label: "A",
                text: "We provide clear, user-friendly guidance across key touchpoints.",
                score: scoreByLabel.A,
            },
            {
                label: "B",
                text: "Information is available but mainly in policy documents.",
                score: scoreByLabel.B,
            },
            {
                label: "C",
                text: "People must contact support to learn how to exercise rights.",
                score: scoreByLabel.C,
            },
            {
                label: "D",
                text: "We do not proactively explain how rights can be exercised.",
                score: scoreByLabel.D,
            },
        ],
    },

    // Section E — Incident Preparedness
    {
        id: "E1",
        sectionId: "E",
        sectionTitle: "Section E — Incident Preparedness",
        questionText:
            "How prepared are you to identify and respond to a personal data breach?",
        signal: "Signal: Breach readiness and playbooks",
        options: [
            {
                label: "A",
                text: "We have an incident response plan, roles, and run regular simulations.",
                score: scoreByLabel.A,
            },
            {
                label: "B",
                text: "We have a plan but rarely practice it.",
                score: scoreByLabel.B,
            },
            {
                label: "C",
                text: "We rely on general IT incident handling without DPDP specifics.",
                score: scoreByLabel.C,
            },
            {
                label: "D",
                text: "We do not have a documented incident response approach.",
                score: scoreByLabel.D,
            },
        ],
    },
    {
        id: "E2",
        sectionId: "E",
        sectionTitle: "Section E — Incident Preparedness",
        questionText:
            "How do you log and review security events that could impact personal data?",
        signal: "Signal: Monitoring and detection capability",
        options: [
            {
                label: "A",
                text: "We have centralized logging and regular review of relevant events.",
                score: scoreByLabel.A,
            },
            {
                label: "B",
                text: "We log events but reviews are ad-hoc or reactive.",
                score: scoreByLabel.B,
            },
            {
                label: "C",
                text: "Some systems log events, but they are rarely reviewed.",
                score: scoreByLabel.C,
            },
            {
                label: "D",
                text: "We do not systematically log or review security events.",
                score: scoreByLabel.D,
            },
        ],
    },

    // Section F — Governance & Oversight
    {
        id: "F1",
        sectionId: "F",
        sectionTitle: "Section F — Governance & Oversight",
        questionText:
            "Who is accountable for DPDP compliance and privacy decisions in your organization?",
        signal: "Signal: Ownership and accountability",
        options: [
            {
                label: "A",
                text: "There is a clearly designated owner or committee with defined responsibilities.",
                score: scoreByLabel.A,
            },
            {
                label: "B",
                text: "Responsibility is informally assigned to one function (e.g., Legal, Security).",
                score: scoreByLabel.B,
            },
            {
                label: "C",
                text: "Accountability is shared loosely across multiple leaders.",
                score: scoreByLabel.C,
            },
            {
                label: "D",
                text: "No one is clearly accountable for DPDP-related decisions.",
                score: scoreByLabel.D,
            },
        ],
    },
    {
        id: "F2",
        sectionId: "F",
        sectionTitle: "Section F — Governance & Oversight",
        questionText:
            "How often do you review your privacy posture and DPDP readiness at leadership level?",
        signal: "Signal: Ongoing governance cadence",
        options: [
            {
                label: "A",
                text: "At least annually with documented actions and follow-up.",
                score: scoreByLabel.A,
            },
            {
                label: "B",
                text: "Occasionally, usually triggered by external events or audits.",
                score: scoreByLabel.B,
            },
            {
                label: "C",
                text: "Discussed informally but not tracked as a recurring agenda item.",
                score: scoreByLabel.C,
            },
            {
                label: "D",
                text: "Rarely or never discussed at leadership level.",
                score: scoreByLabel.D,
            },
        ],
    },
];

