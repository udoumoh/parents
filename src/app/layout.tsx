'use client'
import "./globals.css";
import UserApiProvider from "@/hooks/UserContext";
import { Providers } from "./providers";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import './globals.css'

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
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/greylightBordered.svg" />
      </head>
      <body>
        <ApolloProvider client={client}>
          <Providers>
            <UserApiProvider>
              {children}
            </UserApiProvider>
          </Providers>
        </ApolloProvider>
      </body>
    </html>
  );
}
