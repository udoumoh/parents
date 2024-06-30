import { FC, useState, useEffect } from "react";
import {
  Box,
  Text,
  Avatar,
  Flex,
  Icon,
  useDisclosure,
  ScaleFade,
  Skeleton,
  Badge,
  Tooltip,
} from "@chakra-ui/react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { IoCopy } from "react-icons/io5";
import dynamic from "next/dynamic";
import { useUserAPI } from "@/hooks/UserContext";
import { useUserLikesAPI } from "@/hooks/UserLikesContext";
import { capitalizeFirstLetterOfEachWord } from "@/helpers/capitalizeFirstLetter";
import Image from "next/image";
import SchoolDetailsModal from "./SchoolDetailsModal";

interface PostItemProps {
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
      }
    }
  };
  currentIndex: number;
}

const PostItem: FC<PostItemProps> = ({ profile, currentIndex }) => {
  const { isOpen, onToggle } = useDisclosure();
  const {
    likePost,
    unlikePost,
    isPostLiked,
    setLikedPosts,
    setActiveProfileIndex,
  } = useUserLikesAPI();
  const { parentData } = useUserAPI();
  const [profileLikes, setProfileLikes] = useState(profile?.profileLikes);
  const imageLinks: string[] = [];

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
    <Box _hover={{ cursor: "pointer" }}>
      <SchoolDetailsModal
        isOpen={isSchoolModalOpen}
        onClose={onClose}
        setProfileLikes={setProfileLikes}
      />
      <Box position={"relative"}>
        <Box h={{ base: "150px", xl: "200px" }} w={"full"}>
          <Image
            fill={true}
            alt="postItem"
            src={imageLinks[0]}
            objectFit={"cover"}
            onClick={() => {
              onOpen();
              setActiveProfileIndex(currentIndex);
            }}
            loading="lazy"
            style={{ borderRadius: "13px" }}
            placeholder="blur"
            blurDataURL="/images/mountain.jpg"
          />
        </Box>
        <Icon
          as={IoCopy}
          position="absolute"
          top="10px"
          right="10px"
          boxSize={4}
          color={"white"}
        />
      </Box>

      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Flex gap={2} my={"1rem"}>
          <Avatar
            size={{ base: "sm", md: "md" }}
            src={profile?.logoImgUrl}
            name={profile?.schoolName}
            border={"1px solid #005D5D"}
            p={"0.1rem"}
          />
          <Flex flexDir={"column"} justifyContent={"space-between"}>
            <Text fontWeight={"bold"} fontSize={{ base: "sm", md: "md" }}>
              {capitalizeFirstLetterOfEachWord(
                profile?.schoolName.toLowerCase()
              )}
            </Text>
            <Flex alignItems={"center"} gap={2}>
              <Text fontSize={{ base: "xs", md: "sm" }}>
                {profile?.state}, Nigeria
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex alignItems={"center"} flexDir={"column"}>
          <Icon
            as={isPostLiked(profile?.id) ? IoMdHeart : IoMdHeartEmpty}
            onClick={handleToggleLike}
            color={isPostLiked(profile?.id) ? "red.500" : "#00000070"}
            boxSize={6}
            transition="transform 0.2s ease-in-out"
            _hover={{
              cursor: "pointer",
              transform: "scale(1.1)",
              transition: "0.2s",
            }}
          />

          <Text fontSize={"xs"} color={"#00000070"}>
            {profileLikes} {profileLikes !== 1 ? "Likes" : "Like"}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default PostItem;
