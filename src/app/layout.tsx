import { Sidebar } from "~/components";
import "./globals.css";

export const metadata = {
  title: "Dealls Dashboard",
  description: "Dashboard to manage transactions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  );
}
