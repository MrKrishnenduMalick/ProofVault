import type { Metadata } from "next";
import { Inter as FontSans, Inter as FontHeading } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontHeading = FontHeading({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: "400",
});

export const metadata: Metadata = {
  title: "ProofVault - Build Your Professional Portfolio",
  description: "Showcase your work with privacy-respecting analytics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <div className="relative flex min-h-dvh flex-col bg-background">
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}