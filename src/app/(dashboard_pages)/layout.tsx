'use client'
import React, { ReactNode, useEffect } from 'react';
import MainNav from '@/components/navigation/mainNav';
import { useQuery } from '@apollo/client';
import { GET_PARENT } from '@/gql/queries/queries';
import { useRouter } from 'next/navigation';
import {
  Center,
  Box,
  Flex,
  Image,
} from '@chakra-ui/react'
import { BarLoader } from 'react-spinners';

interface layoutProps {
  children: ReactNode;
}

const Layout: React.FC<layoutProps> = ({ children }) => {
      const router = useRouter()
      const { data: parent, loading } = useQuery(GET_PARENT);

      if (loading) return (
        <Center>
          <Box minW="full" mt={{ base: 60, md: 60, lg: 40 }}>
            <Flex
              direction="column"
              align="center"
              minW={{ base: "full", lg: "650px" }}
            >
              <Image src="/images/greylightBordered.svg" alt="logo" w={40} mb={3} />
              <BarLoader color="#ffd880" width="150px" />
            </Flex>
          </Box>
        </Center>
      );
      if (!loading && parent.parent.errors !== null) router.push("/signin");
  return (
    <MainNav>
      {/* Your layout content */}
      {children}
    </MainNav>
  );
};

export default Layout;
