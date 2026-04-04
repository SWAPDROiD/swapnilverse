import { fireEvent, render, screen } from "@testing-library/react";
import AboutModal from "@/components/AboutModal";

describe("AboutModal", () => {
  it("renders dialog content when open", () => {
    render(<AboutModal open onClose={jest.fn()} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Welcome to my little corner of the internet!")).toBeInTheDocument();
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
});
