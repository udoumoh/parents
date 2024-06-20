"use client";
import React, { ReactNode, useState, useEffect } from "react";
import MainNav from "@/components/navigation/mainNav";
import { useQuery } from "@apollo/client";
import { GET_PARENT } from "@/gql/queries";
import Loading from "../loading";
import { useUserAPI } from "@/hooks/UserContext";
import { LOGOUT_PARENTS } from "@/gql/mutations";
import { useMutation } from "@apollo/client";

interface layoutProps {
  children: ReactNode;
}

const Layout: React.FC<layoutProps> = ({ children }) => {
  const {parentData, isTrialOver} = useUserAPI();
  const { data: parent, loading } = useQuery(GET_PARENT);
  const [logoutParent] = useMutation(LOGOUT_PARENTS);

  // useEffect(() => {
  //   if(!parentData?.isPaid && isTrialOver){
  //     const handleLogout = async () => {
  //       const response = await logoutParent();
  //       if (response.data.logoutParent) {
  //         localStorage.removeItem("currentId");
  //         window.location.replace('/subscription/choose')
  //       }
  //     };

  //     handleLogout()
  //   }
  // }, [parentData, isTrialOver])

  return loading ? (
    <Loading />
  ) : !loading && parent?.parent?.errors !== null ? (
    <>{window.location.replace("/signin")}</>
  ) : (
    <MainNav>{children}</MainNav>
  );
};

export default Layout;
