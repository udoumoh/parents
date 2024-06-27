"use client";
import { useEffect } from "react";
import { useUserAPI } from "@/hooks/UserContext";

const Home = () => {
  const {parentData} = useUserAPI();

  useEffect(() => {
    if(parentData){
      window.location.assign("/dashboard/home/overview"); 
    } else {
      window.location.assign('/signin')
    }
  }, [parentData]);

  return null;
};

export default Home;
