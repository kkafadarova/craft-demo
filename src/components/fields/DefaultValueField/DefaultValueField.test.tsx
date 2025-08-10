import { render, screen, fireEvent } from "@testing-library/react";
import DefaultValueField from "./";

describe("DefaultValueField", () => {
  const setup = (value = "", onChange = jest.fn()) => {
    render(<DefaultValueField value={value} onChange={onChange} />);
    const input = screen.getByPlaceholderText(
      "Enter a default value"
    ) as HTMLInputElement;
    return { input, onChange };
  };

  it("renders label 'Default Value'", () => {
    setup();
    expect(screen.getByText("Default Value")).toBeInTheDocument();
  });

  it("renders input with placeholder", () => {
    const { input } = setup();
    expect(input).toBeInTheDocument();
    expect(input.placeholder).toBe("Enter a default value");
  });

  it("displays initial value", () => {
    const { input } = setup("Banana");
    expect(input.value).toBe("Banana");
  });

  it("calls onChange with new value when typing", () => {
    const handleChange = jest.fn();
    const { input } = setup("", handleChange);

    fireEvent.change(input, { target: { value: "Apple" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith("Apple");
  });
});
