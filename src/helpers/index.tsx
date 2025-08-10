import type { FormData, FormErrors } from "../types";

const MAX_LENGTH = 40;
export function computeErrors(form: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!form.label.trim()) {
    errors.label = "Label is required.";
  }

  const choicesArray = form.choices
    .split("\n")
    .map((c) => c.trim())
    .filter((c) => c);

  if (choicesArray.length > 50) {
    errors.choices = "Maximum 50 choices allowed.";
  }

  const uniqueChoices = new Set(choicesArray);
  if (uniqueChoices.size !== choicesArray.length) {
    errors.choices = "Duplicate choices are not allowed.";
  }

  const filteredLines = choicesArray.filter((line) => line.length > MAX_LENGTH);
  if (filteredLines.length > 0) {
    errors.choices = `Each choice must be ≤ ${MAX_LENGTH} characters.`;
  }

  if (
    form.defaultValue &&
    !choicesArray.includes(form.defaultValue) &&
    choicesArray.length >= 50
  ) {
    errors.defaultValue =
      "Cannot add default value because there are already 50 choices.";
  }

  return errors;
}
