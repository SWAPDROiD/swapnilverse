import { fireEvent, render, screen } from "@testing-library/react";
import AboutModal from "@/components/AboutModal";

describe("AboutModal", () => {
  it("does not render when closed", () => {
    render(<AboutModal open={false} onClose={jest.fn()} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders dialog content when open", () => {
    render(<AboutModal open onClose={jest.fn()} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Welcome to my little corner of the internet!")).toBeInTheDocument();
  });

  it("locks and restores body scroll while open", () => {
    document.body.style.overflow = "auto";
    const { rerender, unmount } = render(<AboutModal open onClose={jest.fn()} />);

    expect(document.body.style.overflow).toBe("hidden");

    rerender(<AboutModal open={false} onClose={jest.fn()} />);
    expect(document.body.style.overflow).toBe("auto");

    rerender(<AboutModal open onClose={jest.fn()} />);
    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    expect(document.body.style.overflow).toBe("auto");
  });

  it("closes on close button click", () => {
    const onClose = jest.fn();
    render(<AboutModal open onClose={onClose} />);

    fireEvent.click(screen.getByRole("button", { name: "Close about modal" }));
    expect(onClose).toHaveBeenCalled();
  });

  it("closes on escape key", () => {
    const onClose = jest.fn();
    render(<AboutModal open onClose={onClose} />);

    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  it("closes on outside click", () => {
    const onClose = jest.fn();
    render(<AboutModal open onClose={onClose} />);

    fireEvent.mouseDown(screen.getByRole("dialog").parentElement as HTMLElement);
    expect(onClose).toHaveBeenCalled();
  });

  it("does not close when clicking inside the dialog", () => {
    const onClose = jest.fn();
    render(<AboutModal open onClose={onClose} />);

    fireEvent.mouseDown(screen.getByRole("dialog"));
    expect(onClose).not.toHaveBeenCalled();
  });
});
