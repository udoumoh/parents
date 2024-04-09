import { FC, useState, useEffect } from "react";
import { Box, Text, Button, Icon, Image, Avatar } from "@chakra-ui/react";

interface DiscoverProps {}

const Discover: FC<DiscoverProps> = ({}) => {
  return (
    <Box minH={"100vh"} w={"full"} backgroundColor={"red.500"} p={'1rem'}>
      <Box
        backgroundImage={"/images/discoverbg.svg"}
        bgSize="cover"
        bgPosition="top"
        bgRepeat="no-repeat"
        h={'300px'}
      >
        Hi
      </Box>
    </Box>
  );
};

export default Discover;
