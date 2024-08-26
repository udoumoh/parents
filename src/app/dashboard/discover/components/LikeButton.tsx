import { useState } from "react";
import { Box, Icon } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

const MotionBox = motion(Box);
const MotionIcon = motion(Icon);

export const LikeButton = ({ isLiked, onToggleLike }: any) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const controls = useAnimation();

  const handleClick = async () => {
    setIsAnimating(true);
    onToggleLike();

    await controls.start({
      scale: [1, 1.2, 0.9, 1.1, 1],
      rotate: isLiked ? [0, -45, 0] : [0, 45, 0],
      transition: { duration: 0.5 },
    });

    setIsAnimating(false);
  };

  return (
    <MotionBox
      backgroundColor={isLiked ? "#FFF7F7" : "#fff"}
      display="flex"
      justifyContent="center"
      alignItems="center"
      rounded="full"
      height="40px"
      width="40px"
      _hover={{ cursor: "pointer" }}
      onClick={handleClick}
      animate={controls}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <MotionIcon
        as={isLiked ? IoHeart : IoHeartOutline}
        boxSize="18px"
        color={isLiked ? "#fe2c55" : "#686D76"}
        animate={{
          scale: isAnimating ? [1, 1.2, 1] : 1,
          transition: { duration: 0.3 },
        }}
      />
    </MotionBox>
  );
};
