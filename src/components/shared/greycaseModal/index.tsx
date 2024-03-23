'use client'
import { FC } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Text,
  Button,
  Flex,
  Avatar,
  Divider,
  Badge,
} from "@chakra-ui/react";

interface GraycaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  graycase: any;
}

const GraycaseModal: FC<GraycaseModalProps> = ({isOpen, onClose, graycase}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize={"xl"} fontWeight={"BOLD"}>
            Student Case Record
          </Text>
          <Divider />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Avatar size={"lg"} src={graycase?.profileImage}/>
            <Box>
              <Text fontSize={"lg"} fontWeight={"bold"}>
                {graycase?.firstName} {graycase?.lastName}
              </Text>
              <Text fontSize={"xs"}>
                {graycase?.age} Years Old | {graycase?.gender} |{" "}
                {graycase?.class}
              </Text>
            </Box>
          </Box>
          <Box mt={"1rem"}>
            <Text fontSize={"xs"} fontWeight="bold" color={"#00000080"}>
              category
            </Text>
            <Box display={"flex"} alignItems={"center"} gap={"3"}>
              <Text fontWeight={"bold"}>
                {graycase?.category}
              </Text>
              <Badge
                colorScheme={
                  graycase?.isActive
                    ? "green"
                    : "red"
                }
                size={"sm"}
                px={"0.6rem"}
                py={"0.3rem"}
                fontSize={"3xs"}
                rounded={"full"}
              >
                {graycase?.isActive
                  ? "Active"
                  : "Inactive"}
              </Badge>
            </Box>
          </Box>
          <Divider my="0.6rem" />
          <Box mt={"1rem"} mb={"0.3rem"}>
            <Text
              fontSize={"sm"}
              fontWeight="bold"
              mb={"0.3rem"}
              color={"#00000080"}
            >
              Notes
            </Text>
            <Box
              border={"1px solid #005D5D"}
              backgroundColor={"#005D5D30"}
              p={2}
              rounded={"md"}
            >
              <Text>
                {graycase?.notes}
              </Text>
            </Box>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Text fontSize={"xs"} color={"#00000080"}>
            {graycase?.createdAt}
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default GraycaseModal