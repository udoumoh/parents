"use client";
import React, { ReactNode, useEffect } from "react";
import MainNav from "@/components/navigation/mainNav";
import { useQuery } from "@apollo/client";
import { GET_PARENT } from "@/gql/queries";
import { useRouter } from "next/navigation";
import { Center, Box, Flex, Image, useToast } from "@chakra-ui/react";
import { BarLoader } from "react-spinners";
import { useUserAPI } from "@/hooks/UserContext";
import Loading from "../loading";

interface layoutProps {
  children: ReactNode;
}

const Layout: React.FC<layoutProps> = ({ children }) => {
  const toast = useToast();
  const { data: parent, loading } = useQuery(GET_PARENT);

  try {
    if (loading)
      return (
        <Loading/>
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
