import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Icon,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Flex,
  Text,
  useToast,
  Textarea,
  Avatar,
  Input,
  useDisclosure,
  Divider,
  Box,
  IconButton,
  InputGroup,
  InputLeftElement,
  ModalBody,
} from "@chakra-ui/react";
import { Formik, Form, Field, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  IoClose,
  IoDocumentOutline,
  IoMailOutline,
  IoWarningOutline,
} from "react-icons/io5";
import { TbInfoTriangle, TbSend } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { GET_PARENT } from "@/app/dashboard/inbox/component/ChatBox";
import { GET_SCHOOLS } from "@/gql/queries";

interface ComposeInstantMessageProps {
  isOpen: any;
  onClose: any;
  recipientDetails: RecipientDetails;
}

interface ParentType {
  name: string;
  profileImageUrl: string;
  email: string;
  role: string;
  id: string;
}

interface DraftValues {
  receiver: string[];
  subject: string;
  body: string;
}

interface RecipientDetails {
  name?: string;
  profileImageUrl?: string;
  school?: string;
  schoolImg?: string;
  email?: string;
  role?: string;
  id?: string;
}

const SEND_MESSAGE = gql(`
mutation SendMessage($receiver: [String!]!, $message: String!, $subject: String!) {
    sendMessage(receiver: $receiver, message: $message, subject: $subject) {
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

const DRAFT_MESSAGE = gql(`
mutation DraftMessage($receiver: [String!]!, $message: String!, $subject: String!) {
    draftMessage(receiver: $receiver, message: $message, subject: $subject) {
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
  }`);

export const ComposeInstantMessage: React.FC<ComposeInstantMessageProps> = ({
  isOpen,
  onClose,
  recipientDetails,
}) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const router = useRouter();
  const toast = useToast();
  const [send] = useMutation(SEND_MESSAGE);
  const [draft] = useMutation(DRAFT_MESSAGE);
  const { data } = useQuery(GET_PARENT);
  const teach = data?.parent?.parent!;
  const teachName = `${teach?.firstName} ${teach?.middleName || ""} ${
    teach?.lastName
  }`;
  const {
    isOpen: isSearchOpen,
    onOpen: onSearchOpen,
    onClose: onSearchClose,
  } = useDisclosure();

  const emptyParents = {
    name: "",
    profileImageUrl: "",
    email: "",
    role: "",
    school: "",
    schoolImg: "",
    id: "",
  };
  const [parentData, setParentData] = useState([
    {
      name: "",
      role: "",
      email: "",
      profileImageUrl: "",
      school: "",
      schoolImg: "",
      id: "",
    },
  ]);

  const [receivers, setReceivers] = useState<ParentType[]>([]);

  const { data: search } = useQuery(GET_ADMINS);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const admins = (await search?.getAdmins) || [];
        const data = admins.map((parent: any) => ({
          name: `${parent?.firstName} ${parent?.middleName || ""} ${
            parent?.lastName
          }`,
          role: parent?.role,
          school: parent?.school,
          schoolImg: parent?.schoolImg,
          email: parent?.email,
          profileImageUrl: parent?.profileImgUrl,
          id: parent?.userId,
        }));
        setParentData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [search]);

  const [receiverId, setReceiverId] = useState<string[]>([]);
  const [sendMessage, setSendMessage] = useState<Boolean>(false);
  const [saveAsDraft, setSaveAsDraft] = useState<Boolean>(false);

  const handleAddParent = (value: {
    name: string;
    profileImageUrl: string;
    school: string;
    schoolImg: string;
    email: string;
    role: string;
    id: string;
  }) => {
    const newData = [...receivers, value];
    setReceivers(newData);
  };
  useEffect(() => {
    const id = receivers.map((item) => item.id);
    setReceiverId(id);
  }, [receivers]);

  const removeRecipient = (index: string) => {
    const newData = receivers.filter((item) => item.id !== index);
    setReceivers(newData);
  };

  const resetState = () => {
    setReceivers([]);
    setReceiverId([]);
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex align="center" gap={2}>
            <Icon
              as={IoMailOutline}
              w="6"
              h="6"
              color="#016B6A"
              p={1}
              border="1px solid #016B6A"
              borderRadius={"full"}
            />
            <Flex direction="column">
              <Text fontSize={13} fontWeight={500} color="#212121">
                Compose Message
              </Text>
              <Text fontSize={10} fontWeight={400} color="#747474">
                Sending as{" "}
                <Text display="inline" textTransform={"capitalize"}>
                  {teachName}
                </Text>
              </Text>
            </Flex>
          </Flex>
        </ModalHeader>
        <ModalCloseButton onClick={resetState} />
        <Divider mb={3} />
        <ModalBody pb={6}>
          <Formik
            initialValues={{
              receiver: receiverId,
              subject: "",
              message: "",
            }}
            onSubmit={async (values, actions) => {
              if (sendMessage) {
                const response = await send({
                  variables: {
                    receiver: receiverId,
                    message: values.message,
                    subject: values.subject,
                  },
                });
                if (response.data?.sendMessage.errors) {
                  toast({
                    title: "Inbox Error",
                    description: `${response.data.sendMessage.errors[0].message}`,
                    status: "error",
                    variant: "left-accent",
                    duration: 5000,
                    isClosable: true,
                  });
                  // setTimeout(() => {
                  //   router.reload();
                  // }, 1000);
                } else if (
                  response.data?.sendMessage?.messages !== null ||
                  undefined
                ) {
                  toast({
                    title: "Message Sent ✈️",
                    description: "You just sent a message successfully",
                    status: "success",
                    variant: "left-accent",
                    duration: 5000,
                    isClosable: true,
                  });
                  setTimeout(() => {
                    onClose();
                  }, 500);
                }
              }
              if (saveAsDraft) {
                try {
                  const response = await draft({
                    variables: {
                      message: values.message,
                      subject: values.subject,
                      receiver: receiverId,
                    },
                  });
                  if (
                    response.data?.draftMessage.messages !== undefined ||
                    null
                  ) {
                    toast({
                      title: "Draft saved successfully",
                      position: "top-right",
                      status: "success",
                      variant: "left-accent",
                      duration: 5000,
                      isClosable: true,
                    });
                    setTimeout(() => {
                      onClose();
                    }, 300);
                  } else {
                    toast({
                      title:
                        "We're unable to save the draft, please try again later",
                      position: "top-right",
                      status: "error",
                      variant: "left-accent",
                      duration: 5000,
                      isClosable: true,
                    });
                  }
                } catch (error) {
                  if (error) {
                    toast({
                      title: "Inbox Error",
                      position: "top-right",
                      description: "We were unable to save your message",
                      status: "error",
                      variant: "left-accent",
                      duration: 5000,
                      isClosable: true,
                    });
                    actions.resetForm();
                  }
                  console.error("Upload error:", error);
                }
              }
            }}
          >
            {(props) => (
              <Form>
                <Flex direction="column">
                  <FormLabel>Recipient</FormLabel>
                  <Flex
                    align="center"
                    w="full"
                    _hover={{
                      backgroundColor: "gray.100",
                    }}
                    cursor={'pointer'}
                    bg={'gray.100' }
                    rounded={"md"}
                    py={"0.5rem"}
                    px={"1rem"}
                    mb={"0.4rem"}
                  >
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      gap={2}
                      w={"full"}
                    >
                      <Flex align="center" gap={2}>
                        <Avatar
                          size={"sm"}
                          src={recipientDetails.schoolImg}
                          pointerEvents={"none"}
                        />
                        <Box lineHeight={"15px"}>
                          <Text fontWeight={"700"} fontSize={"12"}>
                            {`${recipientDetails.school}`}
                          </Text>
                          <Text
                            fontSize={"9"}
                            color={"#AAAAAA"}
                            fontWeight={"500"}
                          >
                            {recipientDetails.name} • {recipientDetails.role}
                          </Text>
                        </Box>
                      </Flex>
                    </Box>
                  </Flex>
                </Flex>

                <Field name="subject">
                  {({ field, form }: any) => (
                    <FormControl mt={5}>
                      <FormLabel>Subject</FormLabel>
                      <Input
                        {...field}
                        borderColor={"#e2e2e2"}
                        _placeholder={{ color: "#D4D4D4" }}
                        placeholder="What is the message about?"
                        focusBorderColor="#007C7B"
                      />
                    </FormControl>
                  )}
                </Field>

                <Field name="message">
                  {({ field, form }: any) => (
                    <FormControl mt={5}>
                      <FormLabel>Message</FormLabel>
                      <Textarea
                        {...field}
                        borderColor={"#e2e2e2"}
                        _placeholder={{ color: "#D4D4D4" }}
                        placeholder="Enter your message here..."
                        focusBorderColor="#007C7B"
                      />
                    </FormControl>
                  )}
                </Field>

                <Flex direction="row" justify="end" mt={10}>
                  <Button
                    colorScheme="blackAlpha"
                    variant="outline"
                    type="submit"
                    onClick={() => setSaveAsDraft(true)} // Set saveAsDraft to true when clicked
                    isLoading={props.isSubmitting}
                  >
                    Save as draft
                  </Button>
                  <Button
                    bg="#007C7B"
                    color="white"
                    _hover={{ bg: "#099C9B" }}
                    ml={3}
                    px={7}
                    type="submit"
                    leftIcon={<TbSend />}
                    isLoading={props.isSubmitting}
                    onClick={() => setSendMessage(true)} // Set sendMessage to true when clicked
                    isDisabled={receiverId.length <= 0 ? true : false}
                  >
                    Send Message
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
