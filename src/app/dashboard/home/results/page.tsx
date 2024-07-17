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
import { GenerateResult, UploadedResult } from "@/gql/types";
import ViewResultModal from "@/components/shared/viewResultModal";

interface ResultsProps {}

type Result = GenerateResult & UploadedResult

const Results: FC<ResultsProps> = ({}) => {
  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".webp",
    ".tiff",
    ".svg",
  ];
  
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
    useState<Result>();
  const [resultsType, setResultstype] = useState("generated");
  const [pdfResult, setPdfResult] = useState<Result[]>([]);
  const [uploadedResults, setUploadedResults] = useState<
    Result[]
  >([]);
  const [currentResult, setCurrentResult] = useState<Result[]>(
    []
  );
  const [resultToShow, setResultToShow] = useState<Result[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchGeneratedResult = async () => {
      try {
        const response = await getgeneratedresult;
        if (!response) {
          console.log("failed to fetch results data");
        }
        if (response) {
          const pdfViewData = response?.studentGeneratedResult
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
          const parsedResultsData = response?.studentUploadedResult
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
    const isImage = imageExtensions.some((ext) =>
      result?.documentPath?.toLowerCase()?.endsWith(ext)
    );
    setSelectedTableResult(result);
    result?.documentPath?.endsWith(".pdf")
      ? onUploadedModalOpen()
      : isImage
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
                  <ResultCard key={index} results={result} />
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
                          src={data?.school?.logoImgUrl}
                          alt="logo"
                          pointerEvents={"none"}
                        />
                        <Text fontSize={"sm"} fontWeight={"500"}>
                          {data?.school?.schoolName}
                        </Text>
                      </Flex>
                    </Td>
                    <Td color={"#000"}>
                      {data?.isOfficial ? "Official" : "Unofficial"}
                    </Td>
                    <Td color={"#000"}>{data?.resultType}</Td>
                    <Td>
                      <Flex gap={2} alignItems={"center"}>
                        <Avatar size={"xs"} src={data?.school?.creator?.admin?.profileImgUrl} />
                        <Text fontSize={"md"} fontWeight={"400"}>
                          {data?.school?.creator?.admin?.firstName} {data?.school?.creator?.admin?.middleName}{" "}
                          {data?.school?.creator?.admin?.lastName}
                        </Text>
                      </Flex>
                    </Td>
                    <Td color={"#000"}>
                      {data?.school?.creator?.admin?.createdAt}
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
        path={selectedTableResult?.document}
        isOpen={isImageModalOpen}
        onClose={onImageModalClose}
      />
      <PDFViewer
        isOpen={isUploadedModalOpen}
        onClose={onUploadedModalClose}
        path={selectedTableResult?.document}
      />
      {selectedTableResult && (
        <ViewResultModal
          result={selectedTableResult}
          isOpen={isGeneratedModalOpen}
          onClose={onGeneratedModalClose}
        />
      )}
    </Box>
  );
};

export default Results;
