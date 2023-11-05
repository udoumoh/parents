"use client";
import { FC } from "react";
import Dashboard from "@/app/dashboard";

interface pageProps {}

const Home: FC<pageProps> = ({}) => {
  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default Home;
