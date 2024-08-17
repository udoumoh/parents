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
  Icon,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { REJECT_INVOICE } from "@/gql/queries";
import { IoIosCloseCircle } from "react-icons/io";

interface RejectInvoiceModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  invoiceData:
    | {
        term: string;
        year: string;
        category: string;
        amountPaid: number;
        id: number;
        status: string;
        summary: string;
        createdAt: string;
        invoiceId: string;
        schoolname: string;
        schoollogo: string;
        balance: number;
        receipt: {
          amountPaid: number;
          createdAt: string;
          creator: string;
          fileType: string;
          id: number;
          parentInvoiceId: string;
          status: string;
          summary: string;
          updatedAt: string;
          uploadedDocument: string;
        }[];
      }
    | undefined;
}

const RejectInvoiceModal: FC<RejectInvoiceModalProps> = ({
  isOpen,
  onOpen,
  onClose,
  invoiceData,
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
        variables: { response: summary, invoiceid: Number(invoiceData?.id) },
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
        setTimeout(() => {
          window.location.reload()
          onClose();
        }, 600)
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
      isCentered
    >
      <ModalOverlay />
      <ModalContent rounded={"xl"}>
        <ModalHeader>
          <Flex alignItems={"center"} gap={3}>
            <Icon as={IoIosCloseCircle} boxSize={6} color={"#005D5D"} />
            <Text fontSize={"md"} fontWeight={'semibold'}>
              Reject Invoice
            </Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody px={{ base: "1rem", md: "1.5rem" }}>
          <Box py={"1rem"}>
            <Alert status="error" rounded={"md"}>
              <AlertIcon />
              You are about to reject this invoice. Can you tell the school
              admin why you are rejecting the invoice?
            </Alert>
            <Box mt={"1rem"}>
              <Box>
                <Text
                  fontSize={"MD"}
                  mb={"0.5rem"}
                  fontWeight={"bold"}
                  color={"#005D5D"}
                >
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
                mt={"2rem"}
                w={"full"}
                py={"1.5rem"}
                backgroundColor={"#007C7B"}
                px={"3rem"}
                _hover={{ backgroundColor: "#003C43" }}
                onClick={handleSubmit}
                isLoading={loading}
                isDisabled={!summary ? true : false}
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
