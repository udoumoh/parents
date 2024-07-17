"use client";
import React, { FC, useRef } from "react";
import { Box, Button, Flex, Text, Grid, Icon } from "@chakra-ui/react";
import VideoPlayer from "./components/VideoPlayer";
import { FaHeart, FaBookmark, FaShare } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";

interface ClipsProps {}

const ClipItem = ({ videoLink }: { videoLink: any }) => {
  return (
    <Flex
      w={"full"}
      justifyContent={"center"}
      gap={4}
      alignItems={"flex-end"}
      py={"0.5rem"}
    >
      <VideoPlayer link={videoLink} />
      <Grid
        gap={5}
        backdropFilter={"blur(6px)"}
        bg="linear-gradient(135deg, #2ebf9112, #8360c312)"
        py={"1rem"}
        px={"0.6rem"}
        rounded={"lg"}
      >
        <Grid alignContent={"center"}>
          <Box
            backgroundColor={"#00000010"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            rounded={"full"}
            p={"0.8rem"}
            _hover={{ cursor: "pointer" }}
            sx={{
              "&:hover > svg": {
                transform: "scale(1.2)",
                transition: "transform 0.5s",
              },
            }}
          >
            <Icon as={FaHeart} boxSize={"5"} transition={"transform 0.5s"} />
          </Box>
          <Text fontWeight={"bold"} textAlign={"center"} fontSize={"sm"}>
            1.4M
          </Text>
        </Grid>

        <Grid alignContent={"center"}>
          <Box
            backgroundColor={"#00000010"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            rounded={"full"}
            p={"0.8rem"}
            _hover={{ cursor: "pointer" }}
            sx={{
              "&:hover > svg": {
                transform: "scale(1.2)",
                transition: "transform 0.5s",
              },
            }}
          >
            <Icon
              as={AiFillMessage}
              boxSize={"5"}
              transition={"transform 0.5s"}
            />
          </Box>
          <Text fontWeight={"bold"} textAlign={"center"} fontSize={"sm"}>
            6161
          </Text>
        </Grid>

        <Grid alignContent={"center"}>
          <Box
            backgroundColor={"#00000010"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            rounded={"full"}
            p={"0.8rem"}
            _hover={{ cursor: "pointer" }}
            sx={{
              "&:hover > svg": {
                transform: "scale(1.2)",
                transition: "transform 0.5s",
              },
            }}
          >
            <Icon as={FaBookmark} boxSize={"5"} transition={"transform 0.5s"} />
          </Box>
          <Text fontWeight={"bold"} textAlign={"center"} fontSize={"sm"}>
            88.2K
          </Text>
        </Grid>

        <Grid alignContent={"center"}>
          <Box
            backgroundColor={"#00000010"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            rounded={"full"}
            p={"0.8rem"}
            _hover={{ cursor: "pointer" }}
            sx={{
              "&:hover > svg": {
                transform: "scale(1.2)",
                transition: "transform 0.5s",
              },
            }}
          >
            <Icon as={FaShare} boxSize={"5"} transition={"transform 0.5s"} />
          </Box>
          <Text fontWeight={"bold"} textAlign={"center"} fontSize={"sm"}>
            12.1K
          </Text>
        </Grid>
      </Grid>
    </Flex>
  );
};

const Clips: FC<ClipsProps> = () => {
    const tempData = [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    ];
  return (
    <Box height='100vh' overflowY={"auto"}>
      <Flex
        w={"full"}
        justifyContent={"center"}
        bg={"#fff"}
        gap={4}
        alignItems={"flex-end"}
        py={"0.5rem"}
        flexDir={"column"}
      >
        {tempData.map((item, index) => {
          return <ClipItem videoLink={item} key={index} />;
        })}
      </Flex>
    </Box>
  );
};

export default Clips;
