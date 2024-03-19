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
} from "@chakra-ui/react";
import { AiFillClockCircle } from "react-icons/ai";
import { useUserAPI } from "@/hooks/UserContext";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { formatDate } from "@/helpers/formatDate";
import { PARENT_REQUESTS } from "@/gql/queries";
import EditProfileModal from "@/components/shared/editProfileModal";
import { DELETE_REQUEST } from "@/gql/mutations";

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

const LOGOUT_PARENTS = gql(`
mutation Mutation {
  logoutParent
}
`);

const LegendBadge: React.FC<LegendBadgeProps> = ({ role, mt, ...rest }) => {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      px={"0.8rem"}
      py={"0.2rem"}
      border={"1.5px solid #A3007F"}
      rounded={"lg"}
      backgroundColor={"#FFDDF7"}
      width={"5.5rem"}
      {...rest}
    >
      <Text color={"#A3007F"} fontSize={"xs"} fontWeight={"600"}>
        {role}
      </Text>
    </Flex>
  );
};

const SettingsPage: FC<SettingsPageProps> = ({}) => {
  const toast = useToast()
  const [requestData, setRequestData] = useState<RequestDataProps[]>([]);
  const {isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose} = useDisclosure();
  const router = useRouter();
  const [logoutParent] = useMutation(LOGOUT_PARENTS);
  const { profileData, parentData, childData } = useUserAPI();
  const { data: getRequests, loading } = useQuery(PARENT_REQUESTS, {
    variables: { parentId: parentData?.userId },
  });
  const [deleteRequest] = useMutation(DELETE_REQUEST);

  const handleLogout = async () => {
    const response = await logoutParent();
    if (response.data.logoutParent) {
      router.push("/signin");
      localStorage.removeItem('currentId')
    }
  };

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
        setTimeout(() => {
          window.location.reload();
        }, 2000);
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
    };
    fetchData();
  }, [getRequests]);

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
          flexDir={{ base: "column", lg: "row" }}
          // border={"1px solid #007C7B"}
          rounded={"lg"}
          p={"1rem"}
        >
          <Flex
            alignItems={"center"}
            gap={5}
            flexDir={{ base: "column", lg: "row" }}
            justifyContent={"center"}
          >
            <Box border={"3px solid #12B77B"} rounded={"full"} p={"0.2rem"}>
              <Avatar
                src={profileData?.userBio?.profileImage}
                size={{ base: "xl", lg: "2xl" }}
                pointerEvents={"none"}
              />
            </Box>
            <Box
              display={"flex"}
              flexDir={"column"}
              alignItems={{ base: "center", lg: "start" }}
              justifyContent={"center"}
            >
              <Flex alignItems={"center"} gap={2}>
                <Text fontSize={{ base: "lg", lg: "2xl" }} fontWeight={"bold"}>
                  {`${profileData?.userBio?.firstName} ${profileData?.userBio?.lastName}`}
                </Text>
                <Image
                  src="/images/verifiedtag.png"
                  alt="badge"
                  w={"1rem"}
                  h={"1rem"}
                  pointerEvents={"none"}
                  display={(childData ?? []).length === 0 ? "none" : "block"}
                />
              </Flex>

              <LegendBadge
                role={profileData?.userBio?.parentRole || ""}
                mt={{ base: "0.3rem", lg: "0.8rem" }}
              />

              <Flex alignItems={"center"} gap={2} my="0.5rem">
                <Icon as={AiFillClockCircle} color={"#747474"} />
                <Text color={"#747474"} fontSize={{ base: "2xs", lg: "sm" }}>
                  Created on {formatDate(parentData?.createdAt)}
                </Text>
              </Flex>
            </Box>
          </Flex>
          <Flex gap={"6"}>
            <Button
              variant={"outline"}
              border={"2px solid #000"}
              onClick={onModalOpen}
            >
              Upload new photo
            </Button>
            <Button
              variant={"outline"}
              borderWidth={"2px"}
              colorScheme="red"
              onClick={handleLogout}
            >
              Logout
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
            <Flex
              flexDir={{ base: "column", lg: "row" }}
              gap={{ base: "5", lg: "20" }}
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
                  minW={{ base: "auto", lg: "550px" }}
                >
                  <Text fontSize={"lg"}>You have no active requests</Text>
                </Box>
              ) : (
                requestData?.map((item, index) => {
                  return (
                    <Flex
                      gap={2}
                      key={index}
                      mb={"0.5rem"}
                      backgroundColor={"#005D5D10"}
                      rounded={"lg"}
                      border={"1px solid #005D5D"}
                      py={"1rem"}
                      pl={"1rem"}
                      pr={"3rem"}
                    >
                      <Avatar
                        size={"lg"}
                        src={item?.studentProfileImgUrl}
                        pointerEvents={"none"}
                      />
                      <Box
                        lineHeight={"20px"}
                        display={"flex"}
                        flexDir={"column"}
                      >
                        <Text fontWeight={"600"} fontSize={"lg"}>
                          {item?.studentFirstName} {item?.studentLastName}
                        </Text>
                        <Text
                          fontSize={"sm"}
                          color={"gray.500"}
                          fontWeight={"600"}
                          maxW={"300px"}
                        >
                          {item?.message}
                        </Text>
                        <Flex mt={"1rem"} gap={3}>
                          <Button
                            size={"sm"}
                            rounded={"full"}
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
                            size={"sm"}
                            colorScheme="red"
                            _hover={{
                              backgroundColor: "red.600",
                              color: "#FFFFFF",
                            }}
                            variant={"outline"}
                            rounded={"full"}
                            onClick={handleRequestDelete}
                          >
                            Withdraw request
                          </Button>
                        </Flex>
                      </Box>
                    </Flex>
                  );
                })
              )}
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
