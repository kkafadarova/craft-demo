import { render, screen, fireEvent } from "@testing-library/react";
import OrderField from "./index";
import { OrderOptionValue } from "../../../../types";

describe("OrderField", () => {
  const setup = (value = OrderOptionValue.ASC, onChange = jest.fn()) => {
    render(<OrderField value={value} onChange={onChange} />);
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    return { select, onChange };
  };

  it("renders both order options", () => {
    const { select } = setup();
    const options = screen.getAllByRole("option") as HTMLOptionElement[];

    expect(options).toHaveLength(2);
    expect(options[0].value).toBe(OrderOptionValue.ASC);
    expect(options[1].value).toBe(OrderOptionValue.DESC);
    expect(select.value).toBe(OrderOptionValue.ASC);
  });

  it("sets the initial value", () => {
    const { select } = setup(OrderOptionValue.DESC);
    expect(select.value).toBe(OrderOptionValue.DESC);
  });

  it("calls onChange when selecting a different option", () => {
    const handleChange = jest.fn();
    const { select } = setup(OrderOptionValue.ASC, handleChange);
    fireEvent.change(select, { target: { value: OrderOptionValue.DESC } });
    expect(handleChange).toHaveBeenCalledWith(OrderOptionValue.DESC);
  });
});
