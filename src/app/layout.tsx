import type { Metadata } from "next";
import { ClerkProvider, SignInButton, SignedOut } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "FocusMe",
  description: "manage your time and focus better",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
