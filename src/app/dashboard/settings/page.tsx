"use client";
import { FC, useState, useEffect } from "react";
import {
  Box,
  Flex,
  Button,
  Avatar,
  Text,
  Image,
  Icon,
  Divider,
  useDisclosure,
  Badge,
  useToast,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import { AiFillClockCircle } from "react-icons/ai";
import { useUserAPI } from "@/hooks/UserContext";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { formatDate } from "@/helpers/formatDate";
import { PARENT_REQUESTS } from "@/gql/queries";
import EditProfileModal from "@/components/shared/editProfileModal";
import { DELETE_REQUEST } from "@/gql/mutations";
import { GoPencil } from "react-icons/go";
import { RiVerifiedBadgeFill } from "react-icons/ri";

interface SettingsPageProps {}
interface LegendBadgeProps {
  role: string;
  mt?: { base: string; lg: string };
}

interface RequestDataProps {
  studentFirstName: string;
  studentLastName: string;
  studentProfileImgUrl: string;
  message: string;
  status: string;
  id: number;
}

const SettingsPage: FC<SettingsPageProps> = ({}) => {
  const toast = useToast();
  const [requestData, setRequestData] = useState<RequestDataProps[]>([]);
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const { profileData, parentData, childData } = useUserAPI();
  const { data: getRequests, loading } = useQuery(PARENT_REQUESTS, {
    variables: { parentId: parentData?.userId },
  });
  const [deleteRequest] = useMutation(DELETE_REQUEST);

  console.log(parentData);

  const handleRequestDelete = async (requestId: any) => {
    try {
      const response = await deleteRequest({
        variables: { deleteRequestId: requestId },
      });
      console.log(response);
      if (!response) {
        toast({
          title: "Error",
          description: "A client side error has occurred",
          position: "top-right",
          variant: "left-accent",
          isClosable: true,
          status: "error",
        });
      }
      if (response?.data?.deleteRequest) {
        toast({
          title: "Success",
          description: "Your request was successfully deleted.",
          position: "top-right",
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
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
        status: "error",
      });
    }
  };

  setInterval(() => {
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
    };
    fetchData();
  }, 2000);

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      mb={"10rem"}
    >
      <Box
        w={"full"}
        px={"5%"}
        overflowY={"auto"}
        h={"100vh"}
        pt={"2rem"}
        pb={"10rem"}
      >
        <Flex
          justifyContent={"space-between"}
          alignItems={{ base: "center", lg: "start" }}
          flexDir={{ base: "column", md: "row" }}
          rounded={"2xl"}
          p={"2rem"}
          // border={"1px solid #005D5D70"}
          shadow={"lg"}
          backgroundColor={"#334854"}
        >
          <Flex
            alignItems={"center"}
            gap={5}
            flexDir={{ base: "column", lg: "row" }}
            justifyContent={"center"}
          >
            {/* <Box border={"3px solid #12B77B"} rounded={"full"} p={"0.2rem"}> */}
            <Avatar
              src={profileData?.userBio?.profileImage}
              size={{ base: "xl", lg: "2xl" }}
              pointerEvents={"none"}
            />
            {/* </Box> */}
            <Box
              display={"flex"}
              flexDir={"column"}
              alignItems={{ base: "center", lg: "start" }}
              justifyContent={"center"}
            >
              <Flex alignItems={"center"} gap={2}>
                <Text
                  fontSize={{ base: "lg", lg: "3xl" }}
                  fontWeight={"bold"}
                  color={"#FCF4D9"}
                >
                  {`${profileData?.userBio?.firstName} ${profileData?.userBio?.lastName}`}{" "}
                </Text>
                <Icon as={RiVerifiedBadgeFill} boxSize={"4"} color={"orange"} />
              </Flex>

              <Text fontSize={"lg"} fontWeight={"700"} color={"#FCF4D990"}>
                {profileData?.userBio?.parentRole}
              </Text>

              <Flex
                border={"1.5px solid orange"}
                rounded={"md"}
                py={"0.5rem"}
                px={"1rem"}
                gap={"4"}
                alignItems={"center"}
                mt={"0.5rem"}
                _hover={{ cursor: "pointer" }}
              >
                <Text fontSize={"md"} color={"#FCF4D9"}>
                  Greycases
                </Text>
                <Center height="20px">
                  <Divider orientation="vertical" />
                </Center>
                <Text fontSize={"md"} color={"#FCF4D9"}>
                  None
                </Text>
              </Flex>

              <Flex alignItems={"center"} gap={2} my="0.5rem">
                <Icon as={AiFillClockCircle} color={"#FFF"} />
                <Text color={"#FFF"} fontSize={{ base: "2xs", lg: "sm" }}>
                  Created on {formatDate(parentData?.createdAt)}
                </Text>
              </Flex>
            </Box>
          </Flex>
          <Flex gap={"6"}>
            <Button
              variant={"outline"}
              border={"1px solid #FCF4D9"}
              onClick={onModalOpen}
              gap={"2"}
              color="#FCF4D9"
              _hover={{ color: "green", backgroundColor: "green.100" }}
            >
              <Icon as={GoPencil} boxSize={4} />
              <Text>Edit</Text>
            </Button>
          </Flex>
          <EditProfileModal
            isOpen={isModalOpen}
            onOpen={onModalOpen}
            onClose={onModalClose}
          />
        </Flex>

        <Divider my={"2rem"} />

        <Flex w={"full"} flexDir={"column"}>
          {/* Linked students */}
          <Flex
            flexDir={"column"}
            alignItems={"flex-start"}
            my={"1rem"}
            gap={3}
          >
            <Text fontWeight={"500"}>Linked Students</Text>
            <Flex
              flexDir={{ base: "column", lg: "row" }}
              gap={{ base: "5", lg: "20" }}
            >
              {(childData ?? []).length === 0 ? (
                <Box
                  backgroundColor={"#005D5D10"}
                  border={"1px solid #005D5D"}
                  display={"flex"}
                  alignItems={"center"}
                  px={"1.3rem"}
                  rounded={"md"}
                  py={"1rem"}
                  minW={{ base: "auto", lg: "550px" }}
                >
                  <Text fontSize={"lg"}>
                    No child has been linked to your account
                  </Text>
                </Box>
              ) : (
                childData?.map((item, index) => {
                  return (
                    <Flex
                      alignItems={"center"}
                      gap={2}
                      key={index}
                      mb={"0.5rem"}
                      backgroundColor={"#3F999830"}
                      rounded={"md"}
                      py={"0.5rem"}
                      pl={"1rem"}
                      pr={"3rem"}
                      _hover={{ boxShadow: "lg", transitionDuration: "0.5s" }}
                    >
                      <Avatar
                        size={"md"}
                        src={item.profileImage}
                        pointerEvents={"none"}
                      />
                      <Box lineHeight={"20px"}>
                        <Text fontWeight={"600"} fontSize={"sm"}>
                          {item.firstName} {item.lastName}
                        </Text>
                        <Text
                          fontSize={"12px"}
                          color={"#AAAAAA"}
                          fontWeight={"600"}
                        >
                          {item.greynoteNumber}
                        </Text>
                      </Box>
                    </Flex>
                  );
                })
              )}
            </Flex>
          </Flex>

          {/* Link requests */}
          <Flex
            flexDir={"column"}
            alignItems={"flex-start"}
            my={"1rem"}
            gap={3}
          >
            <Text fontWeight={"500"}>Link Requests</Text>
            <Flex w={"full"} mb={"0.5rem"}>
              <SimpleGrid
                minChildWidth={{ base: "270px", md: "400px" }}
                spacing={"20px"}
                w={"full"}
              >
                {(requestData ?? []).length === 0 ? (
                  <Box
                    backgroundColor={"#005D5D10"}
                    border={"1px solid #005D5D"}
                    display={"flex"}
                    alignItems={"center"}
                    px={"1.3rem"}
                    rounded={"md"}
                    py={"1rem"}
                    maxW={{ base: "auto", lg: "550px" }}
                  >
                    <Text fontSize={"lg"}>You have no active requests</Text>
                  </Box>
                ) : (
                  requestData?.map((item, index) => {
                    return (
                      item?.status !== "ACCEPTED" && (
                        <Flex
                          gap={2}
                          key={index}
                          backgroundColor={"#005D5D10"}
                          rounded={"xl"}
                          border={"1px solid #005D5D"}
                          p={"1rem"}
                        >
                          <Avatar
                            size={{ base: "sm", lg: "lg" }}
                            src={item?.studentProfileImgUrl}
                            pointerEvents={"none"}
                          />
                          <Box
                            lineHeight={"20px"}
                            display={"flex"}
                            flexDir={"column"}
                            justifyContent={"space-between"}
                            maxW={{ base: "200px", md: "400px" }}
                          >
                            <Box>
                              <Flex
                                alignItems={"center"}
                                justifyContent={"space-between"}
                                gap={2}
                              >
                                <Text
                                  fontWeight={"600"}
                                  fontSize={{ base: "sm", lg: "lg" }}
                                >
                                  {item?.studentFirstName}{" "}
                                  {item?.studentLastName}
                                </Text>
                                <Badge
                                  display={{ base: "block", md: "none" }}
                                  variant={"solid"}
                                  backgroundColor={
                                    item?.status === "PENDING"
                                      ? "orange.300"
                                      : item?.status === "ACCEPTED"
                                      ? "green.300"
                                      : "red.300"
                                  }
                                  px={"0.5rem"}
                                  py={"0.1rem"}
                                  fontSize={"2xs"}
                                  rounded={"2xl"}
                                >
                                  {item?.status}
                                </Badge>
                              </Flex>
                              <Text
                                fontSize={{ base: "xs", lg: "sm" }}
                                color={"gray.500"}
                                fontWeight={"600"}
                                maxW={{ base: "200px", md: "300px" }}
                              >
                                {item?.message}
                              </Text>
                            </Box>
                            <Flex mt={"1rem"} gap={3}>
                              <Button
                                display={{ base: "none", md: "block" }}
                                size={{ base: "xs", md: "sm" }}
                                rounded={"lg"}
                                color={
                                  item?.status === "PENDING"
                                    ? "orange.700"
                                    : item?.status === "ACCEPTED"
                                    ? "green.700"
                                    : "red.700"
                                }
                                backgroundColor={
                                  item?.status === "PENDING"
                                    ? "orange.300"
                                    : item?.status === "ACCEPTED"
                                    ? "green.300"
                                    : "red.300"
                                }
                                _hover={{
                                  backgroundColor:
                                    item?.status === "PENDING"
                                      ? "orange.300"
                                      : item?.status === "ACCEPTED"
                                      ? "green.300"
                                      : "red.300",
                                }}
                              >
                                {item?.status}
                              </Button>
                              <Button
                                size={{ base: "xs", md: "sm" }}
                                colorScheme="red"
                                _hover={{
                                  backgroundColor: "red.600",
                                  color: "#FFFFFF",
                                }}
                                variant={"outline"}
                                rounded={"lg"}
                                onClick={() => handleRequestDelete(item?.id)}
                              >
                                Withdraw request
                              </Button>
                            </Flex>
                          </Box>
                        </Flex>
                      )
                    );
                  })
                )}
              </SimpleGrid>
            </Flex>
          </Flex>
        </Flex>

        <Box mt={"2rem"} w={"full"}>
          <Text fontWeight={"500"} mb={"1rem"}>
            Uploaded Files
          </Text>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            w={"full"}
            border={"1px solid #005D5D30"}
            rounded={"xl"}
            flexDir={"column"}
            gap={3}
            py={"3rem"}
            px={"0.5rem"}
          >
            <Image
              alt="No files"
              src="/images/nofile.svg"
              pointerEvents={"none"}
              w={"200px"}
              h={"300px"}
            />
            <Text color={"#8A8A8A"} fontSize={"lg"} textAlign={"center"}>
              No files have been uploaded yet
            </Text>
          </Box>
          {/* <Wrap gap={5} flexDir={{ base: "column", lg: "row" }}>
                {resultsData.map((result, index) => {
                  return (
                    <WrapItem key={index}>
                      <ResultCard key={index} result={result} />
                    </WrapItem>
                  );
                })}
              </Wrap> */}
        </Box>
      </Box>
    </Box>
  );
};

export default SettingsPage;
