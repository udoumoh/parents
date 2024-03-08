"use client";
import { Flex, Image } from "@chakra-ui/react";
import BarLoader from "react-spinners/BarLoader";

const Loading = () => {
  return (
    <Flex
      justify="center"
      h="100vh"
      bgSize="cover"
      bgRepeat={"no-repeat"}
      //   bgImage="/images/agentbg.png"
    >
      <Flex
        mt={"10%"}
        direction="column"
        align="center"
        minW={{ base: "full", lg: "650px" }}
      >
        <Image
          src="/images/greylightBordered.svg"
          alt="Greynote Parents Logo"
          w="15%"
          mb={10}
        />
        <BarLoader color="#ffd880" width="150px" />
      </Flex>
    </Flex>
  );
};

export default Loading;
