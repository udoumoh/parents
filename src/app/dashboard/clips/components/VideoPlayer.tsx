import React, { forwardRef } from "react";
import { Box } from "@chakra-ui/react";

interface VideoPlayerProps {
  link: string;
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ link }, ref) => {
    return (
      <Box maxW={'500px'} height={['400px', '300px', '830px']}>
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
          borderRadius: "10px",
        }}
      >
        <source src={link} type="video/mp4" />
      </video>
      </Box>
    );
  }
);

export default VideoPlayer;
