import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import { Calendar } from "./calendar";

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  tags: ["stage-1"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    mode: {
      control: "radio",
      options: ["single", "multiple", "range"],
    },
    showOutsideDays: {
      control: "boolean",
    },
    captionLayout: {
      control: "radio",
      options: ["label", "dropdown", "dropdown-months", "dropdown-years"],
    },
    showWeekNumber: {
      control: "boolean",
    },
    buttonVariant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
  },
} satisfies Meta<React.ComponentProps<typeof Calendar>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    mode: "single",
    selected: new Date(),
  },
};

export const Range: Story = {
  args: {
    mode: "range",
    selected: {
      from: new Date(),
      to: new Date(new Date().setDate(new Date().getDate() + 5)),
    },
  },
};

export const Multiple: Story = {
  args: {
    mode: "multiple",
    selected: [
      new Date(),
      new Date(new Date().setDate(new Date().getDate() + 2)),
      new Date(new Date().setDate(new Date().getDate() + 4)),
    ],
  },
};

export const WithDropdownCaption: Story = {
  args: {
    mode: "single",
    captionLayout: "dropdown",
  },
};

export const WithWeekNumbers: Story = {
  args: {
    mode: "single",
    showWeekNumber: true,
  },
};

export const CustomButtonVariant: Story = {
  args: {
    mode: "single",
    buttonVariant: "outline",
  },
};

const ControlledCalendar = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return <Calendar mode="single" selected={date} onSelect={setDate} />;
};

export const Controlled: Story = {
  render: () => <ControlledCalendar />,
};
