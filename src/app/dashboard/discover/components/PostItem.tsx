import { FC, useState, useEffect } from "react";
import {motion} from 'framer-motion'
import {
  Box,
  Text,
  Avatar,
  Flex,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { IoCopy, IoEye, IoHeart, IoHeartOutline } from "react-icons/io5";
import { useUserAPI } from "@/hooks/UserContext";
import { useUserLikesAPI } from "@/hooks/UserLikesContext";
import { capitalizeFirstLetterOfEachWord } from "@/helpers/capitalizeFirstLetter";
import Image from "next/image";
import SchoolDetailsModal from "./SchoolDetailsModal";
import { LikeButton } from "./LikeButton";

export type ProfileProps = {
  profile: {
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
    address: string;
    priceRange: string;
    studentPerClassroom: string;
    creator: {
      admin: {
        plan: string;
      };
    };
  };
};

const PostItem: FC<ProfileProps> = ({ profile }) => {
  const {
    likePost,
    unlikePost,
    isPostLiked,
    setLikedPosts,
    setActiveProfileId,
  } = useUserLikesAPI();
  const { parentData } = useUserAPI();
  const [profileLikes, setProfileLikes] = useState(profile?.profileLikes);
  const imageLinks: string[] = [];
  const [isHovered, setIsHovered] = useState(false)

  profile?.schoolMedia?.forEach((link) => {
    if (
      link.endsWith(".jpg") ||
      link.endsWith(".jpeg") ||
      link.endsWith(".png")
    ) {
      imageLinks.push(link);
    }
  });

  const handleToggleLike = () => {
    if (isPostLiked(profile?.id)) {
      unlikePost(profile?.id);
      setProfileLikes((prevLikes) => Math.max(prevLikes - 1, 0));
    } else {
      likePost(profile?.id);
      setProfileLikes((prevLikes) => prevLikes + 1);
    }
  };

  useEffect(() => {
    const userId = parentData?.userId;
    if (profile?.whoLikedProfile?.includes(userId || "")) {
      setLikedPosts((prevState) => ({
        ...prevState,
        [profile?.id]: true,
      }));
    }
  }, [profile, parentData, setLikedPosts]);

  const { isOpen: isSchoolModalOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box mb={"1rem"}>
      <SchoolDetailsModal
        isOpen={isSchoolModalOpen}
        onClose={onClose}
        setProfileLikes={setProfileLikes}
      />
      <Box position="relative" _hover={{ cursor: "pointer" }}>
        <Box
          h={{ base: "150px", xl: "180px" }}
          w="full"
          position="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            fill
            alt="postItem"
            src={imageLinks[0]}
            style={{ objectFit: "cover", borderRadius: "8px" }}
            onClick={() => {
              onOpen();
              setActiveProfileId(profile?.id);
            }}
            loading="lazy"
            placeholder="blur"
            blurDataURL="/images/mountain.jpg"
            sizes="(max-width: 600px) 50vw, (min-width: 601px) 25vw"
          />

        {/* duplicate like action removed. Like Button should not be on hover state  */}
        </Box>

        {/* Copy icon */}
        <Icon
          as={IoCopy}
          position="absolute"
          top="10px"
          right="10px"
          boxSize={4}
          color="white"
        />
      </Box>

      <Flex justifyContent={"space-between"} alignItems={"center"} gap={2}>
        <Flex gap={2} mt={"0.8rem"} alignItems={"flex-start"}>
          <Avatar
            size={"sm"}
            src={profile?.logoImgUrl}
            name={profile?.schoolName}
            borderRadius="full"
          />
          <Flex
            flexDir={"column"}
            justifyContent={"center"}
            pointerEvents={"none"}
          >
            <Text fontWeight={"bold"} fontSize={{ base: "sm", md: "sm" }}>
              {capitalizeFirstLetterOfEachWord(
                profile?.schoolName.toLowerCase()
              )}
            </Text>
            <Flex alignItems={"center"} gap={2}>
              <Text fontSize={{ base: "xs", md: "xs" }}>
                {profile?.state}, Nigeria
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex gap={2}>
          <Flex alignItems={"center"} gap={1}>
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
                as={IoHeart}
                onClick={handleToggleLike}
                color={isPostLiked(profile?.id) ? "#fe2c55" : "#909090"}
                boxSize={"16px"}
                transition="transform 0.5s"
              />
            </Box>

            <Text fontSize={"xs"} color={"#4D4D4D"} fontWeight={"semibold"}>
              {profileLikes}
            </Text>
          </Flex>

         {/* Users are not meant to see views count on school profiles */}
        </Flex>
      </Flex>
    </Box>
  );
};

export default PostItem;
