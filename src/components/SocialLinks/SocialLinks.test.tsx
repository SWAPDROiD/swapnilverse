import { render, screen } from "@testing-library/react";
import SocialLinks, { SOCIAL_LINKS } from "@/components/SocialLinks";

describe("SocialLinks", () => {
  it("renders all social media links with href and target", () => {
    render(<SocialLinks />);

    for (const item of SOCIAL_LINKS) {
      const link = screen.getByRole("link", { name: item.name });
      expect(link).toHaveAttribute("href", item.href);
      expect(link).toHaveAttribute("target", "_blank");
    }
  });

  it("shows tooltip text when enabled", () => {
    render(<SocialLinks showTooltip />);

    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByText("YouTube")).toBeInTheDocument();
  });

  it("applies minimal variant classes for footer usage", () => {
    render(<SocialLinks variant="minimal" />);

    const link = screen.getByRole("link", { name: "GitHub" });
    expect(link.className).toContain("bg-transparent");
  });

  it("applies large sizing classes when requested", () => {
    render(<SocialLinks size="lg" />);

    expect(screen.getByRole("link", { name: "GitHub" }).className).toContain("p-3");
  });
});
