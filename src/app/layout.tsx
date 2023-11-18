import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import MainNav from "@/components/navigation/mainNav";

const mulish = Mulish({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "Greynote Parents Dashboard",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={mulish.className}>
        <ChakraProvider>
          <MainNav>
          {children}
          </MainNav>
        </ChakraProvider>
      </body>
    </html>
  );
}
