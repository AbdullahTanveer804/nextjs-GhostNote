import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "./providers/AuthProvider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "GhostNote App",
  description: "Anonymous message sharing app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body>
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
