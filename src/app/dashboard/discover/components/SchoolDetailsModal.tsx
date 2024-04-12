'use client'
import { FC, useState } from 'react'
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
import Carousel from './Carousel';
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import VideoPlayer from "./VideoPlayer";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";


interface SchoolDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SchoolDetailsModal: FC<SchoolDetailsModalProps> = ({isOpen, onClose}) => {
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
      setIsLiked(!isLiked);
    };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "xs", sm: "lg", md: "xl" }}
    >
      <ModalOverlay />
      <ModalContent position={"relative"}>
        <IconButton
          icon={<BiLeftArrowAlt />}
          aria-label="Previous"
          position="absolute"
          top="50%"
          left={-36}
          rounded={"full"}
          transform="translateY(-50%)"
        />
        <IconButton
          icon={<BiRightArrowAlt />}
          aria-label="Previous"
          position="absolute"
          top="50%"
          right={-36}
          transform="translateY(-50%)"
          rounded={'full'}
        />
        <ModalBody p={0}>
          <Box px={"0"}>
            <Carousel />
            {/* <VideoPlayer /> */}
            <Flex
              mt={"1.5rem"}
              px={"1rem"}
              alignItems={{ base: "start", md: "center" }}
              justifyContent={"space-between"}
              flexDir={{ base: "column", md: "row" }}
              gap={2}
            >
              <Flex gap={2} alignItems={"center"}>
                <Avatar src="https://th.bing.com/th/id/OIP.r-V0mO21MZnLfGJrDQKk0wHaHa?rs=1&pid=ImgDetMain" />
                <Flex flexDir={"column"} justifyContent={"space-between"}>
                  <Text fontSize={{ base: "xs", md: "sm" }} fontWeight={"bold"}>
                    Berry Blast British Academy
                  </Text>
                  <Text fontSize={{ base: "xs", md: "sm" }}>
                    Lagos, Nigeria
                  </Text>
                </Flex>
              </Flex>
              <Flex gap={2} alignItems={"center"}>
                <Icon
                  as={isLiked ? IoMdHeart : IoMdHeartEmpty}
                  boxSize={7}
                  color={isLiked ? "red.500" : "inherit"}
                  transition="transform 0.2s ease-in-out"
                  onClick={handleLike}
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
              <Text mt={"0.8rem"} fontSize={"xs"}>
                {`Welcome to Berry Blast British Academy! 🍓🎉 At Berry Blast,
                we're not just any ordinary school; we're a fruity fusion of fun
                and learning! 📚✨ Nestled in the heart of our vibrant
                community, we pride ourselves on nurturing young minds to reach
                for the stars while enjoying the sweetness of education. 🌟🍇
                With a curriculum as refreshing as a berry smoothie, we blend
                academic excellence with a splash of creativity, ensuring every
                student's journey is as exciting as a berry picking adventure!
                🎨🍓 Join us at Berry Blast British Academy, where learning is a
                blast! 🚀📚`}
              </Text>
            </Box>
          </Box>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SchoolDetailsModal