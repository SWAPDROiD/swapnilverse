import { act, renderHook } from "@testing-library/react";
import { useActiveSection } from "@/hooks/useActiveSection";

declare global {
  // eslint-disable-next-line no-var
  var __intersectionObservers: Array<{ callback: IntersectionObserverCallback }>;
}

describe("useActiveSection", () => {
  it("returns the default section before intersections occur", () => {
    const { result } = renderHook(() => useActiveSection("projects"));
    expect(result.current).toBe("projects");
  });

  it("updates when an observed section intersects", () => {
    document.body.innerHTML = '<section id="skills"></section>';

    const { result } = renderHook(() => useActiveSection("home"));
    const section = document.getElementById("skills") as HTMLElement;

    act(() => {
      global.__intersectionObservers.at(-1)?.callback(
        [{ isIntersecting: true, target: section } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(result.current).toBe("skills");
  });
});
