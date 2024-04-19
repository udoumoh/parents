"use client";
import { FC, useState, useEffect } from "react";
import {
  Box,
  Text,
  Button,
  Icon,
  Image,
  Avatar,
  Flex,
  Input,
  Select,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiSchoolLine } from "react-icons/ri";
import PostItem from "./components/PostItem";
import { useQuery } from "@apollo/client";
import { GET_SCHOOLS } from "@/gql/queries";
import { useUserLikesAPI } from "@/hooks/UserLikesContext";
import { useUserAPI } from "@/hooks/UserContext";

interface DiscoverProps {}

interface ProfileProps {
  genderType: string;
  schoolType: string;
  type: string;
  bannerImgUrl: string;
  country: string;
  createdAt: string;
  description: string;
  email: string;
  facebookUrl: string;
  id: number;
  instagramUrl: string;
  lgarea: string;
  linkedinUrl: string;
  logoImgUrl: string;
  phonenumber: string;
  profileLikes: number;
  profileViews: number;
  rcnumber: string;
  schoolName: string;
  state: string;
  twitterUrl: string;
  websiteUrl: string;
  whoLikedProfile: string[];
  schoolMedia: string[];
}

const Discover: FC<DiscoverProps> = ({}) => {
  const { parentData } = useUserAPI();
  const { schoolProfiles } = useUserLikesAPI();
  const [type, setType] = useState("");
  const [genderType, setGenderType] = useState("");
  const [schoolType, setSchoolType] = useState("");
  const [filterParams, setFilterParams] = useState(
    {
      type: "", 
      genderType: "", 
      schoolType: "" 
    }
  )
  const [likedPosts, setLikedPosts] = useState<ProfileProps[]>([]);
  console.log(schoolProfiles)

  const handleFilter = () => {
    setFilterParams({
      type:type,
      genderType: genderType,
      schoolType: schoolType,
    })
  }

  useEffect(() => {
    const likedPosts = schoolProfiles?.filter((profile) =>
      profile?.whoLikedProfile?.includes(parentData?.userId || "")
    );
    setLikedPosts(likedPosts);
  }, [parentData, schoolProfiles]);

  const tempData = schoolProfiles?.filter((profile) => profile?.type === filterParams?.type || profile?.genderType === filterParams?.genderType || profile?.schoolType === filterParams?.schoolType)

  console.log(tempData)

  return (
    <Box h={"100vh"} w={"full"} p={"1.5rem"} overflowY={"auto"} pb={"10rem"}>
      <Box
        backgroundImage={"/images/discoverbg.svg"}
        bgSize="cover"
        bgPosition="top"
        bgRepeat="no-repeat"
        rounded={"xl"}
        display={"flex"}
        flexDir={"column"}
        justifyContent={"space-between"}
      >
        <Box color={"#FFFFFF"} p={"1rem"}>
          <Text fontSize={{ base: "xl", md: "3xl" }} fontWeight={"bold"}>
            Discover Schools on Greynote -
          </Text>
          <Text fontSize={{ base: "xl", md: "3xl" }} fontWeight={"bold"}>
            Search or Explore.
          </Text>
          <Text mt={"3rem"}>Find the ideal school for your child</Text>
        </Box>

        <Box
          backgroundColor={"#FFFFFF55"}
          rounded={"xl"}
          borderTopRadius={"2xl"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          p={"1rem"}
          backdropFilter={"blur(6px)"}
        >
          <Box
            backgroundColor={"#FFFFFF"}
            w={"full"}
            rounded={{ base: "lg", md: "full" }}
            px={"1rem"}
            py={"1rem"}
            display={"flex"}
            flexDir={{ base: "column", md: "row" }}
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={5}
          >
            <Box
              display={"flex"}
              flexDir={{ base: "column", sm: "row" }}
              gap={{ base: 4, md: 16 }}
            >
              <Flex alignItems={"center"} gap={2}>
                <Icon
                  as={HiOutlineLocationMarker}
                  boxSize={{ base: 8, md: 9 }}
                  color={"#007C7B"}
                  border={"1px solid #00000040"}
                  rounded={"full"}
                  p={"0.5rem"}
                />
                <Box
                  display={"flex"}
                  flexDir={"column"}
                  justifyContent={"space-between"}
                >
                  <Text
                    fontSize={{ base: "2xs", md: "sm" }}
                    fontWeight={"bold"}
                  >
                    TYPE
                  </Text>
                  <Select
                    placeholder="Select Type"
                    focusBorderColor="#fff"
                    color={"#00000080"}
                    size={"sm"}
                    variant={"unstyled"}
                    p={0}
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                    _hover={{ cursor: "pointer" }}
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </Select>
                </Box>
              </Flex>

              <Flex alignItems={"center"} gap={2}>
                <Icon
                  as={RiSchoolLine}
                  boxSize={{ base: 8, md: 9 }}
                  color={"#007C7B"}
                  border={"1px solid #00000040"}
                  rounded={"full"}
                  p={"0.5rem"}
                />
                <Box
                  display={"flex"}
                  flexDir={"column"}
                  justifyContent={"space-between"}
                >
                  <Text
                    fontSize={{ base: "2xs", md: "sm" }}
                    fontWeight={"bold"}
                  >
                    SCHOOL TYPE
                  </Text>
                  <Select
                    placeholder="Select School Type"
                    focusBorderColor="#fff"
                    color={"#00000080"}
                    size={"sm"}
                    variant={"unstyled"}
                    p={0}
                    onChange={(e) => {
                      setSchoolType(e.target.value);
                    }}
                    _hover={{ cursor: "pointer" }}
                  >
                    <option value="day">Day</option>
                    <option value="boarding">Boarding</option>
                    <option value="mixed">Mixed</option>
                  </Select>
                </Box>
              </Flex>

              <Flex alignItems={"center"} gap={2}>
                <Icon
                  as={RiSchoolLine}
                  boxSize={{ base: 8, md: 9 }}
                  color={"#007C7B"}
                  border={"1px solid #00000040"}
                  rounded={"full"}
                  p={"0.5rem"}
                />
                <Box
                  display={"flex"}
                  flexDir={"column"}
                  justifyContent={"space-between"}
                >
                  <Text
                    fontSize={{ base: "2xs", md: "sm" }}
                    fontWeight={"bold"}
                  >
                    GENDER TYPE
                  </Text>
                  <Select
                    placeholder="Select Gender Type"
                    focusBorderColor="#fff"
                    color={"#00000080"}
                    size={"sm"}
                    variant={"unstyled"}
                    p={0}
                    onChange={(e) => {
                      setGenderType(e.target.value);
                    }}
                    _hover={{ cursor: "pointer" }}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="mixed">Mixed</option>
                  </Select>
                </Box>
              </Flex>
            </Box>
            <Button
              _hover={{ backgroundColor: "#007C7B" }}
              rounded={"full"}
              backgroundColor={"#005D5D"}
              size={{ base: "sm", md: "md" }}
              px={"2rem"}
              fontSize={{ base: "3xs", md: "xs" }}
              onClick={handleFilter}
              color={"#FFFFFF"}
            >
              Search schools
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt={"1.5rem"} px={{ base: "0", md: "1.5rem" }}>
        <Center>
          <Tabs variant={"unstyled"}>
            <TabList>
              <Tab fontSize={"sm"} _selected={{ color: "#007C7B" }}>
                EXPLORE
              </Tab>
              <Tab fontSize={"sm"} _selected={{ color: "#007C7B" }}>
                LIKED SCHOOLS
              </Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="#007C7B"
              borderRadius="1px"
            />
            <TabPanels>
              <TabPanel px={{ base: "0", md: "1rem" }}>
                <Box>
                  <SimpleGrid columns={[1, null, 2, 3]} spacing="20px">
                    {schoolProfiles?.map((item, index) => {
                      return (
                        <PostItem
                          key={index}
                          profile={item}
                          currentIndex={index}
                        />
                      );
                    })}
                  </SimpleGrid>
                </Box>
              </TabPanel>
              <TabPanel px={{ base: "0", md: "1rem" }}>
                <Box>
                  {likedPosts.length === 0 ? (
                    <Flex
                      alignItems={"center"}
                      justifyContent={"center"}
                      flexDir={"column"}
                      my={"2rem"}
                    >
                      <Image
                        alt="no likes"
                        src="/images/nolikes.svg"
                        w={{ base: "200", md: "300px" }}
                        h={"200px"}
                      />
                      <Text
                        textAlign={"center"}
                        color={"gray.500"}
                        fontSize={{ base: "md", md: "lg" }}
                        mt={"2rem"}
                      >
                        You have not liked any post. Like a post and come back
                        here to see it.
                      </Text>
                    </Flex>
                  ) : (
                    <SimpleGrid columns={[1, null, 2, 3]} spacing="20px">
                      {likedPosts?.map((item, index) => {
                        return (
                          <PostItem
                            key={index}
                            profile={item}
                            currentIndex={index}
                          />
                        );
                      })}
                    </SimpleGrid>
                  )}
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Center>
      </Box>
    </Box>
  );
};

export default Discover;
