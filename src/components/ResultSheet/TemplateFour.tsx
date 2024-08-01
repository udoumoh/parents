import React, { forwardRef, useRef } from "react";
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

export const TemplateFour: React.FC<ResultBuilderProps> = (props) => {
  const {
    results,
  } = props;
  console.log(results)
  const school = results?.school;
  const classroom = results?.student?.classroom?.classroom!;
  const student = results?.student;
  const year = results?.resultType
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
      <Box ref={componentRef} p={2} w={"full"} h="1120px">
        <Flex direction="column" justify="space-between" h="full">
          <Box>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Image
                alt="logo"
                src={school?.logoImgUrl}
                height={"80px"}
                width={"80px"}
              />
              <VStack textAlign={"center"} gap={1} maxW={"400px"}>
                <Text
                  fontSize={"xl"}
                  fontWeight={"bolder"}
                  textTransform={"capitalize"}
                >
                  {school?.schoolName}
                </Text>
                <Text
                  fontStyle={"italic"}
                  fontWeight={"semibold"}
                  fontSize={"xs"}
                  textAlign={"center"}
                  px={"0.5rem"}
                >
                  {school?.address}
                </Text>
                <Text
                  fontStyle={"italic"}
                  fontWeight={"semibold"}
                  fontSize={"xs"}
                >
                  Tel: {student?.creator?.admin?.phoneNumber}
                </Text>
              </VStack>
              <Image
                alt={student?.firstName + "-picture"}
                src={student?.profileImgUrl}
                height={"80px"}
                width={"80px"}
              />
            </Flex>

            <Flex justifyContent={"center"} mt={"1rem"} w={"full"}>
              <Text
                textAlign={"center"}
                textTransform="uppercase"
                fontWeight={"bold"}
                fontSize={"lg"}
              >
                {results?.academicTerm} REPORT FOR {year} ACADEMIC SESSION
              </Text>
            </Flex>

            <Box
              backgroundColor={"#f2f7fc"}
              mt={"0.5rem"}
              display={"flex"}
              p={"0.5rem"}
              justifyContent={"space-between"}
              alignItems={"flex-start"}
              gap={2}
            >
              <VStack
                fontSize={"xs"}
                alignItems={"flex-start"}
                w="full"
                p={"0.5rem"}
                gap={1}
              >
                <Text fontWeight={"bold"} textTransform={"uppercase"}>
                  Student: {student?.firstName} {student?.middleName || ""}{" "}
                  {student?.lastName}{" "}
                </Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>Gender: </span>
                  {student?.gender}
                </Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>Class Teacher: </span>
                  {`${classroom?.teacher[0]?.firstName || authors} ${
                    classroom?.teacher[0]?.middleName || ""
                  } ${classroom?.teacher[0]?.lastName || ""}`}
                </Text>
              </VStack>

              <VStack
                fontSize={"xs"}
                alignItems={"flex-start"}
                w="full"
                p={"0.5rem"}
                gap={1}
              >
                <Text>
                  <span style={{ fontWeight: "bold" }}>Date Of Birth: </span>
                  {new Date(student?.birthDate).toDateString()}
                </Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>Class: </span>
                  {classroom?.className}
                </Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>Times Present: </span>
                  {results?.attendance}
                </Text>
              </VStack>

              <VStack
                fontSize={"xs"}
                alignItems={"flex-start"}
                w="full"
                backgroundColor={"#dbe7f2"}
                p={"0.5rem"}
                gap={1}
              >
                <Text>
                  <span style={{ fontWeight: "bold" }}>Session: </span>
                  {year} Session
                </Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>Term: </span>
                  {results?.academicTerm}
                </Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>
                    Class term average:{" "}
                  </span>
                  {results?.classTermAverage}%
                </Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>
                    Student term average:{" "}
                  </span>
                  {percentageAverage.toPrecision(4)}%
                </Text>
              </VStack>
            </Box>

            {/* Section for Academic performance */}
            <Box position="relative" mt="1rem" w={"full"}>
              <TableContainer position="relative" zIndex="1">
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th
                        fontWeight="bold"
                        backgroundColor={"#000000"}
                        color={"#FFFFFF"}
                        fontSize={"xs"}
                      >
                        ACADEMIC PERFORMANCE
                      </Th>
                    </Tr>
                    <Tr backgroundColor={"#253f5b"}>
                      <Th px={1} fontWeight="bold" color={"#FFFFFF"}>
                        Subjects
                      </Th>
                      <Th
                        px={1}
                        fontWeight="bold"
                        color={"#FFFFFF"}
                        display={
                          results?.testArray?.includes(1)
                            ? "table-cell"
                            : "none"
                        }
                      >
                        Test 1
                      </Th>
                      <Th
                        px={1}
                        fontWeight="bold"
                        color={"#FFFFFF"}
                        display={
                          results?.testArray?.includes(2)
                            ? "table-cell"
                            : "none"
                        }
                      >
                        Test 2
                      </Th>
                      <Th
                        px={1}
                        fontWeight="bold"
                        color={"#FFFFFF"}
                        display={
                          results?.testArray?.includes(3)
                            ? "table-cell"
                            : "none"
                        }
                      >
                        Test 3
                      </Th>
                      <Th
                        px={1}
                        fontWeight="bold"
                        color={"#FFFFFF"}
                        display={
                          results?.testArray?.includes(4)
                            ? "table-cell"
                            : "none"
                        }
                      >
                        Test 4
                      </Th>
                      <Th px={1} fontWeight="bold" color={"#FFFFFF"}>
                        Exam
                      </Th>
                      <Th px={1} fontWeight="bold" color={"#FFFFFF"}>
                        Score
                      </Th>
                      <Th px={1} fontWeight="bold" color={"#FFFFFF"}>
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
                          display={
                            results?.testArray?.includes(1)
                              ? "table-cell"
                              : "none"
                          }
                        >
                          {results.test1![index]}
                        </Td>
                        <Td
                          px={1}
                          border="1px solid #747474"
                          display={
                            results?.testArray?.includes(2)
                              ? "table-cell"
                              : "none"
                          }
                        >
                          {results.test2![index]}
                        </Td>
                        <Td
                          px={1}
                          border="1px solid #747474"
                          display={
                            results?.testArray?.includes(3)
                              ? "table-cell"
                              : "none"
                          }
                        >
                          {results.test3![index]}
                        </Td>
                        <Td
                          px={1}
                          border="1px solid #747474"
                          display={
                            results?.testArray?.includes(4)
                              ? "table-cell"
                              : "none"
                          }
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
                    <Tr backgroundColor={"#253f5b"}>
                      <Td fontWeight="bold" color={"#FFFFFF"}>
                        AVERAGE (%)
                      </Td>
                      <Td></Td>
                      <Td
                        display={
                          results?.testArray?.includes(1)
                            ? "table-cell"
                            : "none"
                        }
                      ></Td>
                      <Td
                        display={
                          results?.testArray?.includes(2)
                            ? "table-cell"
                            : "none"
                        }
                      ></Td>
                      <Td
                        display={
                          results?.testArray?.includes(3)
                            ? "table-cell"
                            : "none"
                        }
                      ></Td>
                      <Td
                        display={
                          results?.testArray?.includes(4)
                            ? "table-cell"
                            : "none"
                        }
                      ></Td>
                      <Td color="white">{percentageAverage.toPrecision(4)}%</Td>
                      <Td></Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>

            {/* Flex for class teachers comment, scores, traits and skills */}
            <Flex gap={1}>
              <Box display={"grid"} gap={2} w={"full"} mt={"0.3rem"}>
                {/* Class teachers comment */}
                <Box
                  display={"flex"}
                  flexDir={"column"}
                  border={"1px solid #00000060"}
                >
                  <Box backgroundColor={"#253f5b"}>
                    <Text
                      color={"#FFFFFF"}
                      px={"0.5rem"}
                      py={"0.2rem"}
                      fontSize={"2xs"}
                    >
                      CLASS TEACHER'S COMMENT
                    </Text>
                  </Box>
                  <Box p={"0.5rem"}>
                    <Text fontStyle={"italic"} fontSize={"2xs"}>
                      {results?.remark || "No Comment"}
                    </Text>
                  </Box>
                </Box>

                {/* Admin remark */}
                <Box
                  display={"flex"}
                  flexDir={"column"}
                  border={"1px solid #00000060"}
                >
                  <Box backgroundColor={"#253f5b"}>
                    <Text
                      color={"#FFFFFF"}
                      px={"0.5rem"}
                      py={"0.2rem"}
                      fontSize={"2xs"}
                    >
                      Admin Remark
                    </Text>
                  </Box>
                  <Box p={"0.5rem"}>
                    <Text fontStyle={"italic"} fontSize={"2xs"}>
                      {results?.adminRemark || "No Comment"}
                    </Text>
                  </Box>
                </Box>

                {/* scores table */}
                <TableContainer>
                  <Table size="sm">
                    <Thead>
                      <Tr fontWeight="bold" backgroundColor={"#f3f1f3"}>
                        <Th fontWeight="bold">Score range</Th>
                        <Th fontWeight="bold">Grades</Th>
                        <Th fontWeight="bold">Description</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>90.00 - 100.00</Td>
                        <Td>A</Td>
                        <Td>Outstanding</Td>
                      </Tr>
                      <Tr>
                        <Td>80.00 - 89.90</Td>
                        <Td>B</Td>
                        <Td>Excellent</Td>
                      </Tr>
                      <Tr>
                        <Td>70.00 - 79.90</Td>
                        <Td>C</Td>
                        <Td>Very good</Td>
                      </Tr>
                      <Tr>
                        <Td>60.00 - 69.90</Td>
                        <Td>D</Td>
                        <Td>Good</Td>
                      </Tr>
                      <Tr>
                        <Td>50.00 - 59.90</Td>
                        <Td>E</Td>
                        <Td>Fair</Td>
                      </Tr>
                      <Tr>
                        <Td>00.00 - 49.90</Td>
                        <Td>F</Td>
                        <Td>Ungraded</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>

              {/* Psychomotor traits and affective skills */}
              <Box display={"none"} w={"full"}>
                <Box display={"flex"} flexDir={"column"} mt={"0.3rem"}>
                  <Box
                    backgroundColor={"#253f5b"}
                    color={"#FFFFFF"}
                    px={"0.5rem"}
                  >
                    <Text fontSize={"2xs"}>PSYCHOMOTOR TRAITS</Text>
                  </Box>
                  <TableContainer>
                    <Table size="sm">
                      <Thead>
                        <Tr backgroundColor={"#dbe7f2"}>
                          <Th fontWeight="bold" color={"#000000"}>
                            Area
                          </Th>
                          <Th fontWeight="bold" color={"#000000"}>
                            Grade
                          </Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td fontWeight={"bold"}>Punctuality</Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight={"bold"}>Neatness</Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight={"bold"}>Social Skills</Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight={"bold"}>Self management</Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight={"bold"}>Academic soft skills</Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight={"bold"}>Approach to learning</Td>
                          <Td></Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>

                <Box
                  display={"flex"}
                  flexDir={"column"}
                  w={"full"}
                  mt={"0.3rem"}
                >
                  <Box
                    backgroundColor={"#253f5b"}
                    color={"#FFFFFF"}
                    px={"0.5rem"}
                  >
                    <Text fontSize={"2xs"}>AFFECTIVE SKILLS</Text>
                  </Box>
                  <TableContainer>
                    <Table size="sm">
                      <Thead>
                        <Tr backgroundColor={"#dbe7f2"}>
                          <Th fontWeight="bold" color={"#000000"}>
                            Area
                          </Th>
                          <Th fontWeight="bold" color={"#000000"}>
                            Grade
                          </Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td fontWeight={"bold"}>In-door Games</Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight={"bold"}>Out-door Games</Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight={"bold"}>Communication Skill</Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight={"bold"}>Handwriting</Td>
                          <Td></Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
            </Flex>
          </Box>

          <Text fontSize={"xs"} fontWeight={"semibold"} color={"#747474"}>
            Generated with Greynote - {new Date().toString()}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};
