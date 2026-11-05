import type { Metadata, Viewport } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.atharvshish.in"),
  title: "Atharvshish Barwat | Full Stack Developer & AI ML Student",
  description: "Portfolio of Atharvshish Barwat — Full Stack Developer and AI & ML Student. Building modern digital experiences, intelligent applications, and innovative software solutions. Dream. Build. Create The Future.",
  keywords: ["Atharvshish Barwat", "Full Stack Developer", "AI ML Student", "React Developer", "Android Developer", "Portfolio", "Amravati"],
  authors: [{ name: "Atharvshish Barwat" }],
  creator: "Atharvshish Barwat",
  openGraph: {
    title: "Atharvshish Barwat | Full Stack Developer & AI ML Student",
    description: "Dream. Build. Create The Future.",
    url: "https://www.atharvshish.in",
    siteName: "Atharvshish Barwat Portfolio",
    images: [{ url: "/hero-banner.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atharvshish Barwat | Full Stack Developer",
    description: "Dream. Build. Create The Future.",
    images: ["/hero-banner.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
