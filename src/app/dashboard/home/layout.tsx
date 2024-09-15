"use client";
import { FC, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
  useDisclosure,
  Avatar,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useUserAPI } from "@/hooks/UserContext";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
import SidebarWithHeader from "@/components/navigation/secondaryNav";
import Router from "next/router";
import TopBarProgress from "react-topbar-progress-indicator";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [progress, setProgress] = useState(false);

  Router.events.on("routeChangeStart", () => {
    setProgress(true);
  });
  Router.events.on("routeChangeComplete", () => {
    setProgress(false);
  });
  TopBarProgress.config({
    barColors: {
      "0": "#099C9B",
      "1.0": "#007C7B",
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { parentData, childData, setLocalstorageId, currentId } = useUserAPI();
  const router = useRouter();

  useEffect(() => {
    const currentId = localStorage.getItem("currentId");
    if (currentId === null) {
      onOpen();
    }
  }, [onOpen]);

  // if (parentData?.children.length === 0) {
  //   window.location.replace("/dashboard");
  // }

  const Overlay = () => <ModalOverlay bg="none" backdropFilter="blur(10px)" />;
  return (
    <Box>
      {/* ... Modal content ... */}
      {/* <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        size={{ base: "xs", sm: "sm", md: "md" }}
      >
        <Overlay />
        <ModalContent>
          <ModalHeader>
            Hello{", "}
            {`${capitalizeFirstLetter(
              parentData?.firstName || ""
            )} ${capitalizeFirstLetter(
              parentData?.middleName || ""
            )} ${capitalizeFirstLetter(parentData?.lastName || "")}`}
            🙃
          </ModalHeader>
          <ModalBody>
            <Text mb={"2rem"}>
              Kindly select a childs profile to view his/her data
            </Text>

            {childData?.map((ward: any, index: number) => {
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
                      {`${ward.firstName} ${ward.middleName || ""} ${ward.lastName}`}
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
        </ModalContent>
      </Modal> */}
      {children}
    </Box>
  );
};

export default Layout;
