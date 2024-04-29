"use client";
import { FC, useEffect, useState } from "react";
import {
  Box,
  Text,
  Button,
  Image,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { LOGIN_PARENT } from "@/gql/mutations";
import { GET_PARENT } from "@/gql/queries";
import { useQuery } from "@apollo/client";
import Loading from "@/app/loading";
import { useUserAPI } from "@/hooks/UserContext";
import axios from "axios";
import { INITIATE_PARENT_SUBSCRIPTION } from "@/gql/mutations";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const {parentData} = useUserAPI();
  const toast = useToast();
  const [initiateSubscription] = useMutation(INITIATE_PARENT_SUBSCRIPTION);
  const [subscriptionData, setSubscriptionData] = useState<any>({})
  const [isLoading, setIsloading] = useState(false)

  const token = process.env.NEXT_PUBLIC_API_TOKEN;

  const handleInitiateSubscription = async () => {
    setIsloading(true)
    try {
      const response = await initiateSubscription({
        variables: { subAmount: subscriptionData?.amount, plan: subscriptionData?.plan?.name, code: subscriptionData?.subscription_code },
      });
      console.log(response)
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

      if (response?.data?.initiateParentSubscription) {
        toast({
          title: "Plan Initialized Successfully",
          description: `You have successfully joined the ${subscriptionData?.plan.name}`,
          position: "top-right",
          variant: "left-accent",
          isClosable: true,
          status: "success",
        });
        setTimeout(() => {
          window.location.replace("/dashboard/home/overview");
        }, 1000);
      } else {
        toast({
          title: "Subscription Error",
          description:
            "An error has occured, unable to initialize subscription",
          status: "error",
          variant: "left-accent",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      console.error("Error during login:", error);
    } finally {
      setIsloading(false)
    }
  };

  useEffect(() => {
    const fetchData = async() => {
      try {
        axios.get(
          `https://api.paystack.co/subscription?email=${parentData?.email}`,
          {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
          }
        ).then((response) => {
          setSubscriptionData(response.data.data[0])
        })
      } catch (err: any) {
          console.log(err?.mesage)
      }
    }
    fetchData()
  }, [parentData])

  return  (
    <Box
      display={"flex"}
      w={"full"}
      flexDir={"column"}
      minH={"100vh"}
      backgroundColor={"gray.100"}
      backdropBlur={"30px"}
    >
      <Box display={"flex"} py={"1rem"} px={"3rem"}>
        <Image
          src="/images/greylightBordered.svg"
          alt="logo"
          display={{ base: "none", sm: "block" }}
          h={"50px"}
          w={"50px"}
        />
      </Box>
      <Box
        display={"flex"}
        flexDir={"column"}
        alignItems={{ base: "initial", sm: "center" }}
        gap={10}
        p={2}
        mt={"5rem"}
      >
        <Box
          backgroundColor={"#fff"}
          w={{ base: "full", sm: "450px", md: "600px" }}
          py={5}
          px={{ base: "1rem", sm: "3rem" }}
          rounded={"lg"}
          shadow={{ base: "none", md: "md" }}
        >
          <Box textAlign={"center"}>
            <Text color={"#005D5D"} fontWeight={"bold"} fontSize={"2xl"}>
              Initiate your subscription for {subscriptionData?.plan?.name}
            </Text>
          </Box>

          <Box display={'flex'} justifyContent={'center'} alignItems={'center'} mt={'1rem'}>
            <Text color={"#005D5D90"} fontWeight={"bold"} fontSize={"5xl"}>
              ₦{(subscriptionData?.amount / 100).toLocaleString()}
            </Text>
          </Box>

          <Box
            display={"flex"}
            flexDir={"column"}
            mb={"1rem"}
            mt={"2rem"}
            w={"full"}
          >
            <Button colorScheme="teal" onClick={handleInitiateSubscription} isLoading={isLoading}>
              Initiate Subscription
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
 
};

export default Page;
