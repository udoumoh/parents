import { FC, useState } from "react";
import {
  Box,
  Modal,
  ModalContent,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  Flex,
  Text,
  Divider,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { REJECT_INVOICE } from "@/gql/queries";

interface RejectInvoiceModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  invoiceId: any;
}

const RejectInvoiceModal: FC<RejectInvoiceModalProps> = ({
  isOpen,
  onOpen,
  onClose,
  invoiceId,
}) => {
  const toast = useToast();
  const [rejectinvoice, { loading }] = useMutation(REJECT_INVOICE);
  const [summary, setSummary] = useState("");
  const handleSummaryChange = (e: any) => {
    setSummary(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await rejectinvoice({
        variables: { response: summary, invoiceid: Number(invoiceId) },
      });
      if (!response) {
        toast({
          title: "Error",
          description: "A client side error has occurred",
          position: "top-right",
          variant: "left-accent",
          isClosable: true,
          status: "error",
        });
      }
      if (!response?.data?.rejectInvoice) {
        toast({
          title: "Error",
          description: "Reject Invoice Failed",
          position: "top-right",
          variant: "left-accent",
          isClosable: true,
          status: "error",
        });
      }
      if (response?.data?.rejectInvoice) {
        toast({
          title: "Success",
          description: "Succssfully rejected invoice",
          position: "top-right",
          variant: "left-accent",
          isClosable: true,
          status: "success",
        });
        onClose();
      }
    } catch (e: any) {
      console.log(e.message);
    }
  };
  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "xs", sm: "lg", md: "2xl" }}
      scrollBehavior={"inside"}
    >
      <ModalOverlay />
      <ModalContent rounded={"xl"}>
        <ModalHeader>
          <Flex>
            <Box alignItems={"center"} gap={2}>
              <Text fontWeight={"600"} fontSize={"xl"}>
                {"Reject Invoice"}
              </Text>
              <Text fontWeight={"500"} fontSize={"sm"} color={"#8F8F8F"}>
                {"Reject this invoice"}
              </Text>
            </Box>
          </Flex>

          <Divider color={"#C2C2C2"} />
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody pb={6} px={"2rem"}>
          <Box>
            <Text fontSize={"lg"} fontWeight={"400"}>
              You have selected to reject the invoice. Can you tell the school
              admin why you rejected the invoice?
            </Text>
            <Box mt={"2rem"}>
              <Box>
                <Text fontSize={"lg"} mb={"0.5rem"} color={"#005D5D"}>
                  Reason
                </Text>
                <Textarea
                  onChange={handleSummaryChange}
                  h={"100px"}
                  border={"1px solid #005D5D"}
                  rounded={"lg"}
                  backgroundColor={"#FFF"}
                />
              </Box>

              <Button
                my={"2rem"}
                w={"full"}
                py={"1.5rem"}
                backgroundColor={"#007C7B"}
                px={"3rem"}
                _hover={{ backgroundColor: "#099C9B" }}
                onClick={handleSubmit}
                isLoading={loading}
              >
                <Text color={"#fff"} fontWeight={"400"} fontSize={"lg"}>
                  Reject Invoice
                </Text>
              </Button>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RejectInvoiceModal;
