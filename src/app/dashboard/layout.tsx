"use client";
import React, { ReactNode, useState } from "react";
import MainNav from "@/components/navigation/mainNav";
import { useQuery } from "@apollo/client";
import { GET_PARENT } from "@/gql/queries";
import Loading from "../loading";
import Router from "next/router";
import TopBarProgress from "react-topbar-progress-indicator";

interface layoutProps {
  children: ReactNode;
}

const Layout: React.FC<layoutProps> = ({ children }) => {
  const [progress, setProgress] = useState(false);

  Router.events.on("routeChangeStart", () => {
    setProgress(true);
  });
  Router.events.on("routeChangeComplete", () => {
    setProgress(false);
  });
  TopBarProgress.config({
    barColors: {
      "0": "#099C9B",
      "1.0": "#007C7B",
    },
  });
  const { data: parent, loading } = useQuery(GET_PARENT);

  return loading ? (
    <Loading />
  ) : !loading && parent?.parent?.errors !== null ? (
    <>{window.location.replace("/signin")}</>
  ) : (
    <MainNav>
      {progress && <TopBarProgress />}
      {children}
    </MainNav>
  );
};

export default Layout;
