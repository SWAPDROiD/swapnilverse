import "@testing-library/jest-dom";
import React from "react";

const MOTION_PROPS = new Set([
  "animate",
  "drag",
  "dragConstraints",
  "dragElastic",
  "exit",
  "initial",
  "layout",
  "layoutId",
  "transition",
  "variants",
  "viewport",
  "whileFocus",
  "whileHover",
  "whileInView",
  "whileTap",
]);

function createMotionComponent(tag: keyof JSX.IntrinsicElements) {
  return React.forwardRef<HTMLElement, Record<string, unknown>>(
    ({ children, ...props }, ref) => {
      const filteredProps = Object.fromEntries(
        Object.entries(props).filter(([key]) => !MOTION_PROPS.has(key)),
      );

      return React.createElement(tag, { ...filteredProps, ref }, children);
    },
  );
}

jest.mock("framer-motion", () => {
  const motion = new Proxy(
    {},
    {
      get: (_target, key: string) => createMotionComponent(key as keyof JSX.IntrinsicElements),
    },
  );

  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    motion,
  };
});

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    alt,
    src,
    priority,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { src: string }) =>
    React.createElement("img", { alt, src, ...props }),
}));

jest.mock("next/script", () => ({
  __esModule: true,
  default: ({ children, ...props }: React.ScriptHTMLAttributes<HTMLScriptElement>) =>
    React.createElement("script", props, children),
}));

jest.mock("recharts", () => {
  const Mock = ({ children }: { children?: React.ReactNode }) =>
    React.createElement("div", null, children);
  return {
    ResponsiveContainer: Mock,
    BarChart: Mock,
    CartesianGrid: () => React.createElement("div", { "data-testid": "cartesian-grid" }),
    XAxis: () => React.createElement("div", { "data-testid": "x-axis" }),
    YAxis: () => React.createElement("div", { "data-testid": "y-axis" }),
    Bar: Mock,
    Cell: () => React.createElement("div", { "data-testid": "bar-cell" }),
    LabelList: () => React.createElement("div", { "data-testid": "label-list" }),
  };
});

Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: jest.fn(),
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const intersectionObservers: Array<{ callback: IntersectionObserverCallback }> = [];

class IntersectionObserverMock {
  callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    intersectionObservers.push({ callback });
  }

  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: IntersectionObserverMock,
});

Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  value: IntersectionObserverMock,
});

Object.defineProperty(global, "__intersectionObservers", {
  writable: true,
  value: intersectionObservers,
});
