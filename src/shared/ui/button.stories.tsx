import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRight, Trash } from "lucide-react";
import * as React from "react";

import { Button } from "./button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["stage-1"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
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
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"],
    },
    asChild: {
      control: "boolean",
    },
  },
} satisfies Meta<React.ComponentProps<typeof Button>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Click me",
    variant: "default",
    size: "default",
  },
};

export const Destructive: Story = {
  args: {
    children: "Delete",
    variant: "destructive",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost",
    variant: "ghost",
  },
};

export const Link: Story = {
  args: {
    children: "Link Button",
    variant: "link",
  },
};

export const Small: Story = {
  args: {
    children: "Small Button",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    children: "Large Button",
    size: "lg",
  },
};

export const Icon: Story = {
  args: {
    size: "icon",
    children: <Trash />,
    "aria-label": "Delete",
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        Continue
        <ArrowRight />
      </>
    ),
  },
};

export const AsChild: Story = {
  render: (args) => (
    <Button asChild {...args}>
      <a href="#">Link Button</a>
    </Button>
  ),
};
