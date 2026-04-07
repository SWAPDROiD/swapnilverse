import { fireEvent, render, screen } from "@testing-library/react";
import About from "@/sections/About";

describe("About", () => {
  it("renders summary cards and opens the about modal", () => {
    render(<About />);

    expect(screen.getByText("Applications Delivered")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Get to know me/i }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("closes the about modal from the modal close button", () => {
    render(<About />);

    fireEvent.click(screen.getByRole("button", { name: /Get to know me/i }));
    fireEvent.click(screen.getByRole("button", { name: "Close about modal" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
