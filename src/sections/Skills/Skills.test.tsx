import { render, screen } from "@testing-library/react";
import Skills from "@/sections/Skills";

describe("Skills", () => {
  it("renders skill categories and their items", () => {
    render(<Skills />);

    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(screen.getByText("Web")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("ChatGPT")).toBeInTheDocument();
  });
});
