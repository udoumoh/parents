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
import Carousel from "./Carousel";
import {motion} from 'framer-motion'
import { IoHeart, IoHeartOutline } from "react-icons/io5";

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
    activeProfileId,
    setActiveProfileId,
  } = useUserLikesAPI();

  const filteredPostsLength = filteredPosts.length;

  const profile = filteredPosts.filter((post) => post.id === activeProfileId)[0];

  const currentProfileIndex = filteredPosts?.findIndex(item => item.id === profile?.id)
  const lastPostId = filteredPosts[filteredPostsLength - 1]?.id
  const firstPostId = filteredPosts[0]?.id;
  
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
    setActiveProfileId(filteredPosts[currentProfileIndex + 1]?.id);
    slider?.slickGoTo(0);
  };

  const handlePreviousPost = () => {
    setActiveProfileId(filteredPosts[currentProfileIndex - 1]?.id);
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
            isDisabled={activeProfileId === firstPostId ? true : false}
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
            isDisabled={activeProfileId === lastPostId ? true : false}
          />
          <ModalBody p={0}>
            <Box p={"0"}>
              <Carousel
                media={profile?.schoolMedia}
                slider={slider}
                setSlider={setSlider}
              />

              <Box px={{ base: "0.5rem", md: "1rem" }}>
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
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      as={motion.button}
                      whileTap={{ scale: 0.9 }}
                      sx={{
                        "&:hover > svg": {
                          transform: "scale(1.1)",
                          transition: "transform 0.5s",
                        },
                      }}
                    >
                      <Icon
                        as={
                          isPostLiked(profile?.id) ? IoHeart : IoHeartOutline
                        }
                        onClick={handleToggleLike}
                        color={
                          isPostLiked(profile?.id) ? "#fe2c55" : "#00000070"
                        }
                        boxSize={7}
                        transition="transform 0.5s"
                      />
                    </Box>
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
                        size={"sm"}
                      />
                      <Flex flexDir={"column"}>
                        <Text fontSize={"sm"} fontWeight={"bold"}>
                          {capitalizeFirstLetterOfEachWord(profile?.schoolName)}
                        </Text>
                        <Flex alignItems={"center"} gap={2}>
                          <Text fontSize={"xs"}>{profile?.state}, Nigeria</Text>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Flex
                      gap={2}
                      alignItems={"center"}
                      as={motion.button}
                      whileTap={{ scale: 0.9 }}
                      sx={{
                        "&:hover > svg": {
                          transform: "scale(1.3)",
                          transition: "transform 0.5s",
                        },
                      }}
                    >
                      <Icon
                        as={
                          isPostLiked(profile?.id) ? IoHeart : IoHeartOutline
                        }
                        onClick={handleToggleLike}
                        color={
                          isPostLiked(profile?.id) ? "#fe2c55" : "#00000070"
                        }
                        boxSize={6}
                        transition="transform 0.5s"
                      />
                    </Flex>
                  </Flex>
                  <Button
                    leftIcon={<MdOutlineMailOutline size={16} />}
                    mt={"0.8rem"}
                    size={"xs"}
                    colorScheme="blue"
                    onClick={onComposeModalOpen}
                    rounded={"sm"}
                  >
                    Send a Message
                  </Button>
                </Box>
                <Box
                  mt={{ base: "1rem", md: "2rem" }}
                  height={"160px"}
                  overflowY={"auto"}
                >
                  <Text
                    color={"#000"}
                    fontSize={{ base: "xs", md: "md" }}
                    fontWeight={"bold"}
                  >
                    ABOUT SCHOOL
                  </Text>
                  <Text
                    mt={"0.5rem"}
                    fontSize={{ base: "xs", md: "md" }}
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
            px={"0.5rem"}
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
                  isDisabled={activeProfileId === firstPostId ? true : false}
                >
                  Prev
                </Button>
                <Button
                  size={"sm"}
                  onClick={handleNextPost}
                  isDisabled={
                    activeProfileId === lastPostId ? true : false
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
