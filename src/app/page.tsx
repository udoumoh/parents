"use client";
import { useEffect } from "react";
import { useUserAPI } from "@/hooks/UserContext";

const Home = () => {
  const {parentData} = useUserAPI();

  useEffect(() => {
    if(parentData){
      window.location.replace("/dashboard/home/overview"); 
    } else {
      window.location.replace('/signin')
    }
  }, [parentData]);

  return null;
};

export default Home;
