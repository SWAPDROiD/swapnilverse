import { fireEvent, render, screen } from "@testing-library/react";
import ScrollToTopButton from "@/components/ScrollToTopButton";

describe("ScrollToTopButton", () => {
  it("appears after scrolling and scrolls to top on click", () => {
    render(<ScrollToTopButton />);

    expect(screen.queryByRole("button", { name: "Scroll to top" })).not.toBeInTheDocument();

    Object.defineProperty(window, "scrollY", { value: 700, writable: true });
    fireEvent.scroll(window);

    const button = screen.getByRole("button", { name: "Scroll to top" });
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});
