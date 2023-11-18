import { FC } from 'react'
import SidebarWithHeader from '@/components/navigation/secondaryNav';

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = ({children}) => {
  return <SidebarWithHeader>{children}</SidebarWithHeader>;
}

export default layout