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
import { UserChildren } from '@/hooks/UserContext';

interface childData extends UserChildren {

}

interface GraycaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  childData: childData | undefined;
  index: number;
}

const GraycaseModal: FC<GraycaseModalProps> = ({isOpen, onClose, childData, index}) => {
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
            <Avatar size={"lg"} />
            <Box>
              <Text fontSize={"lg"} fontWeight={"bold"}>
                {childData?.firstName} {childData?.lastName}
              </Text>
              <Text fontSize={"xs"}>
                {childData?.age} Years Old | {childData?.gender} |{" "}
                {childData?.class}
              </Text>
            </Box>
          </Box>
          <Box mt={"1rem"}>
            <Text fontSize={"xs"} fontWeight="bold" color={"#00000080"}>
              category
            </Text>
            <Box display={"flex"} alignItems={"center"} gap={"3"}>
              <Text fontWeight={"bold"}>
                {(childData?.graycase && childData?.graycase[index])?.category}
              </Text>
              <Badge
                colorScheme={
                  (childData?.graycase && childData?.graycase[index])?.isActive
                    ? "green"
                    : "red"
                }
                size={"sm"}
                px={"0.6rem"}
                py={"0.3rem"}
                fontSize={"3xs"}
                rounded={"full"}
              >
                {(childData?.graycase && childData?.graycase[index])?.isActive
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
                {(childData?.graycase && childData?.graycase[index])?.notes}
              </Text>
            </Box>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Text fontSize={"xs"} color={"#00000080"}>
            {(childData?.graycase && childData?.graycase[index])?.createdAt}
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default GraycaseModal