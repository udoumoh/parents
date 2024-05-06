import { FC, useEffect, useRef, useState } from "react";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { FaPlay, FaPause } from "react-icons/fa";

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ url }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const handlePlay = () => {
        setIsPlaying(true);
        setShowControls(false); // Hide controls when video starts playing
      };

      const handlePause = () => {
        setIsPlaying(false);
        setShowControls(true); // Show controls when video is paused
      };

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

  const handleVideoClick = () => {
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
    <Box position="relative" width="100%">
      <video
        ref={videoRef}
        width="100%"
        onClick={handleVideoClick}
        onTouchStart={() => setShowControls(true)}
        onTouchEnd={() => setShowControls(false)}
      >
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Custom play/pause button */}
      {showControls && (
        <Flex
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          alignItems="center"
          justifyContent="center"
          backgroundColor="#00000080"
          borderRadius="50%"
          p="0.8rem"
          onClick={handleTogglePlay}
        >
          <Icon
            as={isPlaying ? FaPause : FaPlay}
            color="#fff"
            boxSize={4}
            _hover={{ cursor: "pointer" }}
          />
        </Flex>
      )}
    </Box>
  );
};

export default VideoPlayer;
