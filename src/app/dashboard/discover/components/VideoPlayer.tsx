import { FC, useEffect, useRef, useState } from "react";
import { Box, Button, Text, Flex, Icon } from "@chakra-ui/react";
import { FaPlay, FaPause } from "react-icons/fa";

interface VideoPlayerProps {
    url: string;
}

const VideoPlayer: FC<VideoPlayerProps> = ({url}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIshovered] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      // Event listener to update playing state
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);

      return () => {
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
      };
    }
  }, []);

  const handleTogglePlay = () => {
    const video = videoRef.current;

    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  return (
    <Box
      position={"relative"}
      width={"100%"}
      onMouseEnter={() => setIshovered(true)}
      onMouseLeave={() => setIshovered(false)}
      h={{ base: "200px", md: "500px" }}
    >
      <video ref={videoRef} width="100%" height="auto">
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Custom play/pause button */}
      <Flex
        position="absolute"
        top={{base:"40%", md:"50%"}}
        left="50%"
        transform="translate(-50%, -50%)"
        alignItems="center"
        justifyContent="center"
        width="auto"
        height="auto"
        backgroundColor={"#00000040"}
        rounded={"full"}
        p={"0.8rem"}
        display={isHovered ? "flex" : "none"}
      >
        <Icon
          as={isPlaying ? FaPause : FaPlay}
          onClick={handleTogglePlay}
          color={"#fff"}
          _hover={{ cursor: "pointer" }}
          boxSize={6}
        />
      </Flex>
    </Box>
  );
};

export default VideoPlayer;
