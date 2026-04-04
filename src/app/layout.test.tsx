import { render, screen } from "@testing-library/react";
import RootLayout, { metadata } from "@/app/layout";

describe("RootLayout", () => {
  it("exports portfolio metadata", () => {
    expect(metadata.title).toBe("Swapnil Nandapure | Senior Software Engineer | React Java TypeScript GenAI");
    expect(metadata.openGraph?.type).toBe("website");
  });

  it("renders children and analytics scripts", () => {
    render(
      <RootLayout>
        <div>App child</div>
      </RootLayout>,
    );

    expect(screen.getByText("App child")).toBeInTheDocument();
    expect(document.querySelectorAll("script")).toHaveLength(2);
  });
});
