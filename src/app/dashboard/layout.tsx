"use client";
import React, { ReactNode } from "react";
import MainNav from "@/components/navigation/mainNav";
import { useQuery } from "@apollo/client";
import { GET_PARENT } from "@/gql/queries";
import Loading from "../loading";
import BottomNav from "@/components/navigation/mobileNav";
import { Box, ChakraProvider} from "@chakra-ui/react";

interface layoutProps {
  children: ReactNode;
}

const Layout: React.FC<layoutProps> = ({ children }) => {
  const { data: parent, loading } = useQuery(GET_PARENT);

  React.useEffect(() => {
    if (!loading && parent?.parent?.errors !== null) {
      window.location.replace("/signin");
    }
  }, [loading, parent]);

  return loading ? (
    <Loading />
  ) : (
    <ChakraProvider>
      <Box p={0}>
        <MainNav>{children}</MainNav>
        <BottomNav />
      </Box>
    </ChakraProvider>
  );
  
};

export default Layout;
