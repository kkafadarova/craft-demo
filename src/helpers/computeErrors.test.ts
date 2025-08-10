import { computeErrors } from "./";
import { OrderOptionValue, type FormData } from "../types";

const baseForm: FormData = {
  label: "Test",
  defaultValue: "",
  choices: "",
  required: false,
  order: OrderOptionValue.ASC,
  type: "",
};

describe("computeErrors", () => {
  it("returns error if label is empty", () => {
    const form = { ...baseForm, label: " " };
    const errors = computeErrors(form);
    expect(errors.label).toBe("Label is required.");
  });

 it("returns error if more than 50 choices", () => {
  const choices = Array.from({ length: 51 }, (_, i) => `choice${i}`).join("\n");
  const form = { ...baseForm, choices };
  const errors = computeErrors(form);
  expect(errors.choices).toBe("Maximum 50 choices allowed.");
});


  it("returns error if duplicate choices exist", () => {
    const form = { ...baseForm, choices: "apple\nbanana\napple" };
    const errors = computeErrors(form);
    expect(errors.choices).toBe("Duplicate choices are not allowed.");
  });

  it("returns error if defaultValue not in choices and choices are already 50", () => {
    const choices = Array.from({ length: 50 }, (_, i) => `choice${i}`).join("\n");
    const form = { ...baseForm, choices, defaultValue: "missingChoice" };
    const errors = computeErrors(form);
    expect(errors.defaultValue).toBe(
      "Cannot add default value because there are already 50 choices."
    );
  });

  it("returns empty object if no validation errors", () => {
    const choices = "apple\nbanana";
    const form = { ...baseForm, label: "Label", choices, defaultValue: "apple" };
    const errors = computeErrors(form);
    expect(errors).toEqual({});
  });
});
