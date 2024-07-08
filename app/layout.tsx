import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers/nextui";
import { AuthProvider } from "./context/AuthProvider";
import { TipSelectionProvider } from "./context/TipsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rei do Chute",
  description: "Created by Cristopher Martarello and Nathan Will Martins",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/LogoReiDoChute.svg" />
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            <TipSelectionProvider>
              {children}
            </TipSelectionProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
