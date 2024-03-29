"use client";
import { FC } from "react";
import { Box, Flex, Text, Image, Grid, Avatar, Icon, Divider } from "@chakra-ui/react";
import Attendance from "@/components/attendance";
import Invoice from "@/components/invoice";
import { useUserAPI } from "@/hooks/UserContext";
import { FaMoneyBill } from "react-icons/fa6";

interface DashboardPageProps {}

const DashboardPage: FC<DashboardPageProps> = ({}) => {
  const { currentWardProfile } = useUserAPI();

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
          rounded={"xl"}
          border={"1px solid #449c7c"}
          overflow={"hidden"}
          backgroundColor={"#F4FFFB"}
          p={"1rem"}
          bgSize={"cover"}
          my={{ base: "10px", md: "0" }}
        >
          <Box display={"flex"} justifyContent={"space-between"} gap={3}>
            <Box display={"flex"} alignItems={"center"} gap={3}>
              <Avatar
                size={"lg"}
                src={currentWardProfile?.profileImage}
                pointerEvents={"none"}
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
                <Text color={"#449c7c"} fontSize={"0.8rem"} fontWeight={"600"}>
                  Gender
                </Text>
                <Text
                  fontWeight={"600"}
                  fontSize={{ base: "xs", md: "lg" }}
                  color={"#606162"}
                >
                  {currentWardProfile?.gender}
                </Text>
              </Grid>
              <Grid gap={1}>
                <Text color={"#449c7c"} fontSize={"0.8rem"} fontWeight={"600"}>
                  Class
                </Text>
                <Text
                  fontWeight={"600"}
                  fontSize={{ base: "xs", md: "lg" }}
                  color={"#606162"}
                >
                  {currentWardProfile?.class}
                </Text>
              </Grid>
              <Grid gap={1}>
                <Text color={"#449c7c"} fontSize={"0.8rem"} fontWeight={"600"}>
                  Date of Birth
                </Text>
                <Text
                  fontWeight={"600"}
                  fontSize={{ base: "xs", md: "lg" }}
                  color={"#606162"}
                >
                  {currentWardProfile?.dateOfBirth}
                </Text>
              </Grid>
              <Grid gap={1} display={{ base: "none", md: "grid" }}>
                <Text color={"#449c7c"} fontSize={"0.8rem"} fontWeight={"600"}>
                  School
                </Text>
                <Text
                  fontWeight={"600"}
                  fontSize={{ base: "xs", md: "lg" }}
                  color={"#606162"}
                >
                  {currentWardProfile?.school}
                </Text>
              </Grid>
            </Box>
          </Box>
        </Box>

        <Box
          border={"1px solid #005D5D50"}
          rounded={"xl"}
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
              fontSize={"md"}
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
                ₦10,000
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
              <Text fontSize={"sm"} color={"#00000070"} fontWeight={"bold"}>
                Overpaid Balance
              </Text>
              <Text fontSize={"2xl"} color={"#005D5D"} fontWeight={"bold"}>
                ₦10,000
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
