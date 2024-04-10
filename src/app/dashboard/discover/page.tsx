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
} from "@chakra-ui/react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiSchoolLine } from "react-icons/ri";

interface DiscoverProps {}

const Discover: FC<DiscoverProps> = ({}) => {
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
                    size={"xs"}
                    _placeholder={{
                      fontSize: { base: "2xs", md: "sm" },
                      color: "#00000080",
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
                    _placeholder={{
                      fontSize: { base: "xs", md: "md" },
                      color: "#00000080",
                    }}
                    focusBorderColor="#fff"
                    color={"#00000080"}
                    size={"sm"}
                    variant={'unstyled'}
                    p={0}
                  >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
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
    </Box>
  );
};

export default Discover;
