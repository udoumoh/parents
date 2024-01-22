'use client'
import { FC, useState } from "react";
import {
    Box,
    Avatar,
    Text,
    Badge,
    Button,
    Flex,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Icon,
    Image,
} from "@chakra-ui/react"
import {BsThreeDots, BsDot} from 'react-icons/bs'
import { AiOutlinePlus } from "react-icons/ai";
import { useUserAPI } from "@/hooks/user/UserContext";
import { UserChildren } from "@/hooks/user/UserContext";

interface InboxPageProps {}

interface ChatContactItemProps {
    chat: {
    profileImage: string;
    firstName: string;
    lastName: string;
    schoolName: string;
    lastMessage: string;
    timeSent: string;
    position: string;
    }
}

const ChatContactItem: FC<ChatContactItemProps> = ({chat}) => {
  return (
    <Flex
      // my={"1.5rem"}
      gap={2}
      p={"0.7rem"}
      alignItems={"center"}
      _hover={{ backgroundColor: "#2A938C30", transition: "0.3s", borderRadius:"5" }}
    >
      <Avatar size={{ base: "sm", md: "md" }} src={chat.profileImage} />
      <Box>
        <Flex alignItems={"center"} pointerEvents={"none"}>
          <Text fontSize={"xs"} fontWeight={"600"}>
            {`${chat.firstName} ${chat.lastName}`}
          </Text>
          <Icon
            as={BsDot}
            boxSize={"6"}
            display={{ base: "none", md: "block" }}
          />
          <Text
            color={"#B1B1B1"}
            fontSize={"xs"}
            mr={"0.5rem"}
            display={{ base: "none", md: "block" }}
            pointerEvents={"none"}
          >
            {chat.schoolName}
          </Text>
          <Badge
            variant="subtle"
            textTransform={"none"}
            backgroundColor={"#E3FFFA"}
            color={"#0F987F"}
            fontSize={"2xs"}
            py={"0.2rem"}
            px={"0.5rem"}
            rounded={"lg"}
            display={{ base: "none", md: "block" }}
          >
            {chat.position}
          </Badge>
        </Flex>
        <Flex alignItems={"center"} pointerEvents={"none"}>
          <Text color={"#C2C2C2"} fontSize={"xs"}>
            You: &nbsp;
          </Text>
          <Text fontSize={"2xs"} fontWeight={"500"}>
            {chat.lastMessage.length > 40
              ? `${chat.lastMessage.slice(0, 50)}...`
              : chat.lastMessage}
          </Text>
          <Text fontSize={"xs"} color={"#C2C2C2"} ml={"1rem"}>
            {chat.timeSent}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

const InboxPage: FC<InboxPageProps> = ({}) => {
  const { profileData, currentId, setCurrentId, currentWardProfile } =
    useUserAPI();
  const [wardProfile, setWardprofile] = useState(profileData.userChildren);
    const [messages, setMessages] = useState({
      chats: [
        {
          profileImage:
            "https://th.bing.com/th/id/OIP.KdBSw8TPL34eU6T7bjhpAAHaLH?rs=1&pid=ImgDetMain",
          firstName: "Mayowa",
          lastName: "Chinedu",
          schoolName: "Greeenfield High School",
          lastMessage: "Oga Mayowa, my childs result is still not verified",
          timeSent: "3m",
          position: "Admin",
        },
        {
          profileImage:
            "https://th.bing.com/th/id/OIP._glmrtIyzUtogxZCkpiQBwHaLH?rs=1&pid=ImgDetMain",
          firstName: "Mary-Anne",
          lastName: "Ayodele",
          schoolName: "Greeenfield High School",
          lastMessage:
            "Ma, Chibuzor is still owing the school almost 300 thousand naira",
          timeSent: "17m",
          position: "Bursar",
        },
        {
          profileImage:
            "https://th.bing.com/th/id/R.310437da9c381f5c5342434ff6a31107?rik=0CsDgDc9kcOspw&pid=ImgRaw&r=0",
          firstName: "Zainab",
          lastName: "Kayode",
          schoolName: "Greeenfield High School",
          lastMessage: "I am not authorized to verify any student’s result",
          timeSent: "Yesterday",
          position: "Teacher",
        },
      ],
    });
  return (
    <>
      <Box h="100vh" w={"full"}>
        <Flex>
          <Box
            bg={"#fff"}
            minW={{ base: "full", md: "auto" }}
            h={"100vh"}
            overflowY={"auto"}
            pb={"5rem"}
            borderRight={"1px solid #C2C2C2"}
          >
            <Box
              display={"flex"}
              w={"full"}
              alignItems={"center"}
              px={"0.8rem"}
              py={"2rem"}
            >
              <Popover isLazy matchWidth={true}>
                <PopoverTrigger>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    width={"full"}
                    justifyContent={"space-between"}
                    _hover={{ cursor: "pointer" }}
                  >
                    <Flex alignItems={"center"} gap={2}>
                      <Avatar
                        size={"md"}
                        src={currentWardProfile?.profileImage}
                        pointerEvents={"none"}
                      />
                      <Box lineHeight={"20px"}>
                        <Text fontWeight={"600"} fontSize={"sm"}>
                          {`${currentWardProfile?.firstName} ${currentWardProfile?.lastName}`}
                        </Text>
                        <Text
                          fontSize={"12px"}
                          color={"#AAAAAA"}
                          fontWeight={"600"}
                        >
                          {currentWardProfile?.greynoteNumber}
                        </Text>
                      </Box>
                    </Flex>
                    <BsThreeDots color={"#005D5D"} />
                  </Box>
                </PopoverTrigger>
                <PopoverContent rounded={"xl"} w={"auto"} shadow={"lg"}>
                  <PopoverBody p={"0.4rem"}>
                    {wardProfile.map((ward: UserChildren, index: number) => {
                      return (
                        <Flex
                          alignItems={"center"}
                          justifyContent={"center"}
                          gap={2}
                          bgColor={
                            currentId === profileData.userChildren[index].id
                              ? "#3F999830"
                              : ""
                          }
                          rounded={"md"}
                          py={"0.5rem"}
                          mb={"0.4rem"}
                          _hover={{
                            backgroundColor: "#3F999830",
                            cursor: "pointer",
                          }}
                          key={index}
                          onClick={() => {
                            localStorage.setItem(
                              "currentId",
                              `${profileData.userChildren[index].id}`
                            );
                            setCurrentId(
                              parseInt(
                                localStorage.getItem("currentId") ??
                                  `${profileData.userChildren[0]?.id}`,
                                10
                              )
                            );
                          }}
                        >
                          <Avatar
                            size={"md"}
                            src={ward.profileImage}
                            pointerEvents={"none"}
                          />
                          <Box lineHeight={"20px"}>
                            <Text fontWeight={"600"} fontSize={"sm"}>
                              {`${ward.firstName} ${ward.lastName}`}
                            </Text>
                            <Text
                              fontSize={"12px"}
                              color={"#AAAAAA"}
                              fontWeight={"600"}
                            >
                              {ward.greynoteNumber}
                            </Text>
                          </Box>
                        </Flex>
                      );
                    })}
                    <Flex justifyContent={"center"} mb={"1rem"} mt={"2rem"}>
                      <Button
                        backgroundColor={"#005D5D"}
                        color={"#fff"}
                        colorScheme="teal"
                        w={"90%"}
                      >
                        <AiOutlinePlus />
                        <Text fontWeight={"light"} pl="0.5rem">
                          Link your Child
                        </Text>
                      </Button>
                    </Flex>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>

            <Text
              px={"0.8rem"}
              color={"#747474"}
              fontSize={"sm"}
              fontWeight={"600"}
            >
              Inbox
            </Text>

            <Box px={"0.8rem"} mt={'1rem'}>
              {messages.chats.map((item, index) => {
                return <ChatContactItem chat={item} key={index} />;
              })}
            </Box>
          </Box>
          <Box
            bg="#fff"
            minW="auto"
            h="100vh"
            overflowY={"auto"}
            pt={{ base: "7rem", lg: "0px" }}
            pb={"5rem"}
            flex={"1"}
            display={{ base: "none", sm: "flex" }}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Flex
              flexDir={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              w={"50%"}
              textAlign={"center"}
            >
              <Image
                src="/images/inboxillustration.svg"
                alt="No message"
                my={"1rem"}
                boxSize={"32"}
              />
              <Text fontSize={"xl"} fontWeight={"bold"} my={"0.8rem"}>
                Your Inbox
              </Text>
              <Text color={"#4B4B4B"} my={"0.8rem"}>
                Send and receive direct messages from school admins or teachers
              </Text>
              <Button
                size={"md"}
                backgroundColor={"#005D5D"}
                rounded={"lg"}
                my={"0.8rem"}
                colorScheme="teal"
              >
                <Text color={"#fff"} fontSize={"xs"} px={"1.5rem"}>
                  Send Message
                </Text>
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default InboxPage;
