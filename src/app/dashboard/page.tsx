"use client";
import { FC, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import SearchStudentModal from "@/components/shared/searchStudentModal";
import { useUserAPI } from "@/hooks/UserContext";
import { PARENT_REQUESTS } from "@/gql/queries";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PARENT } from "@/gql/queries";
import Loading from "../loading";

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
  const { data: parent } = useQuery(GET_PARENT);
  const { parentData } = useUserAPI();
  const { data: getRequests, loading } = useQuery(PARENT_REQUESTS, {
    variables: { parentId: parentData?.userId },
  });
  const [requestData, setRequestData] = useState<RequestDataProps[]>([]);
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getRequests;
          if (!response) {
            console.log("client error");
          } else {
            const newData = response?.parentRequests.map((item: any) => ({
              studentFirstName: item?.student?.firstName,
              studentLastName: item?.student?.lastName,
              studentProfileImgUrl: item?.student?.profileImgUrl,
              message: item?.message,
              status: item?.status,
              id: item?.id,
            }));
            setRequestData(newData);
          }
        } catch (err: any) {
          console.log(err);
        }

        try {
          const parentResponse = await parent
          if ((parentResponse?.parent?.parent?.children ?? []).length !== 0) {
            window.location.replace("/dashboard/home/overview");
          }

          if ((parentResponse?.parent?.parent?.children ?? []).length === 0 && requestData.length !== 0) {
            window.location.replace("/dashboard/settings");
          }
        } catch (err) {

        }
      };
      fetchData();
    }, [getRequests, parent, requestData]);

    if(loading){
      return <Loading />
    }

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
};

export default Page;
