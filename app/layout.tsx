import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "@/styles/global.css";
import { SiteProviders } from "@/components/ui/SiteProviders";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"]
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "ECHO | AI-Native Film Studio",
    template: "%s | ECHO"
  },
  description:
    "ECHO is an AI-native film studio operating at the intersection of cinema and computation.",
  metadataBase: new URL("https://echo.studio"),
  openGraph: {
    title: "ECHO | AI-Native Film Studio",
    description:
      "VFX, feature films, short films, music videos, and commercial work shaped through cinema and computation.",
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000"
};

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <SiteProviders>
          {children}
          {modal}
        </SiteProviders>
      </body>
    </html>
  );
}
