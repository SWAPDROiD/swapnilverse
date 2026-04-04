import { fireEvent, render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar";

jest.mock("@/hooks/useActiveSection", () => ({
  useActiveSection: jest.fn(() => "about"),
}));

describe("Navbar", () => {
  beforeEach(() => {
    document.body.innerHTML = '<header></header><section id="home"></section><section id="about"></section>';
    Object.defineProperty(window, "pageYOffset", { value: 50, writable: true });
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
    Object.defineProperty(window, "requestAnimationFrame", {
      writable: true,
      value: (callback: FrameRequestCallback) => {
        callback(0);
        return 0;
      },
    });

    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.getBoundingClientRect = () =>
        ({ top: 200, bottom: 0, left: 0, right: 0, width: 0, height: 0, x: 0, y: 0, toJSON: () => ({}) });
    }
  });

  it("renders navigation links and active state", () => {
    render(<Navbar />);

    expect(screen.getByRole("button", { name: "About" })).toHaveClass("text-white");
    expect(screen.getByRole("link", { name: "Resume" })).toHaveAttribute("target", "_blank");
  });

  it("toggles mobile navigation", () => {
    render(<Navbar />);

    fireEvent.click(screen.getByRole("button", { name: "Toggle mobile navigation" }));
    expect(screen.getAllByRole("button", { name: "Projects" })).not.toHaveLength(0);
  });

  it("scrolls to a section when a nav item is clicked", () => {
    render(<Navbar />);

    fireEvent.click(screen.getByRole("button", { name: "About" }));

    expect(window.scrollTo).toHaveBeenCalled();
  });
});
