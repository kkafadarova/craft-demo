import { render, screen, fireEvent } from "@testing-library/react";
import LabelField from "./index";

describe("LabelField", () => {
  const setup = (value = "", onChange = jest.fn(), error?: string) => {
    render(<LabelField value={value} onChange={onChange} error={error} />);
    const input = screen.getByPlaceholderText(
      "Enter a label field"
    ) as HTMLInputElement;
    return { input, onChange };
  };

  it("renders the label text", () => {
    setup();
    expect(screen.getByText("Label")).toBeInTheDocument();
  });

  it("renders input with placeholder", () => {
    const { input } = setup();
    expect(input).toBeInTheDocument();
    expect(input.placeholder).toBe("Enter a label field");
  });

  it("displays the initial value", () => {
    const { input } = setup("Sales Region");
    expect(input.value).toBe("Sales Region");
  });

  it("calls onChange with new value when typing", () => {
    const handleChange = jest.fn();
    const { input } = setup("", handleChange);

    fireEvent.change(input, { target: { value: "Region" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith("Region");
  });

  it("shows error text and applies error class when error prop is provided", () => {
    const errorMessage = "Label is required.";
    const { input } = setup("", jest.fn(), errorMessage);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();

    expect(input.className).toMatch(/inputError/);
  });

  it("does not render error element when error is undefined", () => {
    setup("", jest.fn(), undefined);
    expect(screen.queryByText(/Label is required/i)).not.toBeInTheDocument();
  });
});
