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

interface DiscoverProps {}

const Discover: FC<DiscoverProps> = ({}) => {
    const {schoolProfiles} = useUserLikesAPI();
    const [location, setLocation] = useState("")
    const [schoolType, setSchoolType] = useState("")
    const {data: getSchools, loading} = useQuery(GET_SCHOOLS)
    const [activeProfileIndex, setActiveProfileIndex] = useState(0)
    
  return (
    <Box h={"100vh"} w={"full"} p={"1.5rem"} overflowY={"auto"} pb={"5rem"}>
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
                    LOCATION
                  </Text>
                  <Input
                    placeholder="Search Location"
                    border={"0px"}
                    p={0}
                    focusBorderColor="#fff"
                    color={"#00000080"}
                    size={"sm"}
                    _placeholder={{
                      fontSize: { base: "sm", md: "sm" },
                      color: "#00000080",
                    }}
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                  />
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
                    _hover={{cursor:"pointer"}}
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
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
              <TabPanel px={{base:"0", md:"1rem"}}>
                <Box>
                  <SimpleGrid columns={[1, null, 2, 3]} spacing="20px">
                    {schoolProfiles?.map((item, index) => {
                      return(
                        <PostItem key={index} profile={item} loading={loading} currentIndex={index}/>
                      )
                    })}
                  </SimpleGrid>
                </Box>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Center>
      </Box>
    </Box>
  );
};

export default Discover;
