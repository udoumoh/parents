"use client";
import "./globals.css";
import UserApiProvider from "@/hooks/UserContext";
import { Providers } from "./providers";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./globals.css";
import { Box, Center, Image, Flex } from "@chakra-ui/react";
import { BarLoader } from "react-spinners";

const client = new ApolloClient({
  uri: "https://api.greynote.app/graphql",
  credentials: "include",
  cache: new InMemoryCache(),
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if window is defined before rendering
  if (typeof window === "undefined") {
    // Return placeholder or loading state for server-side rendering
    return (
      <Center>
        <Box minW="full" mt={{ base: 60, md: 60, lg: 40 }}>
          <Flex
            direction="column"
            align="center"
            minW={{ base: "full", lg: "650px" }}
          >
            <Image
              src="/images/greylightBordered.svg"
              alt="logo"
              w={40}
              mb={3}
              pointerEvents={"none"}
            />
            <BarLoader color="#ffd880" width="150px" />
          </Flex>
        </Box>
      </Center>
    );
  }

  // If on the client side, render the main layout
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/greylightBordered.svg" />
      </head>
      <body>
        <ApolloProvider client={client}>
          <Providers>
            <UserApiProvider>{children}</UserApiProvider>
          </Providers>
        </ApolloProvider>
      </body>
    </html>
  );
}
