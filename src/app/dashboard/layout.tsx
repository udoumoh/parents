"use client";
import React, { ReactNode, useEffect } from "react";
import MainNav from "@/components/navigation/mainNav";
import { useQuery } from "@apollo/client";
import { GET_PARENT } from "@/gql/queries/queries";
import { useRouter } from "next/navigation";
import { Center, Box, Flex, Image, useToast } from "@chakra-ui/react";
import { BarLoader } from "react-spinners";
import { useUserAPI } from "@/hooks/UserContext";

interface layoutProps {
  children: ReactNode;
}

const Layout: React.FC<layoutProps> = ({ children }) => {
  const toast = useToast();
  const { data: parent, loading } = useQuery(GET_PARENT);

  try {
    if (loading)
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
    if (!loading && parent?.parent?.errors !== null) window.location.replace("/signin");
  } catch (e: any) {
    toast({
      title: "Error",
      description: e.message,
      position: "top-right",
      variant: "left-accent",
      isClosable: true,
      status: "error",
    });
  }
  return <MainNav>{children}</MainNav>;
};

export default Layout;
