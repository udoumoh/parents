"use client";
import { FC, useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  Input,
  FormControl,
  FormLabel,
  Button,
  useToast,
  Center,
  Flex,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { gql, useMutation } from "@apollo/client";
import { GET_PARENT } from "@/gql/queries/queries";
import { useQuery } from "@apollo/client";
import { BarLoader } from "react-spinners";

interface pageProps {}

const LOGIN_PARENT = gql(`
mutation LoginParent($password: String!, $email: String!) {
  loginParent(password: $password, email: $email) {
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
      role
      folder
      isDisabled
      profileImgUrl
    }
  }
}`);

const Signin: FC<pageProps> = ({}) => {
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginParent] = useMutation(LOGIN_PARENT);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: parent } = useQuery(GET_PARENT);

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
          email: email,
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
        gap={20}
        py={{ base: "2rem", lg: "0" }}
      >
        <Image src="/images/greylightBordered.svg" alt="logo" />
        <Box
          rounded={"xl"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          backgroundImage={"/images/loginbg.png"}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          w={{ base: "auto", lg: "670px" }}
          h={{ base: "auto", lg: "176px" }}
          p={{ base: "3rem", lg: "0rem" }}
        >
          <Text
            fontWeight={"700"}
            fontSize={{ base: "xl", lg: "4xl" }}
            color={"#fff"}
          >
            Login to your account
          </Text>
        </Box>
        <Box w={"full"} display={"flex"} flexDir={"column"} gap={10}>
          <FormControl>
            <FormLabel color={"#484848"} fontSize={"xl"}>
              Email Address
            </FormLabel>
            <Input
              fontSize={"xl"}
              py={"2rem"}
              rounded={"xl"}
              type="email"
              value={email}
              border={"1px solid #D5D5D5"}
              backgroundColor={"#F5F5F5"}
              onChange={handleEmailChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel color={"#484848"} fontSize={"xl"}>
              Password
            </FormLabel>
            <Input
              fontSize={"xl"}
              py={"2rem"}
              rounded={"xl"}
              type="password"
              value={password}
              border={"1px solid #D5D5D5"}
              backgroundColor={"#F5F5F5"}
              onChange={handlePasswordChange}
            />
          </FormControl>
        </Box>

        <Button
          onClick={handleLogin}
          backgroundColor={"#007C7B"}
          w={"full"}
          py={"2rem"}
          color={"#fff"}
          fontSize={"2xl"}
          _hover={{ backgroundColor: "#0F5151" }}
          isLoading={isSubmitting}
        >
          Login
        </Button>
      </Box>
        <Text
          color={"#747474"}
          fontSize={{ base: "xs", lg: "md" }}
          mt={"2rem"}
          fontWeight={"600"}
          textAlign={"center"}
        >
         Don&apos;t have an account?{" "}
          <Link color={"#007C7B"} onClick={() => router.push("/signup")}>
            {`Sign Up ->`}
          </Link>
        </Text>
    </Box>
  );
};

export default Signin;
