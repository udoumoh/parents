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
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { gql, useMutation } from "@apollo/client";

interface PageProps {}

const VERIFY_PARENT = gql(`
mutation VerifyParentCode($otpCode: Float!) {
  verifyParentCode(otpCode: $otpCode)
}`);

const Page: FC<PageProps> = ({}) => {
  const router = useRouter();
  const toast = useToast();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [verifyotp] = useMutation(VERIFY_PARENT);

  const handleOtpChange = (value: string, index: number) => {
    const newPin = [...otp];
    newPin[index] = value;
    setOtp(newPin);
  };

  const numArray: number[] = otp.map((str) => parseInt(str, 10));

  const handleSubmit = async () => {
    try {
      const response = await verifyotp({
        variables: {
          otpCode: parseInt(numArray.join("")),
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
      } else if (response.data.verifyParentCode.errors) {
        toast({
          title: "Server Error",
          description: response.data.verifyParentCode.errors[0].message,
          position: "top-right",
          variant: "left-accent",
          isClosable: true,
          status: "error",
        });
      } else {
        toast({
          title: "Email Verified",
          description:
            "Your email has been verified, you will be redirected soon.",
          position: "top-right",
          variant: "left-accent",
          isClosable: true,
          status: "success",
        });
        router.push("/link-child");
      }
    } catch (e: any) {
      toast({
        title: "Error",
        description: e?.message,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
        status: "error",
      });
    }
  };
  return (
    <>
      <Flex
        justifyContent={"center"}
        minH={"100vh"}
        alignItems={"center"}
        backgroundColor={"#005D5D20"}
      >
        <Box
          px={"1rem"}
          py={"1.5rem"}
          rounded={"lg"}
          w={{ base: "25rem", lg: "30rem" }}
          border={"1px solid #005D5D30"}
          shadow={"md"}
          backgroundColor={'#FFFFFF'}
        >
          <Flex justifyContent={"center"}>
            <Image
              src={"/images/greylightBordered.svg"}
              alt="'logo"
              pointerEvents={"none"}
            />
          </Flex>
          <Box my={"1.5rem"} textAlign={"center"}>
            <Text
              mt={"2.5rem"}
              fontSize={{ base: "lg", md: "2xl" }}
              fontWeight={"600"}
              color={"#005D5D"}
            >
              OTP - Email Verification
            </Text>

            <Text fontSize={"sm"} color={"#00000070"} my={"1rem"}>
              Input the OTP Code that was sent to your email to verify your
              account
            </Text>
          </Box>

          <HStack justifyContent={"center"} mt={"4rem"} mb={"8rem"}>
            <PinInput otp type="number" size={"lg"} placeholder="">
              {otp.map((value, index) => {
                return (
                  <PinInputField
                    color={"#000"}
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
              onClick={handleSubmit}
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
