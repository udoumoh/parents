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
  return (
    <MainNav>
      {/* Your layout content */}
      {children}
    </MainNav>
  );
};

export default Layout;
