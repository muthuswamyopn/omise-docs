import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Omise API Reference",
  description: "Complete API documentation for Omise payment platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
