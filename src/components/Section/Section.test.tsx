import { render, screen } from "@testing-library/react";
import Section from "@/components/Section";

describe("Section", () => {
  it("renders children with id and class name", () => {
    render(
      <Section id="sample" className="py-10">
        <p>Section body</p>
      </Section>,
    );

    const section = screen.getByText("Section body").closest("section");

    expect(section).toHaveAttribute("id", "sample");
    expect(section).toHaveClass("py-10");
  });
});
