"use client";
import { FC, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Select,
  Button,
  Image,
  IconButton,
  Table,
  Thead,
  TableContainer,
  Tr,
  Tbody,
  Td,
  Th,
  Avatar,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import { AiOutlinePlus } from "react-icons/ai";
import ResultCard from "@/components/shared/resultCard";

interface ResultsProps {};

const Results: FC<ResultsProps> = ({}) => {
  const [resultsType, setResultstype] = useState("");
  const [resultsData, setResultsdata] = useState([
    {
      schoolName: "Green Springs High School",
      dateGenerated: "12th August 2023",
      term: "3rd Term",
      examType: "Final Exams",
      schoolLogo: "/images/schoollogo.png",
    },
    {
      schoolName: "Green Springs High School",
      dateGenerated: "5th June 2023",
      term: "3rd Term",
      examType: "Mid-Term",
      schoolLogo: "/images/schoollogo.png",
    },
    {
      schoolName: "Green Springs High School",
      dateGenerated: "10th April 2023",
      term: "2nd Term",
      examType: "Final Exams",
      schoolLogo: "/images/schoollogo.png",
    },
  ]);

  const [studentsTableData, setStudentsTableData] = useState({
    columnNames: [
      "School",
      "Status",
      "Term",
      "Type",
      "Shared by",
      "Shared date",
    ],
    columnData: [
      {
        school: {
          schoolName: "Green Springs High School",
          schoolLogo: "/images/schoollogo.png",
        },
        status: "unofficial",
        term: "3rd Term",
        type: "Final Exams",
        sharedBy: {
          sharerProfileUrl:
            "https://static.showit.co/1200/xB1lV1mcSc2pFszaHaQMCw/82976/janel-lee_photography_cincinnati_ohio_professional_headshots_personal_branding_bryen_pinkard.jpg",
          sharerName: "Mayowa Chinedu",
        },
        shareDate: "12 August 2023",
      },
      {
        school: {
          schoolName: "Green Springs High School",
          schoolLogo: "/images/schoollogo.png",
        },
        status: "unofficial",
        term: "3rd Term",
        type: "Final Exams",
        sharedBy: {
          sharerProfileUrl:
            "https://static.showit.co/1200/xB1lV1mcSc2pFszaHaQMCw/82976/janel-lee_photography_cincinnati_ohio_professional_headshots_personal_branding_bryen_pinkard.jpg",
          sharerName: "Mayowa Chinedu",
        },
        shareDate: "12 August 2023",
      },
      {
        school: {
          schoolName: "Green Springs High School",
          schoolLogo: "/images/schoollogo.png",
        },
        status: "unofficial",
        term: "3rd Term",
        type: "Final Exams",
        sharedBy: {
          sharerProfileUrl:
            "https://static.showit.co/1200/xB1lV1mcSc2pFszaHaQMCw/82976/janel-lee_photography_cincinnati_ohio_professional_headshots_personal_branding_bryen_pinkard.jpg",
          sharerName: "Mayowa Chinedu",
        },
        shareDate: "12 August 2023",
      },
    ],
  });

  const handleResultsTypeChange = (e: any) => {
    setResultstype(e.target.value);
  };

  return (
    <Box mb={"5rem"}>
      <Text>Result Type</Text>
      <Flex justifyContent={"space-between"} my={"1rem"}>
        <Box>
          {resultsType}
          <Select
            placeholder="Generated"
            value={resultsType}
            onChange={handleResultsTypeChange}
            size={"md"}
            border={"2px solid #747474"}
            fontSize={"sm"}
            color={"#747474"}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </Box>
        <Button
          backgroundColor={"#005D5D"}
          color={"#fff"}
          _hover={{ backgroundColor: "#03594A" }}
          size={"md"}
        >
          <AiOutlinePlus />
          <Text fontWeight={"light"} pl="0.5rem" fontSize={"sm"}>
            Upload Result
          </Text>
        </Button>
      </Flex>

      <Box>
        <Text mb={"1rem"}>Most Recent</Text>
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

      <Box mt={{ base: "12" }}>
        <TableContainer>
          <Table
            size={{ base: "sm", xl: "md" }}
            variant="striped"
            colorScheme="gray"
            borderColor={"#454545"}
          >
            <Thead>
              <Tr>
                {studentsTableData.columnNames.map((column, index) => {
                  return (
                    <Th
                      key={index}
                      color={"#000"}
                      textTransform={"none"}
                      fontWeight={"600"}
                      fontSize={"lg"}
                    >
                      {column}
                    </Th>
                  );
                })}
              </Tr>
            </Thead>
            <Tbody>
              {studentsTableData.columnData.map((data, index) => {
                return (
                  <Tr key={index}>
                    <Td key={index} color={"#000"}>
                      <Flex gap={2} alignItems={"center"}>
                        <Image
                          boxSize={"6"}
                          src={data.school.schoolLogo}
                          alt="logo"
                        />
                        <Text fontSize={"sm"} fontWeight={"500"}>
                          {data.school.schoolName}
                        </Text>
                      </Flex>
                    </Td>
                    <Td key={index} color={"#000"}>
                      {data.status}
                    </Td>
                    <Td key={index} color={"#000"}>
                      {data.term}
                    </Td>
                    <Td key={index} color={"#000"}>
                      {data.type}
                    </Td>
                    <Td key={index}>
                      <Flex gap={2} alignItems={"center"}>
                        <Avatar
                          size={"xs"}
                          src={data.sharedBy.sharerProfileUrl}
                        />
                        <Text fontSize={"md"} fontWeight={"400"}>
                          {data.sharedBy.sharerName}
                        </Text>
                      </Flex>
                    </Td>
                    <Td key={index} color={"#000"}>
                      {data.shareDate}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Results;
