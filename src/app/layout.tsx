'use client'
import {useState} from 'react'
import { Mulish } from "next/font/google";
import "./globals.css";
import UserApiProvider from "@/hooks/UserContext";
import { AuthProvider } from '@/hooks/AuthContext';
import { Providers } from "./providers";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import TopBarProgress from "react-topbar-progress-indicator";
import Router from 'next/router';

const mulish = Mulish({ subsets: ["cyrillic"] });

const client = new ApolloClient({
  uri: "https://api.greynote.app/graphql",
  credentials: "include",
  cache: new InMemoryCache(),
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}
) {
  const [progress, setProgress] = useState(false);

  Router.events.on("routeChangeStart", () => {
    setProgress(true);
  });
  Router.events.on("routeChangeComplete", () => {
    setProgress(false);
  });
  TopBarProgress.config({
    barColors: {
      "0": "#099C9B",
      "1.0": "#007C7B",
    },
  });
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/greylightBordered.svg" />
      </head>
      <body className={mulish.className}>
        <ApolloProvider client={client}>
          <Providers>
            <AuthProvider>
            <UserApiProvider>
              {progress && <TopBarProgress />}
              {children}
            </UserApiProvider>
            </AuthProvider>
          </Providers>
        </ApolloProvider>
      </body>
    </html>
  );
}
