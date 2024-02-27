'use client'
import { FC } from 'react'
import SidebarWithHeader from '@/components/navigation/secondaryNav';
import { useRouter } from 'next/navigation';
import { useUserAPI } from '@/hooks/UserContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({children}) => {
  return (
    <SidebarWithHeader>
    {children}
    </SidebarWithHeader>
  );
}

export default Layout