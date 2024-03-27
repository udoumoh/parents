import { FC, useState } from "react";
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
import { FileUpload } from "../fileUpload";
import { useMutation } from "@apollo/client";
import { ACCEPT_INVOICE } from "@/gql/queries";
import { MdOutlinePayment } from "react-icons/md";
import { useUserAPI } from "@/hooks/UserContext";
import OverpaidBalancePaymentModal from "../overpaidBalancePaymentModal";

interface AcceptInvoiceModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  invoiceId: any;
}

const AcceptInvoiceModal: FC<AcceptInvoiceModalProps> = ({
  isOpen,
  onOpen,
  onClose,
  invoiceId,
}) => {
  const {
    isOpen: isFileOpen,
    onClose: onFileClose,
    onOpen: onFileOpen,
  } = useDisclosure();

const {
  isOpen: isOverpaidModalModalOpen,
  onOpen: onOverpaidModalModalOpen,
  onClose: onOverpaidModalModalClose,
} = useDisclosure();

  const {invoiceData} = useUserAPI()
  const [file, setFile] = useState<string>("");
  const [folder, setFolder] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [acceptinvoice, { loading }] = useMutation(ACCEPT_INVOICE);
  const toast = useToast();

  const handleSummaryChange = (event: any) => {
    setSummary(event.target.value);
  };

  const handleFileUpload = (
    uploadedFileUrl: string,
    uploadedFolder: string,
    uploadedFileName: string
  ) => {
    setFile(uploadedFileUrl);
    setFolder(uploadedFolder);
    setFileName(uploadedFileName);
  };

  const totalOverpaidAmount = invoiceData
    ?.filter((invoice) => invoice.status === "parent overpaid")
    ?.reduce((acc, item) => acc + Math.abs(item.balance), 0);

  const handleSubmit = async (values: any) => {
    try {
      const response = await acceptinvoice({
        variables: {
          document: file,
          fileType: values.docType,
          amountPaid: Number(values.amountPaid),
          invoiceid: Number(invoiceId),
          summary: summary,
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
    <Box>
      <OverpaidBalancePaymentModal
        isOpen={isOverpaidModalModalOpen}
        onOpen={onOverpaidModalModalOpen}
        onClose={onOverpaidModalModalClose}
        invoiceId={invoiceId}
        balance={totalOverpaidAmount}
      />
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={"inside"}
        size={{ base: "sm", md: "md", lg: "xl" }}
      >
        <ModalOverlay />
        <ModalContent rounded={"xl"}>
          <ModalHeader>
            <Flex>
              <Box alignItems={"center"} gap={2}>
                <Text fontWeight={"600"} fontSize={"xl"}>
                  {"Accept Invoice"}
                </Text>
                <Text fontWeight={"500"} fontSize={"sm"} color={"#8F8F8F"}>
                  {"Create a receipt to send to the school admin"}
                </Text>
              </Box>
            </Flex>

            <Divider color={"#C2C2C2"} my={"0.8rem"} />
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody pb={6} px={"2rem"}>
            <Box>
              <Formik
                initialValues={{
                  amountPaid: "",
                  docType: "",
                }}
                onSubmit={async (values) => {
                  handleSubmit(values);
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
                                <Flex
                                  justifyContent={"space-between"}
                                  gap={3}
                                  alignItems={"center"}
                                  mb="0.5rem"
                                >
                                  <Text color={"#005D5D"}>Amount Paid</Text>
                                  <Button
                                    display={
                                      totalOverpaidAmount > 0 ? "flex" : "none"
                                    }
                                    size={"sm"}
                                    colorScheme="red"
                                    gap={"2"}
                                    onClick={() => {
                                      onOverpaidModalModalOpen();
                                      onClose();
                                    }}
                                  >
                                    <Icon as={MdOutlinePayment} boxSize={"4"} />
                                    <Text fontSize={{ base: "xs", md: "sm" }}>
                                      Pay with overpaid balance
                                    </Text>
                                  </Button>
                                </Flex>
                                <InputGroup
                                  backgroundColor={"#FFF"}
                                  size={"md"}
                                >
                                  <InputLeftAddon
                                    backgroundColor={"#005D5D10"}
                                    border={"1px solid #005D5D"}
                                  >
                                    ₦
                                  </InputLeftAddon>
                                  <Input
                                    border={"1px solid #005D5D"}
                                    {...field}
                                    type="tel"
                                    placeholder="How much did you pay?"
                                    _hover={{ border: "1px solid #005D5D" }}
                                    focusBorderColor="#005D5D"
                                  />
                                </InputGroup>
                              </Box>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>
                      <Box>
                        <Text mb={"0.5rem"} color={"#005D5D"}>
                          File Type
                        </Text>
                        <Flex gap={5} flexDir={{ base: "column", md: "row" }}>
                          <Field name="docType">
                            {({ field, form }: any) => (
                              <FormControl
                              // isInvalid={form.errors.name && form.touched.name}
                              >
                                <Box w={"full"}>
                                  <Select
                                    placeholder="Select document"
                                    {...field}
                                    border={"1px solid #005D5D"}
                                    size={"md"}
                                    rounded={"md"}
                                    fontSize={"sm"}
                                    backgroundColor={"#fff"}
                                    focusBorderColor="#005D5D"
                                  >
                                    <option value="PDF" color="#fff">
                                      PDF
                                    </option>
                                    <option value={"PNG"}>PNG</option>
                                  </Select>
                                </Box>
                              </FormControl>
                            )}
                          </Field>

                          <Box>
                            <Button
                              backgroundColor={"#007C7B"}
                              color={"#fff"}
                              fontWeight={"400"}
                              w={"17rem"}
                              onClick={onFileOpen}
                              _hover={{ backgroundColor: "#099C9B" }}
                            >
                              {file.length > 1
                                ? "Document Uploaded"
                                : "Upload proof of payment"}
                            </Button>
                            <Text
                              fontSize={"sm"}
                              color={"#005D5D"}
                              mt={"0.5rem"}
                            >
                              File name: {fileName}
                            </Text>
                          </Box>
                          <FileUpload
                            isOpen={isFileOpen}
                            onClose={onFileClose}
                            type={"agentFile"}
                            imageFolder={folder!}
                            onUpload={handleFileUpload}
                          />
                        </Flex>
                      </Box>
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
                        onChange={handleSummaryChange}
                        h={"150px"}
                        border={"1px solid #005D5D"}
                        rounded={"xl"}
                        backgroundColor={"#fff"}
                        focusBorderColor="#005D5D"
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
                        Accept & Send Receipt
                      </Text>
                    </Button>
                  </Form>
                )}
              </Formik>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AcceptInvoiceModal;
