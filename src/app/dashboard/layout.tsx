'use client'
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
  Avatar,
} from "@chakra-ui/react";
import { BarLoader } from "react-spinners";
import { useUserAPI } from "@/hooks/UserContext";
import { useRouter } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const toast = useToast();
  const { data: parent, loading } = useQuery(GET_PARENT);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {parentData, childData, setLocalstorageId, currentId} = useUserAPI()
  const router = useRouter()

  useEffect(() => {
    const currentId = localStorage.getItem("currentId");

    if (currentId === null) {
      onOpen(); // Open the modal
    }
  }, [onOpen]);

  if (loading) {
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
       bg="none"
       backdropFilter="blur(10px)"
     />
   );

  return (
    <MainNav>
      {/* ... Your modal content ... */}
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <Overlay />
        <ModalContent>
          <ModalHeader>
            Hello {`${parentData?.firstName} ${parentData?.lastName}`}🙃
          </ModalHeader>
          <ModalBody>
            <Text mb={"2rem"}>
              Kindly select a childs profile to view his/her data
            </Text>

            {childData?.map((ward: any, index: number) => {
              console.log(ward.id);
              return (
                <Flex
                  alignItems={"center"}
                  gap={2}
                  bgColor={currentId === ward.id ? "#3F999830" : ""}
                  rounded={"md"}
                  py={"0.5rem"}
                  px={"1rem"}
                  mb={"0.4rem"}
                  border={"1px solid #1F8E74"}
                  _hover={{
                    backgroundColor: "#3F999830",
                    cursor: "pointer",
                  }}
                  key={index}
                  onClick={() => {
                    setLocalstorageId(ward?.id || 0);
                    router.refresh();
                    onClose();
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
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      {children}
    </MainNav>
  );
};

export default Layout;
