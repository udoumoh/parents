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
  FormErrorMessage,
  Badge,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { FileUpload } from "../fileUpload";
import { useMutation } from "@apollo/client";
import { ACCEPT_INVOICE } from "@/gql/queries";
import { MdOutlinePayment } from "react-icons/md";
import { useUserAPI } from "@/hooks/UserContext";
import * as Yup from 'yup'
import OverpaidBalancePaymentModal from "../overpaidBalancePaymentModal";

interface AcceptInvoiceModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  invoiceData: {
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
    isRefundable: boolean;
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
  } | undefined
}

const AcceptInvoiceModal: FC<AcceptInvoiceModalProps> = ({
  isOpen,
  onOpen,
  onClose,
  invoiceData,
}) => {

  const schema = Yup.object().shape({
    docType: Yup.string().required("Receipt is required"),
  });

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

  const {currentWardProfile} = useUserAPI()
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

  const handleSubmit = async (values: any) => {
    try {
      const response = await acceptinvoice({
        variables: {
          document: file,
          fileType: values.docType,
          amountPaid: Number(values.amountPaid),
          invoiceid: Number(invoiceData?.id),
          summary: summary,
        },
      });
      if (!response) {
        toast({
          title: "Oops! Something went wrong. Please try again later.",
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
        setTimeout(() => {
          window.location.reload()
          onClose();
        }, 600)
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: 'An error occurred while trying to submit your invoice, please try again',
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
        invoiceData={invoiceData}
        balance={currentWardProfile?.wallet}
      />
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
          <ModalBody pb={6} px={{ base: "1rem", md: "2rem" }}>
            <Box>
              <Flex mb={'1rem'}>
                <Badge colorScheme="green">{invoiceData?.isRefundable}</Badge>
              </Flex>
              <Formik
                initialValues={{
                  amountPaid: "",
                  docType: "",
                }}
                onSubmit={async (values) => {
                  handleSubmit(values);
                }}
                validationSchema={schema}
              >
                {(props) => (
                  <Form>
                    <Flex direction="column">
                      <Flex mb={"1rem"}>
                        <Field name="amountPaid">
                          {({ field, form }: any) => (
                            <FormControl isInvalid={form.touched.amountPaid}>
                              <Box w={"full"}>
                                <Flex
                                  justifyContent={"space-between"}
                                  gap={3}
                                  alignItems={"center"}
                                  mb="0.5rem"
                                >
                                  <Text
                                    color={"#005D5D"}
                                    fontSize={{ base: "xs", md: "md" }}
                                  >
                                    Amount Paid
                                  </Text>
                                  <Button
                                    display={
                                      (currentWardProfile?.wallet || 0) > 0
                                        ? "flex"
                                        : "none"
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
                                  <FormErrorMessage>
                                    {form.errors.amountPaid}
                                  </FormErrorMessage>
                                </InputGroup>
                              </Box>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>
                      <Box>
                        <Text
                          mb={"0.5rem"}
                          color={"#005D5D"}
                          fontSize={{ base: "xs", md: "md" }}
                        >
                          File Type
                        </Text>
                        <Flex gap={5} flexDir={{ base: "column", md: "row" }}>
                          <Field name="docType">
                            {({ field, form }: any) => (
                              <FormControl
                                isInvalid={
                                  form.errors.docType && form.touched.docType
                                }
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
                                    <option value={"No File"}>No file</option>
                                  </Select>
                                  <FormErrorMessage>
                                    {form.errors.docType}
                                  </FormErrorMessage>
                                </Box>
                              </FormControl>
                            )}
                          </Field>

                          <Box>
                            <Button
                              backgroundColor={"#007C7B"}
                              color={"#fff"}
                              fontWeight={"400"}
                              w={"full"}
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
                        fontSize={{ base: "xs", md: "md" }}
                      >
                        Summary
                      </FormLabel>
                      <Textarea
                        onChange={handleSummaryChange}
                        h={"100px"}
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
                      isDisabled={!props.dirty}
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
