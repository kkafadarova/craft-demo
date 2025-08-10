import { render, screen, fireEvent } from "@testing-library/react";
import ChoicesField from "./";

describe("ChoicesField", () => {
  const setup = (value = "", onChange = jest.fn(), error?: string) => {
    render(<ChoicesField value={value} onChange={onChange} error={error} />);
    const textarea = screen.getByPlaceholderText(
      "Enter each choice on a new line"
    ) as HTMLTextAreaElement;
    return { textarea, onChange };
  };

  it("renders label 'Choices'", () => {
    setup();
    expect(screen.getByText("Choices")).toBeInTheDocument();
  });

  it("renders textarea with placeholder and rows=6", () => {
    const { textarea } = setup();
    expect(textarea).toBeInTheDocument();
    expect(textarea.placeholder).toBe("Enter each choice on a new line");
    expect(textarea.getAttribute("rows")).toBe("6");
  });

  it("displays initial value", () => {
    const { textarea } = setup("Apple\nBanana");
    expect(textarea.value).toBe("Apple\nBanana");
  });

  it("calls onChange with new value when typing", () => {
    const handleChange = jest.fn();
    const { textarea } = setup("", handleChange);

    fireEvent.change(textarea, { target: { value: "New choice" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith("New choice");
  });

  it("shows error text when error prop is provided", () => {
    const errorMessage = "Duplicate choices are not allowed.";
    setup("A\nA", jest.fn(), errorMessage);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();

    const textarea = screen.getByPlaceholderText(
      "Enter each choice on a new line"
    );
    expect(textarea.className).toMatch(/inputError/);
  });

  it("does not render error element when error is undefined", () => {
    setup("", jest.fn(), undefined);
    expect(
      screen.queryByText(/Duplicate choices are not allowed./i)
    ).not.toBeInTheDocument();
  });
});
