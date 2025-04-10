"use client";
import React,{ FC, useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { LOGIN_PARENT } from "@/gql/mutations";
import { MdEmail } from "react-icons/md";
import { IoMdLock, IoMdEyeOff, IoMdEye } from "react-icons/io";
import { GET_PARENT } from "@/gql/queries"
import { useQuery } from "@apollo/client";
import Loading from "../loading";

interface pageProps {}

const Signin: FC<pageProps> = ({}) => {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginParent] = useMutation(LOGIN_PARENT);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [show, setShow] = useState(false);
  const { data: parent, loading } = useQuery(GET_PARENT);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    setIsSubmitting(true);
    try {
      const response = await loginParent({
        variables: {
          password: password,
          email: email.toLowerCase(),
        },
      });

      if (!response.data) {
        toast({
          title: "Oops! Something went wrong. Please try again later.",
          position: "top-right",
          variant: "left-accent",
          isClosable: true,
          status: "error",
        });
        return;
      }

      const loginErrors = response.data.loginParent.errors;

      if (loginErrors) {
        toast({
          title: "Server Error",
          description: loginErrors[0].message,
          position: "top-right",
          variant: "left-accent",
          isClosable: true,
          status: "error",
        });
        return;
      }

      localStorage.setItem(
        "userEmail",
        response?.data?.loginParent?.parent?.email
      );
      localStorage.setItem(
        "userFirstName",
        response?.data?.loginParent?.parent?.firstName
      );
      localStorage.setItem(
        "userLastName",
        response?.data?.loginParent?.parent?.lastName
      );

      toast({
        title: "Login successful",
        description: "You are being redirected to your dashboard",
        position: "top",
        variant: "left-accent",
        isClosable: true,
        status: "success",
      });
      if (isMounted) {
        window.location.assign("/dashboard/home");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
        status: "error",
      });

      console.error("Error during login:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  if (!isMounted) {
    return null;
  }

  return loading ? (
    <Loading />
  ) : (
    <Box
      display={"flex"}
      alignItems={{ base: "initial", sm: "center" }}
      justifyContent={"center"}
      minH={"100vh"}
      backgroundColor={{ base: "#FFFFFF", sm: "#005D5D20" }}
      backdropBlur={"30px"}
    >
      <Box
        display={"flex"}
        flexDir={"column"}
        alignItems={{ base: "initial", sm: "center" }}
        justifyContent={{ base: "initial", sm: "center" }}
        gap={10}
        p={2}
      >
        <Image
          src="/images/greylightBordered.svg"
          alt="logo"
          display={{ base: "none", sm: "block" }}
        />
        <Box
          backgroundColor={"#fff"}
          w={{ base: "full", sm: "450px", md: "500px" }}
          py={5}
          px={{ base: "1rem", sm: "3rem" }}
          rounded={"lg"}
          shadow={{ base: "none", md: "md" }}
        >
          <Box textAlign={"center"}>
            <Text color={"#005D5D"} fontWeight={"bold"} fontSize={"2xl"}>
              Welcome back!
            </Text>
            <Text color={"#005D5D90"} fontWeight={"600"} fontSize={"sm"}>
              Enter your credentials to access your account
            </Text>
          </Box>

          <Box
            display={"flex"}
            flexDir={"column"}
            gap={6}
            mb={"1rem"}
            mt={"2rem"}
            w={"full"}
          >
            <Box>
              <Text
                fontSize={"sm"}
                fontWeight={"semibold"}
                color={"gray.700"}
                mb={"0.3rem"}
                display={{ base: "block", sm: "none" }}
              >
                Email Address
              </Text>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MdEmail color="#005D5D" size={20} />
                </InputLeftElement>
                <Input
                  onChange={handleEmailChange}
                  type="email"
                  placeholder="Enter your email"
                  pl={"2.5rem"}
                  focusBorderColor="#005D5D80"
                  border={"1px solid #005D5D30"}
                  fontSize={{ base: "sm", sm: "md" }}
                />
              </InputGroup>
            </Box>

            <Box>
              <Text
                fontSize={"sm"}
                fontWeight={"semibold"}
                color={"gray.700"}
                mb={"0.3rem"}
                display={{ base: "block", sm: "none" }}
              >
                Password
              </Text>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <IoMdLock color="#005D5D" size={20} />
                </InputLeftElement>
                <Input
                  onChange={handlePasswordChange}
                  type={show ? "text" : "password"}
                  placeholder="Enter your password"
                  pl={"2.5rem"}
                  focusBorderColor="#005D5D80"
                  border={"1px solid #005D5D30"}
                  fontSize={{ base: "sm", sm: "md" }}
                  onKeyDown={handleKeyDown}
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
            </Box>

            <Box w={"full"} textAlign={"right"}>
              <Button
                backgroundColor={"#005D5D"}
                color={"#fff"}
                w={"full"}
                _hover={{ backgroundColor: "#005D5D90" }}
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
                onClick={handleLogin}
              >
                Sign in
              </Button>
              <Link
                fontSize={"sm"}
                color={"#005D5D"}
                mt={"0.3rem"}
                onClick={() => window.location.assign("/forgotpassword")}
              >
                Forgot Password?
              </Link>
            </Box>

            <Box>
              <Text
                color={"gray.600"}
                fontSize={"sm"}
                fontWeight={"600"}
                textAlign={"center"}
              >
                Don&apos;t have an account?{" "}
                <Link
                  color={"#007C7B"}
                  onClick={() => window.location.assign("/signup")}
                >
                  {`Sign Up`}
                </Link>
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Signin;