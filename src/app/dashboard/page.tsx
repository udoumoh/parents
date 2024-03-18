"use client";
import { FC, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  useDisclosure,
  Button,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import SearchStudentModal from "@/components/shared/searchStudentModal";
import { useRouter } from "next/navigation";
import { useUserAPI } from "@/hooks/UserContext";
import { PARENT_REQUESTS } from "@/gql/queries";
import { useQuery, useMutation } from "@apollo/client";
import { DELETE_REQUEST } from "@/gql/mutations";

interface pageProps {}

interface RequestDataProps {
  studentFirstName: string;
  studentLastName: string;
  studentProfileImgUrl: string;
  message: string;
  status: string;
  id: number;
}

const Page: FC<pageProps> = ({}) => {
  const toast = useToast()
  const { childData, parentData } = useUserAPI();
  const { data: getRequests } = useQuery(PARENT_REQUESTS, {
    variables: { parentId: parentData?.userId },
  });
  const [deleteRequest] = useMutation(DELETE_REQUEST)
  const [requestData, setRequestData] = useState<RequestDataProps[]>([]);
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  if ((childData ?? []).length !== 0) {
    window.location.replace("/dashboard/home/overview");
  }

  const handleRequestDelete = async(requestId: any) => {
    try{
      const response = await deleteRequest({
        variables: {deleteRequestId: requestId}
      });
      console.log(response)
      if(!response){
        toast({
          title: "Error",
          description: "A client side error has occurred",
          position: "bottom",
          variant: "left-accent",
          isClosable: true,
          status: "error",
        });
      }
      if(response?.data?.deleteRequest){
        toast({
          title: "Success",
          description: "Your request was successfully deleted.",
          position: "bottom",
          variant: "left-accent",
          isClosable: true,
          status: "success",
        });
      }
    } catch (err: any) {
        console.log(err);
        toast({
          title: "Error",
          description: err?.message,
          position: "bottom",
          variant: "left-accent",
          isClosable: true,
          status: "error",
        });
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRequests;
        if(!response){
          console.log('client error')
        } else {
          const newData = response?.parentRequests.map((item: any) => ({
            studentFirstName: item?.student?.firstName,
            studentLastName: item?.student?.lastName,
            studentProfileImgUrl: item?.student?.profileImgUrl,
            message: item?.message,
            status: item?.status,
            id: item?.id,
          }))
          setRequestData(newData)
        }
      } catch (err: any) {
        console.log(err);
      }
    };
    fetchData();
  }, [getRequests]);

  console.log(parentData)

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
        {requestData.length === 0 ? (
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
        ) : (
          <>
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
              <Flex flexDir={"column"} gap={4}>
                {requestData.map((data, index) => (
                  <Flex
                    key={index}
                    overflow="hidden"
                    flexDir={"column"}
                    alignItems={"center"}
                    border={"1px solid #005D5D40"}
                    py={"1.5rem"}
                    px={{ base: "1rem", md: "5rem" }}
                    rounded={"xl"}
                  >
                    <Avatar
                      size={"2xl"}
                      src="https://media.licdn.com/dms/image/C5603AQG3DQjHDiI_wA/profile-displayphoto-shrink_800_800/0/1632845327933?e=2147483647&v=beta&t=3DDQ9XC3-92cSa-7ohy7s4FWx2_wfD8uHpk2sqINojM"
                    />

                    <Text fontSize={"2xl"} fontWeight={"600"}>
                      {data?.studentFirstName} {data?.studentLastName}
                    </Text>

                    <Text
                      textAlign={"center"}
                      fontSize={{ base: "sm", md: "lg" }}
                      color={"gray.600"}
                      w={{base:"auto", md:"300px"}}
                    >
                      {data?.message}
                    </Text>

                    <Flex gap={"5"}>
                      <Button
                        size={{ base: "sm", md: "md" }}
                        mt={"1rem"}
                        rounded={"full"}
                        px={"3rem"}
                        color={
                          data?.status === "PENDING"
                            ? "orange.700"
                            : data?.status === "ACCEPTED"
                            ? "green.700"
                            : "red.700"
                        }
                        backgroundColor={
                          data?.status === "PENDING"
                            ? "orange.300"
                            : data?.status === "ACCEPTED"
                            ? "green.300"
                            : "red.300"
                        }
                        _hover={{
                          backgroundColor:
                            data?.status === "PENDING"
                              ? "orange.300"
                              : data?.status === "ACCEPTED"
                              ? "green.300"
                              : "red.300",
                        }}
                      >
                        {data?.status}
                      </Button>
                      <Button
                        size={{ base: "sm", md: "md" }}
                        mt={"1rem"}
                        rounded={"full"}
                        colorScheme="red"
                        onClick={() => handleRequestDelete(data?.id)}
                      >
                        Withdraw Request
                      </Button>
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default Page;
