'use client'
import { FC, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Button,
  Grid,
  Avatar,
  Card,
} from "@chakra-ui/react";
import Attendance from "@/components/attendance";
import { BsArrowRightShort } from "react-icons/bs";
import EmptyStateCard from "@/components/shared/emptyStateCard";
import { useUserAPI } from "@/hooks/UserContext";

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
          // bgImage={"/images/childcard.png"}
          bgSize={"cover"}
          my={{ base: "10px", md: "0" }}
        >
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box display={"flex"} alignItems={"center"} gap={3}>
              <Avatar
                size={"lg"}
                src={currentWardProfile?.profileImage}
                pointerEvents={"none"}
              />
              <Box lineHeight={"30px"}>
                <Text fontWeight={"600"} fontSize={"2xl"}>
                  {`${currentWardProfile?.firstName} ${currentWardProfile?.lastName}`}
                </Text>
              </Box>
            </Box>
            <Image
              src="/images/schoollogo.png"
              alt="profileImg"
              w={"4.5rem"}
              h={"4.5rem"}
              pointerEvents={"none"}
            />
          </Box>
          <Box>
            <Box
              textAlign={"start"}
              display={"flex"}
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
            </Box>
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

        <Card
          border={"1px solid #C2C2C2"}
          rounded={"xl"}
          w={"full"}
          p={4}
          my={{ base: "10px", md: "0" }}
          shadow={"none"}
        >
          <Flex align={"flex-end"} justifyContent={"space-between"}>
            <Grid>
              <Text fontWeight={"bold"}>Greycases</Text>
              <Text fontSize={"xs"} color={"#8F8F8F"} fontWeight={"600"}>
                Student cases that require action
              </Text>
            </Grid>
            <Button color={"#005D5D"} bg={"#E8E8E8"} size={"sm"} rounded={"md"}>
              <Text>Show all</Text>
              <BsArrowRightShort />
            </Button>
          </Flex>

          <Flex
            mt={"1rem"}
            mb={"0.5rem"}
            justifyContent={"space-between"}
            flexDir={{ base: "column", sm: "row" }}
            border={"1px solid #C2C2C2"}
            p={"1rem"}
            rounded={"lg"}
            _hover={{
              backgroundColor: "#007C7B10",
              cursor: "pointer",
              transition: "0.5s",
            }}
          >
            <Box display={{ base: "column", sm: "flex" }} alignItems={"center"}>
              <Image
                w={"3.5rem"}
                h={"3.5rem"}
                src="/images/schoollogo.png"
                alt="schoolLogo"
                mr={"1rem"}
                pointerEvents={"none"}
              />
              <Grid w={"full"}>
                <Text fontWeight={"700"} fontSize={"sm"} mb={"0.3rem"}>
                  Green Springs High School
                </Text>
                <Flex align={"flex-end"}>
                  <Text color={"#555555"} fontSize={"xs"} fontWeight={"700"}>
                    Amount owed: &nbsp;
                  </Text>
                  <Text color={"#8F8F8F"} fontSize={"xs"} fontWeight={"600"}>
                    {" "}
                    $ 1200
                  </Text>
                </Flex>
                <Flex align={"flex-end"}>
                  <Text color={"#555555"} fontSize={"xs"} fontWeight={"700"}>
                    Date Created: &nbsp;
                  </Text>
                  <Text color={"#8F8F8F"} fontSize={"xs"} fontWeight={"600"}>
                    {" "}
                    22nd June 2023
                  </Text>
                </Flex>
              </Grid>
            </Box>
            <Flex gap={2}>
              <Box
                w={".8rem"}
                h={".8rem"}
                borderRadius={"50%"}
                bg={"#F93535"}
                border={"4px solid #FCAEAE"}
              />
              <Text fontSize={"2xs"} color={"#F93535"} fontWeight={"600"}>
                Fees Default
              </Text>
            </Flex>
          </Flex>

          <Flex
            my={"0.5rem"}
            justifyContent={"space-between"}
            flexDir={{ base: "column", sm: "row" }}
            border={"1px solid #C2C2C2"}
            p={"1rem"}
            rounded={"lg"}
            _hover={{
              backgroundColor: "#007C7B10",
              cursor: "pointer",
              transition: "0.5s",
            }}
          >
            <Box display={{ base: "column", sm: "flex" }} alignItems={"center"}>
              <Image
                w={"3.5rem"}
                h={"3.5rem"}
                src="/images/schoollogo.png"
                alt="schoolLogo"
                mr={"1rem"}
                pointerEvents={"none"}
              />
              <Grid>
                <Text fontWeight={"700"} fontSize={"sm"} mb={"0.3rem"}>
                  Green Springs High School
                </Text>
                <Flex align={"flex-end"}>
                  <Text color={"#555555"} fontSize={"xs"} fontWeight={"700"}>
                    Amount owed: &nbsp;
                  </Text>
                  <Text color={"#8F8F8F"} fontSize={"xs"} fontWeight={"600"}>
                    {" "}
                    $ 1200
                  </Text>
                </Flex>
                <Flex align={"flex-end"}>
                  <Text color={"#555555"} fontSize={"xs"} fontWeight={"700"}>
                    Date Created: &nbsp;
                  </Text>
                  <Text color={"#8F8F8F"} fontSize={"xs"} fontWeight={"600"}>
                    {" "}
                    22nd June 2023
                  </Text>
                </Flex>
              </Grid>
            </Box>
            <Flex gap={2}>
              <Box
                w={".8rem"}
                h={".8rem"}
                borderRadius={"50%"}
                bg={"#F93535"}
                border={"4px solid #FCAEAE"}
              />
              <Text fontSize={"2xs"} color={"#F93535"} fontWeight={"600"}>
                Fees Default
              </Text>
            </Flex>
          </Flex>

          <Flex
            my={"0.5rem"}
            justifyContent={"space-between"}
            flexDir={{ base: "column", sm: "row" }}
            border={"1px solid #C2C2C2"}
            p={"1rem"}
            rounded={"lg"}
            _hover={{
              backgroundColor: "#007C7B10",
              cursor: "pointer",
              transition: "0.5s",
            }}
          >
            <Box display={{ base: "column", sm: "flex" }} alignItems={"center"}>
              <Image
                w={"3.5rem"}
                h={"3.5rem"}
                src="/images/schoollogo.png"
                alt="schoolLogo"
                mr={"1rem"}
                pointerEvents={"none"}
              />
              <Grid>
                <Text fontWeight={"700"} fontSize={"sm"} mb={"0.3rem"}>
                  Green Springs High School
                </Text>
                <Flex align={"flex-end"}>
                  <Text color={"#555555"} fontSize={"xs"} fontWeight={"700"}>
                    Amount owed: &nbsp;
                  </Text>
                  <Text color={"#8F8F8F"} fontSize={"xs"} fontWeight={"600"}>
                    {" "}
                    $ 1200
                  </Text>
                </Flex>
                <Flex align={"flex-end"}>
                  <Text color={"#555555"} fontSize={"xs"} fontWeight={"700"}>
                    Date Created: &nbsp;
                  </Text>
                  <Text color={"#8F8F8F"} fontSize={"xs"} fontWeight={"600"}>
                    {" "}
                    22nd June 2023
                  </Text>
                </Flex>
              </Grid>
            </Box>
            <Flex gap={2}>
              <Box
                w={".8rem"}
                h={".8rem"}
                borderRadius={"50%"}
                bg={"#F93535"}
                border={"4px solid #FCAEAE"}
              />
              <Text fontSize={"2xs"} color={"#F93535"} fontWeight={"600"}>
                Fees Default
              </Text>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
};

export default DashboardPage;
