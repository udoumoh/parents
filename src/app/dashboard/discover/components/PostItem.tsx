import { FC, useState, useEffect } from "react";
import {
  Box,
  Image,
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
import SchoolDetailsModal from "./SchoolDetailsModal";
import { useUserAPI } from "@/hooks/UserContext";
import { useUserLikesAPI } from "@/hooks/UserLikesContext";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
import { useRouter } from "next/navigation";

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
  const router = useRouter()
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

  useEffect(()=>{
    onToggle()
  }, [])

  const { isOpen: isSchoolModalOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isSchoolDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();

  return (
    <ScaleFade initialScale={0.6} in={isOpen}>
      <Skeleton isLoaded={profile?.logoImgUrl === undefined ? false : true}>
        <Box
          border={"1px solid #00000060"}
          rounded={"xl"}
          p={"0.4rem"}
          maxW={{ base: "300px", md: "400px" }}
          _hover={{ cursor: "pointer" }}
        >
          <SchoolDetailsModal
            isOpen={isSchoolModalOpen}
            onClose={onClose}
            setProfileLikes={setProfileLikes}
          />
          <Box position={"relative"}>
            <Image
              rounded={"md"}
              alt="postItem"
              src={imageLinks[0]}
              h={{ base: "250px", xl: "350px" }}
              objectFit={"cover"}
              w={"full"}
              onClick={() => {
                onOpen();
                setActiveProfileIndex(currentIndex);
              }}
            />
            <Icon
              as={IoCopy}
              position="absolute"
              top="8px"
              right="8px"
              boxSize={6}
              color={"white"}
            />
          </Box>

          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Flex gap={2} my={"1rem"} maxW={"300px"}>
              <Avatar
                size={{ base: "sm", md: "md" }}
                src={profile?.logoImgUrl}
                name={profile?.schoolName}
              />
              <Flex flexDir={"column"} justifyContent={"space-between"}>
                <Text fontWeight={"bold"} fontSize={{ base: "xs", md: "sm" }}>
                  {capitalizeFirstLetter(profile?.schoolName.toLowerCase())}
                </Text>
                <Flex alignItems={"center"} gap={2}>
                  <Text fontSize={{ base: "xs", md: "sm" }}>
                    {profile?.state}, Nigeria
                  </Text>
                  <Tooltip label="This school is not currently utilizing the Greynote School Management Application and is only on the Discover plan.">
                    <Badge
                      variant="solid"
                      colorScheme="red"
                      display={
                        profile?.creator?.admin?.plan?.includes("Discover")
                          ? "block"
                          : "none"
                      }
                    >
                      Discover
                    </Badge>
                  </Tooltip>
                </Flex>
              </Flex>
            </Flex>

            <Flex alignItems={"center"} flexDir={"column"}>
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

              <Text fontSize={"xs"} color={"#00000070"}>
                {profileLikes} {profileLikes !== 1 ? "Likes" : "Like"}
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Skeleton>
    </ScaleFade>
  );
};

export default PostItem;
