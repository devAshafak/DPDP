import type { Metadata } from "next";
import { Bebas_Neue, Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
});

export const metadata: Metadata = {
  title: "DPDP Readiness Assessment",
  description: "Self-assessment experience for India’s DPDP Act readiness.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} ${bebasNeue.variable} antialiased bg-[#FAF7F2] text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
