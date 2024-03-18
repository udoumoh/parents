"use client";
import { FC, useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Select,
  Button,
  Image,
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
  useDisclosure,
} from "@chakra-ui/react";

import { AiOutlinePlus } from "react-icons/ai";
import ResultCard from "@/components/shared/resultCard";
import UploadResultModal from "@/components/shared/uploadResultModal";
import { GET_STUDENT_UPLOADED_RESULT } from "@/gql/queries";
import { GET_STUDENT_GENERATED_RESULT } from "@/gql/queries";
import { useQuery } from "@apollo/client";
import { useUserAPI } from "@/hooks/UserContext";
import { formatDate } from "@/helpers/formatDate";

interface ResultsProps {}

interface GeneratedResultsProps {
  dateGenerated: string;
  term: string;
  examType: string;
  schoolLogo: string;
  schoolName: string;
  status: string;
  sharerProfileUrl: string;
  sharerFirstName: string;
  sharerLastName: string;
  shareDate: string;
  documentPath: string;
}

const Results: FC<ResultsProps> = ({}) => {
  const {
    isOpen: isModalOpen,
    onClose: onModalClose,
    onOpen: onModalOpen,
  } = useDisclosure();
  const { currentWardProfile } = useUserAPI();
  const { data: getgeneratedresult } = useQuery(GET_STUDENT_GENERATED_RESULT, {
    variables: { studentId: currentWardProfile?.id },
  });
  const {data: getUploadedResult} = useQuery(GET_STUDENT_UPLOADED_RESULT, {
    variables: { studentId: currentWardProfile?.id, limit:100,},
  })
  const [resultsType, setResultstype] = useState("");
  const [generatedResults, setGeneratedResults] = useState<
    GeneratedResultsProps[]
  >([]);
  const [uploadedResults, setUploadedResults] = useState<
    GeneratedResultsProps[]
  >([]);
  const [currentResult, setCurrentResult] = useState<
    GeneratedResultsProps[]
  >([]);

  console.log(resultsType);
  useEffect(() => {
    const fetchGeneratedResult = async () => {
      try {
        const response = await getgeneratedresult;
        if (!response) {
          console.log("failed to fetch results data");
        }
        if (response) {
          const parsedResultsData = response?.studentGeneratedResult?.map(
            (item: any) => ({
              dateGenerated: formatDate(item?.createdAt || ""),
              term: item.academicTerm || "",
              examType: item.resultType || "",
              schoolLogo: item?.school?.logoImgUrl || "",
              schoolName: item?.school?.schoolName || "",
              status: item?.isOfficial || "",
              sharerProfileUrl:
                item?.student?.creator?.admin?.profileImgUrl || "",
              sharerFirstName: item?.student?.creator?.admin?.firstName || "",
              sharerLastName: item?.student?.creator?.admin?.lastName || "",
              shareDate: formatDate(
                item?.student?.creator?.admin?.createdAt || ""
              ),
            })
          );
          setGeneratedResults(parsedResultsData);
        }
      } catch (err: any) {
        console.log(err.message);
      }
    };

    const fetchUploadedResult = async () => {
      try {
        const response = await getUploadedResult;
        if (!response) {
          console.log("failed to fetch results data");
        }
        if (response) {
          console.log(response);
          const parsedResultsData = response?.studentResult?.results?.map(
            (item: any) => ({
              dateGenerated: formatDate(item?.createdAt || ""),
              term: item.academicTerm || "",
              examType: item.resultType || "",
              schoolLogo: currentWardProfile?.schoollogo || "",
              schoolName: currentWardProfile?.school,
              status: item?.isOfficial || "",
              sharerProfileUrl:
                item?.creatorPicture ||
                "https://th.bing.com/th/id/OIP.Nyre9GBOmmL4Vfkg_9GCLgHaFg?rs=1&pid=ImgDetMain",
              sharerFirstName: item?.creatorName || "",
              sharerLastName: item?.student?.creator?.admin?.lastName || "",
              shareDate: formatDate(
                item?.createdAt || ""
              ),
              documentPath: item?.document
            })
          );
          setUploadedResults(parsedResultsData);
        }
      } catch (err: any) {
        console.log(err.message);
      }
    };
    fetchUploadedResult();
    fetchGeneratedResult();
  }, [getgeneratedresult, getUploadedResult, currentWardProfile]);

  useEffect(() => {
    if(resultsType === "uploaded"){
      setCurrentResult(uploadedResults)
    } else if(resultsType === 'generated'){
      setCurrentResult(generatedResults)
    }
  }, [resultsType, generatedResults, uploadedResults ]);

  const columnNames = [
    "School",
    "Status",
    "Term",
    "Type",
    "Shared by",
    "Shared date",
  ];

  const handleResultsTypeChange = (e: any) => {
    setResultstype(e.target.value);
  };

  return (
    <Box mb={{ base: "8rem", lg: "5rem" }}>
      <Text>Result Type</Text>
      <Flex justifyContent={"space-between"} my={"1rem"}>
        <Box>
          <Select
            placeholder="Select Type"
            value={resultsType}
            onChange={handleResultsTypeChange}
            size={"md"}
            border={"2px solid #007C7B"}
            fontSize={"sm"}
            color={"#747474"}
            rounded={"md"}
            _hover={{ cursor: "pointer" }}
          >
            <option value="uploaded">Uploaded</option>
            <option value="generated">Generated</option>
          </Select>
        </Box>
        <Button
          backgroundColor={"#005D5D"}
          color={"#fff"}
          colorScheme="teal"
          size={"md"}
          onClick={onModalOpen}
        >
          <AiOutlinePlus />
          <Text fontWeight={"light"} pl="0.5rem" fontSize={"sm"}>
            Upload Result
          </Text>
        </Button>
        <UploadResultModal
          isOpen={isModalOpen}
          onOpen={onModalOpen}
          onClose={onModalClose}
        />
      </Flex>

      <Box>
        <Text mb={"1rem"}>Most Recent</Text>

        {currentResult.length === 0 ? (
          <>
            <Text fontSize={"xl"}>
              There are no results available for this student
            </Text>
          </>
        ) : (
          <Wrap gap={5} flexDir={{ base: "column", lg: "row" }}>
            {currentResult.map((result, index) => {
              return (
                <WrapItem key={index}>
                  <ResultCard key={index} result={result} />
                </WrapItem>
              );
            })}
          </Wrap>
        )}
      </Box>

      <Box
        mt={{ base: "12" }}
        display={currentResult.length === 0 ? "none" : "block"}
        height={"600px"}
        overflowY={'auto'}
        border={'1px solid #005D5D'}
        rounded={'lg'}
        p={'1rem'}
      >
        <TableContainer>
          <Table
            size={{ base: "sm", xl: "md" }}
            variant="striped"
            borderColor={"#454545"}
          >
            <Thead>
              <Tr>
                {columnNames.map((column, index) => {
                  return (
                    <Th
                      key={index}
                      color={"#000"}
                      fontWeight={"600"}
                    >
                      {column}
                    </Th>
                  );
                })}
              </Tr>
            </Thead>
            <Tbody>
              {currentResult.map((data, index) => {
                return (
                  <Tr key={index}>
                    <Td key={index} color={"#000"}>
                      <Flex gap={2} alignItems={"center"}>
                        <Image
                          boxSize={"6"}
                          src={data?.schoolLogo}
                          alt="logo"
                          pointerEvents={"none"}
                        />
                        <Text fontSize={"sm"} fontWeight={"500"}>
                          {data?.schoolName}
                        </Text>
                      </Flex>
                    </Td>
                    <Td key={index} color={"#000"}>
                      {data?.status ? "Official" : "Unofficial"}
                    </Td>
                    <Td key={index} color={"#000"}>
                      {data?.term}
                    </Td>
                    <Td key={index} color={"#000"}>
                      {data?.examType}
                    </Td>
                    <Td key={index}>
                      <Flex gap={2} alignItems={"center"}>
                        <Avatar size={"xs"} src={data?.sharerProfileUrl} />
                        <Text fontSize={"md"} fontWeight={"400"}>
                          {data?.sharerFirstName} {data?.sharerLastName}
                        </Text>
                      </Flex>
                    </Td>
                    <Td key={index} color={"#000"}>
                      {data?.shareDate}
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
