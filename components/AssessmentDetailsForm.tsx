"use client";

import { FormEvent, useState } from "react";
import {
  isFormValid,
  validateName,
  validateOrgType,
  validateOrganizationName,
  validateWorkEmail,
  type ValidationResult,
} from "../lib/formValidation";

export type AssessmentDetailsPayload = {
  name: string;
  email: string;
  organizationType: string;
  organizationName?: string;
};

type AssessmentDetailsFormProps = {
  onComplete: (payload: AssessmentDetailsPayload) => void;
};

export default function AssessmentDetailsForm({
  onComplete,
}: AssessmentDetailsFormProps) {
  const [values, setValues] = useState<AssessmentDetailsPayload>({
    name: "",
    email: "",
    organizationType: "",
    organizationName: "",
  });

  const [errors, setErrors] = useState<ValidationResult>({
    nameError: null,
    emailError: null,
    orgTypeError: null,
    organizationNameError: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    field: keyof AssessmentDetailsPayload,
    value: string
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: keyof AssessmentDetailsPayload) => {
    setErrors((prev) => {
      const next = { ...prev };
      if (field === "name") {
        next.nameError = validateName(values.name);
      } else if (field === "email") {
        next.emailError = validateWorkEmail(values.email);
      } else if (field === "organizationType") {
        next.orgTypeError = validateOrgType(values.organizationType);
      } else if (field === "organizationName") {
        next.organizationNameError = validateOrganizationName(
          values.organizationName || ""
        );
      }
      return next;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nameError = validateName(values.name);
    const emailError = validateWorkEmail(values.email);
    const orgTypeError = validateOrgType(values.organizationType);
    const organizationNameError = validateOrganizationName(
      values.organizationName || ""
    );

    const nextErrors: ValidationResult = {
      nameError,
      emailError,
      orgTypeError,
      organizationNameError,
    };

    setErrors(nextErrors);

    if (nameError || emailError || orgTypeError || organizationNameError) {
      return;
    }

    setIsSubmitting(true);
    try {
      onComplete(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formIsValid = isFormValid({
    name: values.name,
    email: values.email,
    organizationType: values.organizationType,
    organizationName: values.organizationName,
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-5 space-y-4 text-sm text-gray-800"
      noValidate
    >
      <div>
        <label
          htmlFor="fullName"
          className="block text-xs font-medium text-gray-700"
        >
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="e.g. Rahul Sharma"
          value={values.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-invalid={Boolean(errors.nameError) || undefined}
          aria-describedby={errors.nameError ? "fullName-error" : undefined}
        />
        {errors.nameError && (
          <p
            id="fullName-error"
            className="mt-1 text-xs text-red-600"
            role="alert"
          >
            {errors.nameError}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="workEmail"
          className="block text-xs font-medium text-gray-700"
        >
          Work Email Address
        </label>
        <input
          id="workEmail"
          name="workEmail"
          type="email"
          placeholder="name@company.com"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-invalid={Boolean(errors.emailError) || undefined}
          aria-describedby={errors.emailError ? "workEmail-error" : undefined}
        />
        {errors.emailError && (
          <p
            id="workEmail-error"
            className="mt-1 text-xs text-red-600"
            role="alert"
          >
            {errors.emailError}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="organizationName"
          className="block text-xs font-medium text-gray-700"
        >
          Organization Name <span className="font-normal text-gray-400">(optional)</span>
        </label>
        <input
          id="organizationName"
          name="organizationName"
          type="text"
          placeholder="e.g. Acme Corporation"
          value={values.organizationName || ""}
          onChange={(e) => handleChange("organizationName", e.target.value)}
          onBlur={() => handleBlur("organizationName")}
          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-invalid={Boolean(errors.organizationNameError) || undefined}
          aria-describedby={
            errors.organizationNameError ? "organizationName-error" : undefined
          }
        />
        {errors.organizationNameError && (
          <p
            id="organizationName-error"
            className="mt-1 text-xs text-red-600"
            role="alert"
          >
            {errors.organizationNameError}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="organizationType"
          className="block text-xs font-medium text-gray-700"
        >
          Organization Type
        </label>
        <select
          id="organizationType"
          name="organizationType"
          value={values.organizationType}
          onChange={(e) => handleChange("organizationType", e.target.value)}
          onBlur={() => handleBlur("organizationType")}
          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-invalid={Boolean(errors.orgTypeError) || undefined}
          aria-describedby={
            errors.orgTypeError ? "organizationType-error" : undefined
          }
        >
          <option value="">Select an option</option>
          <option value="Startup">Startup</option>
          <option value="SME">SME</option>
          <option value="Enterprise">Enterprise</option>
          <option value="Freelancer / Consultant">Freelancer / Consultant</option>
          <option value="Non-profit">Non-profit</option>
          <option value="Other">Other</option>
        </select>
        {errors.orgTypeError && (
          <p
            id="organizationType-error"
            className="mt-1 text-xs text-red-600"
            role="alert"
          >
            {errors.orgTypeError}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={!formIsValid || isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-full bg-[#6BA6E9] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#4A90E2] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        View My Assessment Result
      </button>
      <p className="mt-2 text-xs text-gray-500">
        Your details are used only for assessment context and follow-up
        guidance.
      </p>
    </form>
  );
}

