import { fireEvent, render, screen } from "@testing-library/react";
import Toolbox from "@/sections/Toolbox";

describe("Toolbox", () => {
  it("renders the CTA and opens the toolbox modal", () => {
    render(<Toolbox />);

    fireEvent.click(screen.getByRole("button", { name: /View my toolbox/i }));
    expect(screen.getByRole("button", { name: "Close toolbox modal" })).toBeInTheDocument();
  });

  it("closes the modal on escape key", () => {
    render(<Toolbox />);
    fireEvent.click(screen.getByRole("button", { name: /View my toolbox/i }));

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByText("A curated list of tools, editors, and resources I use daily.")).not.toBeInTheDocument();
  });

  it("closes the modal on outside click", () => {
    render(<Toolbox />);
    fireEvent.click(screen.getByRole("button", { name: /View my toolbox/i }));

    fireEvent.mouseDown(screen.getByRole("dialog").parentElement as HTMLElement);

    expect(screen.queryByRole("button", { name: "Close toolbox modal" })).not.toBeInTheDocument();
  });
});
