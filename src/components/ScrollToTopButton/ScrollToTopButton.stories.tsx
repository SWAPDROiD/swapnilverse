import { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ScrollToTopButton from "./ScrollToTopButton";

function VisibleButtonStory() {
  useEffect(() => {
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 700,
      writable: true,
    });
    window.dispatchEvent(new Event("scroll"));
  }, []);

  return <ScrollToTopButton />;
}

const meta = {
  title: "Components/ScrollToTopButton",
  component: ScrollToTopButton,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="min-h-[120vh] bg-background p-6 text-text-primary">
        <p>Scroll helper story canvas</p>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ScrollToTopButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Visible: Story = {
  render: () => <VisibleButtonStory />,
};
