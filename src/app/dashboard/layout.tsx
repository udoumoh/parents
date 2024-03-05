"use client";
import React, { ReactNode } from "react";
import MainNav from "@/components/navigation/mainNav";
import { useQuery } from "@apollo/client";
import { GET_PARENT } from "@/gql/queries/queries";
import {
  Center,
  Box,
  Flex,
  Image,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { BarLoader } from "react-spinners";

interface layoutProps {
  children: ReactNode;
}

const Layout: React.FC<layoutProps> = ({ children }) => {
  const toast = useToast();
  const { data: parent, loading } = useQuery(GET_PARENT);
  const { isOpen, onOpen, onClose } = useDisclosure();
  try {
    if (loading)
      return (
        <Center>
          <Box minW="full" mt={{ base: 60, md: 60, lg: 40 }}>
            <Flex
              direction="column"
              align="center"
              minW={{ base: "full", lg: "650px" }}
            >
              <Image
                src="/images/greylightBordered.svg"
                alt="logo"
                w={40}
                mb={3}
                pointerEvents={"none"}
              />
              <BarLoader color="#ffd880" width="150px" />
            </Flex>
          </Box>
        </Center>
      );
    if (!loading && parent?.parent?.errors !== null) window.location.replace("/signin");
  } catch (e: any) {
    toast({
      title: "Error",
      description: e.message,
      position: "top-right",
      variant: "left-accent",
      isClosable: true,
      status: "error",
    });
  }

  const Overlay = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  return (
    <MainNav>
      {!localStorage.getItem("currentId") && (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <Overlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Custom backdrop filters!</Text>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      {children}
    </MainNav>
  );
};

export default Layout;
