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
import { FileUpload } from '../fileUpload';
import { useMutation } from '@apollo/client';
import { ACCEPT_INVOICE } from '@/gql/queries/queries';

interface AcceptInvoiceModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  invoiceId:number;
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
    const [file, setFile] = useState<string>("");
    const [folder, setFolder] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");
    const [summary, setSummary] = useState<string>("");
    const [loading, setUploading] = useState(false)
    const [acceptinvoice] = useMutation(ACCEPT_INVOICE)
    const toast = useToast()

    const handleSummaryChange = (event: any) => {
        setSummary(event.target.value)
    }
    
    const handleFileUpload = (
      uploadedFileUrl: string,
      uploadedFolder: string,
      uploadedFileName: string,
    ) => {
      setFile(uploadedFileUrl); // Set the file URL received from the upload component
      setFolder(uploadedFolder); // Set the folder received from the upload component
      setFileName(uploadedFileName);
    };

    const handleSubmit = async (values: any) => {
        setUploading(true)
        try{
            const response = await acceptinvoice({
              variables: {
                document: file ,
                fileType: values.docType,
                amountPaid: Number(values.amountPaid) ,
                invoiceid: Number(invoiceId),
              },
            });
            
            // if(!response){
            //     toast({
            //       title: "Client Error",
            //       description:
            //         "An error occured while sending your request",
            //       position: "bottom",
            //       variant: "left-accent",
            //       isClosable: true,
            //       status: "error",
            //     });
            // }
            // if(response?.data?.error !== null){
            //     toast({
            //       title: "Error",
            //       description: response?.data?.error?.message,
            //       position: "bottom",
            //       variant: "left-accent",
            //       isClosable: true,
            //       status: "error",
            //     });
            // }
            console.log(response)
            } catch(err: any){
                toast({
                  title: "Error",
                  description:
                    err.message,
                  position: "bottom",
                  variant: "left-accent",
                  isClosable: true,
                  status: "error",
                })
        }
    }
  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "lg", md: "xl", lg: "3xl" }}
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
        <ModalBody pb={6} px={{ base: "3rem", md: "6rem", lg: "8rem" }}>
          <Box>
            <Formik
              initialValues={{
                amountPaid: "",
                docType: "",
                file: file,
                summary: summary,
              }}
              onSubmit={async (values, actions) => {
                handleSubmit(values);
              }}
            >
              {(props) => (
                <Form>
                  <Flex direction="column">
                    <Flex mb={"1rem"}>
                      <Field name="amountPaid">
                        {({ field, form }: any) => (
                          <FormControl
                          // isInvalid={form.errors.name && form.touched.name}
                          >
                            <Box w={"full"}>
                              <Text mb={"0.5rem"}>Amount Paid</Text>
                              <InputGroup
                                backgroundColor={"#F5F5F5"}
                                size={"lg"}
                              >
                                <InputLeftAddon backgroundColor={"#E8E8E8"}>
                                  ₦
                                </InputLeftAddon>
                                <Input
                                  {...field}
                                  type="tel"
                                  placeholder="How much did you pay?"
                                />
                              </InputGroup>
                            </Box>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                    <Box>
                      <Text mb={"0.5rem"}>File Type</Text>
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
                                  border={"1px solid #D5D5D5"}
                                  size={{ base: "sm", md: "lg" }}
                                  h={"2.3rem"}
                                  rounded={"sm"}
                                  fontSize={"sm"}
                                  variant={"filled"}
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
                          <Text fontSize={"sm"} color={"#999999"} mt={"0.5rem"}>
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
                    <FormLabel fontWeight={"normal"} fontSize={"md"}>
                      Summary
                    </FormLabel>
                    <Textarea
                      onChange={handleSummaryChange}
                      h={"150px"}
                      border={"1px solid #D5D5D5"}
                      rounded={"xl"}
                      backgroundColor={"#F5F5F5"}
                    />
                  </FormControl>

                  <Button
                    my={'2rem'}
                    w={"full"}
                    py={"1.5rem"}
                    backgroundColor={"#007C7B"}
                    px={"3rem"}
                    _hover={{ backgroundColor: "#044141" }}
                    type="submit"
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
  );
};

export default AcceptInvoiceModal