import { FC } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Box,
  Text,
  Avatar,
  useDisclosure,
} from "@chakra-ui/react";
import { GoAlert } from "react-icons/go";
import { useUserAPI } from "@/hooks/UserContext";

interface ExpiredSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExpiredSubscriptionModal: FC<ExpiredSubscriptionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { currentStudentData } = useUserAPI();

  const handleRenewSubscription = () => {
    window.location.assign("/dashboard/settings");
  };

  const studentName = `${currentStudentData?.firstName} ${
    currentStudentData?.middleName || ""
  } ${currentStudentData?.lastName}`.trim();
  const studentGrayId = currentStudentData?.grayId;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      size={{ base: "xs", sm: "sm", md: "lg" }}
    >
      <ModalOverlay />
      <ModalContent rounded="xl">
        <ModalHeader
          display="flex"
          alignItems="center"
          gap={2}
          fontWeight="semibold"
          fontSize={{ base: "sm", md: "lg" }}
          color="red.600"
        >
          <GoAlert />
          <Text>Subscription Renewal Required</Text>
        </ModalHeader>

        <ModalBody pt={4}>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            py={2}
            px={4}
            rounded="lg"
            bgColor="gray.50"
            border="1px solid"
            borderColor="gray.300"
            _hover={{ cursor: "pointer", transitionDuration: "0.5s" }}
          >
            <Flex gap={2} alignItems="center">
              <Avatar
                size={{ base: "sm", md: "md" }}
                src={currentStudentData?.profileImgUrl}
                name={studentName}
                pointerEvents="none"
              />
              <Box>
                <Text
                  fontWeight="bold"
                  fontSize={{ base: "xs", md: "lg" }}
                  pointerEvents="none"
                >
                  {studentName}
                </Text>
                <Text
                  fontSize={{ base: "2xs", md: "sm" }}
                  color="gray.500"
                  fontWeight="semibold"
                  pointerEvents="none"
                >
                  {studentGrayId}
                </Text>
              </Box>
            </Flex>
          </Flex>

          <Text pt={4} color="gray.700" fontWeight="semibold">
            The subscription for this child has expired. Click the button below
            to renew the subscription.
          </Text>
        </ModalBody>

        <ModalFooter pt={8}>
          <Button colorScheme="blue" onClick={handleRenewSubscription}>
            Renew Subscription
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ExpiredSubscriptionModal;
