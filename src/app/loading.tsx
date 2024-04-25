"use client";
import { Flex, Image } from "@chakra-ui/react";
import PuffLoader from "react-spinners/PuffLoader";

const Loading = () => {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      h="100vh"
      bgSize="cover"
      bgRepeat={"no-repeat"}
    >
      <PuffLoader color="#005D5D" />
    </Flex>
  );
};

export default Loading;

