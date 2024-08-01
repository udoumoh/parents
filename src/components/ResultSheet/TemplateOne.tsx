import {
  Flex,
  Image,
  Text,
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  VStack,
} from "@chakra-ui/react";
import React, { forwardRef, useRef } from "react";
import { Student, GenerateResult } from "@/gql/types";
import { useReactToPrint } from "react-to-print";

export interface ResultBuilderProps {
  results: GenerateResult;
}

export const TemplateOne: React.FC<ResultBuilderProps> = (props) => {
  const { results } = props;
  const school = results?.school;
  const classroom = results?.student?.classroom?.classroom!;
  const student = results?.student;
  const year = results?.school?.currentSession;
  const authors = results?.classTeacherName;
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const infoHeader = [
    "Academic Term",
    "Academic Session",
    "Classroom",
    "Total No in Classroom",
    "Total Attendance",
    "Student Term Average",
  ];

  const sumOfTest1 = results?.test1?.reduce((acc: any, num: any) => acc + num, 0)!;
  const sumOfTest2 = results?.test2?.reduce((acc: any, num: any) => acc + num, 0)!;
  const sumOfTest3 = results?.test3?.reduce((acc: any, num: any) => acc + num, 0)!;
  const sumOfTest4 = results?.test4?.reduce((acc: any, num: any) => acc + num, 0)!;
  const sumOfScore = results?.scores?.reduce((acc: any, num: any) => acc + num, 0)!;
  const averageOfScore =
    (sumOfTest1 + sumOfTest2 + sumOfTest3 + sumOfTest4 + sumOfScore) /
    results?.subjects?.length!;
  const percentageAverage = (averageOfScore / 100) * 100;
  return (
    <Flex
      direction="column"
      minH="90vh"
      w="full"
      bg="white"
      borderRadius={"10px"}
      border="1px solid #e2e2e2"
      p={3}
      align="center"
      overflow="hidden"
    >
      <Button
        colorScheme="teal"
        w="fit-content"
        mt={-1}
        mb={2}
        onClick={() => handlePrint()}
        isDisabled={student?.parent?.length < 1}
      >
        Print Result
      </Button>
      <Flex
        ref={componentRef}
        direction="column"
        overflow="hidden"
        w="850px"
        h="1190px"
        borderLeft="20px solid #747474"
        borderRight="20px solid #747474"
        p={4}
        justify="space-between"
      >
        <Flex direction="column" gap={10} align="center">
          <Image
            src={school?.logoImgUrl}
            pos="absolute"
            alignItems="center"
            opacity={0.1}
            w="400px"
            marginTop="10%"
            alt={school?.schoolName}
          />
          <Flex align="center" w="full" justify="space-between">
            <Flex align={"center"} gap={2}>
              <Image
                src={school?.logoImgUrl}
                boxSize={"70px"}
                objectFit="cover"
                alt={school?.schoolName}
                rounded="full"
                p={1}
                border="1px solid #e2e2e2"
              />
              <VStack align="start" spacing={1}>
                <Text
                  textTransform={"capitalize"}
                  fontSize={24}
                  fontWeight={600}
                  w="400px"
                >
                  {school?.schoolName}
                </Text>
                <Text w="400px">{school?.address}</Text>
              </VStack>
            </Flex>
            <Text py={2} px={5} bg="#747474" color="white" mr={-4}>
              Report Card
            </Text>
          </Flex>
          <Text
            textTransform={"uppercase"}
            textAlign={"center"}
            fontWeight={600}
          >
            {results.academicTerm} REPORT FOR {year} ACADEMIC SESSION
          </Text>
          <Flex align="center" gap={5} w="full">
            <Image
              src={student?.profileImgUrl}
              alt={`${student?.firstName}-photo`}
              w="70px"
              rounded="md"
            />
            <VStack align="start" spacing={1}>
              <Text textTransform="capitalize">
                <strong>Student: </strong>
                {student?.firstName} {student?.middleName || ""}{" "}
                {student?.lastName}
              </Text>
              <Text>
                <strong>Age: </strong>
                {student?.ageInput}
              </Text>
              <Text>
                <strong>Gender: </strong>
                {student?.gender}
              </Text>
            </VStack>
          </Flex>
          <TableContainer w="full">
            <Table variant="simple" size="sm" border="1px solid #747474">
              <Thead>
                <Tr bg="#e2e2e2">
                  {infoHeader.map((item, index) => (
                    <Th
                      key={index}
                      px={1}
                      fontSize={10}
                      border="1px solid #747474"
                    >
                      {item}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td
                    px={1}
                    border="1px solid #747474"
                    whiteSpace="normal"
                    wordBreak={"break-word"}
                  >
                    {results?.academicTerm}
                  </Td>
                  <Td
                    px={1}
                    border="1px solid #747474"
                    whiteSpace="normal"
                    wordBreak={"break-word"}
                  >
                    {year}
                  </Td>
                  <Td
                    px={1}
                    border="1px solid #747474"
                    whiteSpace="normal"
                    wordBreak={"break-word"}
                  >
                    {classroom?.className}
                  </Td>
                  <Td
                    px={1}
                    border="1px solid #747474"
                    whiteSpace="normal"
                    wordBreak={"break-word"}
                  >
                    {classroom?.students?.length!}
                  </Td>
                  <Td
                    px={1}
                    border="1px solid #747474"
                    whiteSpace="normal"
                    wordBreak={"break-word"}
                  >
                    {results?.attendance}
                  </Td>
                  <Td
                    px={1}
                    border="1px solid #747474"
                    whiteSpace="normal"
                    wordBreak={"break-word"}
                  >
                    {percentageAverage.toPrecision(4)}%
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>

          <TableContainer w="full">
            <Table variant="simple" size="sm" border="1px solid #747474">
              <Thead>
                <Tr bg="#e2e2e2">
                  <Th px={1} border="1px solid #747474">
                    Subjects
                  </Th>
                  <Th
                    px={1}
                    border="1px solid #747474"
                    display={results?.testArray?.includes(1) ? "table-cell" : "none"}
                  >
                    Test 1
                  </Th>
                  <Th
                    px={1}
                    border="1px solid #747474"
                    display={results?.testArray?.includes(2) ? "table-cell" : "none"}
                  >
                    Test 2
                  </Th>
                  <Th
                    px={1}
                    border="1px solid #747474"
                    display={results?.testArray?.includes(3) ? "table-cell" : "none"}
                  >
                    Test 3
                  </Th>
                  <Th
                    px={1}
                    border="1px solid #747474"
                    display={results?.testArray?.includes(4) ? "table-cell" : "none"}
                  >
                    Test 4
                  </Th>
                  <Th px={1} border="1px solid #747474">
                    Exam
                  </Th>
                  <Th px={1} border="1px solid #747474">
                    Score
                  </Th>
                  <Th px={1} border="1px solid #747474">
                    Grade
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {results?.subjects?.map((item: any, index: any) => (
                  <Tr key={index}>
                    <Td
                      px={1}
                      border="1px solid #747474"
                      whiteSpace="normal"
                      wordBreak={"break-word"}
                    >
                      {item}
                    </Td>
                    <Td
                      px={1}
                      border="1px solid #747474"
                      display={results?.testArray?.includes(1) ? "table-cell" : "none"}
                    >
                      {results.test1![index]}
                    </Td>
                    <Td
                      px={1}
                      border="1px solid #747474"
                      display={results?.testArray?.includes(2) ? "table-cell" : "none"}
                    >
                      {results.test2![index]}
                    </Td>
                    <Td
                      px={1}
                      border="1px solid #747474"
                      display={results?.testArray?.includes(3) ? "table-cell" : "none"}
                    >
                      {results.test3![index]}
                    </Td>
                    <Td
                      px={1}
                      border="1px solid #747474"
                      display={results?.testArray?.includes(4) ? "table-cell" : "none"}
                    >
                      {results.test4![index]}
                    </Td>
                    <Td px={1} border="1px solid #747474">
                      {results.scores![index]}
                    </Td>
                    <Td px={1} border="1px solid #747474">
                      {" "}
                      {((results?.test1 && results?.test1![index]) || 0) +
                        ((results?.test2 && results?.test2![index]) || 0) +
                        ((results?.test3 && results?.test3![index]) || 0) +
                        ((results?.test4 && results?.test4![index]) || 0) +
                        ((results?.scores && results?.scores![index]) || 0)}
                    </Td>
                    <Td
                      px={1}
                      border="1px solid #747474"
                      textTransform={"uppercase"}
                    >
                      {results.grades![index]}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
        <Flex w="full" direction="column" gap={10}>
          <VStack align="start">
            <Text>
              <strong>Class Teacher: </strong>
              {authors}
            </Text>
            <Text>
              <strong>Class Teacher Remark: </strong>
              {results?.remark || "No Comment"}
            </Text>
          </VStack>
          <VStack align="start">
            <Text textTransform={"capitalize"}>
              <strong>School Admin: </strong>
              {`${student?.creator?.admin?.firstName}
              ${student?.creator?.admin?.middleName || ""}
              ${student?.creator?.admin?.lastName}`}
            </Text>
            <Text>
              <strong>School Admin Remark: </strong>
              {results?.adminRemark || "No Comment"}
            </Text>
          </VStack>
        </Flex>
        <Text fontSize={8}>
          Generated with Greynote - {new Date().toString()}
        </Text>
      </Flex>
    </Flex>
  );
};
