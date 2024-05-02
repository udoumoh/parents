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
  IconButton,
  Spinner,
} from "@chakra-ui/react";

import { AiOutlinePlus } from "react-icons/ai";
import ResultCard from "@/components/shared/resultCard";
import UploadResultModal from "@/components/shared/uploadResultModal";
import { GET_STUDENT_UPLOADED_RESULT } from "@/gql/queries";
import { GET_STUDENT_GENERATED_RESULT } from "@/gql/queries";
import { useQuery } from "@apollo/client";
import { useUserAPI } from "@/hooks/UserContext";
import { formatDate } from "@/helpers/formatDate";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import ImgViewer from "@/components/shared/imageViewer";
import { PDFViewer } from "@/components/shared/uploadedResultPdfViewer";
import GeneratedResults from "@/components/shared/generatedResults";

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
  teachersFirstName: string;
  teachersLastName: string;
  teachersMiddleName: string;
}

const Results: FC<ResultsProps> = ({}) => {
  const {
    isOpen: isModalOpen,
    onClose: onModalClose,
    onOpen: onModalOpen,
  } = useDisclosure();
  const {
    isOpen: isUploadedModalOpen,
    onClose: onUploadedModalClose,
    onOpen: onUploadedModalOpen,
  } = useDisclosure();
  const {
    isOpen: isImageModalOpen,
    onClose: onImageModalClose,
    onOpen: onImageModalOpen,
  } = useDisclosure();
  const {
    isOpen: isGeneratedModalOpen,
    onClose: onGeneratedModalClose,
    onOpen: onGeneratedModalOpen,
  } = useDisclosure();
  const { currentWardProfile } = useUserAPI();
  const { data: getgeneratedresult } = useQuery(GET_STUDENT_GENERATED_RESULT, {
    variables: { studentId: currentWardProfile?.id },
  });
  const { data: getUploadedResult, loading } = useQuery(
    GET_STUDENT_UPLOADED_RESULT,
    {
      variables: { studentId: currentWardProfile?.id },
    }
  );
  const [selectedTableResult, setSelectedTableResult] =
    useState<GeneratedResultProps>();
  const [resultsType, setResultstype] = useState("uploaded");
  const [pdfResult, setPdfResult] = useState<GeneratedResultProps[]>([]);
  const [uploadedResults, setUploadedResults] = useState<
    GeneratedResultProps[]
  >([]);
  const [currentResult, setCurrentResult] = useState<GeneratedResultProps[]>(
    []
  );
  const [resultToShow, setResultToShow] = useState<GeneratedResultProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchGeneratedResult = async () => {
      try {
        const response = await getgeneratedresult;
        console.log(response)
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
              authorsCreatedAt: formatDate(result?.createdAt),
              isOfficial: result?.isOfficial,
              teachersFirstName:
                result?.student?.classroom?.classroom?.teacher[0]?.firstName,
              teachersLastName:
                result?.student?.classroom?.classroom?.teacher[0]?.lastName,
              teachersMiddleName:
                result?.student?.classroom?.classroom?.teacher[0]?.middleName,
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
        console.log(response)
        if (!response) {
          console.log("failed to fetch results data");
        }
        if (response) {
          const parsedResultsData = response?.studentUploadedResult?.map(
            (item: any) => ({
              term: item.academicTerm,
              examType: item.resultType,
              schoolLogo: item?.school?.logoImgUrl,
              schoolName: item?.school?.schoolName,
              status: item?.isOfficial,
              teachersFirstName:
                item?.student?.classroom?.classroom?.teacher[0]?.firstName,
              teachersLastName:
                item?.student?.classroom?.classroom?.teacher[0]?.lastName,
              authorsProfileImgUrl:
                item?.creatorPicture,
              authorsFirstName: item?.creatorName,
              authorsLastName: "",
              shareDate: formatDate(item?.createdAt),
              documentPath: item?.document,
              teachersMiddleName:
                item?.student?.classroom?.classroom?.teacher[0]?.middleName,
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
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, currentResult?.length);
    setResultToShow(currentResult?.slice(startIndex, endIndex));

    const newTotalPages = Math.ceil(currentResult?.length / itemsPerPage);
    setTotalNumberOfPages(newTotalPages);
  }, [currentResult, currentPage]);

  useEffect(() => {
    if (resultsType === "uploaded") {
      setCurrentResult(uploadedResults);
    } else if (resultsType === "generated") {
      setCurrentResult(pdfResult);
    }
  }, [resultsType, pdfResult, uploadedResults]);

  const columnNames = ["School", "Status", "Type", "Shared by", "Shared date"];

  const handleResultsTypeChange = (e: any) => {
    setResultstype(e.target.value);
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, currentResult?.length);
    if (startIndex < currentResult?.length) {
      setResultToShow(currentResult?.slice(startIndex, endIndex));
      setCurrentPage(nextPage);
    }
  };

  const handlePreviousPage = () => {
    const prevPage = currentPage - 1;
    if (prevPage > 0) {
      const startIndex = (prevPage - 1) * itemsPerPage;
      setResultToShow(
        currentResult?.slice(startIndex, startIndex + itemsPerPage)
      );
      setCurrentPage(prevPage);
    }
  };

  const handleTableItemClick = (result: any) => {
    setSelectedTableResult(result);
    result?.documentPath?.endsWith(".pdf")
      ? onUploadedModalOpen()
      : result?.documentPath?.endsWith(".jpg")
      ? onImageModalOpen()
      : onGeneratedModalOpen();
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

        {loading ? (
          <Spinner color="green.500"/>
        ) : !loading && currentResult?.length === 0 ? (
          <>
            <Text fontSize={"xl"}>
              There are no results available for this student
            </Text>
          </>
        ) : (
          <Wrap gap={5} flexDir={{ base: "column", lg: "row" }}>
            {currentResult?.slice(0, 5)?.map((result, index) => {
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
        border={"1px solid #005D5D50"}
        rounded={"lg"}
        p={"1rem"}
      >
        <TableContainer>
          <Table variant="simple" size={{ base: "sm", md: "md" }}>
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
              {resultToShow?.map((data, index) => {
                return (
                  <Tr
                    key={index}
                    onClick={() => handleTableItemClick(data)}
                    _hover={{ backgroundColor: "#005D5D10", cursor: "pointer" }}
                  >
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
                          {data?.authorsFirstName} {data?.authorsLastName}
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
        <Flex justifyContent={"center"}>
          <Box mt={"1rem"} display={"flex"} gap={4} alignItems={"center"}>
            <IconButton
              aria-label="paginate"
              icon={<MdKeyboardArrowLeft />}
              onClick={handlePreviousPage}
            />
            <Text>
              Page {currentPage} of {totalNumberOfPages || currentPage}
            </Text>
            <IconButton
              aria-label="paginate"
              icon={<MdKeyboardArrowRight />}
              onClick={handleNextPage}
            />
          </Box>
        </Flex>
      </Box>
      <ImgViewer
        path={selectedTableResult?.documentPath || ""}
        isOpen={isImageModalOpen}
        onClose={onImageModalClose}
      />
      <PDFViewer
        isOpen={isUploadedModalOpen}
        onClose={onUploadedModalClose}
        path={selectedTableResult?.documentPath}
      />
      {selectedTableResult && (
        <GeneratedResults
          result={selectedTableResult}
          isOpen={isGeneratedModalOpen}
          onClose={onGeneratedModalClose}
        />
      )}
    </Box>
  );
};

export default Results;
