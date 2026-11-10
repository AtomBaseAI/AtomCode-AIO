import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { getBrandingSettings } from "@/lib/branding-settings";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export async function generateMetadata(): Promise<Metadata> {
  // Browser tab title follows the admin-configured client name
  // (DB override → env default). Fault-tolerant: never blocks rendering.
  try {
    const { clientName } = await getBrandingSettings();
    return {
      title: clientName,
      description: "Atom Code — Campus coding platform (Admin / Staff / Student)",
    };
  } catch {
    return {
      title: "Atom Code Campus",
      description: "Atom Code — Campus coding platform (Admin / Staff / Student)",
    };
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
