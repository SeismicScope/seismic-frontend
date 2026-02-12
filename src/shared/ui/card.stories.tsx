import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import { Button } from "@/shared/ui/button";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["stage-1"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<React.ComponentProps<typeof Card>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-[380px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          This is a simple card description to explain the content.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          Card content goes here. You can place any components inside.
        </p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithAction: Story = {
  render: (args) => (
    <Card {...args} className="w-[380px]">
      <CardHeader>
        <CardTitle>Project Overview</CardTitle>
        <CardDescription>
          Summary of the current project status.
        </CardDescription>
        <CardAction>
          <Button size="sm" variant="outline">
            Edit
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          The project is on track and all milestones are being completed on
          time.
        </p>
      </CardContent>
    </Card>
  ),
};

export const WithBorderedSections: Story = {
  render: (args) => (
    <Card {...args} className="w-[380px]">
      <CardHeader className="border-b">
        <CardTitle>Subscription</CardTitle>
        <CardDescription>Manage your subscription plan.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">Current plan: Pro</p>
      </CardContent>
      <CardFooter className="justify-between border-t">
        <span className="text-muted-foreground text-sm">Renews on 24 Dec</span>
        <Button size="sm">Upgrade</Button>
      </CardFooter>
    </Card>
  ),
};

export const Minimal: Story = {
  render: (args) => (
    <Card {...args} className="w-[380px] p-6">
      <p className="text-sm">Minimal card without header/footer sections.</p>
    </Card>
  ),
};
