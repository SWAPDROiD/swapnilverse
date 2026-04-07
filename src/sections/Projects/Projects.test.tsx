import { fireEvent, render, screen } from "@testing-library/react";
import Projects from "@/sections/Projects";

describe("Projects", () => {
  it("renders project cards", () => {
    render(<Projects />);

    expect(screen.getByText("Featured Projects")).toBeInTheDocument();
    expect(screen.getByText("Slasher")).toBeInTheDocument();
    expect(screen.getByText("The Collective")).toBeInTheDocument();
  });

  it("opens and closes project details modal", () => {
    render(<Projects />);

    fireEvent.click(screen.getAllByRole("button", { name: "View Details" })[0]);
    expect(screen.getByRole("button", { name: "Close project details" })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("button", { name: "Close project details" })).not.toBeInTheDocument();
  });

  it("closes the details modal on outside click", () => {
    render(<Projects />);

    fireEvent.click(screen.getAllByRole("button", { name: "View Details" })[0]);
    fireEvent.mouseDown(screen.getByRole("dialog").parentElement as HTMLElement);

    expect(screen.queryByRole("button", { name: "Close project details" })).not.toBeInTheDocument();
  });

  it("traps focus inside the modal when tabbing", () => {
    render(<Projects />);

    fireEvent.click(screen.getAllByRole("button", { name: "View Details" })[0]);
    const focusables = screen
      .getByRole("dialog")
      .querySelectorAll<HTMLElement>('a,button,[tabindex]:not([tabindex="-1"])');
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    last.focus();
    fireEvent.keyDown(window, { key: "Tab" });
    expect(first).toHaveFocus();

    first.focus();
    fireEvent.keyDown(window, { key: "Tab", shiftKey: true });
    expect(last).toHaveFocus();
  });
});
