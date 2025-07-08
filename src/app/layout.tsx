import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google';

export const metadata: Metadata = {
  title: "CryptoView Dashboard",
  description: "Seu resumo do mercado de criptomoedas.",
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
