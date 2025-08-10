import { render, screen, fireEvent } from "@testing-library/react";
import OrderField from "./index";

describe("OrderField", () => {
  const setup = (value = "asc", onChange = jest.fn()) => {
    render(<OrderField value={value} onChange={onChange} />);
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    return { select, onChange };
  };

  it("renders the label text", () => {
    render(<OrderField value="asc" onChange={jest.fn()} />);
    expect(screen.getByText("Order")).toBeInTheDocument();
  });

  it("renders both order options", () => {
    const { select } = setup();
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(2);
    expect(options[0].value).toBe("asc");
    expect(options[1].value).toBe("desc");
    expect(select.value).toBe("asc");
  });

  it("sets the initial value correctly", () => {
    const { select } = setup("desc");
    expect(select.value).toBe("desc");
  });

  it("calls onChange when selecting a different option", () => {
    const handleChange = jest.fn();
    const { select } = setup("asc", handleChange);

    fireEvent.change(select, { target: { value: "desc" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith("desc");
  });
});
