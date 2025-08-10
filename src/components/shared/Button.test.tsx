import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./";
import type { ButtonProps } from "../../types";

describe("Button", () => {
  const setup = (props?: Partial<ButtonProps>) => {
    const defaultProps: ButtonProps = {
      onClick: jest.fn(),
      children: "Click me",
      ...props,
    };
    render(<Button {...defaultProps} />);
    return defaultProps;
  };

  it("renders with default props", () => {
    setup();
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("button", "primary");
  });

  it("applies negative variant", () => {
    setup({ variant: "negative" });
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveClass("negative");
  });

  it("calls onClick when clicked", () => {
    const props = setup();
    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);
    expect(props.onClick).toHaveBeenCalledTimes(1);
  });

  it("displays loader and disables when isLoading is true", () => {
    setup({ isLoading: true });
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(screen.getByRole("button").querySelector("span")).toHaveClass(
      "loader"
    );
  });

  it("sets the correct button type", () => {
    setup({ type: "submit" });
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
  });
});
