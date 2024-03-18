import { FC } from 'react'
import {
    Box,
    Image,
    Text,
    Flex,
    IconButton, 
    useDisclosure,
} from '@chakra-ui/react'
import { PDFViewer } from '../uploadedResultPdfViewer';
import {MdOutlineFileDownload} from 'react-icons/md'

interface ResultCardProps {
  result: {
    schoolName: string;
    dateGenerated: string;
    term: string;
    examType: string;
    schoolLogo: string;
  };
}

const ResultCard: FC<ResultCardProps> = ({ result }) => {
  return (
    <Box
      backgroundColor={"#E2F2F2"}
      p={"1rem"}
      rounded={"lg"}
      _hover={{
        backgroundColor: "#92DADA",
        cursor: "pointer",
        transition: "0.5s",
      }}
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
          src={result.schoolLogo}
          alt="logo"
          height={"2.5rem"}
          width={"2.5rem"}
          pointerEvents={"none"}
        />
        <Box>
          <Text fontSize={"md"}>{result.schoolName}</Text>
          <Text color={"#959595"} fontSize={"xs"}>
            Generated on {result.dateGenerated}
          </Text>
        </Box>
      </Flex>
      <Flex
        alignItems={"baseline"}
        justifyContent={"space-between"}
        mt={"2rem"}
        gap={'6'}
      >
        <Box>
          <Flex gap={3}>
            <Box
              backgroundColor={"#007C7B"}
              px={"1rem"}
              rounded={"md"}
              py={"0.3rem"}
            >
              <Text color="#fff" fontSize={"2xs"}>
                {result.term}
              </Text>
            </Box>
            <Box
              backgroundColor={"#007C7B"}
              px={"1rem"}
              rounded={"md"}
              py={"0.3rem"}
            >
              <Text color="#fff" fontSize={"2xs"}>
                {result.examType}
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
      <PDFViewer  />
    </Box>
  );
};

export default ResultCard