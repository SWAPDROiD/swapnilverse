import { act, render, screen } from "@testing-library/react";
import BarGraph from "@/components/BarGraph";

const data = [
  { name: "React", value: 94, color: "#6366f1" },
  { name: "TypeScript", value: 90, color: "#8b5cf6" },
];

describe("BarGraph", () => {
  it("renders the chart primitives after mount", async () => {
    render(<BarGraph data={data} />);

    await act(async () => {
      await Promise.resolve();
    });

    expect(screen.getByTestId("cartesian-grid")).toBeInTheDocument();
    expect(screen.getByTestId("x-axis")).toBeInTheDocument();
    expect(screen.getByTestId("y-axis")).toBeInTheDocument();
  });

  it("initializes responsive behavior and keeps the chart non-interactive", async () => {
    const { container } = render(<BarGraph data={data} />);

    await act(async () => {
      await Promise.resolve();
    });

    expect(window.matchMedia).toHaveBeenCalledWith("(max-width: 767px)");
    expect(screen.getAllByTestId("bar-cell")).toHaveLength(data.length);
    expect(container.firstChild).toHaveClass("select-none");
  });
});
