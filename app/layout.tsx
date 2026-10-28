import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Omise Documentation",
  description: "Complete API documentation for Omise payment platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <div style={{ flex: 1 }}>
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
