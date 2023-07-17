import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Carts",
  description: "Carts section of dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
