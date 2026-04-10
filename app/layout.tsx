import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import profile from "@/data/profile.json";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} – Portfolio`,
  description: profile.bio,
  openGraph: {
    title: `${profile.name} – Portfolio`,
    description: profile.bio,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {/* Ambient glow — desktop only, behind all content */}
          <div className="fixed inset-0 pointer-events-none hidden xl:block overflow-hidden -z-10" aria-hidden="true">
            <div className="absolute left-0 top-1/4 w-80 h-[700px] bg-gradient-to-r from-neutral-300/30 to-transparent dark:from-neutral-700/20 dark:to-transparent blur-3xl rounded-full" />
            <div className="absolute right-0 top-1/3 w-80 h-[700px] bg-gradient-to-l from-neutral-300/30 to-transparent dark:from-neutral-700/20 dark:to-transparent blur-3xl rounded-full" />
          </div>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
