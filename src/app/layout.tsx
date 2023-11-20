import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import MainNav from "@/components/navigation/mainNav";
import UserApiProvider from "@/hooks/user/UserContext";

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
          <UserApiProvider>
          <MainNav>
          {children}
          </MainNav>
          </UserApiProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
