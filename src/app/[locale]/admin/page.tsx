import type { Metadata } from "next";

import AdminContent from "./admin-content";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin panel for managing earthquake data imports.",
};

export default function AdminPage() {
  return (
    <div className="mt-5 w-full px-4 lg:px-10">
      <h1 className="text-2xl font-bold">Admin</h1>
      <AdminContent />
    </div>
  );
}
