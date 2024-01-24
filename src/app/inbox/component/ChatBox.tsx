import { FC } from 'react'
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
 } from "@chakra-ui/react"
 import { MdOutlineEmojiEmotions } from "react-icons/md";
 import { IoMdSend } from "react-icons/io";

interface ChatBoxProps {
  ward: {
    profileImage: string;
    firstName: string;
  }
}

const ChatBox: FC<ChatBoxProps> = ({ward}) => {
  return (
    <Flex
      flexDir={"column"}
      h={"100vh"}
      flex={"1"}
      textAlign={"center"}
      //   backgroundColor={"red.400"}
    >
      <Box
        borderBottom={"1px solid #C2C2C2"}
        backgroundColor={"#fff"}
        px={"1rem"}
        py={"0.5rem"}
      >
        <Box display={"flex"} alignItems={"center"} gap={3}>
          <Avatar size={"md"} src={ward.profileImage} pointerEvents={"none"} />
          <Text fontSize={"xl"} fontWeight={"600"}>
            {ward.firstName}
          </Text>
        </Box>
      </Box>
      <Box flex={'1'} overflowY="auto">hi</Box>
      <Box
        borderBottom={"1px solid #C2C2C2"}
        borderTop={"1px solid #C2C2C2"}
        backgroundColor={"#fff"}
        px={"1rem"}
        py={"0.5rem"}
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
}

export default ChatBox