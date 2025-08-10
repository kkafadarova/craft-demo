import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "./index";

describe("Footer", () => {
  const setup = (
    isSubmitting = false,
    handleSubmit = jest.fn(),
    handleClear = jest.fn()
  ) => {
    render(
      <Footer
        isSubmitting={isSubmitting}
        handleSubmit={handleSubmit}
        handleClear={handleClear}
      />
    );
  };

  it("renders Submit and Clear buttons (idle)", () => {
    setup(false);
    const submitButton = screen.getByRole("button", { name: /submit/i });
    const clearButton = screen.getByRole("button", { name: /clear/i });
    expect(submitButton).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();
  });

  it("calls handlers on click (idle)", () => {
    const handleSubmit = jest.fn();
    const handleClear = jest.fn();
    setup(false, handleSubmit, handleClear);

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    fireEvent.click(screen.getByRole("button", { name: /clear/i }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleClear).toHaveBeenCalledTimes(1);
  });

  it("disables the Submit button while submitting (no accessible name when loading)", () => {
    setup(true);
    const [submitButton, clearButton] = screen.getAllByRole("button");
    expect(submitButton).toBeDisabled();
    expect(clearButton).not.toBeDisabled();
  });
});
