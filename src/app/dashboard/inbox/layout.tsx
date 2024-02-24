import { FC } from 'react'
import ChatSidenav from '@/components/navigation/chatSidenav';

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = ({children}) => {
  return (
    <ChatSidenav>{children}</ChatSidenav>
  )
}

export default layout