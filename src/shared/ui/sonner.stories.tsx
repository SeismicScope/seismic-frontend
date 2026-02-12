import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { toast } from "sonner";

import { Button } from "@/shared/ui/button";

import { Toaster } from "./sonner";

type ToasterProps = React.ComponentProps<typeof Toaster>;

const meta: Meta<ToasterProps> = {
  title: "Components/Toaster",
  component: Toaster,
  tags: ["stage-1"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<ToasterProps>;

export const Playground: Story = {
  render: (args) => (
    <div className="space-y-4">
      <Toaster {...args} />
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => toast.success("Success notification")}>
          Success
        </Button>
        <Button
          onClick={() => toast.info("Info notification")}
          variant="secondary"
        >
          Info
        </Button>
        <Button
          onClick={() => toast.warning("Warning notification")}
          variant="outline"
        >
          Warning
        </Button>
        <Button
          onClick={() => toast.error("Error notification")}
          variant="destructive"
        >
          Error
        </Button>
        <Button
          onClick={() =>
            toast.loading("Loading...", {
              duration: 2000,
            })
          }
          variant="ghost"
        >
          Loading
        </Button>
      </div>
    </div>
  ),
};
