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
 import { useRouter } from 'next/navigation';
 import { useUserAPI } from '@/hooks/UserContext';

interface pageProps {
  
}

const Page: FC<pageProps> = ({}) => {
    const router = useRouter()
    const {parentData} = useUserAPI()
    const {
      isOpen: isModalOpen,
      onOpen: onModalOpen,
      onClose: onModalClose,
    } = useDisclosure();

    // if(parentData?.children.length !== 0){
      // router.push("/dashboard/home/overview")
    // }
    
  return (
    <Flex h={"100vh"} overflowY={"auto"}>
      <Box h={"100vh"} overflowY={"auto"} w={"full"} pb={"5rem"}>
        <Flex
          flexDir={"column"}
          alignItems={"center"}
          w={"full"}
          my={"3rem"}
          mb={"0.5rem"}
          px={"1rem"}
        >
          <Image
            src="/images/greylight2.png"
            alt="logo"
            w={"4rem"}
            h={"4rem"}
            pointerEvents={"none"}
          />
          <Image
            src="/images/undrawFamily.svg"
            alt="illustration"
            pointerEvents={"none"}
          />
          <Text
            textAlign={"center"}
            fontSize={{ base: "md", lg: "xl" }}
            maxW={"475px"}
            fontWeight={"400"}
          >
            Looks like you’re not linked to any child on Greynote, would you
            like to connect with your child/ward now?
          </Text>
          <Button
            backgroundColor={"#005D5D"}
            color={"#fff"}
            colorScheme="teal"
            _hover={{ backgroundColor: "#044141" }}
            onClick={onModalOpen}
            mt={"2rem"}
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
      </Box>
    </Flex>
  );
}

export default Page