import type { Metadata } from "next";

export async function generateMetadata({ params: { id } }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: `Dashboard - Carts ${id}`,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
