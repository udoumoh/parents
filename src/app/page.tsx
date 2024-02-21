"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to "/dashboard/overview" when the component mounts
    router.push("/dashboard/overview");
  }, [router]);

  return null;
};

export default Home;
