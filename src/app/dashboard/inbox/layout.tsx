import { FC } from 'react'
import ChatSidenav from '@/components/navigation/chatSidenav';
import { Flex } from '@chakra-ui/react';

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = ({children}) => {
  return (
    <Flex w="full">{children}</Flex>
  )
}

export default layout