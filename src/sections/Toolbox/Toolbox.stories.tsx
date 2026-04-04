import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Toolbox from "./Toolbox";

const meta = {
  title: "Sections/Toolbox",
  component: Toolbox,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Toolbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
