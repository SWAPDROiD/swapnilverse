import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SocialLinks from "./SocialLinks";

const meta = {
  title: "Components/SocialLinks",
  component: SocialLinks,
  args: {
    size: "md",
    variant: "rounded",
    showTooltip: false,
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof SocialLinks>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Minimal: Story = {
  args: {
    variant: "minimal",
    size: "sm",
  },
};

export const WithTooltips: Story = {
  args: {
    showTooltip: true,
    size: "lg",
  },
};
