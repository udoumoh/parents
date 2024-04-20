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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Portal,
} from "@chakra-ui/react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiSchoolLine } from "react-icons/ri";
import PostItem from "./components/PostItem";
import { useUserLikesAPI } from "@/hooks/UserLikesContext";
import { useUserAPI } from "@/hooks/UserContext";
import { IoIosArrowDown } from "react-icons/io";
import { RiGenderlessLine } from "react-icons/ri";

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
  const { filteredPosts, setFilteredPosts, schoolProfiles } = useUserLikesAPI();
  const [type, setType] = useState("");
  const [genderType, setGenderType] = useState("");
  const [schoolType, setSchoolType] = useState("");
  const [likedPosts, setLikedPosts] = useState<ProfileProps[]>([]);
  const [filterParams, setFilterParams] = useState({
    type: "",
    genderType: "",
    schoolType: "",
  });

  const handleFilterChange = (filterName: any, value: any) => {
    setFilterParams({
      ...filterParams,
      [filterName]: value,
    });
  };

  const applyFilters = () => {
    let filteredResults = schoolProfiles;

    if (filterParams?.type) {
      filteredResults = filteredResults?.filter(
        (post) => post?.type?.toLowerCase() === filterParams?.type?.toLowerCase()
      );
    }
    if (filterParams?.schoolType) {
      filteredResults = filteredResults?.filter(
        (post) =>
          post?.schoolType?.toLowerCase() ===
          filterParams?.schoolType?.toLowerCase()
      );
    }
    if (filterParams?.genderType) {
      filteredResults = filteredResults?.filter(
        (post) =>
          post?.genderType?.toLowerCase() ===
          filterParams?.genderType?.toLowerCase()
      );
    }

    setFilteredPosts(filteredResults);
  };

  useEffect(() => {
    const likedPosts = filteredPosts?.filter((profile) =>
      profile?.whoLikedProfile?.includes(parentData?.userId || "")
    );
    setLikedPosts(likedPosts);
  }, [parentData, filteredPosts]);

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
                  border={"1px solid #005D5D"}
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
                  <Menu isLazy>
                    <MenuButton
                      color={"#00000080"}
                      _hover={{ cursor: "pointer" }}
                    >
                      <Flex gap={3} alignItems={"center"}>
                        <Text fontSize={"sm"}>
                          {filterParams?.type.length === 0
                            ? "Select Type"
                            : filterParams?.type}
                        </Text>
                        <Icon as={IoIosArrowDown} />
                      </Flex>
                    </MenuButton>
                    <Portal>
                      <MenuList>
                        <MenuItem
                          onClick={() => handleFilterChange("type", "public")}
                        >
                          Public
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleFilterChange("type", "private")}
                        >
                          Private
                        </MenuItem>
                      </MenuList>
                    </Portal>
                  </Menu>
                </Box>
              </Flex>

              <Flex alignItems={"center"} gap={2}>
                <Icon
                  as={RiSchoolLine}
                  boxSize={{ base: 8, md: 9 }}
                  color={"#007C7B"}
                  border={"1px solid #005D5D"}
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
                  <Menu isLazy>
                    <MenuButton
                      color={"#00000080"}
                      _hover={{ cursor: "pointer" }}
                    >
                      <Flex gap={3} alignItems={"center"}>
                        <Text fontSize={"sm"}>
                          {filterParams?.schoolType.length === 0
                            ? "Select School Type"
                            : filterParams?.schoolType}
                        </Text>
                        <Icon as={IoIosArrowDown} />
                      </Flex>
                    </MenuButton>
                    <Portal>
                      <MenuList>
                        <MenuItem
                          onClick={() =>
                            handleFilterChange("schoolType", "day")
                          }
                        >
                          Day
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            handleFilterChange("schoolType", "boarding")
                          }
                        >
                          Boarding
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            handleFilterChange("schoolType", "mixed")
                          }
                        >
                          Mixed
                        </MenuItem>
                      </MenuList>
                    </Portal>
                  </Menu>
                </Box>
              </Flex>

              <Flex alignItems={"center"} gap={2}>
                <Icon
                  as={RiGenderlessLine}
                  boxSize={{ base: 8, md: 9 }}
                  color={"#007C7B"}
                  border={"1px solid #005D5D"}
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
                  <Menu isLazy>
                    <MenuButton
                      color={"#00000080"}
                      _hover={{ cursor: "pointer" }}
                    >
                      <Flex gap={3} alignItems={"center"}>
                        <Text fontSize={"sm"}>
                          {filterParams?.genderType.length === 0
                            ? "Select Gender Type"
                            : filterParams?.genderType}
                        </Text>
                        <Icon as={IoIosArrowDown} />
                      </Flex>
                    </MenuButton>
                    <Portal>
                      <MenuList>
                        <MenuItem
                          onClick={() =>
                            handleFilterChange("genderType", "male")
                          }
                        >
                          Male
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            handleFilterChange("genderType", "female")
                          }
                        >
                          Female
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            handleFilterChange("genderType", "mixed")
                          }
                        >
                          Mixed
                        </MenuItem>
                      </MenuList>
                    </Portal>
                  </Menu>
                </Box>
              </Flex>
            </Box>
            <Button
              rounded={"full"}
              size={{ base: "sm", md: "md" }}
              px={"2rem"}
              // fontSize={{ base: "3xs", md: "xs" }}
              colorScheme="teal"
              onClick={applyFilters}
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
                  {filteredPosts?.length === 0 ? (
                    <Flex
                      alignItems={"center"}
                      justifyContent={"center"}
                      flexDir={"column"}
                      my={"2rem"}
                    >
                      <Image
                        alt="no likes"
                        src="/images/nosearchresult.svg"
                        w={{ base: "300", md: "300px" }}
                        h={"200px"}
                      />
                      <Text
                        textAlign={"center"}
                        color={"gray.500"}
                        fontSize={{ base: "md", md: "lg" }}
                        mt={"2rem"}
                      >
                        There are no results for your search criteria
                      </Text>
                    </Flex>
                  ) : (
                    <SimpleGrid columns={[1, null, 2, 3]} spacing="20px">
                      {filteredPosts?.map((item, index) => {
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
