import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import CustomCursor from "@/components/ui/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thân Văn Trường | Backend Java Developer Portfolio",
  description: "Portfolio cá nhân của Thân Văn Trường - Backend Java & Spring Boot Developer. Thiết kế hiện đại, tối giản và chuyên nghiệp.",
  keywords: ["Java", "Spring Boot", "Backend Developer", "Developer Portfolio", "Thân Văn Trường", "Next.js", "Spring Security", "PostgreSQL"],
  authors: [{ name: "Thân Văn Trường" }],
  openGraph: {
    title: "Thân Văn Trường | Backend Java Developer Portfolio",
    description: "Portfolio cá nhân của Thân Văn Trường - Backend Java & Spring Boot Developer. Thiết kế hiện đại, tối giản và chuyên nghiệp.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
