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
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { FileUpload } from "../fileUpload";
import { useMutation } from "@apollo/client";
import { useUserAPI } from "@/hooks/UserContext";
import { useQuery } from "@apollo/client";
import { GET_SCHOOLS } from "@/gql/queries/queries";
import { UPLOAD_RESULT } from "@/gql/queries/queries";
import { AiOutlineSearch } from "react-icons/ai";

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
  const { data: getschools } = useQuery(GET_SCHOOLS);
  const [file, setFile] = useState<string>("");
  const [folder, setFolder] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [isHidden, setIsHidden] = useState(false);
  const [school, setSchool] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const { currentWardProfile } = useUserAPI();
  const [selectedSchool, setSelectedSchool] = useState<
    | {
        schoolName: string;
        id: number;
        logo: string;
      }
    | undefined
  >(undefined);
  const [isChecked, setChecked] = useState(false);
  const [uploadresult, { loading }] = useMutation(UPLOAD_RESULT);
  const toast = useToast();

  const handleSummaryChange = (event: any) => {
    setSummary(event.target.checked);
  };

  const handleCheck = () => {
    setChecked(!isChecked);
    setSelectedSchool({
      schoolName: currentWardProfile?.school || "",
      id: currentWardProfile?.schoolId || 0,
      logo: currentWardProfile?.profileImage || "",
    });
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

  useEffect(() => {
    try {
      const response = getschools;
      if (!response) {
        console.log("Couldn't fetch from server");
      }
      if (response?.getSchools) {
        const schools = response?.getSchools?.map((school: any) => ({
          schoolname: school?.schoolName,
          schoollogo: school?.logoImgUrl,
          schoolId: school?.id,
        }));
        setSchool(schools);
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  }, [getschools]);

  const handleSubmit = async (values: any) => {
    try {
      const response = await uploadresult({
        variables: {
          studentId: currentWardProfile?.id,
          resultType: values.resultType,
          fileType: values.docType,
          folder: folder,
          document: file,
          remark: summary,
          schoolId: selectedSchool?.id,
        },
      });
      if (!response) {
        toast({
          title: "Client Error",
          description: "A client error occurred",
          position: "bottom",
          variant: "left-accent",
          isClosable: true,
          status: "error",
        });
      }
      if (response.data.uploadResult.errors !== null) {
        toast({
          title: "Error",
          description: response?.data?.uploadResult?.errors[0]?.message,
          position: "bottom",
          variant: "left-accent",
          isClosable: true,
          status: "error",
        });
      }
      if (response.data.uploadResult.errors === null) {
        toast({
          title: "Success",
          description: "Result for this student has been successfully uploaded",
          position: "bottom",
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
        position: "bottom",
        variant: "left-accent",
        isClosable: true,
        status: "error",
      });
    }
  };

  const filteredSearchData: any = school.filter((item: any) =>
    item?.schoolname?.toLowerCase().includes(searchInput?.toLowerCase())
  );

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
              <Text fontWeight={"700"} fontSize={"xl"} color={"#007C7B"}>
                {"Upload Result"}
              </Text>
              <Text
                fontWeight={"400"}
                fontSize={{ base: "xs", md: "sm" }}
                color={"#8F8F8F"}
              >
                {
                  "Upload your wards academic record, results will be sent to the school’s admin"
                }
              </Text>
            </Box>
          </Flex>

          <Divider color={"#C2C2C2"} mt={"0.8rem"} />
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody
          pb={6}
          px={{ base: "1.5rem", md: "4rem" }}
          sx={{
            "&::-webkit-scrollbar": {
              width: "6px",
              borderRadius: "6px",
              backgroundColor: "#007C7B20",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#007C7B80",
              borderRadius: "8px",
            },
          }}
        >
          <Box pb={"1rem"}>
            <Box textAlign={"center"}>
              <Avatar src={currentWardProfile?.profileImage} size={"lg"} />
              <Text
                fontSize={{ base: "md", md: "lg" }}
                fontWeight={"500"}
                mt={"0.5rem"}
              >
                {currentWardProfile?.firstName} {currentWardProfile?.lastName}
              </Text>
              <Text color={"#747474"} fontSize={{ base: "xs", md: "md" }}>
                {currentWardProfile?.firstName} • {currentWardProfile?.class} •{" "}
                {`${currentWardProfile?.age} Years old`}
              </Text>
            </Box>
          </Box>

          <Box>
            <Box justifyContent={"space-between"} mb={"0.5rem"}>
              <Checkbox
                size={{ base: "sm", lg: "md" }}
                colorScheme="green"
                borderColor={"#007C7B"}
                onChange={handleCheck}
              >
                Upload for current school
              </Checkbox>
            </Box>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                pt={{ base: "0rem", lg: "0.5rem" }}
                pl={"0.5rem"}
              >
                <AiOutlineSearch color="#C2C2C2" size={20} />
              </InputLeftElement>
              <Input
                type="text"
                size={{ base: "md", lg: "lg" }}
                border={"1px solid #007C7B"}
                rounded="md"
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setIsHidden(false);
                }}
                placeholder="search school"
                _focus={{ border: "1px solid #6ACAA7" }}
                isReadOnly={isChecked}
                _hover={{ cursor: isChecked ? "not-allowed" : "text" }}
                value={searchInput}
              />
            </InputGroup>
            {searchInput && (
              <Box
                sx={{
                  "&::-webkit-scrollbar": {
                    width: "6px",
                    borderRadius: "6px",
                    backgroundColor: "#007C7B20",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#007C7B80",
                    borderRadius: "8px",
                  },
                }}
                h={"400px"}
                overflowY={"auto"}
                mt={"0.3rem"}
                p={"0.5rem"}
                border={"1px solid #007C7B"}
                rounded={"lg"}
                display={isHidden ? "none" : "block"}
              >
                {filteredSearchData?.map((item: any, index: number) => {
                  return (
                    <Box
                      key={index}
                      display={"flex"}
                      alignItems={"center"}
                      gap={3}
                      p={"0.5rem"}
                      rounded={"md"}
                      _hover={{
                        backgroundColor: "#3F999830",
                        cursor: "pointer",
                        transitionDuration: "0.2s",
                      }}
                      onClick={() => {
                        setSelectedSchool({
                          schoolName: item?.schoolname,
                          id: item?.schoolId,
                          logo: item?.schoollogo,
                        });
                        setIsHidden(!isHidden);
                      }}
                    >
                      <Avatar src={item.schoollogo} size={{base:"xs", lg:"lg"}}/>
                      <Text fontSize={{ base: "xs", lg: "md" }} py={"0.5rem"}>
                        {item.schoolname}
                      </Text>
                    </Box>
                  );
                })}
              </Box>
            )}
            <Box
              display={selectedSchool ? "flex" : "none"}
              my={"1rem"}
              p={"0.5rem"}
              rounded={"md"}
              backgroundColor="#3F999830"
              alignItems={"center"}
              gap={3}
            >
              <Avatar src={selectedSchool?.logo} />
              <Text fontSize={{ base: "sm", lg: "md" }}>
                {selectedSchool?.schoolName || ""}
              </Text>
            </Box>
          </Box>
          <Box>
            <Formik
              initialValues={{
                resultType: "",
                docType: "",
              }}
              onSubmit={async (values) => {
                handleSubmit(values);
              }}
            >
              {(props) => (
                <Form>
                  <Field name="resultType">
                    {({ field, form }: any) => (
                      <FormControl>
                        <Box w={"full"} mt={"1.5rem"}>
                          <Text
                            fontSize={{ base: "sm", lg: "md" }}
                            fontWeight={"500"}
                            color={"#007C7B"}
                            mb={"0.3rem"}
                          >
                            Result Type
                          </Text>
                          <Select
                            placeholder="Select Result Type"
                            {...field}
                            border={"1px solid #007C7B"}
                            size={{ base: "md", md: "lg" }}
                            rounded={"md"}
                            fontSize={{ base: "sm", lg: "md" }}
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
                      <Text
                        mb={"0.5rem"}
                        fontSize={{ base: "sm", lg: "md" }}
                        fontWeight={"500"}
                        color={"#007C7B"}
                      >
                        File Type
                      </Text>
                      <Flex gap={5} flexDir={{ base: "column", md: "row" }}>
                        <Field name="docType">
                          {({ field, form }: any) => (
                            <FormControl>
                              <Box w={"full"}>
                                <Select
                                  placeholder="Select File Type"
                                  {...field}
                                  border={"1px solid #007C7B"}
                                  size={{ base: "md", md: "lg" }}
                                  rounded={"md"}
                                  fontSize={{ base: "sm", lg: "md" }}
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
                            fontSize={{ base: "sm", lg: "md" }}
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
                          <Text fontSize={"sm"} color={"#007C7B"} mt={"0.5rem"}>
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

                  <FormControl mt={{ base: "1rem", md: "0rem" }}>
                    <FormLabel
                      mb={"0.5rem"}
                      fontSize={{ base: "sm", lg: "md" }}
                      fontWeight={"500"}
                      color={"#007C7B"}
                    >
                      Summary
                    </FormLabel>
                    <Textarea
                      onChange={handleSummaryChange}
                      h={"150px"}
                      border={"1px solid #007C7B"}
                      rounded={"xl"}
                      _focus={{ border: "1px solid #6ACAA7" }}
                    />
                  </FormControl>

                  <Button
                    my={"2rem"}
                    w={"full"}
                    py={"1.5rem"}
                    backgroundColor={"#007C7B"}
                    px={"3rem"}
                    _hover={{ backgroundColor: "#007C6A" }}
                    isLoading={loading}
                    type="submit"
                  >
                    <Text
                      color={"#fff"}
                      fontWeight={"400"}
                      fontSize={{ base: "sm", lg: "md" }}
                    >
                      Upload Result
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
