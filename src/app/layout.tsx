"use client";
import "./globals.css";
import { FC, useState } from "react";
import UserApiProvider from "@/hooks/UserContext";
import { Mulish } from "next/font/google";
import { Providers } from "./providers";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./globals.css";
import Loading from "./loading";
import { useRouter } from "next/router";
import TopBarProgress from "react-topbar-progress-indicator";
import LoadingBar from "react-top-loading-bar";

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
  const router = useRouter()
  const [progress, setProgress] = useState(false)

   router.events.on("routeChangeStart", () => {
     setProgress(true);
   });
   router.events.off("routeChangeStart", () => {
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
            {typeof window === "undefined" ? (
              <Loading />
            ) : (
              <UserApiProvider>
                {progress && <TopBarProgress />}
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
