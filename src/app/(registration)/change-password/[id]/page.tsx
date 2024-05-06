"use client";
import { FC, useState } from "react";
import {
  Box,
  Text,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Button,
  Image,
  Link,
  Icon,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { gql, useMutation } from "@apollo/client";
import { IoMdLock, IoMdEyeOff, IoMdEye } from "react-icons/io";
import { CHANGE_PARENT_PASSWORD } from "@/gql/mutations";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

interface Params {
  id: string;
}

interface PageProps {
  params: Params;
}

const Page: FC<PageProps> = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changePassword] = useMutation(CHANGE_PARENT_PASSWORD)

  const schema = Yup.object().shape({
    newPassword: Yup.string()
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Password confirm is required"),
  });

  const handleChangePassword = async(values: any) => {
    setIsSubmitting(true)
    try{
      const response = await changePassword({
        variables: {
          newPassword: values.newPassword,
          token: params.id
        }
      })
      if(!response) {
        toast({
          title: "Oops! Something went wrong. Please try again later.",
          position: "top-right",
          variant: "left-accent",
          isClosable: true,
          status: "error",
        });
      }
      if(!response.data.changeParentPassword){
        toast({
          title: "Error",
          description: "We were unable to change your password. Please try again",
          position: "top-right",
          variant: "left-accent",
          isClosable: true,
          status: "error",
        });
      }
      if (response.data.changeParentPassword) {
        toast({
          title: "Success",
          description:
            "Your password has been changed successfully, you will be redirected to the signin page shortly",
          position: "top-right",
          variant: "left-accent",
          isClosable: true,
          status: "success",
        });
        setTimeout(() => {
          window.location.assign('/signin')
        }, 2000)
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      h={"100vh"}
      backgroundColor={"#005D5D20"}
      backdropBlur={"30px"}
    >
      <Box
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={10}
        p={5}
      >
        <Image src="/images/greylightBordered.svg" alt="logo" />
        <Box
          backgroundColor={"#fff"}
          minW={{ base: "auto", md: "500px" }}
          py={5}
          px={{ base: "2rem", md: "3rem" }}
          rounded={"lg"}
          shadow={"md"}
        >
          <Box textAlign={"start"}>
            <Text color={"#005D5D"} fontWeight={"bold"} fontSize={"2xl"}>
              Reset your password
            </Text>
          </Box>

          <Box
            display={"flex"}
            flexDir={"column"}
            gap={6}
            mb={"1rem"}
            mt={"2rem"}
          >
            <Formik
              initialValues={{
                newPassword: "",
                confirmPassword: "",
              }}
              onSubmit={(values, actions) => {
                handleChangePassword(values)
              }}
              validationSchema={schema}
            >
              {(props) => (
                <Form>
                  <Field name="newPassword">
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={
                          form.errors.newPassword && form.touched.newPassword
                        }
                      >
                        <Box w={"full"} mb={"1rem"}>
                          <FormLabel color={"#005D5D"}>New Password</FormLabel>
                          <InputGroup>
                            <InputLeftElement pointerEvents="none">
                              <IoMdLock color="#005D5D" size={20} />
                            </InputLeftElement>
                            <Input
                              {...field}
                              type={showNewPassword ? "text" : "password"}
                              placeholder="***********"
                              pl={"2.5rem"}
                              focusBorderColor="#005D5D80"
                              border={"1px solid #005D5D30"}
                            />
                            <InputRightElement width="4.5rem">
                              <Icon
                                _hover={{ cursor: "pointer" }}
                                boxSize={5}
                                as={showNewPassword ? IoMdEyeOff : IoMdEye}
                                onClick={() => {
                                  setShowNewPassword(!showNewPassword);
                                }}
                                color={"#005D5D"}
                              />
                            </InputRightElement>
                          </InputGroup>
                          <FormErrorMessage>
                            {form.errors.newPassword}
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="confirmPassword">
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={
                          form.errors.confirmPassword &&
                          form.touched.confirmPassword
                        }
                      >
                        <Box w={"full"}>
                          <FormLabel color={"#005D5D"}>
                            Confirm Password
                          </FormLabel>
                          <InputGroup>
                            <InputLeftElement pointerEvents="none">
                              <IoMdLock color="#005D5D" size={20} />
                            </InputLeftElement>
                            <Input
                              {...field}
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="***********"
                              pl={"2.5rem"}
                              focusBorderColor="#005D5D80"
                              border={"1px solid #005D5D30"}
                            />
                            <InputRightElement width="4.5rem">
                              <Icon
                                _hover={{ cursor: "pointer" }}
                                boxSize={5}
                                as={showConfirmPassword ? IoMdEyeOff : IoMdEye}
                                onClick={() => {
                                  setShowConfirmPassword(!showConfirmPassword);
                                }}
                                color={"#005D5D"}
                              />
                            </InputRightElement>
                          </InputGroup>
                          <FormErrorMessage>
                            {form.errors.confirmPassword}
                          </FormErrorMessage>
                        </Box>
                        <Button
                          type="submit"
                          mt={"2.5rem"}
                          backgroundColor={"#005D5D"}
                          color={"#fff"}
                          w={"full"}
                          _hover={{ backgroundColor: "#005D5D90" }}
                          isDisabled={
                            !!(
                              form.errors.password ||
                              form.errors.confirmPassword
                            )
                          }
                          isLoading={isSubmitting}
                        >
                          Reset Password
                        </Button>
                      </FormControl>
                    )}
                  </Field>
                </Form>
              )}
            </Formik>

            <Box>
              <Text
                color={"gray.600"}
                fontSize={"sm"}
                fontWeight={"600"}
                textAlign={"center"}
              >
                Already have an account?{" "}
                <Link color={"#007C7B"} onClick={() => window.location.assign("/signin")}>
                  {`Sign In`}
                </Link>
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
