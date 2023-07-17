import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Products",
  description: "Products section of dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
