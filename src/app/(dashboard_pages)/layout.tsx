'use client'
import React, { ReactNode, useEffect } from 'react';
import MainNav from '@/components/navigation/mainNav';
import { useQuery } from '@apollo/client';
import { GET_PARENT } from '@/gql/queries/queries';
import { useRouter } from 'next/navigation';

interface layoutProps {
  children: ReactNode;
}

const Layout: React.FC<layoutProps> = ({ children }) => {
      const router = useRouter()
      const { data: parent, loading } = useQuery(GET_PARENT);

      if (loading) return <p>Loading...</p>;
      if (!loading && parent.parent.errors !== null) router.push("/signin");
  return (
    <MainNav>
      {/* Your layout content */}
      {children}
    </MainNav>
  );
};

export default Layout;
