"use client";
import { FC, useState } from "react";
import {
  Box,
  Flex,
  Button,
  Avatar,
  Text,
  Image,
  Icon,
  Divider,
  Wrap,
  WrapItem,
  VStack,
} from "@chakra-ui/react";
import { AiFillClockCircle } from "react-icons/ai";
import ResultCard from "@/components/shared/resultCard";

interface SettingsPageProps {}

const LegendBadge = ({ ...rest }) => {
    
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      px={"0.8rem"}
      py={"0.2rem"}
      border={"1.5px solid #A3007F"}
      rounded={"lg"}
      backgroundColor={"#FFDDF7"}
      width={"5.5rem"}
      {...rest}
    >
      <Text color={"#A3007F"} fontSize={"xs"} fontWeight={"600"}>
        Mother
      </Text>
    </Flex>
  );
};

const SettingsPage: FC<SettingsPageProps> = ({}) => {
    const [wardData, setWarddata] = useState([
      {
        name: "Chibuzor Ali-Williams",
        profileImage:
          "https://th.bing.com/th/id/R.5dcfec967642191443ae9a4b04c55d47?rik=oahz060yDmOp%2bA&pid=ImgRaw&r=0",
        greynoteNumber: "GN24002",
      },
      {
        name: "Chiamaka Ali-Williams",
        profileImage: "/images/profileImg.jpeg",
        greynoteNumber: "GN24002",
      },
    ]);
    const [resultsData, setResultsdata] = useState([
      {
        schoolName: "Green Springs High School",
        dateGenerated: "12th August 2023",
        term: "Results",
        examType: "Verified",
        schoolLogo: "/images/schoollogo.png",
      },
      {
        schoolName: "Green Springs High School",
        dateGenerated: "10th April 2023",
        term: "Results",
        examType: "Verified",
        schoolLogo: "/images/schoollogo.png",
      },
    ]);
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        w={"full"}
        px={"12%"}
        overflowY={"auto"}
        h={"100vh"}
        pt={"2rem"}
        pb={"5rem"}
      >
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Flex alignItems={"center"} gap={5}>
            <Avatar
              src="https://media.istockphoto.com/id/1183107601/photo/african-american-lady-talking-on-phone-sitting-at-workplace.jpg?s=612x612&w=0&k=20&c=A5ABRClT_h8x-PkNlyP_fhMyH8BvlAfKuqygMGTL7OA="
              size={"2xl"}
            />
            <Box>
              <Flex alignItems={"center"} gap={2}>
                <Text fontSize={"2xl"} fontWeight={"bold"}>
                  Adenike Ali-Williams
                </Text>
                <Image
                  src="/images/verifiedtag.png"
                  alt="badge"
                  w={"1rem"}
                  h={"1rem"}
                />
              </Flex>

              <LegendBadge mt={"0.8rem"} />

              <Flex alignItems={"center"} gap={2} mt="0.5rem">
                <Icon as={AiFillClockCircle} color={"#747474"} />
                <Text color={"#747474"} fontSize={"sm"}>
                  Created on 25th October 2022
                </Text>
              </Flex>
            </Box>
          </Flex>
          <Button backgroundColor={"#005D5D"} size={"sm"} color={"#fff"}>
            <Text fontSize={"xs"} px={"1rem"}>
              Edit Profile
            </Text>
          </Button>
        </Flex>

        <Divider my={"2rem"} />

        <Flex justifyContent={"space-between"} w={"full"}>
          <Flex flexDir={"column"}>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              Linked Students
            </Text>
            <Flex gap={20} mt={"1rem"}>
              {wardData.map((item, index) => {
                return (
                  <Flex
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={2}
                    key={index}
                  >
                    <Avatar
                      size={"md"}
                      src={item.profileImage}
                      pointerEvents={"none"}
                    />
                    <Box lineHeight={"20px"}>
                      <Text fontWeight={"600"} fontSize={"sm"}>
                        {item.name}
                      </Text>
                      <Text
                        fontSize={"12px"}
                        color={"#AAAAAA"}
                        fontWeight={"600"}
                      >
                        {item.greynoteNumber}
                      </Text>
                    </Box>
                  </Flex>
                );
              })}
            </Flex>

            <Box mt={"2rem"}>
              <Text fontWeight={"500"} mb={"1rem"}>
                Uploaded Files
              </Text>
              <Wrap gap={5} flexDir={{ base: "column", lg: "row" }}>
                {resultsData.map((result, index) => {
                  return (
                    <WrapItem key={index}>
                      <ResultCard key={index} result={result} />
                    </WrapItem>
                  );
                })}
              </Wrap>
            </Box>
          </Flex>

          <Box>
            <Text fontSize={"sm"} fontWeight={"bold"} textAlign={"start"}>
              Invoices
            </Text>
            <VStack border={"1px solid #E2E2E2"} py={"1rem"} px={'2rem'} rounded={"lg"} justifyContent={'center'} mt={'1rem'} pb={'10rem'}>
              <Image
                src="/images/invoiceillustration.svg"
                alt="invoice"
                boxSize={"28"}
              />
              <Box mt={'2rem'}>
                <Text color={"#747474"} fontSize={'xs'} textAlign={'center'}>No invoice has been sent to you.</Text>
                <Text color={"#747474"} fontSize={'xs'} textAlign={'center'}>
                  You&apos;ll see them here once they are sent
                </Text>
              </Box>
            </VStack>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default SettingsPage;
