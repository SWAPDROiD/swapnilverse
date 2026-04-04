import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import AboutModal from "./AboutModal";

const meta = {
  title: "Components/AboutModal",
  component: AboutModal,
  args: {
    open: true,
    onClose: () => undefined,
  },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AboutModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = {};

export const Closed: Story = {
  args: {
    open: false,
  },
};
