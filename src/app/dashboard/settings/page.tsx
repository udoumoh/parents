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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import axios from "axios";
import { AiFillClockCircle } from "react-icons/ai";
import { UserChildren, useUserAPI } from "@/hooks/UserContext";
import { useQuery, useMutation } from "@apollo/client";
import { PARENT_REQUESTS } from "@/gql/queries";
import EditProfileModal from "@/components/shared/editProfileModal";
import { DELETE_REQUEST } from "@/gql/mutations";
import { GoPencil } from "react-icons/go";
import RemoveStudentModal from "@/components/shared/removeStudentModal";
import { RiBookletFill, RiVerifiedBadgeFill } from "react-icons/ri";
import GraycaseModal from "@/components/shared/greycaseModal";
import { formatDateWithSuffix } from "@/helpers/formatDate";
import { FaChildren, FaCodePullRequest } from "react-icons/fa6";
import {
  MdAccountBalanceWallet,
} from "react-icons/md";
import SelectPlanModal from "@/components/shared/selectPlanModal";
import { formatDate } from "@/helpers/formatDate";
import FreeTrial from "@/components/shared/freeTrial";

interface SettingsPageProps {}

interface RequestDataProps {
  studentFirstName: string;
  studentMiddleName: string;
  studentLastName: string;
  studentProfileImgUrl: string;
  message: string;
  status: string;
  id: number;
}

