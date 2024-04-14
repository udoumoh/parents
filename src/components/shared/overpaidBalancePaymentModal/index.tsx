import { FC, useState } from 'react'
import {
  Box,
  Modal,
  ModalContent,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Flex,
  Text,
  Icon,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Select,
  useDisclosure,
  InputGroup,
  InputLeftAddon,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useMutation } from "@apollo/client";
import { ACCEPT_INVOICE } from "@/gql/queries";
import formatNumberWithCommas from '@/helpers/formatNumberWithCommas';

interface OverpaidBalancePaymentModalProps {
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
  balance: number | undefined;
}

const OverpaidBalancePaymentModal: FC<OverpaidBalancePaymentModalProps> = ({
  isOpen,
  onOpen,
  onClose,
  invoiceData,
  balance,
}) => {
        const summary = "Parent paid using overpaid amount balance"
        const [acceptinvoice, { loading }] = useMutation(ACCEPT_INVOICE);
        const toast = useToast();

        const handleSubmit = async () => {
          try {
            const response = await acceptinvoice({
              variables: {
                amountPaid: balance || 0,
                invoiceid: invoiceData?.id,
                summary: summary,
                document: "PNG",
                fileType: 'PNG',
              },
            });
            if (!response) {
              toast({
                title: "Client Error",
                description: "An error occured while sending your request",
                position: "top-right",
                variant: "left-accent",
                isClosable: true,
                status: "error",
              });
            }
            if (response?.data?.acceptInvoice?.errors !== null) {
              toast({
                title: "Error",
                description: response?.data?.acceptInvoice?.errors[0]?.message,
                position: "top-right",
                variant: "left-accent",
                isClosable: true,
                status: "error",
              });
            }
            if (response?.data?.acceptInvoice?.errors === null) {
              toast({
                title: "Success",
                description: "Receipt has been sent successfully",
                position: "top-right",
                variant: "left-accent",
                isClosable: true,
                status: "success",
              });
              onClose();
            }
          } catch (err: any) {
            toast({
              title: "Error",
              description: err.message,
              position: "top-right",
              variant: "left-accent",
              isClosable: true,
              status: "error",
            });
          }
        };

  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior={"inside"}
      size={{ base: "xs", sm: "lg", md: "2xl" }}
    >
      <ModalOverlay />
      <ModalContent rounded={"xl"}>
        <ModalHeader>
          <Flex>
            <Box alignItems={"center"} gap={2}>
              <Text fontWeight={"600"} fontSize={"xl"} color={"#005D5D"}>
                {"Pay Invoice With Balance"}
              </Text>
            </Box>
          </Flex>

          <Divider color={"#C2C2C2"} my={"0.8rem"} />
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody pb={6} px={"2rem"}>
          <Box>
            <Text fontSize={{ base: "sm", md: "lg" }} fontWeight={"400"}>
              You are about to pay this invoice with your overpaid balance
            </Text>
          </Box>
          <Box>
            <Formik
              initialValues={{}}
              onSubmit={async (values) => {
                handleSubmit();
              }}
            >
              {(props) => (
                <Form>
                  <Flex direction="column">
                    <Flex mb={"1rem"}>
                      <Field name="amountPaid">
                        {({ field, form }: any) => (
                          <FormControl>
                            <Box w={"full"}>
                              <Text mb={"0.5rem"} color={"#005D5D"}>
                                Invoice Amount
                              </Text>
                              <InputGroup backgroundColor={"#FFF"} size={"md"}>
                                <InputLeftAddon>₦</InputLeftAddon>
                                <Input
                                  defaultValue={formatNumberWithCommas(
                                    balance || 0
                                  )}
                                  variant={"filled"}
                                  isReadOnly={true}
                                  focusBorderColor="green.600"
                                />
                              </InputGroup>
                            </Box>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                  </Flex>

                  <FormControl>
                    <FormLabel
                      fontWeight={"normal"}
                      color={"#005D5D"}
                      fontSize={"md"}
                    >
                      Summary
                    </FormLabel>
                    <Textarea
                      defaultValue={summary}
                      h={"100px"}
                      rounded={"xl"}
                      isReadOnly={true}
                      variant={"filled"}
                    />
                  </FormControl>

                  <Button
                    my={"2rem"}
                    w={"full"}
                    py={"1.5rem"}
                    backgroundColor={"#007C7B"}
                    px={"3rem"}
                    _hover={{ backgroundColor: "#099C9B" }}
                    type="submit"
                    isLoading={loading}
                  >
                    <Text color={"#fff"} fontWeight={"400"} fontSize={"lg"}>
                      Pay With Balance
                    </Text>
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default OverpaidBalancePaymentModal