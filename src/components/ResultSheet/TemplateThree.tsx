import React, { useRef } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Button,
  TableContainer,
  Box,
  Flex,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";
import { ResultBuilderProps } from "./TemplateOne";
import { useReactToPrint } from "react-to-print";

export const TemplateThree: React.FC<ResultBuilderProps> = (props) => {
  const { results } = props;
  const school = results?.school;
  const classroom = results?.student?.classroom?.classroom!;
  const student = results?.student
  const year = results?.school?.currentSession;
  const authors = results?.classTeacherName;
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
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
      <Box ref={componentRef} p={4} w={"full"}>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Flex alignItems={"center"} gap={2}>
            <Image
              alt="logo"
              src={school?.logoImgUrl}
              height={"80px"}
              width={"80px"}
              rounded="md"
            />
            <VStack alignItems={"flex-start"} gap={1}>
              <Text
                fontSize={"4xl"}
                fontWeight={"bold"}
                textTransform={"capitalize"}
              >
                {school?.schoolName}
              </Text>
              <Text
                fontSize={"xs"}
                maxW={"400px"}
                fontWeight={"semibold"}
                fontStyle={"italic"}
              >
                {school?.address}
              </Text>
            </VStack>
          </Flex>
          <Text fontWeight={"bold"}>Report Card</Text>
        </Flex>

        <Box backgroundColor={"#747474"} mt={"0.5rem"} height={"2px"}></Box>

        <VStack py={"0.5rem"}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Text textTransform={"capitalize"}>
              <span style={{ fontWeight: "bold" }}>Student Name:</span>{" "}
              {student?.firstName} {student?.middleName || ""}{" "}
              {student?.lastName}
            </Text>
            <Text>
              <span style={{ fontWeight: "bold" }}>Term:</span>{" "}
              {results?.academicTerm}
            </Text>
            <Text>
              <span style={{ fontWeight: "bold" }}>Year:</span> {year}
            </Text>
          </Flex>

          <Flex justifyContent={"space-between"} w={"full"}>
            <Text>
              <span style={{ fontWeight: "bold" }}>Age:</span>{" "}
              {student?.ageInput}
            </Text>
            <Text>
              <span style={{ fontWeight: "bold" }}>Class:</span>{" "}
              {classroom?.className}
            </Text>
            <Text>
              <span style={{ fontWeight: "bold" }}>Attendance:</span>{" "}
              {results?.attendance}
            </Text>
            <Text>
              <span style={{ fontWeight: "bold" }}>Percentage:</span>{" "}
              {percentageAverage.toPrecision(4)}%
            </Text>
          </Flex>
        </VStack>

        <Box backgroundColor={"#747474"} mb={"0.5rem"} height={"2px"}></Box>

        <Box position="relative" px="2rem" mt="1rem">
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            background={school?.logoImgUrl}
            backgroundRepeat="no-repeat"
            backgroundSize="contain"
            backgroundPosition="center"
            opacity="0.1"
            zIndex="0"
          />
          <TableContainer position="relative" zIndex="1">
            <Table size="sm">
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
        </Box>
        <VStack gap={4} mt={"2rem"} px={"2rem"}>
          <Box w={"full"} display={"grid"} gap={2}>
            <Text>
              <span style={{ fontWeight: "bold" }}>Teacher Name:</span>{" "}
              {authors}
            </Text>
            <Text>
              <span style={{ fontWeight: "bold" }}>Teacher's Remark:</span>{" "}
              {results?.remark || "No Comment"}
            </Text>
          </Box>

          <Box w={"full"} display={"grid"} gap={2}>
            <Text textTransform={"capitalize"}>
              <strong>School Admin: </strong>
              {`${student?.creator?.admin?.firstName}
              ${student?.creator?.admin?.middleName || ""}
              ${student?.creator?.admin?.lastName}`}
            </Text>
            <Text>
              <span style={{ fontWeight: "bold" }}>Admin Remark:</span>{" "}
              {results?.adminRemark || "No Comment"}
            </Text>
          </Box>
        </VStack>

        <Text
          fontSize={"xs"}
          fontWeight={"semibold"}
          mt={"5rem"}
          color={"#747474"}
        >
          Generated with Greynote - {new Date().toString()}
        </Text>
      </Box>
    </Flex>
  );
};
