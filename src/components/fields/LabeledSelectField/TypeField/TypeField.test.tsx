import { render, screen, fireEvent } from "@testing-library/react";
import TypeField from "./index";
import { TypeOptionValue } from "../../../../types";

describe("TypeField", () => {
  const setup = (value = "single", onChange = jest.fn()) => {
    render(<TypeField value={value} onChange={onChange} />);
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    return { select, onChange };
  };

  it("renders both type options with correct values", () => {
    setup();

    expect(screen.getByRole("option", { name: /single select/i })).toHaveValue(
      "single"
    );

    expect(screen.getByRole("option", { name: /multi-select/i })).toHaveValue(
      TypeOptionValue.MULTI
    );
  });

  it("sets the initial value", () => {
    const { select } = setup(TypeOptionValue.MULTI);
    expect(select).toHaveValue(TypeOptionValue.MULTI);
  });

  it("calls onChange when selecting a different option", () => {
    const handleChange = jest.fn();
    const { select } = setup("single", handleChange);
    fireEvent.change(select, { target: { value: TypeOptionValue.MULTI } });
    expect(handleChange).toHaveBeenCalledWith(TypeOptionValue.MULTI);
  });
});
