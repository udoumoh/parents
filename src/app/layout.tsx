"use client";
import "./globals.css";
import { FC} from "react";
import UserApiProvider from "@/hooks/UserContext";
import { Mulish } from "next/font/google";
import { Providers } from "./providers";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./globals.css";
import UserLikesAPIProvider from "@/hooks/UserLikesContext";
import Loading from "./loading";

const mulish = Mulish({ subsets: ["cyrillic"] });

interface LayoutProps {
  children: React.ReactNode;
}

const client = new ApolloClient({
  uri: "https://api.greynote.app/graphql",
  // uri: "http://localhost:3004/graphql",
  credentials: "include",
  cache: new InMemoryCache(),
});

const Layout: FC<LayoutProps> = ({ children }) => {
  
  return (
    <html lang="en">
      <head>
        <title>Greynote Parents Dashboard</title>
        <meta property="og:title" content="Greynote Parent Dashboard" />
        <meta
          property="og:description"
          content="Stay involved in your child's education with the Greynote Parents app. Track academic progress, receive updates, and communicate with teachers to support your child's learning journey."
        />
        <meta property="og:image" content="/images/greylightBordered.svg" />
        <meta property="og:url" content="https://parent.greynote.app/" />
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <link rel="icon" href="/images/greylightBordered.svg" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/glider-js@1/glider.min.css"
        ></link>
      </head>
      <body className={mulish.className}>
          <ApolloProvider client={client}>
          <Providers>
            {typeof window === "undefined" ? (
              <Loading />
            ) : (
              <UserApiProvider>
                <UserLikesAPIProvider>{children}</UserLikesAPIProvider>
              </UserApiProvider>
            )}
          </Providers>
        </ApolloProvider>
      </body>
    </html>
  );
};

export default Layout;
