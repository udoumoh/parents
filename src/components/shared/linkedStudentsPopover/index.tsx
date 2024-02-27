'use client'
import { FC, useState } from 'react'
import {
  Box,
  Flex,
  Text,
  useDisclosure,
  Button,
  Avatar,
  CloseButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { useUserAPI } from '@/hooks/UserContext';
import { AiOutlinePlus } from "react-icons/ai";

interface LinkedStudentsPopoverProps {
  
}

const LinkedStudentsPopover: FC<LinkedStudentsPopoverProps> = ({}) => {
    const {
      isOpen: isModalOpen,
      onOpen: onModalOpen,
      onClose: onModalClose,
    } = useDisclosure();
    const { profileData, currentId, setCurrentId, currentWardProfile, childData } =
      useUserAPI();
  return (
      <Popover isLazy matchWidth={true}>
        <PopoverTrigger>
          <Box
            display={"flex"}
            alignItems={"center"}
            width={"full"}
            justifyContent={"space-between"}
            _hover={{ cursor: "pointer" }}
          >
            <Flex alignItems={"center"} gap={2}>
              <Avatar
                size={"md"}
                src={currentWardProfile?.profileImage}
                pointerEvents={"none"}
              />
              <Box lineHeight={"20px"}>
                <Text fontWeight={"600"} fontSize={"sm"}>
                  {`${currentWardProfile?.firstName} ${currentWardProfile?.lastName}`}
                </Text>
                <Text fontSize={"12px"} color={"#AAAAAA"} fontWeight={"600"}>
                  {currentWardProfile?.greynoteNumber}
                </Text>
              </Box>
            </Flex>
            <BsThreeDots color={"#005D5D"} />
          </Box>
        </PopoverTrigger>
        <PopoverContent rounded={"xl"} w={"auto"} shadow={"lg"}>
          <PopoverBody p={"0.4rem"}>
            {childData?.map((ward: any, index: number) => {
              return (
                <Flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={2}
                  bgColor={
                    currentId === profileData.userChildren[index].id
                      ? "#3F999830"
                      : ""
                  }
                  rounded={"md"}
                  py={"0.5rem"}
                  mb={"0.4rem"}
                  _hover={{
                    backgroundColor: "#3F999830",
                    cursor: "pointer",
                  }}
                  key={index}
                  onClick={() => {
                    localStorage.setItem(
                      "currentId",
                      `${profileData.userChildren[index].id}`
                    );
                    setCurrentId(
                      parseInt(
                        localStorage.getItem("currentId") ??
                          `${profileData.userChildren[0]?.id}`,
                        10
                      )
                    );
                  }}
                >
                  <Avatar
                    size={"md"}
                    src={ward.profileImage}
                    pointerEvents={"none"}
                  />
                  <Box lineHeight={"20px"}>
                    <Text fontWeight={"600"} fontSize={"sm"}>
                      {`${ward.firstName} ${ward.lastName}`}
                    </Text>
                    <Text
                      fontSize={"12px"}
                      color={"#AAAAAA"}
                      fontWeight={"600"}
                    >
                      {ward.greynoteNumber}
                    </Text>
                  </Box>
                </Flex>
              );
            })}
            <Flex justifyContent={"center"} mb={"1rem"} mt={"2rem"}>
              <Button
                backgroundColor={"#005D5D"}
                color={"#fff"}
                colorScheme="teal"
                w={"90%"}
                _hover={{ backgroundColor: "#044141" }}
                onClick={onModalOpen}
              >
                <AiOutlinePlus />
                <Text fontWeight={"light"} pl="0.5rem">
                  Link your Child
                </Text>
              </Button>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
  );
}

export default LinkedStudentsPopover