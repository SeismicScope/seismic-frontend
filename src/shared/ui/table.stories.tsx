import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

type TableProps = React.ComponentProps<typeof Table>;

const meta: Meta<TableProps> = {
  title: "Components/Table",
  component: Table,
  tags: ["stage-1"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<TableProps>;

const data = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor" },
  { id: 3, name: "Alex Johnson", email: "alex@example.com", role: "Viewer" },
];

export const Default: Story = {
  args: {
    children: (
      <>
        <TableCaption>Users overview</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    children: (
      <>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Pro Plan</TableCell>
            <TableCell>$29</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Enterprise</TableCell>
            <TableCell>$99</TableCell>
            <TableCell>Pending</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell>$128</TableCell>
          </TableRow>
        </TableFooter>
      </>
    ),
  },
};

export const SelectableRow: Story = {
  args: {
    children: (
      <>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow data-state="selected">
            <TableCell>Selected User</TableCell>
            <TableCell>Admin</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Regular User</TableCell>
            <TableCell>Viewer</TableCell>
          </TableRow>
        </TableBody>
      </>
    ),
  },
};
