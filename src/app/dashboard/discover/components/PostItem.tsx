import { FC, useState, useEffect } from 'react'
import { Box, Image, Text, Avatar, Flex, Icon, useDisclosure, Skeleton } from '@chakra-ui/react'
import {
  IoMdHeartEmpty,
  IoMdHeart,
} from "react-icons/io";
import { IoCopy } from "react-icons/io5";
import SchoolDetailsModal from './SchoolDetailsModal';
import { LIKE_PROFILE, UNLIKE_PROFILE } from '@/gql/mutations';
import { useUserAPI } from '@/hooks/UserContext';
import { useMutation } from '@apollo/client';


interface PostItemProps {
  profile: {
    bannerImgUrl:string;
    country:string;
    createdAt:string;
    description:string;
    email:string;
    facebookUrl:string;
    id:number;
    instagramUrl:string;
    lgarea:string;
    linkedinUrl:string;
    logoImgUrl:string;
    phonenumber:string;
    profileLikes:number;
    profileViews:number;
    rcnumber:string;
    schoolName:string;
    state:string;
    twitterUrl:string;
    websiteUrl:string;
    whoLikedProfile:string []
    schoolMedia: string [];
  }
  loading:boolean;
}

const PostItem: FC<PostItemProps> = ({profile, loading}) => {
  const [isLiked, setIsLiked] = useState(false)
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [like] = useMutation(LIKE_PROFILE)
  const [unlike] = useMutation(UNLIKE_PROFILE);
  const {parentData} = useUserAPI()

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
      setIsLiked(true); // Update state only if mutation is successful
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
    }
  } catch (err: any) {
    console.log(err.message);
  }
};

  return (
    <Skeleton isLoaded={!loading}>
      <Box
        border={"1px solid #00000060"}
        rounded={"xl"}
        p={"0.4rem"}
        maxW={"400px"}
        _hover={{ cursor: "pointer" }}
      >
        <SchoolDetailsModal
          isOpen={isOpen}
          onClose={onClose}
          profile={profile}
        />
        <Box position={"relative"}>
          <Image
            rounded={"md"}
            alt="postItem"
            src={profile?.schoolMedia[0]}
            h={{ base: "300px", xl: "350px" }}
            objectFit={"cover"}
            w={"full"}
            onClick={onOpen}
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

        <Flex justifyContent={"space-between"} alignItems={"center"} gap={3}>
          <Flex gap={2} my={"1rem"}>
            <Avatar
              size={{ base: "sm", md: "md" }}
              src={profile?.logoImgUrl}
              name={profile?.schoolName}
            />
            <Flex flexDir={"column"} justifyContent={"space-between"}>
              <Text fontWeight={"bold"} fontSize={{ base: "xs", md: "md" }}>
                {profile?.schoolName}
              </Text>
              <Text fontSize={{ base: "xs", md: "md" }}>
                {profile?.state}, Nigeria
              </Text>
            </Flex>
          </Flex>

          <Flex alignItems={"center"} flexDir={"column"}>
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

            <Text fontSize={"xs"} color={"#00000070"}>
              {profile?.profileLikes}{" "}
              {profile?.profileLikes !== 1 ? "Likes" : "Like"}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Skeleton>
  );
}

export default PostItem