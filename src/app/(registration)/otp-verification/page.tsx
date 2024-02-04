"use client";
import { FC, useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  HStack,
  PinInput,
  PinInputField,
  Button,
} from "@chakra-ui/react";
import { AiOutlineCheck } from "react-icons/ai";
import { gql, useMutation } from "@apollo/client";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerified, setIsVerified] = useState(true);

  const handleOtpChange = (value: string, index: number) => {
    const newPin = [...otp];
    newPin[index] = value;
    setOtp(newPin);
  };
  return (
    <>
      <Flex justifyContent={"center"} minH={"100vh"} alignItems={"center"}>
        <Box
          py={"1.5rem"}
          rounded={"lg"}
          w={{ base: "25rem", lg: "30rem" }}
          border={"1px solid #D5D5D5"}
        >
          <Flex justifyContent={"center"}>
            <Image
              src={"/images/greylightBordered.svg"}
              //   width={{ base: "10rem", md: "13rem" }}
              alt="'logo"
            />
          </Flex>
              <Box my={"1.5rem"} textAlign={"center"}>
                <Text
                  mt={"2.5rem"}
                  fontSize={{ base: "lg", md: "2xl" }}
                  fontWeight={"600"}
                >
                  OTP - Email Verification
                </Text>

                <Text fontSize={"sm"} color={"#BFBFBF"} my={"1rem"}>
                  Input the OTP Code that was sent to your email to verify your
                  account
                </Text>
              </Box>

              <HStack justifyContent={"center"} mt={"4rem"} mb={"8rem"}>
                <PinInput otp type="number" size={"lg"}>
                  {otp.map((value, index) => {
                    return (
                      <PinInputField
                        color={"#fff"}
                        border={"1px solid #747474"}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        key={index}
                        value={value}
                      />
                    );
                  })}
                </PinInput>
              </HStack>

              <Flex justifyContent={"center"} my={"1.5rem"}>
                <Button
                  mt={4}
                  backgroundColor={"#007C7B"}
                  color={"#fff"}
                  fontWeight={"400"}
                  w={"17rem"}
                  _hover={{ backgroundColor: "#099C9B" }}
                >
                  Continue
                </Button>
              </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Page;
