import React, { useState, useRef, useEffect } from "react";
import {
  Flex,
  Text,
  Image,
  Icon,
  Badge,
  useDisclosure,
  useMediaQuery,
  Box,
  Button,
  Avatar,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useToast,
  Collapse,
  Textarea,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import {
  IoWarningOutline,
  IoTrashBinOutline,
  IoReturnUpBack,
  IoEllipsisVertical,
  IoPaperPlaneOutline,
  IoClose,
  IoPersonAddOutline,
  IoMenu,
  IoSaveOutline,
  IoSendOutline,
  IoMailOutline,
  IoMailUnreadOutline,
  IoMailOpenOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import { AiOutlineFolderAdd, AiOutlineFileSearch } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { gql, useMutation, useQuery } from "@apollo/client";
import { TbInbox, TbSend, TbNote, TbPencil } from "react-icons/tb";
import { PiPen, PiPencil } from "react-icons/pi";
import { format, formatDistance, formatDistanceToNow } from "date-fns";
import { GET_DELETE_MESSAGE, GET_PARENT, GET_REPLY_MESSAGE, MARK_AS_READ } from "./ChatBox";
import { ComposeMessage } from "./ComposeMessage";


export const GET_MY_MESSAGES = gql(`
query GetMyMessages($ref: String!) {
  getMyMessages(ref: $ref) {
    id
    parentMessageId
    subject
    message
    sender
    senderRole
    senderProfilePicture
    senderName
    receiver
    receiverRole
    receiverProfilePicture
    receiverName
    status
    hasReply
    isVisible
    wasEdited
    createdAt
    updatedAt
  }
}
`);

const GET_MESSAGE_REPLIES = gql(`
query GetMessageReplies($msgId: Float!) {
  getMessageReplies(msgId: $msgId) {
    id
    parentMessageId
    subject
    message
    sender
    senderRole
    senderProfilePicture
    senderName
    receiver
    receiverRole
    receiverProfilePicture
    receiverName
    status
    isVisible
    wasEdited
    createdAt
    updatedAt
  }
}
`);

const GET_ADMINS = gql(`
query GetAdmins {
    getAdmins {
      id
      isPaid
      userId
      folder
      status
      plan
      isReferred
      isBeginner
      isDisabled
      agreedTo
      referralCode
      createdAt
      firstName
      middleName
      lastName
      phoneNumber
      email
      profileImgUrl
      role
      school
      schoolImg
      statusCode
    }
  }`)

interface MessageProps {
  id: number;
  parentMessageId: number;
  subject: string;
  message: string;
  sender: string;
  senderRole: string;
  senderProfilePicture: string;
  senderName: string;
  receiver: string[];
  receiverRole: string[];
  receiverProfilePicture: string[];
  receiverName: string[];
  status: string;
  isVisible: boolean;
  wasEdited: boolean;
  hasReply: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AdminProps {
    userId: string;
    schoolImg: string;
    school: string;
}

const MobileInbox = () => {
    const toast = useToast();
    const [toggle, setToggle] = useState<boolean>(false);
    const [message, setMessage] = useState<MessageProps | null>(null);
    const [selectedMessage, setSelectedMessage] = useState<number | null>();
    const { data: parent } = useQuery(GET_PARENT);
    const parentItem = parent?.parent?.parent!;
  
    const { data: received, loading } = useQuery(GET_MY_MESSAGES, {
      variables: { ref: "parent" },
      pollInterval: 4000,
    });
    const { data: replies } = useQuery(GET_MESSAGE_REPLIES, {
      variables: { msgId: selectedMessage! },
      pollInterval: 5000,
    });
  
    const sentMessages = received?.getMyMessages.filter(
      (item: MessageProps) => item.sender === parentItem?.userId
    );
    const sentMessagesWithReplies = received?.getMyMessages.filter(
      (item: MessageProps) =>
        item.hasReply === true &&
        item?.isVisible === true &&
        item?.parentMessageId === null &&
        item?.sender === parentItem?.userId
    );
  
    const receivedMessages = received?.getMyMessages.filter(
      (item: MessageProps) =>
        item.receiver.includes(parentItem?.userId) &&
        item?.isVisible === true &&
        item?.parentMessageId === null
    );
    const allMyInbox = receivedMessages?.concat(sentMessagesWithReplies);
    const sortedItems = allMyInbox?.sort((a: MessageProps, b: MessageProps) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA; // Sorting in descending order
    });
    const messages = sortedItems?.filter(
      (item: MessageProps, index: number, self: MessageProps[]) => {
        // Convert the object to a JSON string to compare them easily
        const jsonString = JSON.stringify(item);
        // Return true if the index of the current object is the first occurrence of the object in the array
        return (
          index ===
          self.findIndex(
            (obj: MessageProps) => JSON.stringify(obj) === jsonString
          )
        );
      }
    );
    const draftMessages = received?.getMyMessages.filter(
      (item: MessageProps) =>
        item.sender === parentItem?.userId && item?.isVisible === false
    );
  
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      setTimeout(() => {
        if (toggle && containerRef.current) {
          containerRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    }, [toggle]);
    const { isOpen, onOpen, onClose} = useDisclosure();
    const btnRef = React.useRef(null)

  const {
    isOpen: isInboxOpen,
    onOpen: onInboxOpen,
    onClose: onInboxClose,
  } = useDisclosure();
    const {
      isOpen: isChatBoxOpen,
      onOpen: onChatBoxOpen,
      onClose: onChatBoxClose,
    } = useDisclosure();
  
    const {
      isOpen: isSearchOpen,
      onOpen: onSearchOpen,
      onClose: onSearchClose,
    } = useDisclosure();
  
    const InboxLink = [
      {
        label: "Inbox",
        icon: TbInbox,
      },
      {
        label: "Sent",
        icon: TbSend,
      },
      {
        label: "Drafts",
        icon: TbNote,
      },
    ];
    const parentItemName = `${parentItem?.firstName} ${parentItem?.middleName || ""} ${
      parentItem?.lastName
    }`;
  
    const [value, setValue] = useState<string>("");
  
    const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const inputValue = e.target.value;
      setValue(inputValue);
    };
  
    const [del] = useMutation(GET_DELETE_MESSAGE);
    const [reply] = useMutation(GET_REPLY_MESSAGE);
    const [read] = useMutation(MARK_AS_READ);
  
    const markAsRead = (id: number) => {
      read({
        variables: { msgId: id },
      });
    };
  
    const replyMessage = async () => {
      const response = await reply({
        variables: {
          message: value,
          parentMessageId: selectedMessage!,
          subject: message?.subject!,
        },
      });
      if (response.data?.replyMessage.messages !== null || undefined) {
        toast({
          title: "Reply sent successfully",
          position: "top-right",
          status: "success",
          variant: "left-accent",
          duration: 5000,
          isClosable: true,
        });
        setValue("");
        setToggle(false);
      } else {
        toast({
          title: "Unable to reply to this message",
          position: "top-right",
          status: "error",
          variant: "left-accent",
          duration: 5000,
          isClosable: true,
        });
        setValue("");
      }
    };
  
    const deleteMessage = async () => {
      const response = await del({
        variables: { deleteMessageId: selectedMessage! },
      });
      if (response.data?.deleteMessage === true) {
        toast({
          title: "Message Deleted",
          position: "top-right",
          status: "success",
          variant: "left-accent",
          duration: 5000,
          isClosable: true,
        });
        setTimeout(() => {
          router.refresh();
        }, 300);
      } else {
        toast({
          title: "Unable to delete the message",
          position: "top-right",
          status: "error",
          variant: "left-accent",
          duration: 5000,
          isClosable: true,
        });
      }
    };
    const tabHeaders = ["My Inbox", "My Sent Messages", "Saved Drafts"];
    const { data: allAdmins} = useQuery(GET_ADMINS)
    const filterAdmin = (userId: string) => {
        return allAdmins?.getAdmins.filter((item: AdminProps) => item.userId === userId);
      };

  return (
    <Flex direction="column" overflow="hidden" w="full" mt={"6"} p={2}>
        <Tabs variant="solid-rounded" colorScheme="teal">
      <Flex
        w="full"
        rounded="full"
        justify="center"
        align="center"
        bg="#F2F2F2"
        p={2}
        gap={2}
      >
          <TabList>
        {tabHeaders.map(item => (
            <Tab fontSize={12} fontWeight={500} key={item}>{item}</Tab>
        ))}
          </TabList>
      </Flex>
      <TabPanels>
        {/* Inbox Messages */}
        <TabPanel px={0}>
            <Flex direction="column" gap={3} mt={2}>
                <Text>My Inbox</Text>
                {messages?.length > 0 ? (
                messages?.map((item: MessageProps) => (
                    <Flex
                    key={item?.id}
                    w="full"
                    align="start"
                    justify="space-between"
                    gap={14}
                    _hover={{ bg: '#e2e2e2'}}
                    color={item?.status === "read" ? "#888" : "black"}
                    fontWeight={item?.status === "read" ? "normal" : "bold"}
                    p={1}
                    rounded="md"
                    onClick={() => {
                        setMessage(item);
                        setSelectedMessage(item.id);
                        setToggle(false);
                        setValue("");
                        markAsRead(item.id);
                        onOpen();
                    }}
                    >
                    <Flex align="start" gap={2}>
                        <Avatar
                        src={
                            item?.sender?.includes("ADM")
                            ? filterAdmin(item?.sender!)?.map(
                                (item: AdminProps) => item.schoolImg!
                                )
                            : item?.senderProfilePicture
                        }
                        name={item?.senderName}
                        />
                        <Stack spacing={-1} >
                        <Text
                            textTransform={"capitalize"}
                            fontSize={14}
                            
                        >
                            {item.sender.includes("ADM")
                            ? filterAdmin(item.sender)?.map((item: AdminProps) => item.school)
                            : item.senderName}
                        </Text>
                        <Text fontSize={12}>
                            {item?.subject}
                        </Text>
                        <Text
                            fontSize={12}
                            w="52vw"
                            fontWeight={"light"}
                            noOfLines={1}
                        >
                            {item?.message}
                        </Text>
                        </Stack>
                    </Flex>
                    <Text fontSize={11}>
                        {new Date(item?.createdAt).toLocaleDateString() ===
                        new Date().toLocaleDateString()
                        ? format(new Date(item?.createdAt), "hh:mm")
                        : format(new Date(item?.createdAt), "dd MMM")}
                    </Text>
                    </Flex>
                ))
                ) : (
                <></>
                )}
            </Flex>
        </TabPanel>
         {/* Inbox Messages */}
         <TabPanel px={0}>
            <Flex direction="column" gap={3} mt={2}>
                <Text>My Sent Messages</Text>
                {sentMessages?.length > 0 ? (
                sentMessages?.map((item: MessageProps) => (
                    <Flex
                    key={item?.id}
                    w="full"
                    align="start"
                    justify="space-between"
                    gap={14}
                    _hover={{ bg: '#e2e2e2'}}
                    color={item?.status === "read" ? "#888" : "black"}
                    fontWeight={item?.status === "read" ? "normal" : "bold"}
                    p={1}
                    rounded="md"
                    onClick={() => {
                        setMessage(item);
                        setSelectedMessage(item.id);
                        setToggle(false);
                        setValue("");
                        markAsRead(item.id);
                        onOpen();
                    }}
                    >
                    <Flex align="start" gap={2}>
                        <Avatar
                        src={
                            item?.sender?.includes("ADM")
                            ? filterAdmin(item?.sender!)?.map(
                                (item: AdminProps) => item.schoolImg!
                                )
                            : item?.senderProfilePicture
                        }
                        name={item?.senderName}
                        />
                        <Stack spacing={-1} >
                        <Text
                            textTransform={"capitalize"}
                            fontSize={14}
                            
                        >
                            {item.sender.includes("ADM")
                            ? filterAdmin(item.sender)?.map((item: AdminProps) => item.school)
                            : item.senderName}
                        </Text>
                        <Text fontSize={12}>
                            {item?.subject}
                        </Text>
                        <Text
                            fontSize={12}
                            w="52vw"
                            fontWeight={"light"}
                            noOfLines={1}
                        >
                            {item?.message}
                        </Text>
                        </Stack>
                    </Flex>
                    <Text fontSize={11}>
                        {new Date(item?.createdAt).toLocaleDateString() ===
                        new Date().toLocaleDateString()
                        ? format(new Date(item?.createdAt), "hh:mm")
                        : format(new Date(item?.createdAt), "dd MMM")}
                    </Text>
                    </Flex>
                ))
                ) : (
                <></>
                )}
            </Flex>
        </TabPanel>
         {/* Saved Drafts */}
         <TabPanel px={0}>
            <Flex direction="column" gap={3} mt={2}>
                <Text>My Saved Drafts</Text>
                {draftMessages?.length > 0 ? (
                draftMessages?.map((item: MessageProps) => (
                    <Flex
                    key={item?.id}
                    w="full"
                    align="start"
                    justify="space-between"
                    gap={14}
                    _hover={{ bg: '#e2e2e2'}}
                    color={item?.status === "read" ? "#888" : "black"}
                    fontWeight={item?.status === "read" ? "normal" : "bold"}
                    p={1}
                    rounded="md"
                    onClick={() => {
                        setMessage(item);
                        setSelectedMessage(item.id);
                        setToggle(false);
                        setValue("");
                        markAsRead(item.id);
                        onOpen();
                    }}
                    >
                    <Flex align="start" gap={2}>
                        <Avatar
                        src={
                            item?.sender?.includes("ADM")
                            ? filterAdmin(item?.sender!)?.map(
                                (item: AdminProps) => item.schoolImg!
                                )
                            : item?.senderProfilePicture
                        }
                        name={item?.senderName}
                        />
                        <Stack spacing={-1} >
                        <Text
                            textTransform={"capitalize"}
                            fontSize={14}
                            
                        >
                            {item.sender.includes("ADM")
                            ? filterAdmin(item.sender)?.map((item: AdminProps) => item.school)
                            : item.senderName}
                        </Text>
                        <Text fontSize={12}>
                            {item?.subject}
                        </Text>
                        <Text
                            fontSize={12}
                            w="52vw"
                            fontWeight={"light"}
                            noOfLines={1}
                        >
                            {item?.message}
                        </Text>
                        </Stack>
                    </Flex>
                    <Text fontSize={11}>
                        {new Date(item?.createdAt).toLocaleDateString() ===
                        new Date().toLocaleDateString()
                        ? format(new Date(item?.createdAt), "hh:mm")
                        : format(new Date(item?.createdAt), "dd MMM")}
                    </Text>
                    </Flex>
                ))
                ) : (
                <></>
                )}
            </Flex>
        </TabPanel>
      </TabPanels>
        </Tabs>
        <Button leftIcon={<TbPencil />} fontWeight={500} pos="fixed" bottom={20} py={8} onClick={onInboxOpen} rounded="xl" bg={"#007C7B70"} backdropFilter={"blur(6px)"} color="#005D5D" right={4}>Compose Message</Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        size="full"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          {/* <DrawerCloseButton /> */}
          <DrawerHeader px={0}>  <Flex p={3} align="start" justify="space-between">
              <Flex align="start" gap={2}>
                <Avatar
                  src={
                    message?.sender.includes("ADM")
                      ? filterAdmin(message?.sender)
                          ?.map((item: AdminProps) => item.schoolImg)
                          .toString()
                      : message?.senderProfilePicture
                  }
                  size="sm"
                  name={message?.senderName}
                />
                <Stack spacing={-2}>
                  <Text
                    textTransform={"capitalize"}
                    fontSize={12}
                    fontWeight={600}
                  >
                    {message?.sender.includes("ADM")
                      ? filterAdmin(message?.sender)?.map(
                          (item: AdminProps) => item.school
                        )
                      : message?.senderName}
                  </Text>
                  <Text fontSize={10}>{message?.subject}</Text>
                  <Text fontSize={10}>
                    Recepients:{" "}
                    <Text
                      display="inline"
                      textTransform={"capitalize"}
                      color="#747474"
                    >
                      {message?.receiverName.join(", ")}
                    </Text>
                  </Text>
                </Stack>
              </Flex>

              <Flex direction="column" align="end">
                <Flex fontSize={10}>
                  {format(
                    new Date(
                      message?.createdAt ? message?.createdAt : "000"
                    ),
                    "MMM dd, yyyy, h:mm:ss a"
                  )}
                </Flex>
                <Box alignItems="end">
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<IoEllipsisVertical />}
                      variant="ghost"
                      size="sm"
                    />
                    <MenuList fontSize="14">
                    <MenuItem
                        icon={<IoCloseCircleOutline />}
                        onClick={() => {
                          setSelectedMessage(null);
                          setMessage(null);
                          onClose();
                        }}
                      >
                        Close Inbox
                      </MenuItem>
                      <MenuItem
                        icon={<IoTrashBinOutline />}
                        onClick={deleteMessage}
                        display={
                          parentItem?.userId !== message?.sender ? "none" : "flex"
                        }
                      >
                        Delete this Conversation
                      </MenuItem>                     
                      <MenuItem
                        icon={<IoReturnUpBack />}
                        onClick={() => setToggle(true)}
                      >
                        Reply Message
                      </MenuItem>
                      <MenuItem icon={<IoWarningOutline />}>
                        Report Message
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              </Flex>
            </Flex></DrawerHeader>

          <DrawerBody px={0}>
          <Flex
            direction="column"
            display={message ? "block" : "none"}
            h="full"
          >
          

            <Flex
              direction="column"
              justify="space-between"
              h="73vh"
              overflowY="auto"
            >
              <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem>
                  <AccordionButton justifyContent={"space-between"}>
                    <Flex gap={2}>
                      <Avatar
                        src={message?.senderProfilePicture}
                        name={message?.senderName}
                        size="sm"
                      />
                      <Stack spacing={-4} alignItems="start">
                        <Text
                          textTransform={"capitalize"}
                          textAlign={"start"}
                          fontSize={12}
                        >
                          {message?.sender.includes("ADM")
                            ? `${message?.senderName} (Admin)`
                            : message?.senderName}
                        </Text>
                        <Text
                          textAlign="start"
                          fontSize={10}
                          color="#747474"
                        >
                          {message?.message?.slice(0, 100)}
                          {message?.message?.length! > 100 ? "..." : ""}
                        </Text>
                      </Stack>
                    </Flex>
                    <Flex fontSize={10} justify={"end"} textAlign={"start"}>
                      {format(
                        new Date(
                          message?.createdAt ? message?.createdAt : "000"
                        ),
                        "MMM dd, yyyy, h:mm:ss a"
                      )}
                    </Flex>
                  </AccordionButton>
                  <AccordionPanel pb={4} whiteSpace={"pre-line"}>
                    <Stack>
                      <Text>{message?.message}</Text>
                      <Divider my={2} />
                      <Box>
                        <Button
                          mr={2}
                          px={4}
                          py={4}
                          h="2em"
                          leftIcon={<IoReturnUpBack />}
                          fontSize={13}
                          fontWeight={500}
                          onClick={() => setToggle(!toggle)}
                        >
                          Reply
                        </Button>
                      </Box>
                    </Stack>
                  </AccordionPanel>
                </AccordionItem>

                {replies?.getMessageReplies?.length <= 0 ? (
                  <></>
                ) : (
                  replies?.getMessageReplies?.map((item: any) => (
                    <AccordionItem key={item.id}>
                      <AccordionButton justifyContent={"space-between"}>
                        <Flex gap={2}>
                          <Avatar
                            src={item?.senderProfilePicture}
                            name={item?.senderName}
                            size="sm"
                          />
                          <Stack spacing={-4} alignItems="start">
                            <Text
                              textTransform={"capitalize"}
                              textAlign={"start"}
                              fontSize={12}
                            >
                              {item?.senderName}
                            </Text>
                            <Text
                              fontSize={10}
                              color="#747474"
                              textAlign={"start"}
                            >
                              {item?.message?.slice(0, 100)}
                              {item?.message?.length! > 100 ? "..." : ""}
                            </Text>
                          </Stack>
                        </Flex>
                        <Flex
                          fontSize={10}
                          justify={"end"}
                          textAlign={"start"}
                        >
                          {format(
                            new Date(
                              item?.createdAt ? item?.createdAt : "000"
                            ),
                            "MMM dd, yyyy, h:mm:ss a"
                          )}
                        </Flex>
                      </AccordionButton>
                      <AccordionPanel pb={4} whiteSpace={"pre-line"}>
                        <Stack>
                          <Text fontSize={14}>{item?.message}</Text>
                          <Divider my={1} />
                          <Box>
                            <Button
                              mr={2}
                              py={3}
                              h="1em"
                              leftIcon={<IoReturnUpBack />}
                              fontSize={10}
                              size="sm"
                              fontWeight={500}
                              onClick={() => setToggle(!toggle)}
                            >
                              Reply
                            </Button>
                          </Box>
                        </Stack>
                      </AccordionPanel>
                    </AccordionItem>
                  ))
                )}
                <Collapse in={toggle} animateOpacity>
                  <Box p={3} w="full" pos="relative" zIndex={4}>
                    <Flex align="start" gap={3} w="full">
                      {/* <Avatar src={userImage} name={userName} size="sm" /> */}
                      <Flex
                        direction="column"
                        w="full"
                        borderRadius={"md"}
                        boxShadow={"md"}
                        p={3}
                      >
                        <Flex align="center" gap={2} fontSize={12}>
                          <Icon as={IoReturnUpBack} />
                          <Text>Replying to: {message?.senderName}</Text>
                        </Flex>
                        <Textarea
                          focusBorderColor="#F4B95F"
                          h="15vh"
                          mt={4}
                          w="full"
                          value={value}
                          onChange={handleReplyChange}
                        />
                        <Box mt={4} ref={containerRef}>
                          <Button
                            mr={2}
                            px={4}
                            py={4}
                            h="2em"
                            leftIcon={<IoPaperPlaneOutline />}
                            fontSize={13}
                            fontWeight={500}
                            onClick={() => {
                              value.length > 0
                                ? replyMessage()
                                : toast({
                                    title:
                                      "You haven't typed a reply yet 😂",
                                    position: "bottom",
                                    status: "info",
                                    variant: "left-accent",
                                    duration: 5000,
                                    isClosable: true,
                                  });
                            }}
                          >
                            Send
                          </Button>
                          <Button
                            variant="outline"
                            px={4}
                            py={4}
                            h="2em"
                            leftIcon={<IoClose />}
                            onClick={() => {
                              setToggle(false);
                              setValue("");
                            }}
                            fontSize={13}
                            fontWeight={500}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </Flex>
                    </Flex>
                  </Box>
                </Collapse>
              </Accordion>
            </Flex>
          </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <ComposeMessage isOpen={isInboxOpen} onClose={onInboxClose} />
    </Flex>
  );
};

export default MobileInbox;