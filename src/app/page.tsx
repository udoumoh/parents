"use client";
import { useEffect, FC } from "react";
import { useUserAPI } from "@/hooks/UserContext";
import { Providers } from "./providers";

interface HomeProps {
  children: React.ReactNode
}

const Home: FC<HomeProps> = ({children}) => {
  const {parentData} = useUserAPI();

  useEffect(() => {
    if(parentData){
      window.location.assign("/dashboard/home/overview"); 
    } else {
      window.location.assign('/signin')
    }
  }, [parentData]);

  return <Providers>{children}</Providers>
};

export default Home;
