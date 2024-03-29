"use client";
import { FC, useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import { gql, useMutation } from "@apollo/client";
import { useUserAPI } from "@/hooks/UserContext";
import { LOGIN_PARENT } from "@/gql/mutations";
import { MdEmail } from "react-icons/md";
import { IoMdLock, IoMdEyeOff, IoMdEye } from "react-icons/io";
import Loading from "@/app/loading";

interface pageProps {}

const Signin: FC<pageProps> = ({}) => {
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginParent] = useMutation(LOGIN_PARENT);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [show, setShow] = useState(false);

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
          title: "Client Error",
          description: "An error occurred while logging you in.",
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

      toast({
        title: "Login successful",
        description: "You are being redirected to your dashboard",
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
        status: "success",
      });
        window.location.replace("/dashboard/home/overview")
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
        p={2}
      >
        <Image src="/images/greylightBordered.svg" alt="logo" />
        <Box
          backgroundColor={"#fff"}
          w={{ base: "full", md: "500px" }}
          py={5}
          px={{ base: "1rem", sm: "2rem", md:"3rem" }}
          rounded={"lg"}
          shadow={"md"}
        >
          <Box textAlign={"center"}>
            <Text color={"#005D5D"} fontWeight={"bold"} fontSize={"2xl"}>
              Welcome back
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
              />
            </InputGroup>

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

            <Box w={"full"} textAlign={"right"}>
              <Button
                backgroundColor={"#005D5D"}
                color={"#fff"}
                w={"full"}
                _hover={{ backgroundColor: "#005D5D90" }}
                isLoading={isSubmitting}
                onClick={handleLogin}
              >
                Sign in
              </Button>
              <Link
                fontSize={"sm"}
                color={"#005D5D"}
                mt={"0.3rem"}
                onClick={() => router.push("/forgotpassword")}
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
                <Link color={"#007C7B"} onClick={() => router.push("/signup")}>
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
