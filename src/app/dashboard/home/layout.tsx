'use client'
import { FC } from 'react'
import SidebarWithHeader from '@/components/navigation/secondaryNav';
import { useUserAPI } from '@/hooks/UserContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({children}) => {
  const {parentData} = useUserAPI()
  if(parentData?.children.length === 0){
    window.location.replace('/dashboard')
  }
  return <SidebarWithHeader>{children}</SidebarWithHeader>;
}

export default Layout