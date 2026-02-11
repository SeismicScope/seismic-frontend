import type { Meta, StoryObj } from "@storybook/react";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "./alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["stage-1"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["default", "destructive"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
  },
  render: (args) => (
    <Alert {...args} className="max-w-md">
      <AlertCircle />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        This is a default alert — you can use it for neutral information.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
  },
  render: (args) => (
    <Alert {...args} className="max-w-md">
      <AlertCircle />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Something went wrong. Please try again later.
      </AlertDescription>
    </Alert>
  ),
};

export const WithoutIcon: Story = {
  args: {
    variant: "default",
  },
  render: (args) => (
    <Alert {...args} className="max-w-md">
      <AlertTitle>No icon alert</AlertTitle>
      <AlertDescription>
        This alert works without an icon as well.
      </AlertDescription>
    </Alert>
  ),
};
