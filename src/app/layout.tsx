'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WagmiProvider } from "wagmi";
import { config } from "@/lib/config";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Sidebar from "@/components/common/Sidebar";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <html lang="en">
      <body
     
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <main >
              <div >{children}</div>
            </main>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
