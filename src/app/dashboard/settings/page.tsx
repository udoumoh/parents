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
} from "@chakra-ui/react";
import { AiFillClockCircle } from "react-icons/ai";
import { UserChildren, useUserAPI } from "@/hooks/UserContext";
import { useQuery, useMutation } from "@apollo/client";
import { formatDate } from "@/helpers/formatDate";
import { PARENT_REQUESTS } from "@/gql/queries";
import EditProfileModal from "@/components/shared/editProfileModal";
import { DELETE_REQUEST } from "@/gql/mutations";
import { GoPencil } from "react-icons/go";
import RemoveStudentModal from "@/components/shared/removeStudentModal";
import { RiBookletFill, RiVerifiedBadgeFill } from "react-icons/ri";
import GraycaseModal from "@/components/shared/greycaseModal";
import { GET_PARENT } from "@/gql/queries";
import { formatDateWithSuffix } from "@/helpers/formatDate";
import { FaChildren, FaCodePullRequest } from "react-icons/fa6";
import {
  MdAccountBalanceWallet,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import SelectPlanModal from "@/components/shared/selectPlanModal";

interface SettingsPageProps {}

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
  const { data: parent } = useQuery(GET_PARENT);
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
  const [graycases, setGraycases] = useState([]);
  const [deleteRequest] = useMutation(DELETE_REQUEST);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStudentCase, setCurrentStudentCase] = useState<
    UserChildren | undefined
  >();

  const handleRequestDelete = async (requestId: any) => {
    setIsSubmitting(true);
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
      console.log(err);
      toast({
        title: "Error",
        description: err?.message,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
        status: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
 
  const handleGreycaseItem = (graycase: any) => {
    setCurrentStudentCase(graycase);
    onGraycaseModalOpen();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRequests;
        if (!response) {
          console.log("client error");
        } else {
          const newData = response?.parentRequests?.map((item: any) => ({
            studentFirstName: item?.student?.firstName,
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
        console.log(err);
      }

      try{
        const response = await parent;
        const filteredCases = response?.parent?.parent?.children?.filter((child: any) => child.studentCase.grayCase !== null)
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
      } catch (err: any) {
        console.log(err);
      }
    };
    fetchData();
  }, [getRequests, parent]);
  console.log(parentData)
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
          shadow={"lg"}
          backgroundColor={"#334854"}
        >
          <Flex
            alignItems={"center"}
            gap={5}
            flexDir={{ base: "column", lg: "row" }}
            justifyContent={"center"}
          >
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

              <Flex alignItems={"center"} gap={2} my="0.5rem">
                <Icon as={AiFillClockCircle} color={"#FFF"} />
                <Text color={"#FFF"} fontSize={{ base: "2xs", lg: "sm" }}>
                  Created on {formatDate(parentData?.createdAt)}
                </Text>
              </Flex>
            </Box>
          </Flex>
          <Flex gap={"6"} flexDir={{ base: "column", sm: "row" }}>
            <Button
              variant={"outline"}
              border={"1px solid #FCF4D9"}
              onClick={onModalOpen}
              gap={"2"}
              color="#FCF4D9"
              _hover={{ color: "green", backgroundColor: "green.100" }}
            >
              <Icon as={GoPencil} boxSize={4} />
              <Text>Edit Profile Image</Text>
            </Button>
            <Button
              onClick={onRemoveStudentModalOpen}
              gap={"2"}
              colorScheme="red"
            >
              <Text>Remove Child</Text>
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
          >
            <Box py={"1rem"}>
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
                    maxH={"200px"}
                    maxW={"300px"}
                    alt="bg"
                  />
                  <Text mt={"1rem"} fontSize={"lg"}>
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
                      backgroundColor={"#005D5D10"}
                      rounded={"md"}
                      _hover={{
                        backgroundColor: "#005D5D30",
                        transitionDuration: "0.5s",
                        cursor: "pointer",
                      }}
                      w={"full"}
                      border={"1px solid #005D5D80"}
                      onClick={() => {
                        setLocalstorageId(item?.id || 0);
                        window.location.replace("/dashboard/home/overview");
                      }}
                    >
                      <Box display={"flex"} gap={"2"} alignItems={"center"}>
                        <Avatar
                          size={"md"}
                          src={item.profileImage}
                          pointerEvents={"none"}
                          name={`${item?.firstName} ${item?.lastName}`}
                        />
                        <Box>
                          <Text
                            fontWeight={"700"}
                            fontSize={"lg"}
                            pointerEvents={"none"}
                          >
                            {item?.firstName} {item?.lastName}
                          </Text>
                          <Text
                            fontSize={"sm"}
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
          >
            <Box display={"flex"} flexDir={"column"} w={"full"}>
              <Box py={"1rem"}>
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

              <Flex w={"full"} mb={"0.5rem"} flexDir={"column"} gap={4} justifyContent={(requestData ?? []).length === 0 ? 'center' : "start"}>
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
                      maxH={"200px"}
                      maxW={"300px"}
                      alt="bg"
                    />
                    <Text mt={"1rem"} fontSize={"lg"}>
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
                        _hover={{
                          backgroundColor: "#005D5D30",
                          transitionDuration: "0.5s",
                          cursor: "pointer",
                        }}
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
                                {item?.studentFirstName} {item?.studentLastName}
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
                              fontSize={{ base: "xs", lg: "sm" }}
                              color={"gray.500"}
                              fontWeight={"600"}
                            >
                              {item?.message}
                            </Text>
                          </Box>
                          <Flex mt={"1rem"} gap={3}>
                            <Button
                              size={{ base: "xs", md: "md" }}
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
        >
          <SelectPlanModal
            isOpen={isSelectPlanModalOpen}
            onClose={onSelectPlanModalClose}
          />
          <Box py={"1rem"}>
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
                  maxH={"200px"}
                  maxW={"300px"}
                  alt="bg"
                />
                <Text mt={"1rem"} fontSize={"lg"}>
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
                            {graycase?.firstName} {graycase?.lastName}
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

        {/* Graycases */}
        <Flex
          flexDir={"column"}
          border={"1px solid #005D5D30"}
          rounded={"xl"}
          pb={"3rem"}
          px={"1rem"}
          mt={"2rem"}
        >
          <Box py={"1rem"}>
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
          <Flex flexDir={"column"} gap={4} px={{ base: "1rem", md: "10rem" }}>
            <Box w={"full"}>
              <Text fontSize={"lg"} fontWeight={"500"} mb={"1rem"}>
                Plan Details
              </Text>

              <Box shadow={"sm"} rounded={"xl"} border={"1px solid #00000030"}>
                <Box
                  roundedTop={"xl"}
                  h={"8px"}
                  bgGradient="linear(to-l, #911194, #005D5D)"
                ></Box>

                <Box px={5} mt={"0.5rem"}>
                  <Text fontWeight={"bold"} fontSize={"xl"}>
                    Monthly Plan
                  </Text>
                  <Text color={"#00000080"} fontWeight={"500"}>
                    Can register up to 4 children and will be charged{" "}
                    <span style={{ color: "#005D5D", fontWeight: "bold" }}>
                      ₦65
                    </span>{" "}
                    for every additional child
                  </Text>
                  <Divider mt={"1rem"} borderColor={"#005D5D50"} />
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  w={"full"}
                  px={2}
                >
                  <Button
                    rightIcon={<MdOutlineKeyboardArrowRight />}
                    w="full"
                    justifyContent={"space-between"}
                    py={"1.5rem"}
                    fontSize={"lg"}
                    my={"0.4rem"}
                    variant={"outline"}
                    border={"0px solid"}
                    onClick={onSelectPlanModalOpen}
                    _hover={{ backgroundColor: "#EBF6F3" }}
                  >
                    <Text>Change plan</Text>
                  </Button>
                </Box>
              </Box>
            </Box>

            <Box w={"full"}>
              <Text fontSize={"lg"} fontWeight={"500"} mt={"1rem"} mb={"1rem"}>
                Payment Info
              </Text>

              <Box
                rounded={"lg"}
                shadow={"sm"}
                border={"1px solid #00000030"}
                pb={"1rem"}
              >
                <Box
                  px={5}
                  mt={"0.5rem"}
                  display={"flex"}
                  flexDir={"column"}
                  gap={1}
                >
                  <Text fontWeight={"bold"} fontSize={"xl"}>
                    Next Payment
                  </Text>
                  <Text color={"#00000080"} fontWeight={"bold"}>
                    21 April 2024
                  </Text>
                  <Box display={"flex"} alignItems={"center"} gap={4}>
                    <Image
                      alt="mastercard"
                      src="/images/mastercard.svg"
                      h={"2rem"}
                    />
                    <Text
                      fontSize={"sm"}
                      color={"#00000090"}
                      fontWeight={"bold"}
                    >
                      •••• •••• •••• 3300
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Flex>
          <Button
            colorScheme="red"
            variant={"outline"}
            mt={"2rem"}
            mx={{ base: "1rem", md: "10rem" }}
          >
            Cancel Membership
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default SettingsPage;
