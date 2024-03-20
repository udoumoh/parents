"use client";
import { FC, useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  useDisclosure,
  Button,
  Icon,
  Divider,
  Modal,
  ModalContent,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Avatar,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { FaLink } from "react-icons/fa6";
import { useMutation } from "@apollo/client";
import { REQUEST_CHILD } from "@/gql/queries";

interface LinkRequestModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  student: {
    profileImageUrl?: string;
    name?: string;
    age?: number;
    gender?: string;
    className?: string;
    id?: string;
  }
}

const LinkRequestModal: FC<LinkRequestModalProps> = ({
  isOpen,
  onOpen,
  onClose,
  student,
}) => {
    const toast = useToast()
    const purpose = "Link to parent"
    const [message, setMessage] = useState("")
    const [request, {loading}] = useMutation(REQUEST_CHILD);

    const handleMessageChange = (e: any) => {
        setMessage(e.target.value)
    }
    const handleSubmit = async () => {
      try{
        const response = await request({
          variables: {
            message: message,
            purpose: purpose,
            studentId: student.id,
          },
        });
        if (!response) {
          toast({
            title: "Client Error",
            description: "An error occured while creating a request",
            position: "bottom",
            variant: "left-accent",
            isClosable: true,
            status: "error",
          });
        }
        if (response?.data?.createRequest?.errors) {
          toast({
            title: "Server Error",
            description: response?.data?.createRequest?.errors[0]?.message,
            position: "bottom",
            variant: "left-accent",
            isClosable: true,
            status: "error",
          });
        }
        if(!response?.data?.createRequest?.errors){
            toast({
              title: "Request Sent",
              description:
                "Your request has been sent, you are being redirected to your dashboard.",
              position: "bottom",
              variant: "left-accent",
              isClosable: true,
              status: "success",
            });
            onClose()
        }
      } catch(error: any) {
        toast({
          title: "Server Error",
          description: error.message,
          position: "bottom",
          variant: "left-accent",
          isClosable: true,
          status: "error",
        });        
      }
    }
  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "xs", sm: "lg", md: "xl" }}
      scrollBehavior={"inside"}
    >
      <ModalOverlay />
      <ModalContent rounded={"xl"}>
        <ModalHeader>
          <Flex alignItems={"center"} gap={4}>
            <Icon as={FaLink} color={"#005D5D"} boxSize={6} />
            <Text fontWeight={"600"} fontSize={"lg"}>
              Send Link Request
            </Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody pb={6} px={"3rem"}>
          <Box
            display={"flex"}
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            my={"0.5rem"}
          >
            <Avatar size={"xl"} src={student?.profileImageUrl} mb={"1rem"} />
            <Text fontSize={"2xl"} fontWeight={"700"}>
              {student?.name}
            </Text>
            <Text fontSize={"sm"} color={"#AAAAAA"} fontWeight={"600"}>
              {`${student?.age} years old`} • {student?.gender} •{" "}
              {student?.className}
            </Text>
          </Box>

          <Box>
            <FormControl>
              <FormLabel color={"#484848"} fontSize={"md"} fontWeight={"600"}>
                Purpose
              </FormLabel>
              <Input
                type="text"
                variant={"filled"}
                defaultValue={purpose}
                py={"1.7rem"}
                rounded={"xl"}
                border={"1px solid #D5D5D5"}
                backgroundColor={"#F5F5F5"}
                isReadOnly={true}
              />
            </FormControl>

            <FormControl mt={"2rem"}>
              <FormLabel color={"#484848"} fontSize={"md"} fontWeight={"600"}>
                Message
              </FormLabel>
              <Textarea
                onChange={handleMessageChange}
                h={"150px"}
                border={"1px solid #D5D5D5"}
                rounded={"xl"}
                backgroundColor={"#F5F5F5"}
              />
            </FormControl>
          </Box>
        </ModalBody>

        <ModalFooter justifyContent={"center"} pb={"2rem"} px={"3rem"}>
          <Button
            w={"full"}
            py={"1.5rem"}
            backgroundColor={"#005D5D"}
            px={"3rem"}
            _hover={{ backgroundColor: "#044141" }}
            onClick={handleSubmit}
            isLoading={loading}
          >
            <Text color={"#fff"} fontWeight={"300"} fontSize={"md"}>
              Send Request
            </Text>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default LinkRequestModal;
