import type { Metadata } from "next";
import { Inter, Kanit } from "next/font/google";

import "./globals.css";
import SessionProvider from './SessionProvider'
import { getServerSession } from "next-auth";
import Navbar from "@/Components/Navbar";


const inter = Inter({ subsets: ["latin"] });
const bitter = Kanit({ subsets: ["latin"], weight: '400'});
export const metadata: Metadata = {
  title: "B-Trade",
  description: "Trade The Book Save The Cost",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <body className={bitter.className}>
        
        <SessionProvider session={session} >
          {children}

          
        </SessionProvider>
      </body>
    </html>
  );
}
