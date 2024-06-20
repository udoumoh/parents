"use client";
import "./globals.css";
import { FC, useEffect } from "react";
import UserApiProvider, { useUserAPI } from "@/hooks/UserContext";
import { Mulish } from "next/font/google";
import { Providers } from "./providers";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
} from "@apollo/client";
import "./globals.css";
import UserLikesAPIProvider from "@/hooks/UserLikesContext";
import Loading from "./loading";
import { GET_PARENT } from "@/gql/queries";
import { LOGOUT_PARENTS } from "@/gql/mutations";

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
  const { parentData, isTrialOver } = useUserAPI();
  const { data: parent, loading } = useQuery(GET_PARENT);
  const [logoutParent] = useMutation(LOGOUT_PARENTS);

  useEffect(() => {
    if (!parentData?.isPaid && isTrialOver) {
      const handleLogout = async () => {
        const response = await logoutParent();
        if (response.data.logoutParent) {
          localStorage.removeItem("currentId");
          window.location.replace("/subscription/choose");
        }
      };
      handleLogout();
    }
  }, [parentData, isTrialOver, logoutParent]);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/greylightBordered.svg" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={mulish.className}>
        <Providers>
          <ApolloProvider client={client}>
            {typeof window === "undefined" ? (
              <Loading />
            ) : (
              <UserApiProvider>
                <UserLikesAPIProvider>{children}</UserLikesAPIProvider>
              </UserApiProvider>
            )}
          </ApolloProvider>
        </Providers>
      </body>
    </html>
  );
};

export default Layout;
