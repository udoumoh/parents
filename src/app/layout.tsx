"use client";
import "./globals.css";
import { FC, useState } from "react";
import UserApiProvider from "@/hooks/UserContext";
import { Mulish } from "next/font/google";
import { Providers } from "./providers";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./globals.css";
import Loading from "./loading";

const mulish = Mulish({ subsets: ["cyrillic"] });

interface LayoutProps {
  children: React.ReactNode;
}

const client = new ApolloClient({
  uri: "https://api.greynote.app/graphql",
  credentials: "include",
  cache: new InMemoryCache(),
});

const Layout: FC<LayoutProps> = ({ children }) => {
  
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/greylightBordered.svg" />
      </head>
      <body className={mulish.className}>
        <ApolloProvider client={client}>
          <Providers>
            {typeof window === "undefined" ? (
              <Loading />
            ) : (
              <UserApiProvider>
                {children}
              </UserApiProvider>
            )}
          </Providers>
        </ApolloProvider>
      </body>
    </html>
  );
};

export default Layout;
