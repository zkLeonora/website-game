// app/admin/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leyndell - Admin Page",
  description: "Halaman admin Leyndell untuk pengelolaan data.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
