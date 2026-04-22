import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "@/components/Search/SearchBar";

const push = jest.fn();
const replaceState = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  usePathname: () => "/",
}));

describe("SearchBar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '<header></header><section id="skills"></section><section id="contact"></section>';
    window.history.replaceState = replaceState;
    Object.defineProperty(window, "requestAnimationFrame", {
      writable: true,
      value: (callback: FrameRequestCallback) => {
        callback(0);
        return 0;
      },
    });

    const contact = document.getElementById("contact");
    if (contact) {
      contact.scrollIntoView = jest.fn();
    }
  });

  it("shows popular sections on focus", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);

    await user.click(screen.getByPlaceholderText("Search sections"));

    expect(await screen.findByText("Hi, I'm Swapnil Nandapure")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("filters results and supports keyboard navigation", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);

    const input = screen.getByPlaceholderText("Search sections");
    await user.click(input);
    await user.type(input, "react");

    await waitFor(() => {
      expect(screen.getAllByText("React").length).toBeGreaterThan(0);
    });

    fireEvent.keyDown(input, { key: "ArrowDown" });

    expect(input).toHaveAttribute("aria-expanded", "true");
    expect(input.getAttribute("aria-activedescendant")).toMatch(/^search-result-/);
  });
});
