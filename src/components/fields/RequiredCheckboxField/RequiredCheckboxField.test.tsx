import { render, screen, fireEvent } from "@testing-library/react";
import RequiredCheckboxField from "./";

describe("RequiredCheckboxField", () => {
  const setup = (value = false, onChange = jest.fn()) => {
    render(<RequiredCheckboxField value={value} onChange={onChange} />);
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    return { checkbox, onChange };
  };

  it("renders the label text", () => {
    setup();
    expect(screen.getByText("A value is required")).toBeInTheDocument();
  });

  it("is unchecked when value is false", () => {
    const { checkbox } = setup(false);
    expect(checkbox.checked).toBe(false);
  });

  it("is checked when value is true", () => {
    const { checkbox } = setup(true);
    expect(checkbox.checked).toBe(true);
  });

  it("calls onChange with correct value when toggled", () => {
    const handleChange = jest.fn();
    const { checkbox } = setup(false, handleChange);

    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });
});
