import { FC, useState, useEffect } from 'react'
import { Box, Image, Text, Avatar, Flex, Icon, useDisclosure } from '@chakra-ui/react'
import {
  IoMdHeartEmpty,
  IoMdHeart,
} from "react-icons/io";
import { IoCopy, IoVideocam } from "react-icons/io5";
import SchoolDetailsModal from './SchoolDetailsModal';

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
}

const PostItem: FC<PostItemProps> = ({profile}) => {
  const [isLiked, setIsLiked] = useState(false)
  const {isOpen, onOpen, onClose} = useDisclosure()

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  return (
    <Box
      border={"1px solid #00000060"}
      rounded={"xl"}
      p={"0.4rem"}
      maxW={"400px"}
      onClick={onOpen}
      _hover={{ cursor: "pointer" }}
    >
      <SchoolDetailsModal isOpen={isOpen} onClose={onClose} profile={profile}/>
      <Box position={"relative"}>
        <Image
          rounded={"md"}
          alt="postItem"
          src={profile?.schoolMedia[0]}
          h={{ base: "300px", xl: "350px" }}
          objectFit={"cover"}
          w={'full'}
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
          <Avatar size={{base:"sm", md:'md'}} src={profile?.logoImgUrl} name={profile?.schoolName}/>
          <Flex flexDir={"column"} justifyContent={"space-between"}>
            <Text fontWeight={"bold"} fontSize={{ base: "xs", md: "md" }}>
              {profile?.schoolName}
            </Text>
            <Text fontSize={{ base: "xs", md: "md" }}>{profile?.state}, Nigeria</Text>
          </Flex>
        </Flex>

        <Icon
          as={isLiked ? IoMdHeart : IoMdHeartEmpty}
          boxSize={{base:5, md: 7}}
          color={isLiked ? "red.500" : "#00000070"}
          transition="transform 0.2s ease-in-out"
          onClick={handleLike}
          _hover={{
            cursor: "pointer",
            transform: "scale(1.1)",
            transition: "0.2s",
          }}
        />
      </Flex>
    </Box>
  );
}

export default PostItem