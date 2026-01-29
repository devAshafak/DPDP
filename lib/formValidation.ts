const BLOCKED_EMAIL_DOMAINS = ["gmail.com", "yahoo.com", "outlook.com"];

const emailDomain = (email: string): string | null => {
  const atIndex = email.lastIndexOf("@");
  if (atIndex === -1) return null;
  return email.slice(atIndex + 1).toLowerCase();
};

export type ValidationResult = {
  nameError: string | null;
  emailError: string | null;
  orgTypeError: string | null;
  organizationNameError: string | null;
};

export function validateName(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) return "Full Name is required.";
  if (trimmed.length < 2) return "Please enter at least 2 characters.";
  if (/^\d+$/.test(trimmed)) return "Names should include letters, not only numbers.";
  return null;
}

export function validateWorkEmail(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) return "Work Email Address is required.";

  // Basic email format validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(trimmed)) {
    return "Please enter a valid email address.";
  }

  const domain = emailDomain(trimmed);
  if (domain && BLOCKED_EMAIL_DOMAINS.includes(domain)) {
    return "Please use a work or organizational email address rather than a personal domain.";
  }

  return null;
}

export function validateOrgType(orgType: string): string | null {
  if (!orgType) return "Please select an organization type.";
  return null;
}

export function validateOrganizationName(orgName: string): string | null {
  const trimmed = orgName.trim();
  if (!trimmed) return "Organization name is required.";
  if (trimmed.length < 2) {
    return "Organization name must be at least 2 characters.";
  }
  return null;
}

export function isFormValid(values: {
  name: string;
  email: string;
  organizationType: string;
  organizationName?: string;
}): boolean {
  return (
    validateName(values.name) === null &&
    validateWorkEmail(values.email) === null &&
    validateOrgType(values.organizationType) === null &&
    validateOrganizationName(values.organizationName || "") === null
  );
}

