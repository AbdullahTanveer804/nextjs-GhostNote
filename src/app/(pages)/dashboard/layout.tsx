import NavbarClientWrapper from "@/components/NavbarClientWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body>
          <NavbarClientWrapper/>
          {children}
        </body>
    </html>
  );
}