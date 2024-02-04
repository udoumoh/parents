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
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/components/imageUpload/ImageUpload";
import { gql, useMutation } from "@apollo/client";

interface pageProps {}

const REGISTER_PARENT = gql(`
mutation RegisterParent($folder: String!, $options: parentRegInput!) {
  registerParent(folder: $folder, options: $options) {
    errors {
      field
      message
    }
    parent {
      id
      userId
      status
      isPaid
      isVerified
      isReferred
      agreedTo
      createdAt
      firstName
      middleName
      lastName
      parentRole
      phoneNumber
      email
      relationToStudent
      role
      folder
      isDisabled
      profileImgUrl
    }
  }
}`);

const Page: FC<pageProps> = ({}) => {
  const toast = useToast()
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(0);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [profileUrl, setProfileUrl] = useState("");
  const [file, setFile] = useState<string>("");
  const [folder, setFolder] = useState<string>("");
  const [signup] = useMutation(REGISTER_PARENT);
  const [consent, setConsent] = useState(false);

const handleImageUpload = (
  uploadedImageUrl: string,
  uploadedFolder: string
) => {
  setProfileUrl(uploadedImageUrl); // Set the image URL received from the upload component
  setFolder(uploadedFolder); // Set the folder received from the upload component
  console.log(profileUrl);
};

  const handleTabsChange = () => {
    setTabIndex(tabIndex + 1);
    setConsent(true)
  };
  const handleProfileUrlChange = (url: any) => {
    setProfileUrl(url);
  };

  const schema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    middleName: Yup.string().required("First name is required"),
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
    >
      <Box
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={5}
        py={{ base: "2rem", lg: "0" }}
        mx={"2rem"}
      >
        <Image src="/images/greylightBordered.svg" alt="logo" />

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
          onSubmit={async (values, actions) => {
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
            console.log(response);

            if (!response.data) {
              toast({
                title: "Client Error",
                description:
                  "An error occured while you were creating your account",
                position: "bottom",
                variant: "left-accent",
                isClosable: true,
                status: "error",
              });
              actions.setSubmitting(false);
            } else if (response.data.registerParent.errors) {
              toast({
                title: "Server Error",
                description:
                  "An error occured while you were creating your account",
                position: "bottom",
                variant: "left-accent",
                isClosable: true,
                status: "error",
              });
            }
            toast({
              title: "Account created",
              description:
                "Your account was created successfully, you will be redirected soon.",
              position: "bottom",
              variant: "left-accent",
              isClosable: true,
              status: "success",
            });
            router.push("/otpverification");
            actions.setSubmitting(false);
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
                      <Text
                        fontSize={{ base: "xl", lg: "3xl" }}
                        fontWeight={"700"}
                        textAlign={"center"}
                        mb={"2rem"}
                      >
                        Create your account
                      </Text>
                      <Box
                        border={"1px solid #D5D5D5"}
                        px={{ base: "1rem", lg: "2rem" }}
                        py={"4rem"}
                        rounded={"xl"}
                        mx={"3rem"}
                      >
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
                                  <FormLabel color={"#999999"}>
                                    First Name
                                  </FormLabel>
                                  <Input
                                    border={"1px solid #D5D5D5"}
                                    {...field}
                                    py={"1.5rem"}
                                    type="text"
                                    backgroundColor={"#F5F5F5"}
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
                                  <FormLabel color={"#999999"}>
                                    Last Name
                                  </FormLabel>
                                  <Input
                                    border={"1px solid #D5D5D5"}
                                    {...field}
                                    py={"1.5rem"}
                                    type="text"
                                    backgroundColor={"#F5F5F5"}
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
                            <FormControl
                              isInvalid={
                                form.errors.middleName &&
                                form.touched.middleName
                              }
                              mb="1.5rem"
                            >
                              <Box w={"full"}>
                                <FormLabel color={"#999999"}>
                                  Middle Name
                                </FormLabel>
                                <Input
                                  border={"1px solid #D5D5D5"}
                                  {...field}
                                  py={"1.5rem"}
                                  type="text"
                                  backgroundColor={"#F5F5F5"}
                                  autoComplete="true"
                                />
                                <FormErrorMessage>
                                  {form.errors.middleName}
                                </FormErrorMessage>
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
                                  <FormLabel color={"#999999"}>Email</FormLabel>
                                  <Input
                                    border={"1px solid #D5D5D5"}
                                    {...field}
                                    py={"1.5rem"}
                                    type="email"
                                    backgroundColor={"#F5F5F5"}
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
                                  <FormLabel color={"#999999"}>
                                    Phone Number
                                  </FormLabel>
                                  <Input
                                    border={"1px solid #D5D5D5"}
                                    {...field}
                                    py={"1.5rem"}
                                    backgroundColor={"#F5F5F5"}
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
                                <FormLabel color={"#999999"}>
                                  Password
                                </FormLabel>
                                <Input
                                  border={"1px solid #D5D5D5"}
                                  {...field}
                                  py={"1.5rem"}
                                  type="password"
                                  backgroundColor={"#F5F5F5"}
                                  autoComplete="true"
                                />
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
                            isLoading={props.isSubmitting}
                            //   isDisabled={!props.values.firstName ? true : false}
                           
                          >
                            Continue
                          </Button>

                          <Text
                            color={"#979797"}
                            fontSize={{ base: "xs", lg: "sm" }}
                            textAlign={"center"}
                          >
                            By continuing, you agree to our Terms of use
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
                        display={"flex"}
                        flexDir={"column"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        gap={7}
                      >
                        <Box
                          backgroundImage={"/images/loginbg2.png"}
                          rounded={"xl"}
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          backgroundSize="cover"
                          backgroundPosition="center"
                          backgroundRepeat="no-repeat"
                          w={{ base: "auto", lg: "670px" }}
                          h={{ base: "auto", lg: "113px" }}
                          p={{ base: "3rem", lg: "0rem" }}
                        >
                          <Text
                            fontWeight={"700"}
                            fontSize={{ base: "xl", lg: "4xl" }}
                            color={"#fff"}
                          >
                            Complete your profile
                          </Text>
                        </Box>
                        <Flex justifyContent={"center"} mt={"1rem"}>
                          <Avatar size={"xl"} src={profileUrl} />
                        </Flex>

                        <Flex justifyContent={"center"} mb={"1.5rem"}>
                          <Button
                            mt={4}
                            fontSize={"xl"}
                            backgroundColor={"#007C7B"}
                            color={"#fff"}
                            fontWeight={"400"}
                            w={"17rem"}
                            onClick={() => {
                              handleTabsChange;
                              onOpen();
                            }}
                            _hover={{ backgroundColor: "#099C9B" }}
                            py={"1.5rem"}
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
                            color={"#747474"}
                            fontWeight={"600"}
                            fontSize={{ base: "md", lg: "xl" }}
                          >
                            What is your relationship to the student?
                          </Text>
                          <Field name="parentRole">
                            {({ field, form }: any) => (
                              <FormControl
                              // isInvalid={form.errors.name && form.touched.name}
                              >
                                <Box w={"full"}>
                                  <FormLabel color={"#999999"} fontSize={"md"}>
                                    Relationship to student
                                  </FormLabel>
                                  <Select
                                    placeholder=" "
                                    {...field}
                                    border={"1px solid #747474"}
                                    size={{ base: "sm", md: "lg" }}
                                    h={"3rem"}
                                    rounded={"md"}
                                    fontSize={"sm"}
                                    variant={"filled"}
                                  >
                                    <option value="Mother" color="#fff">
                                      Mother
                                    </option>
                                    <option value={"Father"}>Father</option>
                                  </Select>
                                </Box>
                              </FormControl>
                            )}
                          </Field>
                        </Flex>

                        <Flex justifyContent={"center"}>
                          <Button
                            mt={4}
                            px={"2rem"}
                            py={"1.5rem"}
                            backgroundColor={"#007C7B"}
                            color={"#fff"}
                            type="submit"
                            fontWeight={"400"}
                            w={"17rem"}
                            _hover={{ backgroundColor: "#099C9B" }}
                            isLoading={props.isSubmitting}
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
