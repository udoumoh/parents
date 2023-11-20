'use client'
import { FC } from "react";
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
import { PiChatTeardropTextLight } from "react-icons/pi";
import { BsArrowRightShort } from "react-icons/bs";
import EmptyStateCard from "@/components/shared/emptyStateCard";
import { useUserAPI } from "@/hooks/user/UserContext";

interface DashboardPageProps {}

const DashboardPage: FC<DashboardPageProps> = ({}) => {
    const { currentWardProfile } = useUserAPI();

  return (
    <Flex gap={5} flexDir={"column"} mb={"5rem"}>
      <Flex
        flexDir={{ base: "column", lg: "row" }}
        justifyContent={"space-between"}
        gap={5}
        columnGap={5}
      >
        <Box
          width={{ base: "full", lg: "20rem" }}
          rounded={"xl"}
          border={"1px solid #C2C2C2"}
          overflow={"hidden"}
          shadow={"none"}
        >
          <Box
            backgroundImage={"/images/dbimg.png"}
            h={"4.6rem"}
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
          />
          <Image
            src={currentWardProfile?.schoollogo}
            alt="logo"
            w={"5rem"}
            h={"5rem"}
            mx={"auto"}
            mt={"-30px"}
            border={"5px solid #fff"}
            rounded={"2xl"}
            pointerEvents={"none"}
          />
          <Box textAlign={"center"} my={"0.5rem"} px={"2rem"}>
            <Text fontSize={"xl"} fontWeight={"600"}>
              {currentWardProfile?.school}
            </Text>
            <Text fontSize="md" color={"#959595"}>
              Your ward attends this school
            </Text>
            <Button
              bg={"#005D5D"}
              color={"#fff"}
              my={"2rem"}
              fontWeight={"light"}
              colorScheme="teal"
            >
              <PiChatTeardropTextLight size={"1.3rem"} />
              <Text mx={"0.2rem"}>Contact School</Text>
            </Button>
          </Box>
        </Box>

        <Box
          width={{ base: "full", lg: "69%" }}
          rounded={"xl"}
          border={"1px solid #C2C2C2"}
          overflow={"hidden"}
          p={"1rem"}
          bgImage={"/images/childcard.png"}
          bgSize={"cover"}
          shadow={"none"}
          my={{ base: "10px", md: "0" }}
        >
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box display={"flex"} alignItems={"center"} gap={3}>
              <Avatar
                size={"lg"}
                src={currentWardProfile?.profileImage}
                pointerEvents={"none"}
              />
              <Box lineHeight={"20px"}>
                <Text fontWeight={"600"} fontSize={"lg"}>
                  {`${currentWardProfile?.firstName} ${currentWardProfile?.lastName}`}
                </Text>
                <Text fontSize={"1rem"} fontWeight={"600"} color={"#AAAAAA"}>
                  GN24002
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
            <Text fontWeight={"600"} my={"0.5rem"}>
              Student Cases
            </Text>
            <Box textAlign={"center"} display={"flex"} gap={10} mb={"1rem"}>
              <Grid>
                <Text fontSize={"lg"} fontWeight={"600"}>
                  {currentWardProfile?.feesDefault}
                </Text>
                <Text color={"#8F8F8F"} fontWeight={"600"} fontSize={"0.7rem"}>
                  Fees Default
                </Text>
              </Grid>
              <Grid>
                <Text fontSize={"lg"} fontWeight={"600"}>
                  {currentWardProfile?.suspension}
                </Text>
                <Text color={"#8F8F8F"} fontWeight={"600"} fontSize={"0.7rem"}>
                  Suspension
                </Text>
              </Grid>
              <Grid>
                <Text fontSize={"lg"} fontWeight={"600"}>
                  {currentWardProfile?.expulsion}
                </Text>
                <Text color={"#8F8F8F"} fontWeight={"600"} fontSize={"0.7rem"}>
                  Expulsion
                </Text>
              </Grid>
            </Box>

            <Box
              textAlign={"start"}
              display={"flex"}
              gap={{ base: 2, md: 10 }}
              my={"1rem"}
            >
              <Grid>
                <Text color={"#8F8F8F"} fontSize={"0.8rem"} fontWeight={"600"}>
                  Gender
                </Text>
                <Text fontWeight={"600"} fontSize={{ base: "xs", md: "lg" }}>
                  {currentWardProfile?.gender}
                </Text>
              </Grid>
              <Grid>
                <Text color={"#8F8F8F"} fontSize={"0.8rem"} fontWeight={"600"}>
                  Class
                </Text>
                <Text fontWeight={"600"} fontSize={{ base: "xs", md: "lg" }}>
                  {currentWardProfile?.class}
                </Text>
              </Grid>
              <Grid>
                <Text color={"#8F8F8F"} fontSize={"0.8rem"} fontWeight={"600"}>
                  Date of Birth
                </Text>
                <Text fontWeight={"600"} fontSize={{ base: "xs", md: "lg" }}>
                  {currentWardProfile?.dateOfBirth}
                </Text>
              </Grid>
            </Box>

            <Box
              textAlign={"start"}
              display={"flex"}
              gap={{ base: 2, md: 10 }}
              my={"1rem"}
            >
              <Grid>
                <Text color={"#8F8F8F"} fontSize={"0.8rem"} fontWeight={"600"}>
                  Date Enrolled
                </Text>
                <Text fontWeight={"600"} fontSize={{ base: "xs", md: "lg" }}>
                  {currentWardProfile?.dateEnrolled}
                </Text>
              </Grid>
              <Grid>
                <Text color={"#8F8F8F"} fontSize={"0.8rem"} fontWeight={"600"}>
                  Expected Graduation
                </Text>
                <Text fontWeight={"600"} fontSize={{ base: "xs", md: "lg" }}>
                  {currentWardProfile?.expectedGraduation}
                </Text>
              </Grid>
              <Grid>
                <Text color={"#8F8F8F"} fontSize={"0.8rem"} fontWeight={"600"}>
                  Date Registered
                </Text>
                <Text fontWeight={"600"} fontSize={{ base: "xs", md: "lg" }}>
                  {currentWardProfile?.dateRegistered}
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
        <EmptyStateCard />

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
