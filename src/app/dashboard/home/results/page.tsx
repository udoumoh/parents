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

interface GeneratedResultProps {
  test1: [];
  test2: [];
  test3: [];
  test4: [];
  scores: [];
  authorsFirstName: string;
  authorsSchoolName: string;
  authorsLastName: string;
  authorsMiddleName: string;
  studentsFirstName: string;
  studentsLastName: string;
  academicTerm: string;
  resultType: string;
  creator: string;
  schoolLogo: string;
  schoolName: string;
  studentProfileImgUrl: string;
  studentAge: number;
  className: string;
  classStudents: number;
  attendance: number;
  subjects: [];
  grades: [];
  remark: string;
  authorsProfileImgUrl: string;
  documentPath: string;
  authorsCreatedAt: string;
  isOfficial: string;
  examType: string;
  sharerFirstName: string;
  shareDate: string;
  createdAt: string;
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
  const { data: getUploadedResult } = useQuery(GET_STUDENT_UPLOADED_RESULT, {
    variables: { studentId: currentWardProfile?.id, },
  });
  const [resultsType, setResultstype] = useState("uploaded");
  const [pdfResult, setPdfResult] = useState<GeneratedResultProps[]>([]);
  const [uploadedResults, setUploadedResults] = useState<
    GeneratedResultProps[]
  >([]);
  const [currentResult, setCurrentResult] = useState<GeneratedResultProps[]>(
    []
  );

  useEffect(() => {
    const fetchGeneratedResult = async () => {
      try {
        const response = await getgeneratedresult;
        if (!response) {
          console.log("failed to fetch results data");
        }
        if (response) {
          const pdfViewData = response?.studentGeneratedResult?.map(
            (result: any) => ({
              test1: result?.test1,
              test2: result?.test2,
              test3: result?.test3,
              test4: result?.test4,
              scores: result?.scores,
              authorsFirstName: result?.student?.creator?.admin?.firstName,
              authorsSchoolName: result?.student?.creator?.admin?.school,
              authorsLastName: result?.student?.creator?.admin?.lastName,
              authorsMiddleName: result?.student?.creator?.admin?.middleName,
              studentsFirstName: result?.student?.firstName,
              studentsLastName: result?.student?.lastName,
              academicTerm: result?.academicTerm,
              resultType: result?.resultType,
              creator: result?.creator,
              schoolLogo: result?.school?.logoImgUrl,
              schoolName: result?.school?.schoolName,
              studentProfileImgUrl: result?.student?.profileImgUrl,
              studentAge: result?.student?.ageInput,
              className: result?.className,
              classStudents: result?.classStudents,
              attendance: result?.attendance,
              subjects: result?.subjects,
              grades: result?.grades,
              remark: result?.remark,
              authorsProfileImgUrl:
                result?.student?.creator?.admin?.profileImgUrl,
              documentPath: "",
              authorsCreatedAt: formatDate(
                result?.student?.creator?.admin?.createdAt
              ),
              isOfficial: result?.isOfficial,
            })
          );
          setPdfResult(pdfViewData);
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
          console.log(response)
          const parsedResultsData = response?.studentUploadedResult?.map(
            (item: any) => ({
              term: item.academicTerm,
              examType: item.resultType,
              schoolLogo: item?.school?.logoImgUrl,
              schoolName: item?.school?.schoolName,
              status: item?.isOfficial,
              sharerProfileUrl: item?.school?.creator?.admin?.profileImgUrl,
              sharerFirstName: item?.creatorName,
              sharerLastName: item?.student?.creator?.admin?.lastName,
              shareDate: formatDate(item?.createdAt),
              documentPath: item?.document,
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
    if (resultsType === "uploaded") {
      setCurrentResult(uploadedResults);
    } else if (resultsType === "generated") {
      setCurrentResult(pdfResult);
    }
  }, [resultsType, pdfResult, uploadedResults]);

  const columnNames = [
    "School",
    "Status",
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

        {currentResult?.length === 0 ? (
          <>
            <Text fontSize={"xl"}>
              There are no results available for this student
            </Text>
          </>
        ) : (
          <Wrap gap={5} flexDir={{ base: "column", lg: "row" }}>
            {currentResult?.map((result, index) => {
              return (
                <WrapItem key={index}>
                  <ResultCard key={index} generatedresult={result} />
                </WrapItem>
              );
            })}
          </Wrap>
        )}
      </Box>

      <Box
        mt={{ base: "12" }}
        display={currentResult?.length === 0 ? "none" : "block"}
        overflowY={"auto"}
        border={"1px solid #005D5D"}
        rounded={"lg"}
        p={"1rem"}
      >
        <TableContainer>
          <Table
            size={{ base: "sm", xl: "md" }}
            variant="striped"
            borderColor={"#454545"}
          >
            <Thead>
              <Tr>
                {columnNames?.map((column, index) => {
                  return (
                    <Th key={index} color={"#000"} fontWeight={"600"}>
                      {column}
                    </Th>
                  );
                })}
              </Tr>
            </Thead>
            <Tbody>
              {currentResult?.map((data, index) => {
                return (
                  <Tr key={index}>
                    <Td color={"#000"}>
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
                    <Td color={"#000"}>
                      {data?.isOfficial ? "Official" : "Unofficial"}
                    </Td>
                    <Td color={"#000"}>{data?.resultType || data?.examType}</Td>
                    <Td>
                      <Flex gap={2} alignItems={"center"}>
                        <Avatar size={"xs"} src={data?.authorsProfileImgUrl} />
                        <Text fontSize={"md"} fontWeight={"400"}>
                          {data?.authorsFirstName || data?.sharerFirstName}{" "}
                          {data?.authorsLastName}
                        </Text>
                      </Flex>
                    </Td>
                    <Td color={"#000"}>
                      {data?.shareDate || data?.authorsCreatedAt}
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
