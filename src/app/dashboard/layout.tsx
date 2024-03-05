import React, { useEffect } from "react";
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

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const toast = useToast();
  const { data: parent, loading } = useQuery(GET_PARENT);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const currentId = localStorage.getItem("currentId");

    if (currentId === null) {
      onOpen(); // Open the modal
    }
  }, [onOpen]);

  if (loading) {
    return <Center>{/* ... Loading spinner code ... */}</Center>;
  }

  try {
    if (!loading && parent?.parent?.errors !== null) {
      window.location.replace("/signin");
    }
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
      {/* ... Your modal content ... */}
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
      {children}
    </MainNav>
  );
};

export default Layout;
