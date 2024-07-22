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
  Grid,
  VStack,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import { useReactToPrint } from "react-to-print";
import { GenerateResult } from "@/gql/types";

interface AssessmentProps {
  id: number;
  classId: string;
  schoolId: number;
  subject: string;
  assessment: string[];
  score: number[];
}

interface TempTwoPreviewProps {
  results: GenerateResult
}

export const TemplateTwo: React.FC<TempTwoPreviewProps> = (props) => {
  const { results } = props;
  const school = results?.school;
  const classroom = results?.student?.classroom?.classroom!;
  const student = results?.student;
  const year = results?.school?.currentSession;
  const authors = results?.classTeacherName;
  const assessment = JSON.parse(results?.assessment)
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
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
      <Box boxShadow={"md"}>
        <Box ref={componentRef} p={4} w="860px" h="1190px">
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Flex alignItems={"center"} gap={2}>
              <Image
                alt="logo"
                src={school?.logoImgUrl}
                height={"80px"}
                width={"80px"}
              />
              <VStack alignItems={"flex-start"} gap={1}>
                <Text
                  fontSize={"2xl"}
                  textTransform={"capitalize"}
                  fontWeight={"bold"}
                >
                  {school?.schoolName}
                </Text>
              </VStack>
            </Flex>
            <Text fontWeight={"bold"}>Report Card</Text>
          </Flex>

          <VStack
            mt={5}
            py={"0.5rem"}
            borderTop="1px solid #747474"
            borderBottom="1px solid #747474"
          >
            <Flex gap={10} w={"full"}>
              <Text textTransform={"capitalize"}>
                <span style={{ fontWeight: "bold" }}>Student Name:</span>{" "}
                {student?.firstName} {student?.middleName || ""}{" "}
                {student?.lastName}
              </Text>
              <Text>
                <span style={{ fontWeight: "bold" }}>Teacher Name:</span>{" "}
                {authors}
              </Text>
            </Flex>

            <Flex gap={10} w={"full"}>
              <Text>
                <span style={{ fontWeight: "bold" }}>Age:</span>{" "}
                {student?.ageInput} Years Old
              </Text>
              <Text>
                <span style={{ fontWeight: "bold" }}>Term:</span>{" "}
                {results?.academicTerm}
              </Text>
              <Text>
                <span style={{ fontWeight: "bold" }}>Year:</span> {year}
              </Text>
            </Flex>
          </VStack>

          <Box position="relative" mt="1rem">
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              gap={6}
              mb={"1rem"}
            >
              {/* Academic key */}
              <VStack
                p={"0.5rem"}
                border={"1px solid #747474"}
                alignItems={"start"}
                flex={1}
              >
                <Text fontWeight={"bold"}>Academic Key</Text>
                <Flex gap={2} justifyContent={"space-between"}>
                  <Grid>
                    <Text fontSize={"sm"} fontWeight={"bold"}>
                      4 = Exceeds Standards
                    </Text>
                    <Text fontSize={"sm"} fontWeight={"bold"}>
                      2 = Approaching Standards
                    </Text>
                  </Grid>

                  <Grid>
                    <Text fontSize={"sm"} fontWeight={"bold"}>
                      3 = Achieves Standards
                    </Text>
                    <Text fontSize={"sm"} fontWeight={"bold"}>
                      1 = Needs Support
                    </Text>
                  </Grid>
                </Flex>
              </VStack>

              <Text fontSize={"sm"} flex={1}>
                The information contained in this report is a summary of your
                child's achievement, attitude, behaviour, and effort. This
                report is one of the strategies used by{" "}
                <span style={{ fontWeight: "bold" }}>{school?.schoolName}</span>{" "}
                to communicate with you about your child's progress.
              </Text>
            </Flex>

            {/** Result Section */}
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
              opacity="0.1" // Adjust opacity here
              zIndex="0"
            />
            <SimpleGrid columns={2} spacing={5}>
              {results?.subjects?.map((item, index) => (
                <TableContainer
                  key={index}
                  position="relative"
                  zIndex="1"
                  w={"full"}
                >
                  <Table size="sm" border="1px solid #747474">
                    <Thead>
                      <Tr>
                        <Th
                          bg="#e2e2e2"
                          textTransform="none"
                          color="#000"
                          fontWeight="bold"
                          fontSize="md"
                          colSpan={2}
                          border="1px solid #747474"
                        >
                          {item.toUpperCase()}
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      { assessment && assessment[index]?.assessment?.map(
                        (subItem: any, subIndex: any) => (
                          <Tr key={subIndex}>
                            <Td border="1px solid #747474">{subItem}</Td>
                            <Td border="1px solid #747474">
                              {assessment[index].score[subIndex]}
                            </Td>
                          </Tr>
                        )
                      )}
                    </Tbody>
                  </Table>
                </TableContainer>
              ))}
            </SimpleGrid>
            <VStack gap={4} mt={"2rem"}>
              <Box w={"full"} display={"grid"} gap={2}>
                <Text>
                  <strong>Class Teacher: </strong>
                  {authors}
                </Text>
                <Text>
                  <strong>Class Teacher Remark: </strong>
                  {results?.remark || "No Comment"}
                </Text>
              </Box>
            </VStack>
          </Box>
          <Text
            fontSize={8}
            mt={20}
            ml={-2}
            css={{ textOrientation: "mixed", writingMode: "vertical-lr" }}
          >
            Generated with Greynote - {new Date().toString()}
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};
