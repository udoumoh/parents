"use client";
import { FC, useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Input,
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
  Link,
  Tabs,
  TabPanel,
  TabPanels,
  Select,
  Avatar,
  useDisclosure,
  useToast,
  InputGroup,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/components/imageUpload/ImageUpload";
import { gql, useMutation } from "@apollo/client";
import { REGISTER_PARENT } from "@/gql/mutations";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const toast = useToast();
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(0);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [profileUrl, setProfileUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [folder, setFolder] = useState<string>("");
  const [signup] = useMutation(REGISTER_PARENT);
  const [consent, setConsent] = useState(false);
  const [show, setShow] = useState(false);

  const handleImageUpload = (
    uploadedImageUrl: string,
    uploadedFolder: string
  ) => {
    setProfileUrl(uploadedImageUrl); // Set the image URL received from the upload component
    setFolder(uploadedFolder); // Set the folder received from the upload component
  }

  const handleTabsChange = () => {
    setTabIndex(tabIndex + 1);
    setConsent(true);
  };

  const handleFormSubmit = async (values: any) => {
    setLoading(true);
    try {
      const response = await signup({
        variables: {
          options: {
            firstName: values.firstName,
            lastName: values.lastName,
            middleName: values.middleName,
            email: values.email,
            referralCode: "",
            phoneNumber: values.phoneNumber.toString(),
            password: values.password,
            parentRole: values.parentRole,
            profileImgUrl: profileUrl,
            agreedTo: consent,
          },
          folder: folder,
        },
      });

      if (!response?.data) {
        toast({
          title: "Client Error",
          description: "An error occured while you were creating your account",
          position: "bottom",
          variant: "left-accent",
          isClosable: true,
          status: "error",
        });
      }
      if (response.data.registerParent.errors) {
        toast({
          title: "Server Error",
          description: response.data.registerParent.errors[0].message,
          position: "bottom",
          variant: "left-accent",
          isClosable: true,
          status: "error",
        });
      } else {
        toast({
          title: "Account created",
          description:
            "Account created! Check your email for an OTP to verify your account.",
          duration: 5000,
          position: "bottom",
          variant: "left-accent",
          isClosable: true,
          status: "success",
        });
        router.push("/verifyotp");
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.message,
        duration: 5000,
        position: "bottom",
        variant: "left-accent",
        isClosable: true,
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const schema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    middleName: Yup.string(),
    lastName: Yup.string().required("Last name is required"),
    phoneNumber: Yup.number().required("Phone number is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid Email Format"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <Box
      minH={"100vh"}
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      backgroundColor={"#005D5D20"}
      backdropBlur={"30px"}
    >
      <Box
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={5}
        py={{ base: "2rem", lg: "0" }}
        mx={{ base: "0.5rem", md: "2rem" }}
        minW={{ base: "auto", md: "600px" }}
      >
        <Image
          src="/images/greylightBordered.svg"
          alt="logo"
          pointerEvents={"none"}
        />

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            middleName: "",
            email: "",
            phoneNumber: "",
            password: "",
            parentRole: "",
          }}
          onSubmit={async (values) => {
            handleFormSubmit(values);
          }}
          validationSchema={schema}
        >
          {(props) => {
            return (
              <Form>
                <Tabs
                  index={tabIndex}
                  variant="unstyled"
                  onChange={handleTabsChange}
                >
                  <TabPanels>
                    <TabPanel p={0}>
                      <Box
                        backgroundColor={"#FFFFFF"}
                        px={{ base: "1rem", lg: "2rem" }}
                        py={"2rem"}
                        rounded={"md"}
                        mx={"3rem"}
                      >
                        <Text
                          fontSize={{ base: "xl", lg: "3xl" }}
                          fontWeight={"700"}
                          textAlign={"center"}
                          mb={"2rem"}
                          color="#005D5D"
                        >
                          Create your account
                        </Text>

                        <Flex gap={5} display={{ base: "column", lg: "flex" }}>
                          <Field name="firstName">
                            {({ field, form }: any) => (
                              <FormControl
                                isInvalid={
                                  form.errors.firstName &&
                                  form.touched.firstName
                                }
                                mb="1.5rem"
                              >
                                <Box w={"full"}>
                                  <FormLabel color={"#005D5D"} fontSize={"sm"}>
                                    First Name
                                  </FormLabel>
                                  <Input
                                    border={"1px solid #005D5D40"}
                                    {...field}
                                    type="text"
                                    autoComplete="true"
                                  />
                                  <FormErrorMessage>
                                    {form.errors.firstName}
                                  </FormErrorMessage>
                                </Box>
                              </FormControl>
                            )}
                          </Field>

                          <Field name="lastName">
                            {({ field, form }: any) => (
                              <FormControl
                                isInvalid={
                                  form.errors.lastName && form.touched.lastName
                                }
                                mb="1.5rem"
                              >
                                <Box w={"full"}>
                                  <FormLabel color={"#005D5D"} fontSize={"sm"}>
                                    Last Name
                                  </FormLabel>
                                  <Input
                                    border={"1px solid #005D5D40"}
                                    {...field}
                                    type="text"
                                    autoComplete="true"
                                  />
                                  <FormErrorMessage>
                                    {form.errors.lastName}
                                  </FormErrorMessage>
                                </Box>
                              </FormControl>
                            )}
                          </Field>
                        </Flex>

                        <Field name="middleName">
                          {({ field, form }: any) => (
                            <FormControl mb="1.5rem">
                              <Box w={"full"}>
                                <FormLabel color={"#005D5D"} fontSize={"sm"}>
                                  Middle Name(Optional)
                                </FormLabel>
                                <Input
                                  border={"1px solid #005D5D40"}
                                  {...field}
                                  type="text"
                                  autoComplete="true"
                                />
                              </Box>
                            </FormControl>
                          )}
                        </Field>

                        <Flex gap={5} display={{ base: "column", lg: "flex" }}>
                          <Field name="email">
                            {({ field, form }: any) => (
                              <FormControl
                                isInvalid={
                                  form.errors.email && form.touched.email
                                }
                                mb="1.5rem"
                              >
                                <Box w={"full"}>
                                  <FormLabel color={"#005D5D"} fontSize={"sm"}>
                                    Email
                                  </FormLabel>
                                  <Input
                                    border={"1px solid #005D5D40"}
                                    {...field}
                                    type="text"
                                    autoComplete="true"
                                  />
                                  <FormErrorMessage>
                                    {form.errors.email}
                                  </FormErrorMessage>
                                </Box>
                              </FormControl>
                            )}
                          </Field>

                          <Field name="phoneNumber">
                            {({ field, form }: any) => (
                              <FormControl
                                isInvalid={
                                  form.errors.phoneNumber &&
                                  form.touched.phoneNumber
                                }
                                mb="1.5rem"
                              >
                                <Box w={"full"}>
                                  <FormLabel color={"#005D5D"} fontSize={"sm"}>
                                    Phone Number
                                  </FormLabel>
                                  <Input
                                    border={"1px solid #005D5D40"}
                                    {...field}
                                    type="number"
                                    autoComplete="true"
                                  />
                                  <FormErrorMessage>
                                    {form.errors.phoneNumber}
                                  </FormErrorMessage>
                                </Box>
                              </FormControl>
                            )}
                          </Field>
                        </Flex>

                        <Field name="password">
                          {({ field, form }: any) => (
                            <FormControl
                              isInvalid={
                                form.errors.password && form.touched.password
                              }
                              mb="1.5rem"
                            >
                              <Box w={"full"}>
                                <FormLabel color={"#005D5D"} fontSize={"sm"}>
                                  Password
                                </FormLabel>
                                <InputGroup>
                                  <Input
                                    type={show ? "text" : "password"}
                                    _focus={{ border: "1px solid #005D5D80" }}
                                    border={"1px solid #005D5D40"}
                                    {...field}
                                  />
                                  <InputRightElement width="4.5rem">
                                    <Icon
                                      _hover={{ cursor: "pointer" }}
                                      boxSize={5}
                                      as={show ? IoMdEyeOff : IoMdEye}
                                      onClick={() => {
                                        setShow(!show);
                                      }}
                                      color={"#005D5D"}
                                    />
                                  </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>
                                  {form.errors.password}
                                </FormErrorMessage>
                              </Box>
                            </FormControl>
                          )}
                        </Field>
                        <Box
                          w={"full"}
                          display={"flex"}
                          flexDir={"column"}
                          justifyContent={"center"}
                          alignItems={"center"}
                        >
                          <Button
                            onClick={handleTabsChange}
                            w={"50%"}
                            size={"lg"}
                            px="5rem"
                            py={"1.5rem"}
                            mt={"1rem"}
                            mb={"1rem"}
                            color={"#fff"}
                            backgroundColor={"#007C7B"}
                            _hover={{ backgroundColor: "#005D5D80" }}
                            isLoading={props.isSubmitting}
                          >
                            Continue
                          </Button>

                          <Text
                            color={"#979797"}
                            fontSize={{ base: "xs", lg: "sm" }}
                            textAlign={"center"}
                          >
                            By continuing, you agree to our{" "}
                            <Link color={"#005D5D"}>Terms of use</Link>
                          </Text>

                          <Text
                            color={"#747474"}
                            fontSize={{ base: "xs", lg: "sm" }}
                            mt={"2rem"}
                            fontWeight={"600"}
                            textAlign={"center"}
                          >
                            Already have an account?{" "}
                            <Link
                              color={"#007C7B"}
                              onClick={() => router.push("/signin")}
                            >
                              {`Sign In ->`}
                            </Link>
                          </Text>
                        </Box>
                      </Box>
                    </TabPanel>
                    <TabPanel p={0}>
                      <Box
                        backgroundColor={"#FFFFFF"}
                        px={{ base: "1rem", lg: "2rem" }}
                        py={"2rem"}
                        rounded={"md"}
                        mx={"3rem"}
                      >
                        <Text
                          fontSize={{ base: "xl", lg: "3xl" }}
                          fontWeight={"700"}
                          textAlign={"center"}
                          mb={"2rem"}
                          color="#005D5D"
                        >
                          Complete your profile
                        </Text>
                        <Flex justifyContent={"center"} mt={"1rem"}>
                          <Avatar size={"xl"} src={profileUrl} />
                        </Flex>

                        <Flex justifyContent={"center"} mb={"1.5rem"}>
                          <Button
                            mt={4}
                            fontSize={"lg"}
                            backgroundColor={"#007C7B"}
                            color={"#fff"}
                            fontWeight={"400"}
                            w={'auto'}
                            onClick={() => {
                              onOpen();
                            }}
                            _hover={{ backgroundColor: "#099C9B" }}
                          >
                            Add profile picture
                          </Button>
                          <ImageUpload
                            isModalOpen={isOpen}
                            onModalClose={onClose}
                            type="parentImg"
                            imageFolder={folder}
                            onUpload={handleImageUpload}
                          />
                        </Flex>

                        <Flex
                          gap={5}
                          mb={"1.2rem"}
                          flexDir={"column"}
                          alignItems={"center"}
                          justifyContent={"center"}
                        >
                          <Text
                            color={"gray.600"}
                            fontWeight={"600"}
                            fontSize={{ base: "md", lg: "lg" }}
                          >
                            What is your relationship to the student?
                          </Text>
                          <Field name="parentRole">
                            {({ field, form }: any) => (
                              <FormControl
                              // isInvalid={form.errors.name && form.touched.name}
                              >
                                <Box w={"full"}>
                                  <FormLabel color={"#005D5D"} fontSize={"md"}>
                                    Relationship to student
                                  </FormLabel>
                                  <Select
                                    placeholder=" "
                                    {...field}
                                    border={"1px solid #005D5D"}
                                    size={{ base: "sm", md: "lg" }}
                                    rounded={"md"}
                                    fontSize={"sm"}
                                  >
                                    <option value="Mother" color="#fff">
                                      Mother
                                    </option>
                                    <option value={"Father"}>Father</option>
                                    <option value={"Father"}>Guardian</option>
                                  </Select>
                                </Box>
                              </FormControl>
                            )}
                          </Field>
                        </Flex>

                        <Flex justifyContent={"center"}>
                          <Button
                            type="submit"
                            mt={4}
                            px={"2rem"}
                            py={"1.5rem"}
                            backgroundColor={"#007C7B"}
                            color={"#fff"}
                            fontWeight={"400"}
                            w={"17rem"}
                            _hover={{ backgroundColor: "#099C9B" }}
                            isLoading={loading}
                          >
                            Submit
                          </Button>
                        </Flex>
                      </Box>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};

export default Page;
