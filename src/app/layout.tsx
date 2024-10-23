import type { Metadata } from "next";
import { Montserrat, Raleway, Inter } from "next/font/google";
import Navbar from "@/app/components/Header/Navbar";
import "./globals.css";
import StoreProvider from "./providers/StoreProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: "Creative Capital Solutions",
  description: "Get custom loan packages for every customer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body
          className={`${montserrat.variable} ${raleway.variable} ${inter.variable} bg-gray-100 font-base`}
          suppressHydrationWarning={true}
        >
          <Navbar />
          {children}
        </body>
      </StoreProvider>
    </html>
  );
}
