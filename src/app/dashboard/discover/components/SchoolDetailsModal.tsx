"use client";
import { FC, useState, useEffect, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Box,
  Flex,
  Text,
  Avatar,
  Button,
  Icon,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import {
  BiLeftArrowAlt,
  BiRightArrowAlt,
  BiLogoFacebookSquare,
  BiLogoInstagramAlt,
  BiLogoLinkedinSquare,
} from "react-icons/bi";
import { TbWorld } from "react-icons/tb";
import { useUserLikesAPI } from "@/hooks/UserLikesContext";
import { ComposeMessage } from "../../inbox/component/ComposeMessage";
import { MdOutlineMailOutline } from "react-icons/md";
import { capitalizeFirstLetterOfEachWord } from "@/helpers/capitalizeFirstLetter";
import Slider from "react-slick";
import dynamic from "next/dynamic";

const Carousel = dynamic(() => import("./Carousel"), { ssr: false });

interface SchoolDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  setProfileLikes: (args: any) => void;
}

const SchoolDetailsModal: FC<SchoolDetailsModalProps> = ({
  isOpen,
  onClose,
  setProfileLikes,
}) => {

  const [slider, setSlider] = useState<Slider | null>(null);

  const {
    isOpen: isComposeModalOpen,
    onClose: onComposeModalClose,
    onOpen: onComposeModalOpen,
  } = useDisclosure();

  const {
    likePost,
    unlikePost,
    isPostLiked,
    filteredPosts,
    activeProfileIndex,
    setActiveProfileIndex,
  } = useUserLikesAPI();

  const profile = filteredPosts[activeProfileIndex];
  
  const handleToggleLike = () => {
    if (isPostLiked(profile?.id)) {
      unlikePost(profile?.id);
      setProfileLikes((prevLikes: any) => Math.max(prevLikes - 1, 0));
    } else {
      likePost(profile?.id);
      setProfileLikes((prevLikes: any) => prevLikes + 1);
    }
  };

  const handleNextPost = () => {
    setActiveProfileIndex(activeProfileIndex + 1);
    slider?.slickGoTo(0);
  };

  const handlePreviousPost = () => {
    setActiveProfileIndex(activeProfileIndex - 1);
    slider?.slickGoTo(0);
  };

  return (
    <Box>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "full", sm: "lg", md: "2xl" }}
      >
        <ComposeMessage
          isOpen={isComposeModalOpen}
          onClose={onComposeModalClose}
        />
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
            onClick={handlePreviousPost}
            isDisabled={activeProfileIndex <= 0 ? true : false}
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
            onClick={handleNextPost}
            isDisabled={
              activeProfileIndex >= filteredPosts?.length - 1 ? true : false
            }
          />
          <ModalBody p={"0.5rem"}>
            <Box px={"0"}>
              <Carousel
                media={profile?.schoolMedia}
                slider={slider}
                setSlider={setSlider}
              />

              <Box px={'0.5rem'}>
                <Flex
                  display={{ base: "none", md: "flex" }}
                  mt={"1.5rem"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  gap={2}
                >
                  <Flex gap={2} alignItems={"initial"}>
                    <Avatar
                      src={profile?.logoImgUrl}
                      border={"1px solid #005D5D"}
                      p={"0.1rem"}
                    />
                    <Flex flexDir={"column"} justifyContent={"space-between"}>
                      <Text fontSize={"lg"} fontWeight={"bold"}>
                        {capitalizeFirstLetterOfEachWord(profile?.schoolName)}
                      </Text>
                      <Flex alignItems={"center"} gap={2}>
                        <Text fontSize={"sm"}>{profile?.state}, Nigeria</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex gap={2} alignItems={"center"}>
                    <Icon
                      as={isPostLiked(profile?.id) ? IoMdHeart : IoMdHeartEmpty}
                      onClick={handleToggleLike}
                      color={isPostLiked(profile?.id) ? "red.500" : "#00000070"}
                      boxSize={7}
                      transition="transform 0.2s ease-in-out"
                      _hover={{
                        cursor: "pointer",
                        transform: "scale(1.1)",
                        transition: "0.2s",
                      }}
                    />
                    <Button
                      leftIcon={<MdOutlineMailOutline size={18} />}
                      colorScheme="blue"
                      size={"sm"}
                      onClick={onComposeModalOpen}
                    >
                      Send a Message
                    </Button>
                  </Flex>
                </Flex>

                <Box display={{ base: "block", md: "none" }}>
                  <Flex
                    mt={"1.5rem"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    gap={2}
                  >
                    <Flex gap={2} alignItems={"initial"}>
                      <Avatar
                        src={profile?.logoImgUrl}
                        border={"1px solid #005D5D"}
                        p={"0.1rem"}
                      />
                      <Flex flexDir={"column"} justifyContent={"space-between"}>
                        <Text fontSize={"md"} fontWeight={"bold"}>
                          {capitalizeFirstLetterOfEachWord(profile?.schoolName)}
                        </Text>
                        <Flex alignItems={"center"} gap={2}>
                          <Text fontSize={"sm"}>{profile?.state}, Nigeria</Text>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Flex gap={2} alignItems={"center"}>
                      <Icon
                        as={
                          isPostLiked(profile?.id) ? IoMdHeart : IoMdHeartEmpty
                        }
                        onClick={handleToggleLike}
                        color={
                          isPostLiked(profile?.id) ? "red.500" : "#00000070"
                        }
                        boxSize={7}
                        transition="transform 0.2s ease-in-out"
                        _hover={{
                          cursor: "pointer",
                          transform: "scale(1.1)",
                          transition: "0.2s",
                        }}
                      />
                    </Flex>
                  </Flex>
                  <Button
                    leftIcon={<MdOutlineMailOutline size={18} />}
                    mt={"0.8rem"}
                    size={"sm"}
                    colorScheme="blue"
                    onClick={onComposeModalOpen}
                  >
                    Send a Message
                  </Button>
                </Box>
                <Box
                  mt={"2.5rem"}
                  height={"160px"}
                  overflowY={"auto"}
                >
                  <Text
                    color={"#000"}
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight={"bold"}
                  >
                    ABOUT SCHOOL
                  </Text>
                  <Text
                    mt={"0.8rem"}
                    fontSize={{ base: "sm", md: "md" }}
                    whiteSpace={"pre-wrap"}
                  >
                    {profile?.description}
                  </Text>
                </Box>
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter
            justifyContent={"start"}
            alignItems={"flex-start"}
            flexDir={"column"}
          >
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
                onClick={() =>
                  window.open(
                    profile?.facebookUrl.startsWith("https://")
                      ? profile?.facebookUrl
                      : "https://" + profile?.facebookUrl,
                    "_blank"
                  )
                }
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
                onClick={() =>
                  window.open(
                    profile?.instagramUrl.startsWith("https://")
                      ? profile?.instagramUrl
                      : "https://" + profile?.instagramUrl,
                    "_blank"
                  )
                }
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
                onClick={() =>
                  window.open(
                    profile?.linkedinUrl.startsWith("https://")
                      ? profile?.linkedinUrl
                      : "https://" + profile?.linkedinUrl,
                    "_blank"
                  )
                }
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
                onClick={() =>
                  window.open(
                    profile?.websiteUrl.startsWith("https://")
                      ? profile?.websiteUrl
                      : "https://" + profile?.websiteUrl,
                    "_blank"
                  )
                }
                display={profile?.websiteUrl === "#" ? "none" : "inline"}
              />
            </Flex>
            <Flex
              mt={"0.8rem"}
              w={"full"}
              justifyContent={"space-between"}
              gap={3}
              display={{ base: "flex", md: "none" }}
            >
              <Button size={"sm"} onClick={onClose}>
                Close
              </Button>

              <Flex gap={3}>
                <Button
                  size={"sm"}
                  onClick={handlePreviousPost}
                  isDisabled={activeProfileIndex <= 0 ? true : false}
                >
                  Prev
                </Button>
                <Button
                  size={"sm"}
                  onClick={handleNextPost}
                  isDisabled={
                    activeProfileIndex >= filteredPosts?.length - 1
                      ? true
                      : false
                  }
                >
                  Next
                </Button>
              </Flex>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* )} */}
    </Box>
  );
};

export default SchoolDetailsModal;
