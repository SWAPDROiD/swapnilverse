import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import BarGraph from "./BarGraph";

const defaultData = [
  { name: "React", value: 94, color: "#6366f1" },
  { name: "TypeScript", value: 90, color: "#8b5cf6" },
  { name: "AI", value: 86, color: "#ec4899" },
  { name: "Testing", value: 82, color: "#14b8a6" },
];

const compactData = [
  { name: "Docs", value: 22, color: "#6366f1" },
  { name: "Ops", value: 38, color: "#8b5cf6" },
  { name: "UX", value: 48, color: "#ec4899" },
];

const meta = {
  title: "Components/BarGraph",
  component: BarGraph,
  args: {
    data: defaultData,
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof BarGraph>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CompactBars: Story = {
  args: {
    data: compactData,
  },
};
