"use client";
import { FC } from "react";
import {
  Box,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface ConfirmOtpProps {}

const ConfirmOtp: FC<ConfirmOtpProps> = ({}) => {
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
            gap={"5"}
          >
            <Text color={"#005D5D"} fontWeight={"bold"} fontSize={"2xl"}>
              Check your email
            </Text>
            <Image alt="check your email" src={'/images/check.svg'} h={'150px'} />
            <Text color={"#005D5D90"} fontWeight={"600"} fontSize={"md"}>
             {` An OTP (One-Time Password) has been sent to your email. Please
              check your inbox/spam folder and enter the OTP to verify your
              account. Click 'Proceed' to continue.`}
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
              onClick={() => window.location.replace("/verifyotp")}
            >
              Proceed to verify OTP
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ConfirmOtp;
