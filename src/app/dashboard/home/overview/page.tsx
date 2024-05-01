"use client";
import { FC, useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
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
} from "@chakra-ui/react";
import Attendance from "@/components/attendance";
import Invoice from "@/components/invoice";
import { useUserAPI } from "@/hooks/UserContext";
import formatNumberWithCommas from "@/helpers/formatNumberWithCommas";
import { CiWarning } from "react-icons/ci";
import { IoIosWarning } from "react-icons/io";

interface DashboardPageProps {}

const DashboardPage: FC<DashboardPageProps> = ({}) => {
  const { currentWardProfile, invoiceData } = useUserAPI();
  const [show, setShow] = useState(false);

  const totalBalance = invoiceData
    ?.filter((invoice) => invoice.status === "partial payment")
    ?.reduce((acc, invoice) => acc + invoice?.balance, 0);
  const totalOwingAmount = invoiceData
    ?.filter(
      (invoice) =>
        invoice.status === "active" || invoice.status === "processing"
    )
    .reduce((acc, invoice) => acc + invoice?.amountPaid, 0) + totalBalance

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Flex gap={5} flexDir={"column"} mb={{ base: "8rem", lg: "5rem" }}>
      <Flex
        flexDir={{ base: "column", lg: "row" }}
        justifyContent={"space-between"}
        gap={5}
        columnGap={5}
      >
        <Box
          width={"full"}
          rounded={"2xl"}
          border={"1px solid #449c7c"}
          overflow={"hidden"}
          backgroundColor={"#F4FFFB"}
          p={"1rem"}
          bgSize={"cover"}
          my={{ base: "10px", md: "0" }}
          display={"flex"}
          flexDir={"column"}
          justifyContent={"space-between"}
        >
          <Box display={"flex"} justifyContent={"space-between"} gap={3}>
            <Box display={"flex"} alignItems={"center"} gap={3}>
              <Avatar
                size={"lg"}
                src={currentWardProfile?.profileImage}
                pointerEvents={"none"}
                name={`${currentWardProfile?.firstName} ${currentWardProfile?.lastName}`}
              />
              <Box lineHeight={"30px"}>
                <Text fontWeight={"600"} fontSize={{ base: "lg", lg: "2xl" }}>
                  {`${currentWardProfile?.firstName || ""} ${
                    currentWardProfile?.lastName || ""
                  }`}
                </Text>
              </Box>
            </Box>
            <Box display={"flex"} gap={2} alignItems={"initial"}>
              <Image
                rounded={"lg"}
                src={currentWardProfile?.schoollogo}
                alt="profileImg"
                w={{ base: "2.5rem", lg: "4.5rem" }}
                h={{ base: "2.5rem", lg: "4.5rem" }}
                pointerEvents={"none"}
              />
            </Box>
          </Box>
          <Box>
            <Box
              textAlign={"start"}
              display={"flex"}
              alignItems={"center"}
              gap={{ base: 2, md: 10 }}
              my={"1rem"}
            >
              <Grid gap={1}>
                <Text
                  color={"#449c7c"}
                  fontSize={{ base: "xs", md: "sm", xl: "lg" }}
                  fontWeight={"600"}
                >
                  Gender
                </Text>
                <Text
                  fontWeight={"500"}
                  fontSize={{ base: "xs", md: "sm", xl: "lg" }}
                  // color={"#606162"}
                >
                  {currentWardProfile?.gender}
                </Text>
              </Grid>
              <Grid gap={1}>
                <Text
                  color={"#449c7c"}
                  fontSize={{ base: "xs", md: "sm", xl: "lg" }}
                  fontWeight={"600"}
                >
                  Class
                </Text>
                <Text
                  fontWeight={"500"}
                  fontSize={{ base: "xs", md: "sm", xl: "lg" }}
                  // color={"#606162"}
                >
                  {currentWardProfile?.class}
                </Text>
              </Grid>
              <Grid gap={1}>
                <Text
                  color={"#449c7c"}
                  fontSize={{ base: "xs", md: "sm", xl: "lg" }}
                  fontWeight={"600"}
                >
                  Date of Birth
                </Text>
                <Text
                  fontWeight={"500"}
                  fontSize={{ base: "xs", md: "sm", xl: "lg" }}
                  // color={"#606162"}
                >
                  {currentWardProfile?.dateOfBirth}
                </Text>
              </Grid>
              <Grid gap={1} display={{ base: "none", md: "grid" }}>
                <Text
                  color={"#449c7c"}
                  fontSize={{ base: "xs", md: "sm", xl: "lg" }}
                  fontWeight={"600"}
                >
                  School
                </Text>
                <Text
                  fontWeight={"500"}
                  fontSize={{ base: "xs", md: "sm", xl: "lg" }}
                  // color={"#606162"}
                >
                  {currentWardProfile?.school}
                </Text>
              </Grid>
            </Box>
          </Box>
        </Box>

        <Box
          border={"1px solid #005D5D50"}
          rounded={"2xl"}
          pt={4}
          pb={2}
          minW={"300px"}
        >
          <Box
            display={"flex"}
            w={"auto"}
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
              _hover={{
                backgroundColor: "#FED3D3",
                transitionDuration: "0.5s",
              }}
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
              _hover={{
                backgroundColor: "#BAF2E5",
                transitionDuration: "0.5s",
              }}
            >
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Text fontSize={"sm"} color={"#00000070"} fontWeight={"bold"}>
                  Overpaid Balance
                </Text>
                <Popover placement="bottom" closeOnBlur={false}>
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
                    color="#fff"
                    bg="red.800"
                    borderColor="red.800"
                  >
                    <PopoverHeader pt={4} fontWeight="bold" border="0">
                      <Flex alignItems={"center"} gap={2}>
                        <Icon as={IoIosWarning} color={"orange"} />
                        <Text color={"orange"}>Disclaimer!!!</Text>
                      </Flex>
                    </PopoverHeader>
                    <PopoverArrow bg="red.800" />
                    <PopoverCloseButton />
                    <PopoverBody>
                      <Text fontSize={{base:"xs", sm:"sm" }}>
                      Before starting the process of transferring your child to
                      another school, it's crucial to use up your Overpaid
                      balance in your current school. Unpaid balances cannot be
                      transferred to a new school. Greynote doesn't manage
                      payments or receive funds for schools or parents. Please
                      note that all funds in your wallet belong to the school,
                      and if you choose to withdraw your child, the school is
                      responsible for refunding your wallet balance. Greynote
                      will not be held responsible if parents fail to deplete
                      their wallet balance before transferring a child to
                      another school.
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
      </Flex>
    </Flex>
  );
};

export default DashboardPage;
