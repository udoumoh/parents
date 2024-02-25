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
import { useUserAPI } from "@/hooks/UserContext";
import {gql, useMutation} from "@apollo/client"
import { useRouter } from "next/navigation";
import { formatDate } from "@/helpers/formatDate";

interface SettingsPageProps {}
interface LegendBadgeProps {
  role: string;
  mt?: { base: string; lg: string };
}

const LOGOUT_PARENTS = gql(`
mutation Mutation {
  logoutParent
}
`);

const LegendBadge: React.FC<LegendBadgeProps> = ({ role, mt, ...rest }) => {
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
        {role}
      </Text>
    </Flex>
  );
};

const SettingsPage: FC<SettingsPageProps> = ({}) => {
    const router = useRouter()
    const [logoutParent] = useMutation(LOGOUT_PARENTS)
    const { profileData, parentData } = useUserAPI()
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

    const handleLogout = async () => {
      const response = await logoutParent() 
      if(response.data.logoutParent){
        router.push("/signin")
      }
    }
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      mb={'10rem'}
    >
      <Box
        w={"full"}
        px={"5%"}
        overflowY={"auto"}
        h={"100vh"}
        pt={"2rem"}
        pb={"10rem"}
      >
        <Flex
          justifyContent={"space-between"}
          alignItems={{ base: "center", lg: "start" }}
          flexDir={{ base: "column", lg: "row" }}
          // border={"1px solid #007C7B"}
          rounded={"lg"}
          p={"1rem"}
        >
          <Flex
            alignItems={"center"}
            gap={5}
            flexDir={{ base: "column", lg: "row" }}
            justifyContent={"center"}
          >
            <Avatar
              src={profileData.userBio.profileImage}
              size={{ base: "xl", lg: "2xl" }}
              pointerEvents={"none"}
            />
            <Box
              display={"flex"}
              flexDir={"column"}
              alignItems={{ base: "center", lg: "start" }}
              justifyContent={"center"}
            >
              <Flex alignItems={"center"} gap={2}>
                <Text fontSize={{ base: "lg", lg: "2xl" }} fontWeight={"bold"}>
                  {`${profileData.userBio.firstName} ${profileData.userBio.lastName}`}
                </Text>
                <Image
                  src="/images/verifiedtag.png"
                  alt="badge"
                  w={"1rem"}
                  h={"1rem"}
                  pointerEvents={"none"}
                />
              </Flex>

              <LegendBadge
                role={profileData.userBio.parentRole}
                mt={{ base: "0.3rem", lg: "0.8rem" }}
              />

              <Flex alignItems={"center"} gap={2} my="0.5rem">
                <Icon as={AiFillClockCircle} color={"#747474"} />
                <Text color={"#747474"} fontSize={{ base: "2xs", lg: "sm" }}>
                  Created on {formatDate(parentData?.createdAt)}
                </Text>
              </Flex>
            </Box>
          </Flex>
          <Flex gap={5}>
            <Button
              backgroundColor={"#005D5D"}
              // size={"sm"}
              color={"#fff"}
              colorScheme="teal"
              // fontSize={"xs"}
              px={"1rem"}
            >
              Edit Profile
            </Button>

            <Button
            variant={'outline'} colorScheme="red" onClick={handleLogout}>Logout</Button>
          </Flex>
        </Flex>

        <Divider my={"2rem"} />

        <Flex
          justifyContent={"space-between"}
          w={"full"}
          flexDir={{ base: "column", lg: "row" }}
        >
          <Flex flexDir={"column"} alignItems={"flex-start"}>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              Linked Students
            </Text>
            <Flex
              flexDir={{ base: "column", lg: "row" }}
              gap={{ base: "5", lg: "20" }}
              mt={"1rem"}
            >
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
        </Flex>
      </Box>
    </Box>
  );
};

export default SettingsPage;
