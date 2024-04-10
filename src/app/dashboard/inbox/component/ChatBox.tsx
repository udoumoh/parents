"use client";

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
} from "@chakra-ui/react";
import {
  IoWarningOutline,
  IoTrashBinOutline,
  IoMailUnreadOutline,
  IoReturnUpBack,
  IoEllipsisVertical,
  IoPaperPlaneOutline,
  IoClose,
} from "react-icons/io5";
import { AiOutlineFolderAdd, AiOutlineFileSearch } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { gql, useMutation, useQuery } from "@apollo/client";
import { TbInbox, TbSend, TbNote } from "react-icons/tb";
import { PiPen, PiPencil } from "react-icons/pi";
import { format, formatDistance, formatDistanceToNow } from "date-fns";
import { ComposeMessage } from "./ComposeMessage";

export const GET_PARENT = gql(`
query Parent {
  parent {
    errors {
      field
      message
    }
    parent {
      id
      userId
      status
      isPaid
      isVerified
      isReferred
      agreedTo
      createdAt
      firstName
      middleName
      lastName
      parentRole
      phoneNumber
      email
      role
      folder
      isDisabled
      profileImgUrl
      children {
        id
        createdAt
        transferedAt
        firstName
        middleName
        lastName
        gender
        ageInput
        folder
        isOwing
        isVisible
        isDuplicate
        linkedAt
        linkCount
        isLinked
        startDate
        endDate
        birthDate
        isArchived
        profileImgUrl
        classroom {
          classroom {
            id
            isValid
            wasEdited
            createdAt
            updatedAt
            classId
            className
            classSubjects
            description
            isDisabled
            students {
              id
              createdAt
              transferedAt
              firstName
              middleName
              lastName
              gender
              ageInput
              folder
              isOwing
              isVisible
              isDuplicate
              linkedAt
              linkCount
              isLinked
              startDate
              endDate
              birthDate
              isArchived
              profileImgUrl
              grayId
              fatherName
              fatherEmail
              fatherNumber
              motherName
              motherEmail
              motherNumber
              homeAddress
              lgaOrigin
              state
            }
            teacher {
              id
              userId
              createdAt
              status
              firstName
              middleName
              lastName
              phoneNumber
              email
              role
              folder
              isDisabled
              isVisible
              profileImgUrl
            }
          }
        }
        school {
          school {
            id
            createdAt
            isDisabled
            isVerified
            schoolName
            rcnumber
            address
            type
            lgarea
            folder
            state
            country
            description
            phonenumber
            email
            websiteUrl
            instagramUrl
            facebookUrl
            twitterUrl
            linkedinUrl
            accountName
            accountNumber
            bankName
            logoImgUrl
            bannerImgUrl
            license
          }
        }
        creator {
          admin {
            id
            isPaid
            userId
            folder
            status
            plan
            isReferred
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
            accountOfficer {
              id
              userId
              isDisabled
              isSuper
              isDirector
              createdAt
              fullName
              username
              phoneNumber
              role
              status
              department
              email
              profileImgUrl
              greyAdmin {
                id
                isPaid
                userId
                folder
                status
                plan
                isReferred
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
            }
            school
            schoolImg
            statusCode
          }
        }
        studentCase {
          grayCase {
            id
            createdAt
            updatedAt
            category
            owingAmount
            note
            isActive
            wasEdited
          }
        }
        grayId
        fatherName
        fatherEmail
        fatherNumber
        motherName
        motherEmail
        motherNumber
        homeAddress
        lgaOrigin
        state
      }
    }
  }
}
`);

export const GET_REPLY_MESSAGE = gql(`
mutation ReplyMessage($message: String!, $subject: String!, $parentMessageId: Float!) {
  replyMessage(message: $message, subject: $subject, parentMessageId: $parentMessageId) {
    errors {
      field
      message
    }
    messages {
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
}
`);

export const GET_DELETE_MESSAGE = gql(`
mutation DeleteMessage($deleteMessageId: Float!) {
  deleteMessage(id: $deleteMessageId)
}
`);

