"use client";
import { Flex, Image } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const Loading = () => {
  const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
  `;
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      h="100vh"
      bgSize="cover"
      bgRepeat={"no-repeat"}
    >
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        animation={`${pulseAnimation} 1.5s ease-in-out infinite`}
      >
        <Image src="/images/greylightBordered.svg" />
      </Flex>
    </Flex>
  );
};

export default Loading;

