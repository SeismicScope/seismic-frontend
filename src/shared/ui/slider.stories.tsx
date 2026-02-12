import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import { Slider } from "./slider";

type SliderProps = React.ComponentProps<typeof Slider>;

const meta: Meta<SliderProps> = {
  title: "Components/Slider",
  component: Slider,
  tags: ["stage-1"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<SliderProps>;

export const Default: Story = {
  args: {
    defaultValue: [50],
    min: 0,
    max: 100,
    className: "w-[300px]",
  },
};

export const Range: Story = {
  args: {
    defaultValue: [20, 80],
    min: 0,
    max: 100,
    className: "w-[300px]",
  },
};

const ControlledSlider = () => {
  const [value, setValue] = React.useState<number[]>([40]);

  return (
    <div className="w-[300px] space-y-4">
      <Slider value={value} onValueChange={setValue} />
      <div className="text-sm">Value: {value[0]}</div>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledSlider />,
};
