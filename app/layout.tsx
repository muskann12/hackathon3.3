import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Heading from "../components/Heading";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Smooth } from "../components/Smooth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "shop.co",
  description: "shop.co hackathon project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Heading />
        <Navbar />
        <Smooth>{children}</Smooth>
        <Footer />
      </body>
    </html>
  );
}
