"use client";
import { FC, useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Flex,
  Text,
  Image,
  Avatar,
  Button,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import Carousel from "./Carousel";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import {
  BiLeftArrowAlt,
  BiRightArrowAlt,
  BiLogoFacebookSquare,
  BiLogoInstagramAlt,
  BiLogoLinkedinSquare,
} from "react-icons/bi";
import { TbWorld } from "react-icons/tb";
import { LIKE_PROFILE, UNLIKE_PROFILE } from "@/gql/mutations";
import { useUserAPI } from "@/hooks/UserContext";
import { useMutation } from "@apollo/client";

interface SchoolDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: {
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
  };
}

const SchoolDetailsModal: FC<SchoolDetailsModalProps> = ({
  isOpen,
  onClose,
  profile,
}) => {
  const [isLiked, setIsLiked] = useState(false);
const [like] = useMutation(LIKE_PROFILE);
const [unlike] = useMutation(UNLIKE_PROFILE);
const { parentData } = useUserAPI();
const [numberOfLikes, setNumberOfLikes] = useState(profile?.profileLikes);
console.log(profile)

useEffect(() => {
  if (profile?.whoLikedProfile?.includes(parentData?.userId || "")) {
    setIsLiked(true);
  } else {
    setIsLiked(false);
  }
}, [profile, parentData]);

const handleLike = async () => {
  try {
    const response = await like({
      variables: {
        schoolId: profile?.id,
      },
    });
    if (response.data) {
      setIsLiked(true);
      setNumberOfLikes(numberOfLikes + 1);
    }
  } catch (err: any) {
    console.log(err.message);
  }
};

const handleUnlike = async () => {
  try {
    const response = await unlike({
      variables: {
        schoolId: profile?.id,
      },
    });
    if (response.data) {
      setIsLiked(false); // Update state only if mutation is successful
      setNumberOfLikes(numberOfLikes - 1);
    }
  } catch (err: any) {
    console.log(err.message);
  }
};
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "sm", sm: "lg", md: "2xl" }}
    >
      <ModalOverlay />
      <ModalContent position={"relative"}>
        <IconButton
          display={{ base: "none", md: "flex" }}
          icon={<BiLeftArrowAlt />}
          aria-label="Previous"
          position="absolute"
          top="50%"
          left={"-12%"}
          rounded={"full"}
          transform="translateY(-50%)"
        />
        <IconButton
          display={{ base: "none", md: "flex" }}
          icon={<BiRightArrowAlt />}
          aria-label="Previous"
          position="absolute"
          top="50%"
          right={"-12%"}
          transform="translateY(-50%)"
          rounded={"full"}
        />
        <ModalBody p={0}>
          <Box px={"0"}>
            <Carousel media={profile?.schoolMedia} />
            <Flex
              mt={"1.5rem"}
              px={"1rem"}
              alignItems={"center"}
              justifyContent={"space-between"}
              //   flexDir={{ base: "column", md: "row" }}
              gap={2}
            >
              <Flex gap={2} alignItems={"center"}>
                <Avatar src={profile?.logoImgUrl} />
                <Flex flexDir={"column"} justifyContent={"space-between"}>
                  <Text fontSize={{ base: "xs", md: "sm" }} fontWeight={"bold"}>
                    {profile?.schoolName}
                  </Text>
                  <Text fontSize={{ base: "xs", md: "sm" }}>
                    {profile?.state}, Nigeria
                  </Text>
                </Flex>
              </Flex>
              <Flex gap={2} alignItems={"center"}>
                <Icon
                  as={isLiked ? IoMdHeart : IoMdHeartEmpty}
                  boxSize={{ base: 5, md: 7 }}
                  color={isLiked ? "red.500" : "#00000070"}
                  transition="transform 0.2s ease-in-out"
                  onClick={isLiked ? handleUnlike : handleLike}
                  _hover={{
                    cursor: "pointer",
                    transform: "scale(1.1)",
                    transition: "0.2s",
                  }}
                />
                <Button
                  fontSize={{ base: "2xs", md: "xs" }}
                  backgroundColor={"#005D5D"}
                  size={{ base: "xs", md: "sm" }}
                  _hover={{ backgroundColor: "#007C7B" }}
                  color={"#fff"}
                >
                  Send a Message
                </Button>
              </Flex>
            </Flex>
            <Box px={"1.5rem"} mt={"2.5rem"}>
              <Text color={"#747474"} fontSize={"sm"} fontWeight={"bold"}>
                ABOUT SCHOOL
              </Text>
              <Text mt={"0.8rem"} fontSize={{ base: "xs", md: "sm" }} whiteSpace={'pre-wrap'}>
                {profile?.description}
              </Text>
            </Box>
          </Box>
        </ModalBody>

        <ModalFooter justifyContent={"start"}>
          <Flex gap={4}>
            <Icon
              _hover={{
                cursor: "pointer",
                transform: "scale(1.3)",
                transition: "0.5s",
              }}
              as={BiLogoFacebookSquare}
              boxSize={6}
              color={"blue.600"}
              onClick={() => window.open(profile?.facebookUrl, "_blank")}
              display={profile?.facebookUrl === "#" ? "none" : "inline"}
            />
            <Icon
              _hover={{
                cursor: "pointer",
                transform: "scale(1.3)",
                transition: "0.5s",
              }}
              as={BiLogoInstagramAlt}
              boxSize={6}
              color={"#E1306C"}
              onClick={() => window.open(profile?.instagramUrl, "_blank")}
              display={profile?.instagramUrl === "#" ? "none" : "inline"}
            />
            <Icon
              _hover={{
                cursor: "pointer",
                transform: "scale(1.3)",
                transition: "0.5s",
              }}
              as={BiLogoLinkedinSquare}
              boxSize={6}
              color={"blue.600"}
              onClick={() => window.open(profile?.linkedinUrl, "_blank")}
              display={profile?.linkedinUrl === "#" ? "none" : "inline"}
            />
            <Icon
              _hover={{
                cursor: "pointer",
                transform: "scale(1.3)",
                transition: "0.5s",
              }}
              as={TbWorld}
              boxSize={6}
              color={"green.600"}
              onClick={() => window.open(profile?.websiteUrl, "_blank")}
              display={profile?.websiteUrl === "#" ? "none" : "inline"}
            />
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SchoolDetailsModal;
