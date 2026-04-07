import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

describe("Footer", () => {
  it("renders the current year and footer social links", () => {
    render(<Footer />);

    expect(screen.getByText(new RegExp(`${new Date().getFullYear()}`))).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "LinkedIn" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "GitHub" }).className).toContain("bg-transparent");
  });
});
