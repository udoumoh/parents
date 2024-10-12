"use client";
import { FC, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Flex,
  Text,
  Grid,
  Avatar,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Icon,
  Button,
  Stack,
  Badge,
  Image,
  useDisclosure
} from "@chakra-ui/react";
import Attendance from "@/components/attendance";
import Invoice from "@/components/invoice";
import { useUserAPI } from "@/hooks/UserContext";
import formatNumberWithCommas from "@/helpers/formatNumberWithCommas";
import { CiWarning } from "react-icons/ci";
import { IoIosWarning } from "react-icons/io";
import { PiChatsTeardropBold, PiEyeBold } from "react-icons/pi";
import { HiOutlineUser } from "react-icons/hi";
import { ComposeInstantMessage } from "@/components/shared/composeInstantMessage";
import Carousel from "./components/Carousel";
import { Student } from "@/gql/types";

interface DashboardPageProps {}

const DashboardPage: FC<DashboardPageProps> = ({}) => {
  const { currentWardProfile, invoiceData, parentData } = useUserAPI();
  const [currentStudentData, setCurrentStudentData] = useState<Student>();
  const {
    isOpen: isComposeModalOpen,
    onClose: onComposeModalClose,
    onOpen: onComposeModalOpen,
  } = useDisclosure();

  useEffect(() => {
    const currentId = Number(localStorage.getItem("currentId"));
      const studentData = parentData?.children?.find(
        (child) => child.id === currentId
      );
      setCurrentStudentData(studentData);
  }, [parentData]);

  const totalBalance = invoiceData
    ?.filter((invoice) => invoice.status === "partial payment")
    ?.reduce((acc, invoice) => acc + invoice?.balance, 0);

  const totalOwingAmount =
    invoiceData
      ?.filter(
        (invoice) =>
          invoice.status === "active" || invoice.status === "processing"
      )
      .reduce((acc, invoice) => acc + invoice?.amountPaid, 0) + totalBalance;

      const recipientData = {
      name: `${currentStudentData?.creator?.admin?.firstName || ""} ${currentStudentData?.creator?.admin?.middleName || ""} ${currentStudentData?.creator?.admin?.lastName || ""}`,
      role: currentStudentData?.creator?.admin?.role,
      email: currentStudentData?.creator?.admin?.email,
      profileImageUrl: currentStudentData?.creator?.admin?.profileImgUrl,
      school: currentStudentData?.creator?.admin?.school,
      schoolImg: currentStudentData?.creator?.admin?.schoolImg,
      id: currentStudentData?.creator?.admin?.userId,
    }

  return (
    <Box>
      <ComposeInstantMessage
        isOpen={isComposeModalOpen}
        onClose={onComposeModalClose}
        recipientDetails={recipientData}
      />
      <Flex gap={5} flexDir={"column"}>
        <Flex
          flexDir={{ base: "column", lg: "row" }}
          justifyContent={"space-between"}
          gap={5}
          columnGap={5}
        >
          <Box
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={"1s"}
            width={"full"}
            rounded={"md"}
            border={"1px solid #E2E2E2"}
            overflow={"hidden"}
            backgroundColor={"#ffffff"}
            p={"1rem"}
            display={"flex"}
            flexDir={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box
              display={"flex"}
              flexDir={"column"}
              alignItems={"center"}
              gap={3}
            >
              <Image
                src={`${
                  currentWardProfile?.profileImage ||
                  "https://th.bing.com/th/id/R.22dbc0f5e5f5648613f0d1de3ea7ae0a?rik=k6HQ45uVGe81rw&pid=ImgRaw&r=0"
                }`}
                w="150px"
                h="150px"
                objectFit="cover"
                alt="profile-img"
                style={{ borderRadius: "10px" }}
              />
              <Box>
                <Text fontWeight={"bold"} fontSize={{ base: "lg", lg: "xl" }} textTransform={"capitalize"}>
                  {`${currentWardProfile?.firstName} ${currentWardProfile?.middleName}
                    ${currentWardProfile?.lastName}`}
                </Text>
              </Box>
            </Box>
            <Box
              textAlign={"start"}
              display={"flex"}
              alignItems={"center"}
              gap={{ base: 2, md: 10 }}
            >
              <Grid alignItems={"center"} gap={1}>
                <Text
                  color={"#8F8F8F"}
                  fontSize={{ base: "2xs", md: "xs" }}
                  fontWeight={"600"}
                >
                  Gender
                </Text>
                <Text
                  fontWeight={"semibold"}
                  fontSize={{ base: "xs", md: "sm", xl: "lg" }}
                >
                  {currentWardProfile?.gender}
                </Text>
              </Grid>
              <Grid alignItems={"center"} gap={1}>
                <Text
                  color={"#8F8F8F"}
                  fontSize={{ base: "2xs", md: "xs" }}
                  fontWeight={"600"}
                >
                  Date of Birth
                </Text>
                <Text
                  fontWeight={"semibold"}
                  fontSize={{ base: "xs", md: "sm", xl: "lg" }}
                >
                  {currentWardProfile?.dateOfBirth}
                </Text>
              </Grid>
              <Grid alignItems={"center"} gap={1}>
                <Text
                  color={"#8F8F8F"}
                  fontSize={{ base: "2xs", md: "xs" }}
                  fontWeight={"600"}
                >
                  LGA
                </Text>
                <Text
                  fontWeight={"semibold"}
                  fontSize={{ base: "xs", md: "sm", xl: "lg" }}
                >
                  {currentStudentData?.lgaOrigin}
                </Text>
              </Grid>
              <Grid gap={1} display={{ base: "none", md: "grid" }}>
                <Text
                  color={"#8F8F8F"}
                  fontSize={{ base: "2xs", md: "xs" }}
                  fontWeight={"600"}
                >
                  State
                </Text>
                <Text
                  fontWeight={"semibold"}
                  fontSize={{ base: "xs", md: "sm", xl: "lg" }}
                >
                  {currentStudentData?.state}
                </Text>
              </Grid>
            </Box>
          </Box>

          <Box
            p={"1rem"}
            w={"full"}
            rounded={"md"}
            border={"1px solid #E2E2E2"}
            overflow={"hidden"}
            backgroundColor={"#ffffff"}
            gap={3}
            display={"flex"}
            flexDir={"column"}
            justifyContent={"space-between"}
          >
            <Box>
              <Flex alignItems={"center"} gap={4}>
                {currentStudentData?.school?.school?.logoImgUrl && (
                  <Box h={"full"}>
                    <Avatar
                      src={`${currentStudentData?.school?.school?.logoImgUrl}`}
                      borderRadius={"5px"}
                    />
                  </Box>
                )}
                <Box gap={3}>
                  <Text
                    fontWeight={"bold"}
                    fontSize={"lg"}
                    textTransform={"capitalize"}
                  >
                    {currentStudentData?.school?.school?.schoolName}
                  </Text>
                  <Text fontSize={"sm"}>
                    {currentStudentData?.school?.school?.address}
                  </Text>
                </Box>
              </Flex>

              <Stack direction="row" spacing={4} mt={"0.8rem"}>
                <Button
                  leftIcon={<PiChatsTeardropBold />}
                  backgroundColor={"#007C7B"}
                  color={"#ffffff"}
                  variant="solid"
                  size={"sm"}
                  rounded={"4px"}
                  _hover={{ backgroundColor: "#026A69" }}
                  fontSize={"xs"}
                  _active={{
                    backgroundColor: "#064F4E",
                    transform: "scale(1.1)",
                    transition: "0.3s ease",
                  }}
                  onClick={onComposeModalOpen}
                >
                  Send Message
                </Button>
                {/* <Button
                  leftIcon={<PiEyeBold />}
                  backgroundColor={"#007C7B"}
                  color={"#ffffff"}
                  variant="solid"
                  size={"sm"}
                  rounded={"4px"}
                  _hover={{ backgroundColor: "#026A69" }}
                  fontSize={"xs"}
                  _active={{
                    backgroundColor: "#064F4E",
                    transform: "scale(1.03)",
                    transition: "0.1s ease",
                  }}
                >
                  View Profile
                </Button> */}
              </Stack>
            </Box>

            <Box display={"flex"} flexDir={"column"} gap={2}>
              <Stack gap={3}>
                <Flex alignItems={"center"} gap={3}>
                  <Icon as={HiOutlineUser} boxSize={4} color={"#007C7B"} />
                  <Flex alignItems={"center"} gap={2}>
                    <Text fontSize={"sm"} textTransform={"capitalize"}>
                      {currentStudentData?.creator?.admin?.firstName}{" "}
                      {currentStudentData?.creator?.admin?.middleName}{" "}
                      {currentStudentData?.creator?.admin?.lastName}
                    </Text>
                    <Badge
                      size={"sm"}
                      backgroundColor={"#FDBC52"}
                      textTransform={"capitalize"}
                      fontSize={"2xs"}
                      color={"#ffffff"}
                      fontWeight={"normal"}
                      px={"0.3rem"}
                    >
                      Admin
                    </Badge>
                  </Flex>
                </Flex>

                {currentStudentData?.classroom?.classroom && (
                  <>
                    <Flex
                      alignItems={"center"}
                      gap={3}
                      display={
                        currentStudentData?.classroom?.classroom?.teacher
                          ?.length === 0
                          ? "none"
                          : "flex"
                      }
                    >
                      <Icon as={HiOutlineUser} boxSize={4} color={"#007C7B"} />
                      <Flex alignItems={"center"} gap={2}>
                        <Text fontSize={"sm"} textTransform={"uppercase"}>
                          {
                            currentStudentData?.classroom?.classroom?.teacher[0]
                              ?.firstName
                          }{" "}
                          {
                            currentStudentData?.classroom?.classroom?.teacher[0]
                              ?.middleName
                          }{" "}
                          {
                            currentStudentData?.classroom?.classroom?.teacher[0]
                              ?.lastName
                          }
                        </Text>
                        <Badge
                          size={"sm"}
                          backgroundColor={"#5B7FC9"}
                          textTransform={"capitalize"}
                          fontSize={"2xs"}
                          color={"#ffffff"}
                          fontWeight={"normal"}
                          px={"0.3rem"}
                        >
                          Teacher
                        </Badge>
                      </Flex>
                    </Flex>
                  </>
                )}
              </Stack>

              <Text fontWeight={"bold"} fontSize={"sm"}>
                Class Enrolled:{" "}
                {currentStudentData?.classroom?.classroom?.className}
              </Text>
            </Box>
          </Box>

          {/* Financials */}
          <Box
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={"1s"}
            border={"1px solid #E2E2E2"}
            rounded={"md"}
            pt={4}
            pb={2}
            minW={{ base: "full", md: "300px" }}
          >
            <Box
              display={"flex"}
              w={"full"}
              maxW={"200px"}
              roundedRight={"full"}
              alignItems={"center"}
              bgGradient="linear(to-l, #DDA44E, #005D5D)"
              mb={3}
            >
              {/* <Icon as={FaMoneyBill} color={'#005D5D'}/> */}
              <Text
                fontWeight={"bold"}
                color={"#FFFFFF"}
                fontSize={"sm"}
                px={4}
                py={1}
              >
                Quick Financials
              </Text>
            </Box>

            <Box px={4}>
              <Flex
                flexDir={"column"}
                backgroundColor={"#FAEEEE"}
                rounded={"lg"}
                px={4}
                py={2}
                mb={"1rem"}
                border={"1px solid red.800"}
              >
                <Text fontSize={"sm"} color={"#00000070"} fontWeight={"bold"}>
                  Owing balance
                </Text>
                <Text fontSize={"2xl"} color={"red.700"} fontWeight={"bold"}>
                  ₦{formatNumberWithCommas(totalOwingAmount || 0)}
                </Text>
              </Flex>
              <Flex
                flexDir={"column"}
                backgroundColor={"#EEFAF4"}
                rounded={"lg"}
                px={4}
                py={2}
                my={"0.5rem"}
              >
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  <Text fontSize={"sm"} color={"#00000070"} fontWeight={"bold"}>
                    Overpaid Balance
                  </Text>
                  <Popover  closeOnBlur={false}>
                    <PopoverTrigger>
                      <IconButton
                        aria-label="warning"
                        icon={<CiWarning size={"16"} />}
                        color={"red"}
                        size={"xs"}
                        backgroundColor={"#EEFAF4"}
                      />
                    </PopoverTrigger>
                    <PopoverContent
                      color="#000"
                      bg="white"
                      borderColor="red.500"
                    >
                      <PopoverHeader pt={4} fontWeight="bold" border="0">
                        <Flex alignItems={"center"} gap={2}>
                          <Icon as={IoIosWarning} color={"red"} />
                          <Text color={"red"}>Disclaimer!!!</Text>
                        </Flex>
                      </PopoverHeader>
                      <PopoverCloseButton />
                      <PopoverBody>
                        <Text fontSize={{ base: "xs", sm: "sm" }}>
                          Before starting the process of transferring your child
                          to another school, it's crucial to use up your
                          Overpaid balance in your current school. <strong>Unpaid
                          balances cannot be transferred to a new school. </strong> 
                          Greynote doesn't manage payments or receive funds for
                          schools or parents. Please note that all funds in your
                          wallet belong to the school, and if you choose to
                          withdraw your child, the school is responsible for
                          refunding your wallet balance. Greynote will not be
                          held responsible if parents fail to deplete their
                          wallet balance before transferring a child to another
                          school.
                        </Text>
                      </PopoverBody>
                      <PopoverFooter
                        border="0"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      ></PopoverFooter>
                    </PopoverContent>
                  </Popover>
                </Flex>
                <Text fontSize={"2xl"} color={"#005D5D"} fontWeight={"bold"}>
                  ₦{formatNumberWithCommas(currentWardProfile?.wallet || 0)}
                </Text>
              </Flex>
            </Box>
          </Box>
        </Flex>

        <Flex
          flexDir={{ base: "column", xl: "row" }}
          justifyContent={"space-between"}
          gap={5}
          columnGap={5}
        >
          <Attendance />

          <Invoice />

          {/* <Carousel /> */}
        </Flex>
      </Flex>
    </Box>
  );
};

export default DashboardPage;
