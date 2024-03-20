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
  FormLabel,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { gql, useMutation } from "@apollo/client";
import { useUserAPI } from "@/hooks/UserContext";
import { LOGIN_PARENT } from "@/gql/mutations";
import { MdEmail } from "react-icons/md";
import Loading from "@/app/loading";

interface ConfirmationProps {}

const Confirmation: FC<ConfirmationProps> = ({}) => {
  const router = useRouter();

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
          maxW={{ base: "auto", md: "550px" }}
          py={8}
          px={{ base: "2rem", md: "3rem" }}
          rounded={"lg"}
          shadow={"md"}
        >
          <Box
            textAlign={"start"}
            display={"flex"}
            flexDir={"column"}
            gap={"2"}
          >
            <Text color={"#005D5D"} fontWeight={"bold"} fontSize={"2xl"}>
              Check your email
            </Text>
            <Text color={"#005D5D90"} fontWeight={"600"} fontSize={"md"}>
              An email containing a password reset link has been sent to your email, please follow that link to reset your password.
            </Text>
          </Box>

          <Box
            display={"flex"}
            flexDir={"column"}
            gap={6}
            mb={"1rem"}
            mt={"3rem"}
          >

            <Button
              backgroundColor={"#005D5D"}
              color={"#fff"}
              w={"full"}
              _hover={{ backgroundColor: "#005D5D90" }}
              onClick={()=>router.push('/signin')}
            >
              Return to Sign In
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Confirmation;
