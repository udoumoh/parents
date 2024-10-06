"use client";
import React, { ReactNode } from "react";
import MainNav from "@/components/navigation/mainNav";
import { useQuery } from "@apollo/client";
import { GET_PARENT } from "@/gql/queries";
import Loading from "../loading";
import BottomNav from "@/components/navigation/mobileNav";
import { Box, ChakraProvider } from "@chakra-ui/react";

interface layoutProps {
  children: ReactNode;
}

const Layout: React.FC<layoutProps> = ({ children }) => {
  const { data: parent, loading } = useQuery(GET_PARENT);
  // const { parentData, isTrialOver } = useUserAPI();

  // useEffect(() => {
  //   if (!parentData?.isPaid && isTrialOver) {
  //     window.location.replace("/subscription/choose");
  //   }
  // }, [parentData, isTrialOver]);

  return loading ? (
    <Loading />
  ) : !loading && parent?.parent?.errors !== null ? (
    <>{window.location.replace("/signin")}</>
  ) : (
    <ChakraProvider>
      <Box p={0}>
        <MainNav>{children}</MainNav>
        <BottomNav />
      </Box>
    </ChakraProvider>
  );
  // (
  //   <Box p={0} position={'relative'}>
  //     <MainNav>{children}</MainNav>
  //     <BottomNav />
  //   </Box>
  // );
  
};

export default Layout;
