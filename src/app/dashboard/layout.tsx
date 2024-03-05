'use client'
import React from "react";
import MainNav from "@/components/navigation/mainNav";
import { useQuery } from "@apollo/client";
import { GET_PARENT } from "@/gql/queries/queries";
import {
  useToast,
} from "@chakra-ui/react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const toast = useToast();
  const { data: parent, loading } = useQuery(GET_PARENT);

  try {
    if (!loading && parent?.parent?.errors !== null) {
      window.location.replace("/signin");
    }
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

  return (
    <MainNav>
      {children}
    </MainNav>
  );
};

export default Layout;
