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
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
import { GenerateResult } from "@/gql/types";
import { UploadedResult } from "@/gql/types";
import ViewResultModal from "../viewResultModal";
import { formatDate } from "@/helpers/formatDate";

interface ResultCardProps {
  results: GenerateResult & UploadedResult
}

const ResultCard: FC<ResultCardProps> = ({ results }) => {
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
    results?.document?.toLowerCase().endsWith(ext)
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
        results?.document?.endsWith(".pdf")
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
          src={results?.school?.logoImgUrl}
          alt="logo"
          height={"2.5rem"}
          width={"2.5rem"}
          pointerEvents={"none"}
          borderRadius={"md"}
        />
        <Box>
          <Text fontSize={"sm"} maxW={"160px"}>
            {capitalizeFirstLetter(results?.school?.schoolName.toLowerCase())}
          </Text>
        </Box>
      </Flex>
      <Flex>
        <Text color={"#959595"} fontSize={"xs"} mt={"0.3rem"}>
          Generated on {formatDate(results?.createdAt)}
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
              display={results.academicTerm ? "block" : "none"}
            >
              <Text color="#fff" fontSize={"2xs"}>
                {results.academicTerm}
              </Text>
            </Box>
            <Box
              backgroundColor={"#007C7B"}
              px={"1rem"}
              rounded={"md"}
              py={"0.3rem"}
            >
              <Text color="#fff" fontSize={"2xs"}>
                {results.resultType}
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
        path={results?.document}
        isOpen={isImageModalOpen}
        onClose={onImageModalClose}
      />
      <PDFViewer
        isOpen={isUploadedModalOpen}
        onClose={onUploadedModalClose}
        path={results?.document}
      />
      <ViewResultModal
        result={results}
        isOpen={isModalOpen}
        onClose={onModalClose}
      />
    </Box>
  );
};

export default ResultCard;
