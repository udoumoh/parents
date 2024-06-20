'use client'
import { FC } from 'react'
import {Box, Text, Flex, Button, Icon, Image, useToast,} from '@chakra-ui/react'
import { IoCheckmarkSharp } from "react-icons/io5";
import { FaLock } from "react-icons/fa6";
import { useUserAPI } from '@/hooks/UserContext';

interface ChooseSubscriptionProps {
  
}

const ChooseSubscription: FC<ChooseSubscriptionProps> = ({}) => {
  const toast = useToast()
  const {parentData} = useUserAPI();
  let parentEmail = localStorage.getItem('userEmail')
  let parentFirstName = localStorage.getItem('userFirstName')
  let parentLastName = localStorage.getItem('userLastName')

  const handleSubmit = async (plan: any) => {
    const monthlyUrl = `https://paystack.com/pay/gn-parent-monthly/?email=${parentEmail}&first_name=${parentFirstName}&last_name=${parentLastName}&readonly=first_name,last_name,email`;
    const quaterlyUrl = `https://paystack.com/pay/gn-parent-quarterly/?email=${parentEmail}&first_name=${parentFirstName}&last_name=${parentLastName}&readonly=first_name,last_name,email`;
    const yearlyUrl = `https://paystack.com/pay/gn-parent-yearly/?email=${parentEmail}&first_name=${parentFirstName}&last_name=${parentLastName}&readonly=first_name,last_name,email`;
    if (plan === "monthly") {
      window.location.assign(monthlyUrl);
    } else if (plan === "quaterly") {
      window.location.assign(quaterlyUrl);
    } else if (plan === "yearly") {
      window.location.assign(yearlyUrl);
    } else {
      toast({
        title: "No plan chosen",
        description: "Please select a plan to proceed",
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
        status: "error",
      });
    }
  };

  return (
    <Box
      minH={"100vh"}
      px={{ base: "2rem", md: "5rem", xl: "15rem" }}
      backgroundColor={"#005D5D10"}
    >
      <Flex py={"2rem"}>
        <Image alt="logo" src={"/images/greylightBordered.svg"} h={"50px"} />
      </Flex>
      <Flex
        mt={"2rem"}
        justifyContent={"center"}
        flexDir={"column"}
        alignItems={"center"}
        w={"full"}
        textAlign={"center"}
        px={"2rem"}
      >
        <Text fontSize={{ base: "3xl", xl: "5xl" }} fontWeight={"semibold"}>
          Plans for every Parent/Guardian
        </Text>
        <Text mt={"1.5rem"} fontWeight={"semibold"}>
          Your previous subscription has expired, please renew your subscription
          to access your dashboard.
        </Text>
      </Flex>
      <Flex
        w={"full"}
        gap={5}
        mt={"2rem"}
        flexDir={{ base: "column", md: "row" }}
      >
        <Box
          px={"1.5rem"}
          py={"1rem"}
          backgroundColor={"#FFFFFF"}
          w="full"
          border={"1px solid #005D5D"}
          borderTopRadius={"lg"}
          borderBottomRightRadius={"lg"}
          _hover={{ transform: "scale(1.02)", transition: "0.5s" }}
        >
          <Text>Monthly</Text>
          <Text fontSize={{ base: "md", md: "4xl" }} mt={"1rem"}>
            <strong>₦250</strong>
            <sub
              style={{
                color: "#00000070",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              /month
            </sub>
          </Text>
          <Text fontSize={"xs"} color={"#00000090"}>
            *Billed monthly (₦250/month).
          </Text>
          <Flex gap={3} alignItems={"center"} mt={"3rem"}>
            <Icon as={IoCheckmarkSharp} boxSize={5} color={"green.600"} />
            <Text>
              Register up to <strong>4</strong> children
            </Text>
          </Flex>
          <Flex
            gap={3}
            alignItems={"center"}
            fontSize={{ base: "sm", md: "md" }}
          >
            <Icon as={IoCheckmarkSharp} boxSize={5} color={"green.500"} />
            <Text>
              Pay an additional <strong>₦65</strong> per child if you have more
              than 4 children
            </Text>
          </Flex>
          <Flex
            gap={3}
            alignItems={"center"}
            mb={"3rem"}
            fontSize={{ base: "sm", md: "md" }}
          >
            <Icon as={IoCheckmarkSharp} boxSize={5} color={"green.500"} />
            <Text>Pay every month to renew subscription</Text>
          </Flex>
          <Button
            fontSize={"md"}
            w={"full"}
            colorScheme="green"
            onClick={() => handleSubmit("monthly")}
          >
            Select Monthly Plan
          </Button>
        </Box>

        <Box
          px={"1.5rem"}
          py={"1rem"}
          backgroundColor={"#FFFFFF"}
          w="full"
          border={"1px solid #005D5D"}
          rounded={"lg"}
          _hover={{ transform: "scale(1.02)", transition: "0.5s" }}
        >
          <Text>Quarterly</Text>
          <Text fontSize={{ base: "md", md: "4xl" }} mt={"1rem"}>
            <strong>₦750</strong>
            <sub
              style={{
                color: "#00000070",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              /3 months
            </sub>
          </Text>
          <Text fontSize={"xs"} color={"#00000090"}>
            *Billed monthly (₦750/3 months).
          </Text>
          <Flex gap={3} alignItems={"center"} mt={"3rem"}>
            <Icon as={IoCheckmarkSharp} boxSize={5} color={"green.500"} />
            <Text>
              Register up to <strong>4</strong> children
            </Text>
          </Flex>
          <Flex
            gap={3}
            alignItems={"center"}
            fontSize={{ base: "sm", md: "md" }}
          >
            <Icon as={IoCheckmarkSharp} boxSize={5} color={"green.500"} />
            <Text>
              Pay an additional <strong>₦195</strong> per child if you have more
              than 4 children
            </Text>
          </Flex>
          <Flex
            gap={3}
            alignItems={"center"}
            mb={"3rem"}
            fontSize={{ base: "sm", md: "md" }}
          >
            <Icon as={IoCheckmarkSharp} boxSize={5} color={"green.500"} />
            <Text>Pay every 3 months to renew subscription</Text>
          </Flex>
          <Button
            fontSize={"md"}
            w={"full"}
            colorScheme="green"
            onClick={() => handleSubmit("quaterly")}
          >
            Select Quaterly Plan
          </Button>
        </Box>

        <Box
          px={"1.5rem"}
          py={"1rem"}
          backgroundColor={"#FFFFFF"}
          w="full"
          border={"1px solid #005D5D"}
          borderTopRadius={"lg"}
          borderBottomLeftRadius={"lg"}
          _hover={{ transform: "scale(1.02)", transition: "0.5s" }}
        >
          <Text>Yearly</Text>
          <Text fontSize={{ base: "md", md: "4xl" }} mt={"1rem"}>
            <strong>₦2500</strong>
            <sub
              style={{
                color: "#00000070",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              /year
            </sub>
          </Text>
          <Text fontSize={"xs"} color={"#00000090"}>
            *Billed yearly (₦2500/year).
          </Text>
          <Flex
            gap={3}
            alignItems={"center"}
            mt={"3rem"}
            fontSize={{ base: "sm", md: "md" }}
          >
            <Icon as={IoCheckmarkSharp} boxSize={5} color={"green.500"} />
            <Text>
              Register up to <strong>4</strong> children
            </Text>
          </Flex>
          <Flex
            gap={3}
            alignItems={"center"}
            fontSize={{ base: "sm", md: "md" }}
          >
            <Icon as={IoCheckmarkSharp} boxSize={5} color={"green.500"} />
            <Text>
              Pay an additional <strong>₦500</strong> per child if you have more
              than 4 children
            </Text>
          </Flex>
          <Flex
            gap={3}
            alignItems={"center"}
            mb={"3rem"}
            fontSize={{ base: "sm", md: "md" }}
          >
            <Icon as={IoCheckmarkSharp} boxSize={5} color={"green.500"} />
            <Text>Pay every year to renew subscription</Text>
          </Flex>
          <Button
            fontSize={"md"}
            w={"full"}
            colorScheme="green"
            onClick={() => handleSubmit("yearly")}
          >
            Select Yearly Plan
          </Button>
        </Box>
      </Flex>

      <Flex
        w={"full"}
        alignItems={"center"}
        justifyContent={"center"}
        my={"2rem"}
        gap={3}
      >
        <Icon as={FaLock} boxSize={4} color={"#005D5D"} />
        <Text fontSize={"sm"} fontWeight={"semibold"} color={"#005D5D"}>
          100% SECURE PAYMENTS
        </Text>
      </Flex>
    </Box>
  );
}

export default ChooseSubscription;