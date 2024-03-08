"use client";
import React, { ReactNode, Suspense, useEffect } from "react";
import MainNav from "@/components/navigation/mainNav";
import { useQuery } from "@apollo/client";
import { GET_PARENT } from "@/gql/queries/queries";
import { useRouter } from "next/navigation";
import { Center, Box, Flex, Image, useToast } from "@chakra-ui/react";
import { BarLoader } from "react-spinners";
import { useUserAPI } from "@/hooks/UserContext";
import Loading from "../loading";

interface layoutProps {
  children: ReactNode;
}

const Layout: React.FC<layoutProps> = ({ children }) => {
  const router = useRouter()
  const toast = useToast();
  const { data, error, loading } = useQuery(GET_PARENT);

 
  return (
    loading ? (
          <Loading />
        ) : data ? (
        <Suspense fallback={<Loading />}>
          <MainNav>{children}</MainNav>
        </Suspense>
        ) : !loading || error || !data ? (<>{router.push('/signin')}</>)
      : (<></>)
  )
};

export default Layout;
