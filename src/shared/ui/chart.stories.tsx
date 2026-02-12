import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart";

const data = [
  { month: "Jan", revenue: 4000, profit: 2400 },
  { month: "Feb", revenue: 3000, profit: 1398 },
  { month: "Mar", revenue: 2000, profit: 9800 },
  { month: "Apr", revenue: 2780, profit: 3908 },
  { month: "May", revenue: 1890, profit: 4800 },
  { month: "Jun", revenue: 2390, profit: 3800 },
];

const config = {
  revenue: { label: "Revenue", color: "#3b82f6" },
  profit: { label: "Profit", color: "#22c55e" },
};

type ChartProps = React.ComponentProps<typeof ChartContainer>;

const meta: Meta<ChartProps> = {
  title: "Components/Chart",
  component: ChartContainer,
  tags: ["stage-1"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<ChartProps>;

export const LineExample: Story = {
  args: {
    config,
    className: "w-[600px] h-[350px]",
    children: (
      <LineChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="var(--color-revenue)"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="profit"
          stroke="var(--color-profit)"
          strokeWidth={2}
        />
      </LineChart>
    ),
  },
};

export const BarExample: Story = {
  args: {
    config,
    className: "w-[600px] h-[350px]",
    children: (
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="revenue"
          fill="var(--color-revenue)"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="profit"
          fill="var(--color-profit)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    ),
  },
};
