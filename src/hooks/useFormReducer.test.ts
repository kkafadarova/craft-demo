import { renderHook, act } from "@testing-library/react";
import { useFormReducer } from "./useFormReducer";
import type { FormErrors } from "../types";
import * as helpers from "../helpers";

describe("useFormReducer", () => {
  const mockErrors: FormErrors = { label: "Label is required." };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("loads saved form data from localStorage", () => {
    const savedForm = {
      label: "Saved",
      defaultValue: "Def",
      choices: "One\nTwo",
      required: true,
      order: "asc",
      type: "text",
    };
    localStorage.setItem("fieldForm", JSON.stringify(savedForm));

    const { result } = renderHook(() => useFormReducer("fieldForm"));
    expect(result.current.form.label).toBe("Saved");
    expect(result.current.form.choices).toBe("One\nTwo");
  });

  it("updates form state with updateForm", () => {
    const { result } = renderHook(() => useFormReducer());
    act(() => {
      result.current.updateForm({ label: "New Label" });
    });
    expect(result.current.form.label).toBe("New Label");
  });

  it("resets form state with resetForm", () => {
    const { result } = renderHook(() => useFormReducer());
    act(() => {
      result.current.updateForm({ label: "Something" });
    });
    expect(result.current.form.label).toBe("Something");

    act(() => {
      result.current.resetForm();
    });
    expect(result.current.form.label).toBe("");
  });

  it("validates form with computeErrors and updates errors state", () => {
    const computeErrorsSpy = jest
      .spyOn(helpers, "computeErrors")
      .mockReturnValue(mockErrors);

    const { result } = renderHook(() => useFormReducer());
    act(() => {
      const errors = result.current.validateForm();
      expect(errors).toEqual(mockErrors);
    });

    expect(computeErrorsSpy).toHaveBeenCalledWith(result.current.form);
    expect(result.current.errors).toEqual(mockErrors);
  });

  it("persists form state to localStorage on change", () => {
    const { result } = renderHook(() => useFormReducer("myFormKey"));
    act(() => {
      result.current.updateForm({ label: "Persisted Label" });
    });
    const saved = JSON.parse(localStorage.getItem("myFormKey") || "{}");
    expect(saved.label).toBe("Persisted Label");
  });
});
