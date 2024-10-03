import { useState, useEffect, FC } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  Collapse,
  useToast,
} from "@chakra-ui/react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { UserChildren, useUserAPI } from "@/hooks/UserContext";
import { useRouter } from "next/navigation";
import { REDEEM_COLLECTIBLE } from "@/gql/mutations";
import { useMutation } from "@apollo/client";

interface SelectPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SelectPlanModal: FC<SelectPlanModalProps> = ({ isOpen, onClose }) => {
  const toast = useToast();
  const { parentData, childData } = useUserAPI();
  const [redeem] = useMutation(REDEEM_COLLECTIBLE)
  const [code, setCode] = useState("");
  const [selectedChild, setSelectedChild] = useState<
    UserChildren | undefined
  >();
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChildClick = (child: UserChildren) => {
    setSelectedChild(child);
    setSelectedChildId(prevId => prevId === child.id ? null : child.id);
  };

  const handleApply = async () => {
    setLoading(true);
    try {
    const response = await redeem({ variables: {
      studentId: selectedChild?.id,
      voucherCode: code,
    }})
  if (response.data?.redeemCollectible) {
      toast({
          title: "Voucher Applied",
          description: `Subscription applied to ${selectedChild?.firstName} ${selectedChild?.middleName} ${selectedChild?.lastName}`,
          status: "success",
          variant: "left-accent",
          duration: 5000,
          isClosable: true,
          position: "top-right"
        });
        setLoading(false);
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }
    } catch (error: any) {
      toast({
          title: "Voucher Error.",
          description: `${error.message || "An error occured while trying to redeem your voucher"}`,
          status: "error",
          variant: "left-accent",
          duration: 5000,
          isClosable: true,
          position: "top-right"
        });
        setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      size={{ base: "lg", sm: "lg", md: "xl" }}
    >
      <ModalOverlay />
      <ModalContent
        as={Flex}
        borderRadius={"10px"}
        p={1}
        align="center"
        w="full"
        bg="#FFF"
      >
        <ModalCloseButton />
        <Flex
          borderRadius="9px"
          w="full"
          h="100px"
          overflow="hidden"
          border="1px solid #E2E2E2"
          bg="#005D5D"
          direction="column"
          p={2}
        >
          <Flex direction="column" w="full" mt={4} px={2} color={"#FFFFFF"}>
            <Text fontWeight={"semibold"} fontSize={"lg"}>
              Select the child that you are applying the subscription to
            </Text>
            <Text fontSize={"xs"} mb={2}>
              Contact the school admin to get the best package for your child
            </Text>
          </Flex>
        </Flex>
        <Flex direction="column" w="full" mt={4} px={2} pb={3}>
          <Flex flexDir={"column"} gap={4}>
            {(childData ?? []).length === 0 ? (
              <Box
                display={"flex"}
                flexDir={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                px={"1.3rem"}
                rounded={"md"}
                py={"1rem"}
                w={"100%"}
              >
                <Image
                  src="/images/nochild.svg"
                  maxH={{ base: "100px", md: "200px" }}
                  maxW={{ base: "150px", md: "300px" }}
                  alt="bg"
                />
                <Text mt={"1rem"} fontSize={{ base: "sm", md: "lg" }}>
                  No child has been linked to your account
                </Text>
              </Box>
            ) : (
              (childData ?? []).map((item, index) => {
                return (
                  <Flex direction={"column"} gap={2} key={item.id}>
                    <Flex
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      gap={2}
                      py={"0.9rem"}
                      px={"1rem"}
                      backgroundColor={"#fafafa"}
                      rounded={"md"}
                      _hover={{
                        backgroundColor: "#005D5D30",
                        transitionDuration: "0.5s",
                        cursor: "pointer",
                      }}
                      w={"full"}
                      border={"1px solid #e2e2e2"}
                      onClick={() => handleChildClick(item)}
                    >
                      <Box display={"flex"} gap={"2"} alignItems={"center"}>
                        <Avatar
                          size={"md"}
                          src={item.profileImage}
                          pointerEvents={"none"}
                          name={`${item?.firstName} ${item?.middleName || ""} ${
                            item?.lastName
                          }`}
                        />
                        <Box>
                          <Flex gap={2} w="full">
                          <Text
                            fontWeight={"700"}
                            fontSize={"lg"}
                            pointerEvents={"none"}
                          >
                            {item?.firstName} {item?.middleName || ""}{" "}
                            {item?.lastName}
                          </Text>
                          <Badge
                            colorScheme={item.isPaid ? "green" : "red"}
                            fontSize="0.7rem"
                            px={2}
                            py={1}
                            rounded="md"
                          >
                            {item.isPaid ? "Paid" : "Trial"}
                          </Badge>

                          </Flex>
                          <Text
                            fontSize={"sm"}
                            color={"#AAAAAA"}
                            fontWeight={"600"}
                            pointerEvents={"none"}
                          >
                            {item?.greynoteNumber} • {item.school} •{" "}
                            {item.class || "Not Enrolled"}
                          </Text>
                        </Box>
                      </Box>
                    </Flex>
                    <Collapse in={selectedChildId === item.id} animateOpacity>
                      <Box
                        p="10px"
                        minH="100px"
                        mt="2"
                        mb={5}
                        bg="white"
                        border="1px solid #e2e2e2"
                        rounded="md"
                      >
                        <Text>Enter the code you received from the school</Text>
                        {item.isPaid && (
                          <Text p={3} bg="teal.100" color="teal.900" borderColor="teal.900" border="1px dashed" borderWidth={1} rounded="md" mt={2}>You have an active subscription</Text>
                        )}
                        <Flex gap={3}>
                        <Input
                          placeholder="Enter code here..."
                          border="1px solid #e2e2e2"
                          rounded="md"
                          focusBorderColor="#005D5D"
                          mt={2}
                          py={7}
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          isDisabled={item.isPaid}
                        />
                        <Button
                          colorScheme="teal"
                          color="#FFF"
                          rounded="md"
                          mt={2}
                          py={7}
                          px={5}
                          onClick={handleApply}
                          isLoading={loading}
                          isDisabled={item.isPaid}

                        >
                          Apply
                        </Button>
                        </Flex>
                      </Box>
                    </Collapse>
                  </Flex>
                );
              })
            )}
          </Flex>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default SelectPlanModal;
