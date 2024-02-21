'use client'
import React, { ReactNode, useEffect } from 'react';
import MainNav from '@/components/navigation/mainNav';
import { useQuery } from "@apollo/client";
import { useRouter } from 'next/navigation';
import { GET_PARENT } from '@/gql/queries/queries';

interface layoutProps {
  children: ReactNode;
}

const Layout: React.FC<layoutProps> = ({ children }) => {
  const router = useRouter();
  const { data: parent, loading } = useQuery(GET_PARENT);

  if (loading) {
    return <p>Loading</p>;
  }
  if (parent) {
    try {
      const response = parent || {};

      if (response.parent && response.parent.errors !== null) {
        router.push("/signin");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      router.push("/signin");
    }
  }
  return (
    <MainNav>
      {/* Your layout content */}
      {children}
    </MainNav>
  );
};

export default Layout;
