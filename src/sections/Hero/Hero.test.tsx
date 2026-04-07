import { act, fireEvent, render, screen } from "@testing-library/react";
import Hero from "@/sections/Hero";

describe("Hero", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    document.body.innerHTML = '<section id="contact"></section><section id="projects"></section>';
    const contact = document.getElementById("contact");
    const projects = document.getElementById("projects");
    contact?.scrollIntoView?.bind(contact);
    projects?.scrollIntoView?.bind(projects);
    if (contact) contact.scrollIntoView = jest.fn();
    if (projects) projects.scrollIntoView = jest.fn();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it("renders hero content and scroll CTA buttons", () => {
    render(<Hero />);

    expect(screen.getByText("Hi, I'm Swapnil Nandapure")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Download Resume" })).toHaveAttribute("target", "_blank");
    fireEvent.click(screen.getByRole("button", { name: "Hire Me" }));
    fireEvent.click(screen.getByRole("button", { name: "View Projects" }));

    expect(document.getElementById("contact")?.scrollIntoView).toHaveBeenCalled();
    expect(document.getElementById("projects")?.scrollIntoView).toHaveBeenCalled();
  });

  it("types out a role over time", () => {
    const { container } = render(<Hero />);

    act(() => {
      jest.advanceTimersByTime(100);
    });

    const typingLine = container.querySelector("p");
    expect(typingLine?.textContent).toContain("S");
  });

  it("does not fail when target sections are missing", () => {
    document.body.innerHTML = "";
    render(<Hero />);

    fireEvent.click(screen.getByRole("button", { name: "Hire Me" }));
    fireEvent.click(screen.getByRole("button", { name: "View Projects" }));

    expect(window.scrollTo).not.toHaveBeenCalled();
  });
});
