// app/providers.tsx
"use client";
import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import type { Metadata } from "next";
import LoadingBar from "react-top-loading-bar";
import { Router } from "next/router";


export const metadata: Metadata = {
  title: "Greynote Parents Dashboard",
  description: "",
};
export function Providers({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0);
  Router.events.on("routeChangeStart", () => {
    setProgress(10);
  });
  Router.events.on("routeChangeComplete", () => {
    setProgress(100);
  });
  return (
    <ChakraProvider>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {children}
    </ChakraProvider>
  );
}
