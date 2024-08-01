"use client";
import React, { ReactNode, useState, useEffect } from "react";
import MainNav from "@/components/navigation/mainNav";
import { useQuery } from "@apollo/client";
import { GET_PARENT } from "@/gql/queries";
import Loading from "../loading";
import { useUserAPI } from "@/hooks/UserContext";
import BottomNav from "@/components/navigation/mobileNav";

interface layoutProps {
  children: ReactNode;
}

const Layout: React.FC<layoutProps> = ({ children }) => {
  const { data: parent, loading } = useQuery(GET_PARENT);
  const { parentData, isTrialOver } = useUserAPI();

  useEffect(() => {
      if (!parentData?.isPaid && isTrialOver) {
            window.location.replace("/subscription/choose");
          }
  }, [parentData, isTrialOver]);

  return  loading ? (
    <Loading />
  ) : !loading && parent?.parent?.errors !== null ? (
    <>{window.location.replace("/signin")}</>
  ) : (
    <MainNav>
      <BottomNav />
      {children}
    </MainNav>
  );
};

export default Layout;