export const MARK_AS_READ = gql(`
mutation MarkMessageAsRead($msgId: Float!) {
  markMessageAsRead(msgId: $msgId)
}
`);

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

export const GET_MESSAGE_REPLIES = gql(`
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

const ChatBox = () => {
  const toast = useToast();
  const [toggle, setToggle] = useState<boolean>(false);
  const [message, setMessage] = useState<MessageProps | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<number | null>();
  const { data: parent } = useQuery(GET_PARENT);
  const admin = parent?.parent?.parent!;

  const { data: received, loading } = useQuery(GET_MY_MESSAGES, {
    variables: { ref: "parent" },
    pollInterval: 4000,
  });
  const { data: replies } = useQuery(GET_MESSAGE_REPLIES, {
    variables: { msgId: selectedMessage! },
    pollInterval: 5000,
  });

  const sentMessages = received?.getMyMessages.filter(
    (item: MessageProps) => item.sender === admin?.userId
  );
  const sentMessagesWithReplies = received?.getMyMessages.filter(
    (item: MessageProps) =>
      item.hasReply === true &&
      item?.isVisible === true &&
      item?.parentMessageId === null &&
      item?.sender === admin?.userId
  );

  const receivedMessages = received?.getMyMessages.filter(
    (item: MessageProps) =>
      item.receiver.includes(admin?.userId) &&
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
      item.sender === admin?.userId && item?.isVisible === false
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
  const adminName = `${admin?.firstName} ${admin?.middleName || ""} ${
    admin?.lastName
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

    return (
      <Flex w="100%" overflowX="auto" mt={5} px={4}>
        <Tabs variant="unstyled" orientation="vertical" w="full">
          <Flex
            w="100%"
            h="87vh"
            borderRadius={"md"}
            border="1px solid #E2E2E2"
            overflow="hidden"
          >
            <Flex direction="column" borderRight="1px solid #E2E2E2" w="26em">
              <Flex
                p={2}
                borderBottom="1px solid #E2E2E2"
                h="40px"
                mb={2}
                color="#666"
              >
                <Flex gap={2} align="center" w="full">
                  <Avatar
                    src={admin?.profileImgUrl}
                    name={adminName}
                    size="xs"
                  />
                  <Text textTransform={"capitalize"} fontSize={12}>
                    {adminName}
                  </Text>
                </Flex>
              </Flex>
              <TabList gap={2} px={2}>
                {InboxLink.map((item, index) => (
                  <Tab
                    key={index}
                    onClick={() => {
                      setMessage(null);
                      setSelectedMessage(null);
                    }}
                    _hover={{ bg: "#E2e2e2" }}
                    borderRadius={"3px"}
                    _selected={{ color: "white", bg: "#007C7B" }}
                    fontSize={12}
                    gap={1}
                    px={2}
                    h="25px"
                    justifyContent={"start"}
                  >
                    <Icon as={item.icon} />
                    <Text>{item.label}</Text>
                  </Tab>
                ))}
              </TabList>
            </Flex>
            <Flex direction="column" borderRight="1px solid #E2E2E2">
              <Flex
                p={2}
                borderBottom="1px solid #E2E2E2"
                mb={2}
                color="#000"
                fontSize="18"
                fontWeight={600}
                h="40px"
              >
                <Text>Inbox</Text>
              </Flex>
              <Flex
                px={2}
                direction="column"
                h="100%"
                overflowY="auto"
                overflowX={'auto'}
                sx={{
                  "&::-webkit-scrollbar": {
                    width: "0", // Set the initial width to 0
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#FFDDA6",
                    borderRadius: "12px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    background: "#F4B95F",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "#FFF5E6",
                  },
                  "&:hover::-webkit-scrollbar": {
                    width: "5px", // Increase the width on hover
                  },
                }}
              >
                <Button
                  leftIcon={<PiPencil />}
                  colorScheme="gray"
                  fontWeight={500}
                  w="full"
                  fontSize={12}
                  onClick={onChatBoxOpen}
                >
                  Compose Message
                </Button>
                <TabPanels>
                  <TabPanel px={0}>
                    <Flex gap={1} direction="column" mt={3} w="full">
                      {messages?.length! <= 0 ? (
                        <Flex
                          w="22em"
                          fontSize={12}
                          color="#747474"
                          align="center"
                          gap={1}
                        >
                          {" "}
                          <Icon as={IoWarningOutline} />
                          you have not received any messages
                        </Flex>
                      ) : (
                        <>
                          {messages?.map((item: any) => (
                            <Flex
                              key={item.id}
                              borderRadius="md"
                              gap={2}
                              direction="column"
                              border="1px solid #e2e2e2"
                              _hover={{ bg: "gray.100" }}
                              bg={
                                selectedMessage === item.id &&
                                item.status === "read"
                                  ? "gray.100"
                                  : item.status === "delivered"
                                  ? "teal.100"
                                  : "white"
                              }
                              w="24em"
                              p={2}
                              cursor="pointer"
                              onClick={() => {
                                setMessage(item);
                                setSelectedMessage(item.id);
                                setToggle(false);
                                setValue("");
                                markAsRead(item.id);
                              }}
                            >
                              <Flex
                                justify="space-between"
                                w="full"
                                align="center"
                              >
                                <Text
                                  textTransform={"capitalize"}
                                  fontSize={14}
                                  fontWeight={"bold"}
                                >
                                  {item.senderName}
                                </Text>
                                <Text fontSize={10}>
                                  {formatDistanceToNow(
                                    new Date(item.createdAt),
                                    {
                                      addSuffix: true,
                                    }
                                  )}
                                </Text>
                              </Flex>
                              <Text
                                fontSize={12}
                                mt={-1}
                                w="27em"
                                fontWeight={600}
                              >
                                {item.subject}
                              </Text>
                              <Text fontSize={12} noOfLines={1} color="#747474">
                                {item.message}
                              </Text>
                            </Flex>
                          ))}
                        </>
                      )}
                    </Flex>
                  </TabPanel>

                  <TabPanel px={0}>
                    <Flex gap={1} direction="column" mt={3} w="full">
                      {sentMessages?.length! <= 0 && (
                        <Flex
                          w="22em"
                          fontSize={12}
                          color="#747474"
                          align="center"
                          gap={1}
                        >
                          {" "}
                          <Icon as={IoWarningOutline} />
                          you have not sent any messages
                        </Flex>
                      )}
                      {sentMessages?.map((item: any) => (
                        <Flex
                          key={item.id}
                          borderRadius="md"
                          gap={2}
                          direction="column"
                          border="1px solid #e2e2e2"
                          _hover={{ bg: "gray.100" }}
                          bg={
                            selectedMessage === item.id ? "gray.100" : "white"
                          }
                          w="24em"
                          overflow="hidden"
                          p={2}
                          cursor="pointer"
                          onClick={() => {
                            setMessage(item);
                            setSelectedMessage(item.id);
                            setToggle(false);
                            setValue("");
                          }}
                        >
                          <Flex justify="space-between" w="full" align="center">
                            <Text
                              textTransform={"capitalize"}
                              fontSize={14}
                              fontWeight={"bold"}
                            >
                              {item.senderName}
                            </Text>
                            <Text fontSize={10}>
                              {formatDistanceToNow(new Date(item.createdAt), {
                                addSuffix: true,
                              })}
                            </Text>
                          </Flex>
                          <Text fontSize={12} mt={-1} w="27em" fontWeight={600}>
                            {item.subject}
                          </Text>
                          <Text fontSize={12} noOfLines={1} color="#747474">
                            {item.message}
                          </Text>
                        </Flex>
                      ))}
                    </Flex>
                  </TabPanel>

                  <TabPanel px={0}>
                    <Flex gap={1} direction="column" mt={3} w="full">
                      {draftMessages?.length! <= 0 && (
                        <Flex
                          w="22em"
                          fontSize={12}
                          color="#747474"
                          align="center"
                          gap={1}
                        >
                          {" "}
                          <Icon as={IoWarningOutline} />
                          you have not saved any messages as drafts
                        </Flex>
                      )}
                      {draftMessages?.map((item: any) => (
                        <Flex
                          key={item.id}
                          borderRadius="md"
                          gap={2}
                          direction="column"
                          border="1px solid #e2e2e2"
                          _hover={{ bg: "gray.100" }}
                          bg={
                            selectedMessage === item.id ? "gray.100" : "white"
                          }
                          w="24em"
                          overflow="hidden"
                          p={2}
                          cursor="pointer"
                          onClick={() => {
                            setMessage(item);
                            setSelectedMessage(item.id);
                            setToggle(false);
                            setValue("");
                          }}
                        >
                          <Flex justify="space-between" w="full" align="center">
                            <Text
                              textTransform={"capitalize"}
                              fontSize={14}
                              fontWeight={"bold"}
                            >
                              {item.senderName}
                            </Text>
                            <Text fontSize={10}>
                              {formatDistanceToNow(new Date(item.createdAt), {
                                addSuffix: true,
                              })}
                            </Text>
                          </Flex>
                          <Text fontSize={12} mt={-1} w="27em" fontWeight={600}>
                            {item.subject}
                          </Text>
                          <Text fontSize={12} noOfLines={1} color="#747474">
                            {item.message}
                          </Text>
                        </Flex>
                      ))}
                    </Flex>
                  </TabPanel>
                </TabPanels>
              </Flex>
            </Flex>
            <Flex direction="column" w="full" h="full">
              <Flex
                p={2}
                borderBottom="1px solid #E2E2E2"
                mb={2}
                color="#000"
                fontSize="18"
                fontWeight={600}
                h="48px"
              >
                {/* <Text>ChatBox</Text> */}
              </Flex>
              <Flex
                direction="column"
                display={message ? "block" : "none"}
                h="full"
              >
                <Flex p={3} align="start" justify="space-between">
                  <Flex align="start" gap={2}>
                    <Avatar
                      src={message?.senderProfilePicture}
                      size="sm"
                      name={message?.senderName}
                    />
                    <Stack spacing={-2}>
                      <Text
                        textTransform={"capitalize"}
                        fontSize={12}
                        fontWeight={600}
                      >
                        {message?.senderName}
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
                            icon={<IoTrashBinOutline />}
                            onClick={deleteMessage}
                            display={
                              admin?.userId !== message?.sender
                                ? "none"
                                : "flex"
                            }
                          >
                            Delete all Messages
                          </MenuItem>
                          <MenuItem icon={<IoMailUnreadOutline />}>
                            Mark as Unread
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
                </Flex>

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
                            <Text textTransform={"capitalize"} fontSize={12}>
                              {message?.senderName}
                            </Text>
                            <Text fontSize={10} color="#747474">
                              {message?.message?.slice(0, 100)}
                              {message?.message?.length! > 100 ? "..." : ""}
                            </Text>
                          </Stack>
                        </Flex>
                        <Flex fontSize={10} justify={"end"}>
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
                                  fontSize={12}
                                >
                                  {item?.senderName}
                                </Text>
                                <Text fontSize={10} color="#747474">
                                  {item?.message?.slice(0, 100)}
                                  {item?.message?.length! > 100 ? "..." : ""}
                                </Text>
                              </Stack>
                            </Flex>
                            <Flex fontSize={10} justify={"end"}>
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
                      <Box p={4} w="full" pos="relative" zIndex={4}>
                        <Flex align="start" gap={3} w="full">
                          <Avatar
                            src={admin?.profileImgUrl}
                            name={admin?.firstName}
                            size="sm"
                          />
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
                                        position: "top-right",
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
            </Flex>
          </Flex>
        </Tabs>
        <ComposeMessage isOpen={isChatBoxOpen} onClose={onChatBoxClose} />
      </Flex>
    );
};

export default ChatBox;
