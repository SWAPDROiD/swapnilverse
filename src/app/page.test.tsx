import { render, screen } from "@testing-library/react";
import Page from "@/app/page";

jest.mock("@/components/Footer", () => () => <div>Footer mock</div>);
jest.mock("@/components/Navbar", () => () => <div>Navbar mock</div>);
jest.mock("@/components/ScrollToTopButton", () => () => <div>Scroll button mock</div>);
jest.mock("@/sections/About", () => () => <div>About section mock</div>);
jest.mock("@/sections/Contact", () => () => <div>Contact section mock</div>);
jest.mock("@/sections/Hero", () => () => <div>Hero section mock</div>);
jest.mock("@/sections/Projects", () => () => <div>Projects section mock</div>);
jest.mock("@/sections/Skills", () => () => <div>Skills section mock</div>);
jest.mock("@/sections/Toolbox", () => () => <div>Toolbox section mock</div>);

describe("Page", () => {
  it("renders the portfolio layout sections", () => {
    render(<Page />);

    expect(screen.getByText("Navbar mock")).toBeInTheDocument();
    expect(screen.getByText("Hero section mock")).toBeInTheDocument();
    expect(screen.getByText("Toolbox section mock")).toBeInTheDocument();
    expect(screen.getByText("Contact section mock")).toBeInTheDocument();
    expect(screen.getByText("Footer mock")).toBeInTheDocument();
  });
});
