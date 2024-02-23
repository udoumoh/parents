'use client'
import React, { ReactNode, useEffect } from 'react';
import MainNav from '@/components/navigation/mainNav';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/AuthContext';

interface layoutProps {
  children: ReactNode;
}

const Layout: React.FC<layoutProps> = ({ children }) => {
  const router = useRouter()
  const {isAuthenticated} = useAuth()
  if(!isAuthenticated){
    router.push('/signin')
  }
  return (
    <MainNav>
      {/* Your layout content */}
      {children}
    </MainNav>
  );
};

export default Layout;
