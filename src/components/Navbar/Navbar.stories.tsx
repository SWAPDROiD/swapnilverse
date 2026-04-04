import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Navbar from "./Navbar";

const meta = {
  title: "Components/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-slate-950">
        <section id="home" />
        <section id="about" />
        <section id="skills" />
        <section id="toolbox" />
        <section id="projects" />
        <section id="contact" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
