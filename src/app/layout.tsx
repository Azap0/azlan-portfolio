import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Azlan Ahmed — Portfolio",
  description: "Computer Engineering student & software developer. Full-stack development, data structures & algorithms, and systems programming.",
  keywords: ["Azlan Ahmed", "Portfolio", "Software Engineer", "Full-Stack Developer", "Computer Engineering"],
  authors: [{ name: "Azlan Ahmed" }],
  icons: {
    icon: "/sakura-petal.png",
  },
  openGraph: {
    title: "Azlan Ahmed — Portfolio",
    description: "Computer Engineering student & software developer portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
