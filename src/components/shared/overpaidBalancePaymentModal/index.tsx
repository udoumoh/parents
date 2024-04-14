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
import { PAY_WITH_BALANCE } from '@/gql/mutations';
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
        const [payWithBalance, { loading }] = useMutation(PAY_WITH_BALANCE);
        const toast = useToast();
        console.log(invoiceData)

        const handleSubmit = async () => {
          try {
            const response = await payWithBalance({
              variables: {
                invoiceId: invoiceData?.id,
              },
            });
            console.log(response)
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
            if (response?.data?.payInvoiceWithBalance?.errors !== null) {
              toast({
                title: "Error",
                description: response?.data?.payInvoiceWithBalance?.errors[0]?.message,
                position: "top-right",
                variant: "left-accent",
                isClosable: true,
                status: "error",
              });
            }
            if (response?.data?.payInvoiceWithBalance?.errors === null) {
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
        <ModalHeader mb={0} pb={0}>
          <Flex>
            <Box alignItems={"center"} gap={2}>
              <Text fontWeight={"bold"} fontSize={"lg"} color={"#005D5D"}>
                {"Pay Invoice With Balance"}
              </Text>
              <Text fontWeight={"500"} fontSize={"sm"} color={"#8F8F8F"}>
                {
                  "Use your overpaid balance to pay for this outstanding invoice."
                }
              </Text>
            </Box>
          </Flex>

          <Divider color={"#C2C2C2"} my={"0.8rem"} />
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody pb={6} px={"2rem"}>
          <Box my={"0.8rem"}>
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
                                Overpaid Balance
                              </Text>
                              <InputGroup backgroundColor={"#FFF"} size={"md"}>
                                <InputLeftAddon>₦</InputLeftAddon>
                                <Input
                                  pl={0}
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
                                  pl={0}
                                  defaultValue={formatNumberWithCommas(
                                    invoiceData?.amountPaid
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
                    <Flex mb={"1rem"}>
                      <Field name="amountPaid">
                        {({ field, form }: any) => (
                          <FormControl>
                            <Box w={"full"}>
                              <Text mb={"0.5rem"} color={"#005D5D"}>
                                Amount to pay
                              </Text>
                              <InputGroup backgroundColor={"#FFF"} size={"md"}>
                                <InputLeftAddon>₦</InputLeftAddon>
                                <Input
                                  pl={0}
                                  defaultValue={(balance || 0) > (invoiceData?.amountPaid || 0) ? formatNumberWithCommas(invoiceData?.amountPaid) : balance }
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

                  <Flex
                    mt={'1rem'}
                    justifyContent={"flex-end"}
                    gap={"4"}
                    alignItems={"center"}
                  >
                    <Button
                      colorScheme="red"
                      onClick={onClose}
                      ml={3}
                      size={"sm"}
                    >
                      Cancel
                    </Button>
                    <Button
                      backgroundColor={"#007C7B"}
                      _hover={{ backgroundColor: "#099C9B" }}
                      type="submit"
                      isLoading={loading}
                      size={"sm"}
                      color={'#fff'}
                    >
                        Pay with balance
                    </Button>
                  </Flex>
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