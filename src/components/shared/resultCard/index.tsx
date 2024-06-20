"use client";
import { FC, useState } from "react";
import {
  Box,
  Image,
  Text,
  Flex,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { PDFViewer } from "../uploadedResultPdfViewer";
import ImgViewer from "../imageViewer";
import GeneratedResults from "../generatedResults";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";

interface ResultCardProps {
  generatedresult: {
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
    studentsMiddleName: string;
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
    shareDate: string;
    createdAt: string;
    teachersFirstName: string;
    teachersLastName: string;
    teachersMiddleName: string;
  };
}

const ResultCard: FC<ResultCardProps> = ({ generatedresult }) => {
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
  const isImage = imageExtensions.some((ext) =>
    generatedresult?.documentPath?.toLowerCase().endsWith(ext)
  );
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

  return (
    <Box
      w={"250px"}
      backgroundColor={"#E2F2F2"}
      p={"1rem"}
      rounded={"lg"}
      _hover={{
        backgroundColor: "#92DADA",
        cursor: "pointer",
        transition: "0.5s",
      }}
      onClick={
        generatedresult?.documentPath?.endsWith(".pdf")
          ? onUploadedModalOpen
          : isImage
          ? onImageModalOpen
          : onModalOpen
      }
    >
      <Flex
        backgroundColor={"#fff"}
        justifyContent={"center"}
        alignItems={"center"}
        py={"1rem"}
        rounded={"md"}
      >
        <Image
          src={"/images/pdfimg.png"}
          alt="pdf"
          width={"4rem"}
          h={"4.5rem"}
          pointerEvents={"none"}
        />
      </Flex>
      <Flex alignItems={"center"} gap={2} mt={"0.6rem"}>
        <Image
          src={generatedresult?.schoolLogo}
          alt="logo"
          height={"2.5rem"}
          width={"2.5rem"}
          pointerEvents={"none"}
          borderRadius={"md"}
        />
        <Box>
          <Text fontSize={"sm"} maxW={"160px"}>
            {capitalizeFirstLetter(generatedresult.schoolName.toLowerCase())}
          </Text>
        </Box>
      </Flex>
      <Flex>
        <Text color={"#959595"} fontSize={"xs"} mt={'0.3rem'}>
          Generated on{" "}
          {generatedresult?.shareDate || generatedresult.authorsCreatedAt}
        </Text>
      </Flex>
      <Flex
        alignItems={"baseline"}
        justifyContent={"space-between"}
        mt={"2rem"}
        gap={"6"}
      >
        <Box>
          <Flex gap={3}>
            <Box
              backgroundColor={"#007C7B"}
              px={"1rem"}
              rounded={"md"}
              py={"0.3rem"}
              display={generatedresult.academicTerm ? "block" : "none"}
            >
              <Text color="#fff" fontSize={"2xs"}>
                {generatedresult.academicTerm}
              </Text>
            </Box>
            <Box
              backgroundColor={"#007C7B"}
              px={"1rem"}
              rounded={"md"}
              py={"0.3rem"}
            >
              <Text color="#fff" fontSize={"2xs"}>
                {generatedresult.resultType || generatedresult.examType}
              </Text>
            </Box>
          </Flex>
        </Box>
        {/* <IconButton
          icon={<MdOutlineFileDownload color={"#007C7B"} />}
          aria-label="download file"
          backgroundColor={"#BDDEDE"}
        /> */}
      </Flex>
      <ImgViewer
        path={generatedresult?.documentPath}
        isOpen={isImageModalOpen}
        onClose={onImageModalClose}
      />
      <PDFViewer
        isOpen={isUploadedModalOpen}
        onClose={onUploadedModalClose}
        path={generatedresult?.documentPath}
      />
      <GeneratedResults
        result={generatedresult}
        isOpen={isModalOpen}
        onClose={onModalClose}
      />
    </Box>
  );
};

export default ResultCard;
