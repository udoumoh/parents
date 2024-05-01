"use client";
import React, { ReactNode, useState, useEffect } from "react";
import { Box, Flex, Button, Text } from "@chakra-ui/react";
import MainNav from "@/components/navigation/mainNav";
import { useQuery } from "@apollo/client";
import { GET_PARENT } from "@/gql/queries";
import Loading from "../loading";
import { useUserAPI } from "@/hooks/UserContext";

interface layoutProps {
  children: ReactNode;
}

const Layout: React.FC<layoutProps> = ({ children }) => {
  const {parentData, isTrialOver} = useUserAPI();
  const { data: parent, loading } = useQuery(GET_PARENT);

  useEffect(() => {
    if(!parentData?.isPaid && isTrialOver){
      window.location.replace('/subscription/choose')
    }
  }, [parentData, isTrialOver])

  return loading ? (
    <Loading />
  ) : !loading && parent?.parent?.errors !== null ? (
    <>{window.location.replace("/signin")}</>
  ) : (
    <MainNav>{children}</MainNav>
  );
};

export default Layout;
