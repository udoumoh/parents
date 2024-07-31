import React, { forwardRef } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";

interface VideoPlayerProps {
  link: string;
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ link }, ref) => {
    return (
      <Box
        maxW="500px"
        height={["100vh", "400px", "450px", "700px"]}
        position="relative"
        rounded={{ base: "none", md: "lg" }}
      >
        <video
          ref={ref}
          controls
          preload="auto"
          muted
          playsInline
          autoPlay
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        >
          <source src={link} type="video/mp4" />
        </video>
        <Text
          position="absolute"
          bottom="50px" // Adjust this value to ensure it's above the controls
          left="10px"
          color="white"
          bg="rgba(0, 0, 0, 0.5)"
          p="0.5rem"
          borderRadius="5px"
          zIndex="1" // Ensure the text is above the video controls
        >
          messing around
        </Text>
      </Box>
    );
  }
);

export default VideoPlayer;
