import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Section from "./Section";

const meta = {
  title: "Components/Section",
  component: Section,
  args: {
    id: "storybook-section",
    className: "rounded-2xl border border-border bg-[rgba(13,21,38,0.72)] p-8 text-text-primary",
    children: <p>Reusable section wrapper content.</p>,
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Section>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Spacious: Story = {
  args: {
    className:
      "rounded-3xl border border-border bg-[rgba(13,21,38,0.72)] px-10 py-16 text-text-primary shadow-2xl",
    children: <p>Extra breathing room for larger landing-page sections.</p>,
  },
};
