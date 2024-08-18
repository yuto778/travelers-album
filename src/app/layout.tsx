// /app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../styles/global.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import ClientSessionProvider from "@/components/ClientSessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TripLog",
  description: "TripLogapp",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <ClientSessionProvider session={session}>
        <body className={inter.className}>{children}</body>
      </ClientSessionProvider>
    </html>
  );
}
