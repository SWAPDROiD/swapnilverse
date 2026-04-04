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
});
