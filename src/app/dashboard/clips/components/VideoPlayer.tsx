import { FC } from "react";
import { Box } from "@chakra-ui/react";

interface VideoPlayerProps {
    link: any
}

const VideoPlayer: FC<VideoPlayerProps> = ({link}) => {
  return (
    <video
      controls
      preload="auto"
      muted
      playsInline
      autoPlay
      style={{ objectFit: "cover", width:"26%", height:"85vh", borderRadius:'10px' }}
    >
      <source
        src={link}
        type="video/mp4"
      />
    </video>
  );
};

export default VideoPlayer;
