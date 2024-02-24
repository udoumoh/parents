"use client";
import { FC, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
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
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { BsThreeDots, BsDot } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { useUserAPI } from "@/hooks/UserContext";
import { UserChildren } from "@/hooks/UserContext";
import SearchStudentModal from "@/components/shared/searchStudentModal";

interface ChatSidenavProps {
  children: React.ReactNode;
}

interface ChatContactItemProps {
  chat: {
    profileImage: string;
    firstName: string;
    lastName: string;
    schoolName: string;
    lastMessage: string;
    timeSent: string;
    position: string;
    id: Number;
  };
}

const ChatContactItem: FC<ChatContactItemProps> = ({ chat }) => {
  const router = useRouter()
  return (
    <Link
      my={"0.5rem"}
      backgroundColor={usePathname() === `/dashboard/inbox/${chat.id}` ? "#2A938C30" : ""}
      display={"flex"}
      gap={2}
      p={"0.7rem"}
      alignItems={"center"}
      _hover={{
        backgroundColor: "#2A938C30",
        transition: "0.3s",
      }}
      onClick={() => router.push(`/dashboard/inbox/${chat.id}`)}
      borderRadius="5"
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
    </Link>
  );
};

const ChatSidenav: FC<ChatSidenavProps> = ({ children }) => {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const { profileData, currentId, setCurrentId, currentWardProfile } =
    useUserAPI();
  const [wardProfile, setWardprofile] = useState(profileData.userChildren);
  const message = wardProfile.find((item: any) => item.id === currentId);
  const chats = message?.chats || [];
  
  return (
    <>
      <Box display={"flex"} h={"100vh"}>
        <Box
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
                      _hover={{ backgroundColor: "#044141" }}
                      onClick={onModalOpen}
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
                    <SearchStudentModal
                      isSearchOpen={isModalOpen}
                      onSearchOpen={onModalOpen}
                      onSearchClose={onModalClose}
                    />
          </Box>

          <Text
            px={"0.8rem"}
            color={"#747474"}
            fontSize={"sm"}
            fontWeight={"600"}
          >
            Inbox
          </Text>

          <Box px={"0.8rem"} mt={"1rem"}>
            {chats.map((item, index) => {
              return <ChatContactItem chat={item} key={index} />;
            })}
          </Box>
        </Box>
        <Box
          flex={"1"}
          overflowY={"auto"}
          pt={{ base: "7rem", lg: "0rem" }}
          pb={{ base: "5rem", lg: "4rem" }}
          display={{ base: "none", sm: "flex" }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

export default ChatSidenav;
