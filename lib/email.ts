import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST?.trim();
const SMTP_PORT = process.env.SMTP_PORT
  ? parseInt(process.env.SMTP_PORT.trim(), 10)
  : 587;
const SMTP_SECURE = process.env.SMTP_SECURE === "true";
const SMTP_USERNAME = process.env.SMTP_USERNAME?.trim();
const SMTP_PASSWORD = process.env.SMTP_PASSWORD?.trim();
const AWS_SES_SENDER_EMAIL = process.env.AWS_SES_SENDER_EMAIL?.trim() || "";
const AWS_SES_RECIVER_EMAIL = process.env.AWS_SES_RECIVER_EMAIL?.trim() || "";

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter | null {
  if (transporter) return transporter;

  if (
    !SMTP_HOST ||
    !SMTP_USERNAME ||
    !SMTP_PASSWORD ||
    !AWS_SES_SENDER_EMAIL
  ) {
    console.warn(
      "SMTP configuration incomplete. Email sending will be skipped.",
      {
        hasHost: !!SMTP_HOST,
        hasUsername: !!SMTP_USERNAME,
        hasPassword: !!SMTP_PASSWORD,
        hasSenderEmail: !!AWS_SES_SENDER_EMAIL,
      }
    );
    return null;
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE, // true for 465, false for other ports
    auth: {
      user: SMTP_USERNAME,
      pass: SMTP_PASSWORD,
    },
    // Add connection timeout and better error handling
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });

  // Verify connection on creation
  transporter.verify((error) => {
    if (error) {
      const err = error as NodeJS.ErrnoException & { command?: string; response?: string; responseCode?: number };
      console.error("SMTP connection verification failed:", {
        code: err.code,
        command: err.command,
        response: err.response,
        responseCode: err.responseCode,
        message: error.message,
      });
      console.error(
        "Please verify your SMTP credentials in .env.local:\n" +
          "- SMTP_HOST should be your AWS SES SMTP endpoint\n" +
          "- SMTP_USERNAME should be your AWS SES SMTP username (IAM user)\n" +
          "- SMTP_PASSWORD should be your AWS SES SMTP password\n" +
          "- Make sure there are no extra spaces or quotes in the values"
      );
    } else {
      console.log("SMTP connection verified successfully");
    }
  });

  return transporter;
}

export type AssessmentDetailsEmailPayload = {
  fullName: string;
  workEmail: string;
  organizationName?: string;
  organizationType: string;
};

export async function sendAssessmentDetailsEmail(
  payload: AssessmentDetailsEmailPayload
): Promise<void> {
  const mailTransporter = getTransporter();
  if (!mailTransporter) {
    return; // Silently skip if SMTP not configured
  }

  if (!AWS_SES_RECIVER_EMAIL) {
    console.warn("AWS_SES_RECIVER_EMAIL not set. Email not sent.");
    return;
  }

  // Parse multiple receivers (comma-separated)
  const receivers = AWS_SES_RECIVER_EMAIL.split(",")
    .map((email) => email.trim())
    .filter((email) => email.length > 0);

  if (receivers.length === 0) {
    console.warn("No valid receiver emails found. Email not sent.");
    return;
  }

  const subject = "New DPDP Readiness Assessment details captured";

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4A90E2;">New DPDP Readiness Assessment Completed</h2>
      <p>A new DPDP readiness assessment was completed with the following details:</p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Name:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">${payload.fullName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Work Email:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">${payload.workEmail}</td>
        </tr>
        ${payload.organizationName ? `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Organization Name:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">${payload.organizationName}</td>
        </tr>
        ` : ""}
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Organization Type:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">${payload.organizationType}</td>
        </tr>
      </table>
      <p style="color: #666; font-size: 14px;">
        You can review the full answers and score in the internal dashboard.
      </p>
    </div>
  `;

  const textBody = [
    "A new DPDP readiness assessment was completed.",
    "",
    `Name: ${payload.fullName}`,
    `Work email: ${payload.workEmail}`,
    ...(payload.organizationName ? [`Organization name: ${payload.organizationName}`] : []),
    `Organization type: ${payload.organizationType}`,
    "",
    "You can review the full answers and score in the internal dashboard.",
  ].join("\n");

  try {
    await mailTransporter.sendMail({
      from: AWS_SES_SENDER_EMAIL,
      to: receivers, // Array of receiver emails
      subject,
      text: textBody,
      html: htmlBody,
    });

    console.log(
      `Assessment details email sent successfully to ${receivers.length} recipient(s): ${receivers.join(", ")}`
    );
  } catch (error: any) {
    const errorDetails: Record<string, unknown> = {
      message: error.message,
      code: error.code,
    };

    if (error.response) {
      errorDetails.response = error.response;
      errorDetails.responseCode = error.responseCode;
    }

    if (error.command) {
      errorDetails.command = error.command;
    }

    console.error("Failed to send assessment details email:", errorDetails);

    // Provide helpful error message for authentication issues
    if (error.code === "EAUTH" || error.responseCode === 535) {
      console.error(
        "\n⚠️  SMTP Authentication Failed (535)\n" +
          "Common causes:\n" +
          "1. SMTP_USERNAME or SMTP_PASSWORD are incorrect\n" +
          "2. Credentials have extra spaces or quotes (check .env.local)\n" +
          "3. AWS SES SMTP credentials are not properly configured\n" +
          "4. The IAM user associated with SMTP credentials doesn't have SES permissions\n\n" +
          "To fix:\n" +
          "- Verify credentials in AWS SES Console > SMTP Settings\n" +
          "- Ensure SMTP_USERNAME matches your AWS SES SMTP username exactly\n" +
          "- Ensure SMTP_PASSWORD matches your AWS SES SMTP password exactly\n" +
          "- Remove any quotes or extra spaces from .env.local values"
      );
    }

    throw error; // Re-throw so caller can handle if needed
  }
}
