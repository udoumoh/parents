import { FC, useEffect, useRef } from 'react'
import { Box, Text, Flex } from '@chakra-ui/react'

interface VideoPlayerProps {
  
}

const VideoPlayer: FC<VideoPlayerProps> = ({}) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      const video = videoRef.current;

      if (video) {
        // Enable autoplay
        video.autoplay = true;

        // Enable looping
        video.loop = true;
      }
    }, []);

  return (
    <Box position={"relative"} width={"full"}>
      <video ref={videoRef} width="100%" height="100%">
        <source
          src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </Box>
  );
}

export default VideoPlayer