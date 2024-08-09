"use client";
import { Flex, Image } from "@chakra-ui/react";
import PuffLoader from "react-spinners/PuffLoader";
import {motion} from 'framer-motion'

const Loading = () => {
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
        as={motion.div}
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
      >
        <Image src="/images/greylightBordered.svg" />
      </Flex>
      {/* <PuffLoader color="#005D5D" /> */}
    </Flex>
  );
};

export default Loading;

