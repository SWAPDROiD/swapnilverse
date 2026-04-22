import { render, screen } from "@testing-library/react";
import Skills from "@/sections/Skills";
import { SKILL_CATEGORIES } from "@/constants/skills";

describe("Skills", () => {
  it("renders skill categories and their items", () => {
    render(<Skills />);

    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(screen.getByText("Web")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("ChatGPT")).toBeInTheDocument();
  });

  it("renders a progress bar for each skill item", () => {
    const { container } = render(<Skills />);

    expect(container.querySelectorAll(".bg-accent")).toHaveLength(
      SKILL_CATEGORIES.flatMap((category) => category.items).length,
    );
  });
});
