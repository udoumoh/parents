import { FC, useState } from "react";
import {
  Flex,
  Box,
  Button,
  Text,
  InputGroup,
  Input,
  Avatar,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

interface ChatBoxProps {
  ward: {
    profileImage: string;
    firstName: string;
    lastName: string;
    schoolName: string;
    lastMessage: string;
    timeSent: string;
    position: string;
    id: number;
  };
  id: String;
}

const ChatBox: FC<ChatBoxProps> = ({ ward, id }) => {
  return (
    <Flex
      flexDir={"column"}
      w={"full"}
      textAlign={"center"}
      maxH={"100vh"}
      justifyContent={"space-between"}
    >
      <Box
        borderBottom={"1px solid #C2C2C2"}
        backgroundColor={"#fff"}
        px={"1rem"}
        py={"0.5rem"}
      >
        <Box display={"flex"} alignItems={"center"} gap={3}>
          <Avatar size={"md"} src={ward?.profileImage} pointerEvents={"none"} />
          <Text fontSize={"xl"} fontWeight={"600"}>
            {ward?.firstName}
          </Text>
        </Box>
      </Box>
      <Box overflowY="auto" flex={"1"}>
        hi
      </Box>
      <Box
        borderBottom={"1px solid #C2C2C2"}
        borderTop={"1px solid #C2C2C2"}
        backgroundColor={"#fff"}
        px={"1rem"}
        py={"0.5rem"}
        bottom={"0"}
      >
        <Box display={"flex"} alignItems={"center"} gap={3} w={"full"}>
          <IconButton
            aria-label="Call Segun"
            size="lg"
            icon={<MdOutlineEmojiEmotions size="24" />}
          />
          <Input placeholder="Type a message" size="lg" />
          <Button size={"lg"}>
            <Icon as={IoMdSend} boxSize={6} />
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default ChatBox;
