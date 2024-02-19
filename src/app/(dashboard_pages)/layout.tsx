'use client'
import React, { ReactNode, useEffect } from 'react';
import MainNav from '@/components/navigation/mainNav';
import { useQuery } from "@apollo/client";
import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { GET_PARENT } from '@/gql/queries/queries';

interface layoutProps {
  children: ReactNode;
}

const Layout: React.FC<layoutProps> = ({ children }) => {
  const path = usePathname()
  const router = useRouter();
  const { data: parent } = useQuery(GET_PARENT);
  const isPublicRoute = ["/signin", "/signup", "/verifyotp"].includes(path);

  const response = parent || [];
  console.log(response?.parent?.errors);

  // Check for initial redirect when the component mounts
  useEffect(() => {
    if (response?.parent?.errors) {
      redirect("/signin");
    }else {
      redirect("/")
    }
  }, [response?.parent?.errors, router, isPublicRoute]);

  return (
    <MainNav>
      {/* Your layout content */}
      {children}
    </MainNav>
  );
};

export default Layout;
