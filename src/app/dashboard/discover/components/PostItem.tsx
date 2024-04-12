import { FC, useState, useEffect } from 'react'
import { Box, Image, Text, Avatar, Flex, Icon, useDisclosure } from '@chakra-ui/react'
import {
  IoMdHeartEmpty,
  IoMdHeart,
} from "react-icons/io";
import { IoCopy, IoVideocam } from "react-icons/io5";
import SchoolDetailsModal from './SchoolDetailsModal';

interface PostItemProps {
  
}

const PostItem: FC<PostItemProps> = ({}) => {
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
      <SchoolDetailsModal isOpen={isOpen} onClose={onClose} />
      <Box position={"relative"}>
        <Image
          rounded={"md"}
          alt="postItem"
          src="https://upload.wikimedia.org/wikipedia/commons/3/31/Moscow_High_School_Building_(now_the_1912_Center),_Moscow,_Idaho.jpg"
          h={{ base: "300px", xl: "350px" }}
          objectFit={"cover"}
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
          <Avatar size={{base:"sm", md:'md'}} src="https://penji.co/wp-content/uploads/2019/02/Campion-College-School-Logo-Design-1024x791.jpg" />
          <Flex flexDir={"column"} justifyContent={"space-between"}>
            <Text fontWeight={"bold"} fontSize={{ base: "xs", md: "md" }}>
              Lecture Mate Academy
            </Text>
            <Text fontSize={{ base: "xs", md: "md" }}>Lagos, Nigeria</Text>
          </Flex>
        </Flex>

        <Icon
          as={isLiked ? IoMdHeart : IoMdHeartEmpty}
          boxSize={{base:5, md: 7}}
          color={isLiked ? "red.500" : "inherit"}
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