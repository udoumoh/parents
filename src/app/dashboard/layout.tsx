"use client";
import React, { ReactNode, useEffect } from "react";
import MainNav from "@/components/navigation/mainNav";
import { useQuery } from "@apollo/client";
import { GET_PARENT } from "@/gql/queries";
import Loading from "../loading";

interface layoutProps {
  children: ReactNode;
}

const Layout: React.FC<layoutProps> = ({ children }) => {
  const { data: parent, loading } = useQuery(GET_PARENT);

  return loading ? (
    <Loading />
  ) : !loading && parent?.parent?.errors !== null ? (
    <>{window.location.replace("/signin")}</>
  ) : (
    <MainNav>{children}</MainNav>
  );
};

export default Layout;
