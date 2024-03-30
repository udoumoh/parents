"use client";
import React, { ReactNode, useState } from "react";
import { Box, Flex, Button, Text } from "@chakra-ui/react";
import MainNav from "@/components/navigation/mainNav";
import { useQuery } from "@apollo/client";
import { GET_PARENT } from "@/gql/queries";
import Loading from "../loading";


interface layoutProps {
  children: ReactNode;
}

const Layout: React.FC<layoutProps> = ({ children }) => {

  const { data: parent, loading } = useQuery(GET_PARENT);

  return (
    <>
      {/* <Flex
        alignItems={"center"}
        justifyContent={"center"}
        backgroundColor={"#005D5D"}
        py={"0.3rem"}
        gap={3}
      >
        <Text fontSize={"sm"} color={"#FFFFFF"}>
          You are currently using the free trial mode, upgrade and experience
          more with Greynote Premium
        </Text>
        <Button size="sm">Learn More</Button>
      </Flex> */}
      <MainNav>{children}</MainNav>
    </>
  );
  // loading ? (
  //   <Loading />
  // ) : !loading && parent?.parent?.errors !== null ? (
  //   <>{window.location.replace("/signin")}</>
  // ) : (
    
  // );
};

export default Layout;
