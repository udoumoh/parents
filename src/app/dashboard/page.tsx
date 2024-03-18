'use client'
import { FC, useEffect, useState } from 'react'
import {
  Box,
  Flex,
  Image,
  Text,
  useDisclosure,
  Button,
  Avatar,
  Card,
} from "@chakra-ui/react";
 import {
   AiOutlinePlus,
 } from "react-icons/ai";
 import SearchStudentModal from '@/components/shared/searchStudentModal';
 import { useRouter } from 'next/navigation';
 import { useUserAPI } from '@/hooks/UserContext';
 import { PARENT_REQUESTS } from '@/gql/queries';
 import { useQuery } from '@apollo/client';

interface pageProps {
  
}

const Page: FC<pageProps> = ({}) => {
    const router = useRouter()
    const {childData, parentData} = useUserAPI()
    const { data: getRequests } = useQuery(PARENT_REQUESTS, {
      variables: { parentId: parentData?.userId },
    });
    const [requestData, setRequestData] = useState([])
    const {
      isOpen: isModalOpen,
      onOpen: onModalOpen,
      onClose: onModalClose,
    } = useDisclosure();

    if((childData ?? []).length !== 0){
      window.location.replace("/dashboard/home/overview")
    }

    useEffect(() => {
      const fetchData = async() => {
          try{
            const response = await getRequests
            console.log(response)
          } catch(err: any){
            console.log(err?.message)
          }
      }
      fetchData()
    }, [getRequests])
    
  return (
    <Flex h={"100vh"} overflowY={"auto"}>
      <Box
        h={"100vh"}
        overflowY={"auto"}
        w={"full"}
        pb={"5rem"}
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
      >
        <Flex
          w={"full"}
          alignItems={"center"}
          justifyContent={"center"}
          my={"4rem"}
          flexDir={"column"}
          rounded={"xl"}
          p={"10"}
        >
          <Text
            fontSize={"2xl"}
            color={"#005D5D"}
            fontWeight={"600"}
            mb={"2rem"}
          >
            Link Child Request Status
          </Text>
          <Flex
            overflow="hidden"
            flexDir={"column"}
            alignItems={"center"}
            border={"1px solid #005D5D40"}
            py={"1.5rem"}
            px={{base:"1rem", md:"5rem"}}
            rounded={"xl"}
          >
            <Avatar
              size={"2xl"}
              src="https://media.licdn.com/dms/image/C5603AQG3DQjHDiI_wA/profile-displayphoto-shrink_800_800/0/1632845327933?e=2147483647&v=beta&t=3DDQ9XC3-92cSa-7ohy7s4FWx2_wfD8uHpk2sqINojM"
            />

            <Text fontSize={"2xl"} fontWeight={"600"}>
              Ahmadu Bello
            </Text>

            <Text textAlign={"center"} fontSize={{base:"sm", md:"lg"}} color={"gray.600"}>
              I am requesting for this student on behalf of my village people
            </Text>

            <Flex gap={"5"}>
              <Button
                size={{ base: "sm", md: "lg" }}
                mt={"1rem"}
                rounded={"full"}
                px={"3rem"}
                color={"orange.700"}
                backgroundColor={"orange.300"}
                _hover={{ backgroundColor: "orange.300" }}
              >
                Pending
              </Button>
              <Button
                size={{ base: "sm", md: "lg" }}
                mt={"1rem"}
                rounded={"full"}
                colorScheme="red"
              >
                Withdraw Request
              </Button>
            </Flex>
          </Flex>
        </Flex>

        {/* <Flex
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
        </Flex> */}
      </Box>
    </Flex>
  );
}

export default Page