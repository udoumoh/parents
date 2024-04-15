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
  useToast,
  FormLabel,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { gql, useMutation } from "@apollo/client";
import { MdEmail } from "react-icons/md";
import { RESET_PASSWORD_LINK } from "@/gql/mutations";

interface ForgotPasswordProps {}

const ForgotPassword: FC<ForgotPasswordProps> = ({}) => {
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [sendPasswordResetEmail] = useMutation(RESET_PASSWORD_LINK);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = async () => {
    setIsSubmitting(true);
    try {
      const response = await sendPasswordResetEmail({
        variables: {
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

      if (!response?.data?.forgotParentPassword) {
        toast({
          title: "Server Error",
          description: 'An error occurred while resetting your password',
          position: "top-right",
          variant: "left-accent",
          isClosable: true,
          status: "error",
        });
        return;
      }

      if(response?.data?.forgotParentPassword){
          toast({
            title: "Password Reset Link sent successfully",
            description: "A link has been sent to your email for password reset, please follow that link to reset your password",
            position: "top-right",
            variant: "left-accent",
            isClosable: true,
            status: "success",
          });
          setTimeout(() => {
            window.location.replace('/confirmation')
          }, 2000)
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: 'A server side error has occured',
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
        status: "error",
      });

      console.error(error.message);
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
          <Box textAlign={"start"} display={'flex'} flexDir={'column'} gap={'2'}>
            <Text color={"#005D5D"} fontWeight={"bold"} fontSize={"2xl"}>
              Forgot  your password?
            </Text>
            <Text color={"#005D5D90"} fontWeight={"600"} fontSize={"md"}>
              Enter the email associated with your account, a link will be sent to you for password reset.
            </Text>
          </Box>

          <Box
            display={"flex"}
            flexDir={"column"}
            gap={6}
            mb={"1rem"}
            mt={"3rem"}
          >
            <Box>
            <FormLabel color={'#005D5D'} fontWeight={'bold'}>Email</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <MdEmail color="#005D5D" size={20} />
              </InputLeftElement>
              <Input
                onChange={handleEmailChange}
                type="email"
                placeholder="johndoe@gn.com"
                pl={"2.5rem"}
                focusBorderColor="#005D5D80"
                border={"1px solid #005D5D30"}
              />
            </InputGroup>
            </Box>

            <Button
              backgroundColor={"#005D5D"}
              color={"#fff"}
              w={"full"}
              _hover={{ backgroundColor: "#005D5D90" }}
              isLoading={isSubmitting}
              onClick={handleChangePassword}
              isDisabled={email.length === 0 ? true : false}
            >
              Continue
            </Button>

            <Box>
              <Text
                color={"gray.600"}
                fontSize={"sm"}
                fontWeight={"600"}
                textAlign={"center"}
              >
                Already have an account?{" "}
                <Link color={"#007C7B"} onClick={() => window.location.replace("/signin")}>
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

export default ForgotPassword;
