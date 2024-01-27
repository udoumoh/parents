"use client";
import { FC, useState } from "react";
import { Box } from "@chakra-ui/react";
import ChatBox from "../component/ChatBox";
import { useUserAPI } from "@/hooks/user/UserContext";

interface chatProps {
  params: { id: string };
}

const Chat: FC<chatProps> = ({ params }: { params: { id: string } }) => {
  const { profileData, currentId, setCurrentId, currentWardProfile } =
    useUserAPI();
  const [wardProfile, setWardprofile] = useState(profileData.userChildren);
  const message = wardProfile.find((item: any) => item.id === currentId);
  const chatMessage = message?.chats.find((item: any) => item.id === Number(params.id)) || {
    profileImage: "",
    firstName: "",
    lastName: "",
    schoolName: "",
    lastMessage: "",
    timeSent: "",
    position: "",
    id: 0,
  };

  return (
    <Box display={"flex"} w={"full"}>
      <ChatBox ward={chatMessage} id={params.id} />
    </Box>
  );
};

export default Chat;
