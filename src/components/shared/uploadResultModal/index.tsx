import { FC, useState, useEffect } from "react";
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
  useToast,
  Avatar,
  Checkbox,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { FileUpload } from "../fileUpload";
import { useMutation } from "@apollo/client";
import { useUserAPI } from "@/hooks/UserContext";
import { useQuery } from "@apollo/client";
import { GET_SCHOOLS } from "@/gql/queries/queries";
import { UPLOAD_RESULT } from "@/gql/queries/queries";

interface UploadResultModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const UploadResultModal: FC<UploadResultModalProps> = ({
  isOpen,
  onOpen,
  onClose,
}) => {
  const {
    isOpen: isFileOpen,
    onClose: onFileClose,
    onOpen: onFileOpen,
  } = useDisclosure();
  const {data: getschools} = useQuery(GET_SCHOOLS)
  const [file, setFile] = useState<string>("");
  const [folder, setFolder] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [loading, setUploading] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [school, setSchool] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const {currentWardProfile} = useUserAPI() 
  const [selectedSchool, setSelectedSchool] = useState<
    |
        {
          schoolName: string;
          id: number;
        }
    | undefined
  >(undefined);
  const [isChecked, setChecked] = useState(false)
  const [uploadresult] = useMutation(UPLOAD_RESULT);
  const toast = useToast();

  const handleSummaryChange = (event: any) => {
    setSummary(event.target.checked);
  };

  const handleCheck = () => {
    setChecked(!isChecked);
    setSelectedSchool({
      schoolName: currentWardProfile?.school || "",
      id: currentWardProfile?.schoolId || 0,
    });
  }

  const handleFileUpload = (
    uploadedFileUrl: string,
    uploadedFolder: string,
    uploadedFileName: string
  ) => {
    setFile(uploadedFileUrl);
    setFolder(uploadedFolder);
    setFileName(uploadedFileName);
  };

  const handleSubmit = (values: any) => {
    setUploading(true);
    try {
      const response = uploadresult({
        variables: {
          studentId: currentWardProfile?.id,
          resultType: values.resultType,
          fileType: values.docType,
          folder: values.folder,
          document: values.file,
          remark: summary,
          schoolId: selectedSchool?.id,
        },
      });
      console.log(response)
      if(!response){
        toast({
          title: "Client Error",
          description: 'A client error occurred',
          position: "bottom",
          variant: "left-accent",
          isClosable: true,
          status: "error",
        });
      }

      console.log(response);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        position: "bottom",
        variant: "left-accent",
        isClosable: true,
        status: "error",
      });
    }
  }

  const filteredSearchData: any = school.filter((item:any) => item?.schoolname?.toLowerCase().includes(searchInput?.toLowerCase()))

  useEffect(() => {
      try{
        const response = getschools
        if(response.getSchools){
          const schools = (response.getSchools || []).map((school: any) => ({
            schoolname: school?.schoolName, 
            schoollogo: school?.logoImgUrl,
          }))
          setSchool(schools)
        }
      } catch (error: any) {
        console.log(error.message)
      }
  }, [getschools, toast])

  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "lg", md: "xl", lg: "2xl" }}
    >
      <ModalOverlay />
      <ModalContent rounded={"xl"}>
        <ModalHeader>
          <Flex>
            <Box alignItems={"center"} gap={2}>
              <Text fontWeight={"600"} fontSize={"xl"}>
                {"Upload Result"}
              </Text>
              <Text fontWeight={"500"} fontSize={"sm"} color={"#8F8F8F"}>
                {
                  "Upload your wards academic record, results will be sent to the school’s admin"
                }
              </Text>
            </Box>
          </Flex>

          <Divider color={"#C2C2C2"} mt={"0.8rem"} />
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody pb={6} px={{ base: "3rem", md: "4rem" }}>
          <Box pb={"1rem"}>
            <Box rounded={"md"} textAlign={"center"}>
              <Avatar
                src={currentWardProfile?.profileImage}
                size={"lg"}
                my={"1rem"}
              />
              <Text fontSize={"lg"} fontWeight={"500"}>
                {currentWardProfile?.firstName} {currentWardProfile?.lastName}
              </Text>
              <Text color={"#747474"}>
                {currentWardProfile?.firstName} • {currentWardProfile?.class} •{" "}
                {`${currentWardProfile?.age} Years old`}
              </Text>
            </Box>
          </Box>

          <Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              mb={"0.3rem"}
            >
              <Text fontSize={"lg"}>Select School</Text>
              <Checkbox
                size={"lg"}
                colorScheme="green"
                color={"#B2B2B2"}
                onChange={handleCheck}
              >
                Upload for current school
              </Checkbox>
            </Box>
            <Input
              type="text"
              size={"lg"}
              border={"1px solid #D5D5D5"}
              rounded="md"
              backgroundColor={"#F5F5F5"}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              _focus={{ border: "1px solid #6ACAA7" }}
              isReadOnly={isChecked}
              _hover={{ cursor: isChecked ? "not-allowed" : "text" }}
              value={searchInput}
            />
            {searchInput && (
              <Box
                backgroundColor={"#F5F5F5"}
                p={"0.5rem"}
                shadow={"md"}
                display={isHidden ? "none" : "block"}
              >
                {filteredSearchData.map((item: any, index: number) => {
                  return (
                    <Box
                      key={index}
                      display={"flex"}
                      alignItems={"center"}
                      gap={3}
                      my={"1rem"}
                      p={"0.5rem"}
                      rounded={"md"}
                      _hover={{
                        backgroundColor: "#3F999830",
                        cursor: "pointer",
                        transitionDuration: "0.2s",
                      }}
                      onClick={() => {
                        setSelectedSchool({schoolName: item?.schoolname, id: item?.id});
                        setIsHidden(!isHidden);
                      }}
                    >
                      <Avatar src={item.schoollogo} />
                      <Text fontSize={"lg"} py={"0.5rem"}>
                        {item.schoolname}
                      </Text>
                    </Box>
                  );
                })}
              </Box>
            )}
            <Box
              display={selectedSchool ? 'block' : 'none'}
              my={"1rem"}
              p={"0.5rem"}
              rounded={"md"}
              backgroundColor = "#3F999830"
            >
              <Text fontSize={"lg"} py={"0.5rem"}>
                {selectedSchool?.schoolName || ""}
              </Text>
            </Box>
          </Box>
          <Box>
            <Formik
              initialValues={{
                resultType: "",
                docType: "",
                file: file,
                summary: summary,
                school: selectedSchool?.schoolName,
              }}
              onSubmit={async (values) => {
                handleSubmit(values);
                console.log(values);
              }}
            >
              {(props) => (
                <Form>
                  <Field name="resultType">
                    {({ field, form }: any) => (
                      <FormControl>
                        <Box w={"full"} mt={"1rem"}>
                          <Text fontSize={"lg"} mb={"0.3rem"}>
                            Result Type
                          </Text>
                          <Select
                            placeholder="Select Result Type"
                            {...field}
                            border={"1px solid #D5D5D5"}
                            size={{ base: "sm", md: "lg" }}
                            rounded={"md"}
                            fontSize={"md"}
                            backgroundColor={"#F5F5F5"}
                            _focus={{ border: "1px solid #6ACAA7" }}
                          >
                            <option value="First Term Final Exam" color="#fff">
                              First Term Final Exam
                            </option>
                            <option value={"First Term MidTerm"}>
                              First Term MidTerm
                            </option>
                            <option value={"Second Term Final Exam"}>
                              Second Term Final Exam
                            </option>
                            <option value={"Second Term MidTerm"}>
                              Second Term MidTerm
                            </option>
                            <option value={"Third Term Final exam"}>
                              Third Term Final exam
                            </option>
                            <option value={"Third Term mid term"}>
                              Third Term mid term
                            </option>
                            <option value={"WAEC"}>WAEC</option>
                            <option value={"JAMB"}>JAMB</option>
                            <option value={"NECO"}>NECO</option>
                            <option value={"GCSE"}>GCSE</option>
                          </Select>
                        </Box>
                      </FormControl>
                    )}
                  </Field>

                  <Flex direction="column" mt={"1rem"}>
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
                                  placeholder="Select File Type"
                                  {...field}
                                  border={"1px solid #D5D5D5"}
                                  size={{ base: "sm", md: "lg" }}
                                  rounded={"md"}
                                  fontSize={"md"}
                                  backgroundColor={"#F5F5F5"}
                                  _focus={{ border: "1px solid #6ACAA7" }}
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
                            size="lg"
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
                      _focus={{ border: "1px solid #6ACAA7" }}
                    />
                  </FormControl>

                  <Button
                    my={"2rem"}
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

export default UploadResultModal;
