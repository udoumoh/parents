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
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { IoCopy } from "react-icons/io5";
import { useUserAPI } from "@/hooks/UserContext";
import { useUserLikesAPI } from "@/hooks/UserLikesContext";
import { capitalizeFirstLetterOfEachWord } from "@/helpers/capitalizeFirstLetter";
import Image from "next/image";
import SchoolDetailsModal from "./SchoolDetailsModal";

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
    <Box _hover={{ cursor: "pointer" }} mb={"1rem"}>
      <SchoolDetailsModal
        isOpen={isSchoolModalOpen}
        onClose={onClose}
        setProfileLikes={setProfileLikes}
      />
      <Box position={"relative"}>
        <Box
          h={{ base: "150px", xl: "180px" }}
          w={"full"}
          position={"relative"}
        >
          <Image
            fill={true}
            alt="postItem"
            src={imageLinks[0]}
            style={{ objectFit: "cover", borderRadius: "10px" }}
            onClick={() => {
              onOpen();
              setActiveProfileId(profile?.id);
            }}
            loading="lazy"
            placeholder="blur"
            blurDataURL="/images/mountain.jpg"
            sizes="(max-width: 600px) 50vw, (min-width: 601px) 25vw"
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
        <Flex gap={2} mt={"0.8rem"} alignItems={"flex-start"}>
          <Avatar
            size={"sm"}
            src={profile?.logoImgUrl}
            name={profile?.schoolName}
            borderRadius="full"
          />
          <Flex flexDir={"column"} justifyContent={"center"}>
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
              as={isPostLiked(profile?.id) ? IoHeart : IoHeartOutline}
              onClick={handleToggleLike}
              color={isPostLiked(profile?.id) ? "#fe2c55" : "#00000070"}
              boxSize={6}
              transition="transform 0.5s"
            />
          </Box>

          <Text fontSize={"xs"} color={"#00000070"} fontWeight={'semibold'}>
            {profileLikes} {profileLikes !== 1 ? "likes" : "like"}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default PostItem;
