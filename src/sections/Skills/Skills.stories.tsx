import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Skills from "./Skills";

const meta = {
  title: "Sections/Skills",
  component: Skills,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Skills>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
