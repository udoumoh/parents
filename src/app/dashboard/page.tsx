'use client'
import { FC } from 'react'
import { 
    Box,
    Flex,
    Image,
    Text,
    useDisclosure,
    Button,
 } from '@chakra-ui/react'
 import {
   AiOutlinePlus,
 } from "react-icons/ai";
 import SearchStudentModal from '@/components/shared/searchStudentModal';

interface pageProps {
  
}

const Page: FC<pageProps> = ({}) => {
    const {
      isOpen: isModalOpen,
      onOpen: onModalOpen,
      onClose: onModalClose,
    } = useDisclosure();
    
  return (
    <Flex minH={"100vh"}>
      <Flex flexDir={"column"} alignItems={"center"} w={"full"} mt={"3rem"}>
        <Image src="/images/greylight2.png" alt="logo" w={"4rem"} h={"4rem"} />
        <Image src="/images/undrawFamily.svg" alt="illustration" />
        <Text
          textAlign={"center"}
          fontSize={"xl"}
          maxW={"475px"}
          fontWeight={"400"}
        >
          Looks like you’re not linked to any child on Greynote, would you like
          to connect with your child/ward now?
        </Text>
        <Button
          backgroundColor={"#005D5D"}
          color={"#fff"}
          colorScheme="teal"
          _hover={{ backgroundColor: "#044141" }}
          display={{ base: "none", md: "flex" }}
          onClick={onModalOpen}
          mt={'2rem'}
        >
          <AiOutlinePlus />
          <Text fontWeight={"light"} pl="0.5rem">
            Link your Child
          </Text>
        </Button>

        <SearchStudentModal
          isSearchOpen={isModalOpen}
          onSearchClose={onModalClose}
          onSearchOpen={onModalOpen}
        />
      </Flex>
    </Flex>
  );
}

export default Page