const SettingsPage: FC<SettingsPageProps> = ({}) => {
  const toast = useToast();
  const [subscriptionData, setSubscriptionData] = useState<any>({});
  const [requestData, setRequestData] = useState<RequestDataProps[]>([]);

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const {
    isOpen: isGraycaseModalOpen,
    onOpen: onGraycaseModalOpen,
    onClose: onGraycaseModalClose,
  } = useDisclosure();
  const {
    isOpen: isRemoveStudentModalOpen,
    onOpen: onRemoveStudentModalOpen,
    onClose: onRemoveStudentModalClose,
  } = useDisclosure();
  const {
    isOpen: isSelectPlanModalOpen,
    onOpen: onSelectPlanModalOpen,
    onClose: onSelectPlanModalClose,
  } = useDisclosure();

  const { profileData, parentData, childData, setLocalstorageId } = useUserAPI();
  const { data: getRequests } = useQuery(PARENT_REQUESTS, {
    variables: { parentId: parentData?.userId },
  });
  const [graycases, setGraycases] = useState<any[]>();
  const [deleteRequest] = useMutation(DELETE_REQUEST);
  const [currentStudentCase, setCurrentStudentCase] = useState<
    UserChildren | undefined
  >();
  const token = process.env.NEXT_PUBLIC_API_TOKEN;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(
            `https://api.paystack.co/subscription?email=${parentData?.email}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            setSubscriptionData(response?.data?.data[0]);
          });
      } catch (err: any) {
        // console.log(err?.mesage);
      }
    };
    fetchData();
  }, [parentData]);


  const handleRequestDelete = async (requestId: any) => {
    try {
      const response = await deleteRequest({
        variables: { deleteRequestId: requestId },
      });
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
        window.location.reload();
      }
    } catch (err: any) {
      // console.log(err);
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

 const options: any = {
   year: "numeric",
   month: "long",
   day: "numeric",
   timeZone: "UTC",
 };
  const date = new Date(subscriptionData?.most_recent_invoice?.period_end).toLocaleDateString('en-US', options);
 
  const handleGreycaseItem = (graycase: any) => {
    setCurrentStudentCase(graycase);
    onGraycaseModalOpen();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRequests;
        if (!response) {
          // console.log("client error");
        } else {
          const newData = response?.parentRequests?.map((item: any) => ({
            studentFirstName: item?.student?.firstName,
            studentMiddleName: item?.student?.middleName,
            studentLastName: item?.student?.lastName,
            studentProfileImgUrl: item?.student?.profileImgUrl,
            message: item?.message,
            status: item?.status,
            id: item?.id,
          }));
          setRequestData(
            newData.filter((item: any) => item.status !== "ACCEPTED")
          );
        }
      } catch (err: any) {
        // console.log(err);
      }
    };
    fetchData();
  }, [getRequests, parent]);

  useEffect(() => {
     const filteredCases = parentData?.children?.filter(
       (child: any) => child.studentCase.grayCase !== null
     );
     const newArray = filteredCases?.map((child: any) => ({
       firstName: child?.firstName,
       lastName: child?.lastName,
       middleName: child?.middleName,
       greynoteNumber: child?.grayId,
       profileImage: child?.profileImgUrl,
       gender: child?.gender,
       class: child?.classroom?.classroom?.className,
       dateOfBirth: formatDateWithSuffix(child?.birthDate),
       school: child?.school?.school?.schoolName,
       schoollogo: child?.school?.school?.logoImgUrl,
       childId: child?.id,
       age: child?.ageInput,
       schoolId: child?.school?.school?.id,
       isVisible: child?.isVisible,
       category: child?.studentCase.grayCase?.category,
       createdAt: formatDateWithSuffix(child?.studentCase.grayCase?.createdAt),
       id: child?.studentCase.grayCase?.id,
       isActive: child?.studentCase.grayCase?.isActive,
       notes: child?.studentCase.grayCase?.note,
       owingAmount: child?.studentCase.grayCase?.owingAmount,
       updatedAt: formatDateWithSuffix(child?.studentCase.grayCase?.updatedAt),
       wasEdited: child?.studentCase.grayCase?.wasEdited,
     }));
     setGraycases(newArray);
  }, [parentData])

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box w={"full"} px={{ base: "0rem", md: "5%" }} pt={"1rem"}>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          flexDir={{ base: "column", md: "row" }}
          rounded={"2xl"}
          p={"2rem"}
          shadow={"lg"}
          backgroundColor={"#005d5d"}
        >
          <Flex
            alignItems={"center"}
            gap={5}
            flexDir={{ base: "column", lg: "row" }}
            justifyContent={"center"}
          >
            <Box border={"3px solid #F2F2F2"} rounded="full">
              <Avatar
                src={profileData?.userBio?.profileImage}
                size={{ base: "xl", lg: "2xl" }}
                pointerEvents={"none"}
                border={"2px solid transparent"}
                p={1}
              />
            </Box>
            <Box
              display={"flex"}
              flexDir={"column"}
              alignItems={{ base: "center", lg: "start" }}
              justifyContent={"center"}
            >
              <Flex alignItems={"center"} gap={2}>
                <Text
                  fontSize={{ base: "sm", lg: "3xl" }}
                  fontWeight={"bold"}
                  color={"#FFF"}
                  textAlign={"center"}
                >
                  {`${profileData?.userBio?.firstName} ${
                    profileData?.userBio?.middleName || ""
                  } ${profileData?.userBio?.lastName}`}{" "}
                </Text>
                <Icon
                  as={RiVerifiedBadgeFill}
                  boxSize={"4"}
                  color={"#f4b95f"}
                />
              </Flex>

              <Text fontSize={"lg"} fontWeight={"700"} color={"#FFFFFF90"}>
                {profileData?.userBio?.parentRole}
              </Text>

              <Flex alignItems={"center"} gap={1}>
                <Icon as={AiFillClockCircle} color={"#FFFFFF90"} />
                <Text color={"#FFFFFF90"} fontSize={{ base: "2xs", lg: "sm" }}>
                  Created on {formatDate(parentData?.createdAt)}
                </Text>
              </Flex>
            </Box>
          </Flex>
          <Flex gap={"6"}>
            <Button
              size={{ base: "sm", md: "md" }}
              variant={"outline"}
              border={"1px solid #FFFFFF"}
              onClick={onModalOpen}
              gap={"2"}
              color="white"
              _hover={{ color: "teal", backgroundColor: "white" }}
            >
              <Icon as={GoPencil} boxSize={{ base: 3, md: 4 }} />
              <Text fontSize={{ base: "xs", md: "md" }}>Edit Profile</Text>
            </Button>
            <Button
              onClick={onRemoveStudentModalOpen}
              gap={"2"}
              colorScheme="red"
              size={{ base: "sm", md: "md" }}
            >
              <Text fontSize={{ base: "xs", md: "md" }}>Remove Child</Text>
            </Button>
          </Flex>
          <EditProfileModal
            isOpen={isModalOpen}
            onOpen={onModalOpen}
            onClose={onModalClose}
          />
          <RemoveStudentModal
            isOpen={isRemoveStudentModalOpen}
            onOpen={onRemoveStudentModalOpen}
            onClose={onRemoveStudentModalClose}
          />
        </Flex>

        <Divider my={"2rem"} />

        <Flex
          w={"full"}
          flexDir={{ base: "column", lg: "row" }}
          justifyContent={"space-between"}
          gap={"10"}
        >
          {/* Linked students */}
          <Flex
            flexDir={"column"}
            border={"1px solid #005D5D30"}
            rounded={"xl"}
            pb={"1rem"}
            px={"1rem"}
            py={"1rem"}
          >
            <Box>
              <Flex alignItems={"center"} gap={1}>
                <Icon as={FaChildren} color="#005D5D" fontWeight={"bold"} />
                <Text fontWeight={"600"} fontSize={"lg"} color={"#005D5D"}>
                  Linked Children
                </Text>
              </Flex>
              <Divider mt={"0.3rem"} mb={"1rem"} />
            </Box>
            <Flex flexDir={"column"} gap={4}>
              {(childData ?? []).length === 0 ? (
                <Box
                  display={"flex"}
                  flexDir={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  px={"1.3rem"}
                  rounded={"md"}
                  py={"1rem"}
                  w={"100%"}
                >
                  <Image
                    src="/images/nochild.svg"
                    maxH={{ base: "100px", md: "200px" }}
                    maxW={{ base: "150px", md: "300px" }}
                    alt="bg"
                  />
                  <Text mt={"1rem"} fontSize={{ base: "sm", md: "lg" }}>
                    No child has been linked to your account
                  </Text>
                </Box>
              ) : (
                (childData ?? []).map((item, index) => {
                  return (
                    <Flex
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      gap={2}
                      key={index}
                      py={"0.6rem"}
                      px={"1rem"}
                      rounded={"md"}
                      _hover={{
                        backgroundColor: "#005D5D30",
                        transitionDuration: "0.5s",
                        cursor: "pointer",
                      }}
                      w={"full"}
                      border={"1px solid #e2e2e2"}
                      onClick={() => {
                        setLocalstorageId(item?.id || 0);
                        window.location.assign("/dashboard/home");
                      }}
                    >
                      <Box display={"flex"} gap={"2"} alignItems={"center"}>
                        <Avatar
                          size={{ base: "sm", md: "md" }}
                          src={item.profileImage}
                          pointerEvents={"none"}
                          name={`${item?.firstName} ${item?.lastName}`}
                        />
                        <Box>
                          <Text
                            fontWeight={"700"}
                            fontSize={{ base: "xs", md: "lg" }}
                            pointerEvents={"none"}
                          >
                            {item?.firstName} {item?.middleName || ""}{" "}
                            {item?.lastName}
                          </Text>
                          <Text
                            fontSize={{ base: "2xs", md: "sm" }}
                            color={"#AAAAAA"}
                            fontWeight={"600"}
                            pointerEvents={"none"}
                          >
                            {item?.greynoteNumber}
                          </Text>
                        </Box>
                      </Box>
                    </Flex>
                  );
                })
              )}
            </Flex>
          </Flex>

          {/* Link requests */}
          <Box
            w={"auto"}
            display={"flex"}
            flex="1"
            border={"1px solid #005D5D30"}
            rounded={"xl"}
            pb={"1rem"}
            px={"1rem"}
            py={"1rem"}
          >
            <Box display={"flex"} flexDir={"column"} w={"full"}>
              <Box>
                <Flex alignItems={"center"} gap={1}>
                  <Icon
                    as={FaCodePullRequest}
                    color="#005D5D"
                    fontWeight={"bold"}
                  />
                  <Text fontWeight={"600"} fontSize={"lg"} color={"#005D5D"}>
                    Link Requests
                  </Text>
                </Flex>
                <Divider mt={"0.3rem"} mb={"1rem"} />
              </Box>

              <Flex
                w={"full"}
                mb={"0.5rem"}
                flexDir={"column"}
                gap={4}
                justifyContent={
                  (requestData ?? []).length === 0 ? "center" : "start"
                }
              >
                {(requestData ?? []).length === 0 ? (
                  <Box
                    display={"flex"}
                    flexDir={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    px={"1.3rem"}
                    rounded={"md"}
                    py={"1rem"}
                    w={"100%"}
                  >
                    <Image
                      src="/images/norequests.svg"
                      maxH={{ base: "100px", md: "200px" }}
                      maxW={{ base: "150px", md: "300px" }}
                      alt="bg"
                    />
                    <Text mt={"1rem"} fontSize={{ base: "sm", md: "lg" }}>
                      There are no active requests
                    </Text>
                  </Box>
                ) : (
                  requestData?.map((item, index) => {
                    return (
                      <Flex
                        gap={2}
                        key={index}
                        backgroundColor={"#005D5D10"}
                        rounded={"md"}
                        p={"1rem"}
                        w={"full"}
                        // _hover={{
                        //   backgroundColor: "#005D5D30",
                        //   transitionDuration: "0.5s",
                        //   cursor: "pointer",
                        // }}
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
                          justifyContent={"space-between"}
                          w={"full"}
                        >
                          <Box w={"full"}>
                            <Flex
                              flexDir={{ base: "column", sm: "row" }}
                              alignItems={{ base: "start", sm: "center" }}
                              justifyContent={"space-between"}
                              gap={2}
                              w={"full"}
                            >
                              <Text
                                fontWeight={"700"}
                                fontSize={"lg"}
                                pointerEvents={"none"}
                              >
                                {item?.studentFirstName}{" "}
                                {item?.studentMiddleName || ""}{" "}
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
                            </Flex>
                            <Text
                              mt={{ base: "0.4rem", md: "0" }}
                              fontSize={{ base: "xs", lg: "sm" }}
                              color={"gray.500"}
                              fontWeight={"600"}
                            >
                              {item?.message}
                            </Text>
                          </Box>
                          <Flex mt={"1rem"} gap={3}>
                            <Button
                              size={{ base: "xs", md: "sm" }}
                              colorScheme="red"
                              _hover={{
                                backgroundColor: "red.600",
                                color: "#FFFFFF",
                              }}
                              // variant={"outline"}
                              rounded={{ base: "sm", md: "md" }}
                              onClick={() => handleRequestDelete(item?.id)}
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
            </Box>
          </Box>
        </Flex>

        {/* Graycases */}
        <Flex
          flexDir={"column"}
          border={"1px solid #005D5D30"}
          rounded={"xl"}
          pb={"1rem"}
          px={"1rem"}
          mt={"2rem"}
          py={"1rem"}
        >
          <SelectPlanModal
            isOpen={isSelectPlanModalOpen}
            onClose={onSelectPlanModalClose}
          />
          <Box>
            <Flex alignItems={"center"} gap={1}>
              <Icon as={RiBookletFill} color="#005D5D" fontWeight={"bold"} />
              <Text fontWeight={"600"} fontSize={"lg"} color={"#005D5D"}>
                Greycases
              </Text>
            </Flex>
            <Divider mt={"0.3rem"} mb={"1rem"} />
          </Box>
          <Flex flexDir={"column"} gap={4}>
            {(graycases ?? []).length === 0 ? (
              <Box
                display={"flex"}
                flexDir={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                px={"1.3rem"}
                rounded={"md"}
                py={"1rem"}
                w={"100%"}
              >
                <Image
                  src="/images/nofile.svg"
                  maxH={{ base: "100px", md: "200px" }}
                  maxW={{ base: "150px", md: "300px" }}
                  alt="bg"
                />
                <Text mt={"1rem"} fontSize={{ base: "sm", md: "lg" }}>
                  No graycase records for this child
                </Text>
              </Box>
            ) : (
              <TableContainer w={"full"}>
                <Table variant="simple" size={"md"}>
                  <Thead>
                    <Tr>
                      <Th textTransform={"none"}> Student Name</Th>
                      <Th textTransform={"none"}> category</Th>
                      <Th textTransform={"none"}> status</Th>
                      <Th textTransform={"none"}> Date created</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {graycases?.map((graycase: any, index: any) => {
                      return (
                        <Tr
                          key={index}
                          _hover={{
                            backgroundColor: "#005D5D10",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            handleGreycaseItem(graycase);
                          }}
                        >
                          <Td>
                            {graycase?.firstName} {graycase?.middleName || ""}{" "}
                            {graycase?.lastName}
                          </Td>
                          <Td>{graycase?.category}</Td>
                          <Td>
                            <Badge
                              colorScheme={graycase?.isActive ? "green" : "red"}
                            >
                              {graycase?.isActive ? "ACTIVE" : "INACTIVE"}
                            </Badge>
                          </Td>
                          <Td>{graycase?.createdAt}</Td>
                        </Tr>
                      );
                    })}
                    <GraycaseModal
                      isOpen={isGraycaseModalOpen}
                      onClose={onGraycaseModalClose}
                      graycase={currentStudentCase}
                    />
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </Flex>
        </Flex>

        {/* Subscription */}
        <Flex
          flexDir={"column"}
          border={"1px solid #005D5D30"}
          rounded={"xl"}
          px={"1rem"}
          mt={"2rem"}
          py={"1rem"}
        >
          <Box>
            <Flex alignItems={"center"} gap={1}>
              <Icon
                as={MdAccountBalanceWallet}
                color="#005D5D"
                fontWeight={"bold"}
              />
              <Text fontWeight={"600"} fontSize={"lg"} color={"#005D5D"}>
                Membership Details
              </Text>
            </Flex>
            <Divider mt={"0.3rem"} mb={"1rem"} />
          </Box>
          <Flex
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={3}
          >
            <SimpleGrid
              templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
              spacing="12px"
              w={'full'}
            >
              {parentData?.children?.map((child, index) => (
                <Flex
                  alignItems={"center"}
                  key={index}
                  justifyContent={"center"}
                  flexDir={"column"}
                  w={"full"}
                  border={"1px solid #e2e2e2"}
                  rounded={"xl"}
                  p={"1rem"}
                >
                  <Avatar
                    src={child?.profileImgUrl}
                    name={`${child?.firstName} ${child?.middleName || ""} ${
                      child?.lastName
                    }`}
                    size={{ base: "md", md: "xl" }}
                    mb={"0.5rem"}
                  />
                  <Text
                    fontWeight={"semibold"}
                    fontSize={{ base: "sm", md: "lg" }}
                    textTransform={"capitalize"}
                    mb={"0.5rem"}
                    textAlign={"center"}
                  >
                    {`${child?.firstName} ${child?.middleName || ""} ${
                      child?.lastName
                    }`}
                  </Text>
                  <Text
                    textAlign={"center"}
                    mb={"0.5rem"}
                    fontSize={{ base: "xs", md: "sm" }}
                    color={"gray.600"}
                    textTransform={"capitalize"}
                    fontWeight={"semibold"}
                  >
                    {child?.school?.school?.schoolName} •{" "}
                    {child?.classroom?.classroom?.className || "Not Enrolled Yet"}
                  </Text>

                  <Box display={child?.isPaid ? "block" : "none"}>
                    <Text
                      color={"gray.600"}
                      textAlign={"center"}
                      mb={"0.5rem"}
                      fontSize={{ base: "sm", md: "md" }}
                    >
                      You are currently on the{" "}
                      <Box as={"span"} fontWeight={"bold"}>
                        {child?.collectibleType}
                      </Box>{" "}
                      plan that expires in
                    </Text>
                    <FreeTrial createdAt={Number(child?.subscribedAt)} />
                  </Box>

                  {/* <Box bgColor={'#005D5D'} color={'white'} px={4} py={2} rounded={'md'} display={child?.isPaid ? "block" : "none"}>
                    <Text fontSize={'sm'}>Subscribed</Text>
                  </Box> */}

                  <Box display={child?.isPaid ? "none" : "block"} >
                    <Button
                      colorScheme="teal"
                      variant={"outline"}
                      onClick={onSelectPlanModalOpen}
                    >
                      Subscribe
                    </Button>
                  </Box>
                </Flex>
              ))}
            </SimpleGrid>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default SettingsPage;
