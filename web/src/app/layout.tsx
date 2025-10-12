import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/common/ToastProvider";

export const metadata: Metadata = {
  title: "Loki & Company",
  description: "A loja perfeita para seu pet",
};

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${rubik.variable} antialiased`}
      >
        {children}

        <ToastProvider />
      </body>
    </html>
  );
}
