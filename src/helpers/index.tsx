import type { FormData, FormErrors } from "../types";

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
