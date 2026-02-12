import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["stage-1"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: "radio",
      options: ["single", "multiple"],
    },
    collapsible: {
      control: "boolean",
    },
  },
} satisfies Meta<React.ComponentProps<typeof Accordion>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    type: "single",
    collapsible: true,
  },
  render: (args) => (
    <Accordion {...args} className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is SeismicScope?</AccordionTrigger>
        <AccordionContent>
          SeismicScope is a platform for importing, storing and analyzing
          earthquake data with spatial queries and caching.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>How many records can it handle?</AccordionTrigger>
        <AccordionContent>
          The backend is optimized for 800k+ records using PostGIS indexing and
          Redis caching.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>Is it scalable?</AccordionTrigger>
        <AccordionContent>
          Yes, the architecture is designed to be scalable and production-ready.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  args: {
    type: "multiple",
  },
  render: (args) => (
    <Accordion {...args} className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>First section</AccordionTrigger>
        <AccordionContent>
          You can open multiple sections at the same time.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Second section</AccordionTrigger>
        <AccordionContent>
          This is useful for FAQs or documentation blocks.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>Third section</AccordionTrigger>
        <AccordionContent>
          Works perfectly with Radix primitives and Tailwind styling.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const DefaultOpen: Story = {
  args: {
    type: "single",
    collapsible: true,
    defaultValue: "item-1",
  },
  render: (args) => (
    <Accordion {...args} className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Opened by default</AccordionTrigger>
        <AccordionContent>
          This item is open by default using the <code>defaultValue</code> prop.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Closed initially</AccordionTrigger>
        <AccordionContent>
          This one stays closed until the user interacts with it.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
