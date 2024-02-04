// app/providers.tsx
"use client";
import { ChakraProvider } from "@chakra-ui/react";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Greynote Parents Dashboard",
  description: "",
};
export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
