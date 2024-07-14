"use client";
import React, { forwardRef } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Flex,
  Text,
  Grid,
  VStack,
} from "@chakra-ui/react";
import "./ResultStyles.css";
import Image from "next/image";

const ResultSheetTemplateThree = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <Box ref={ref} p={4} w={"full"}>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Flex alignItems={"center"} gap={2}>
          <Image
            alt="logo"
            src={"/images/schoollogo.png"}
            height={"80"}
            width={"80"}
          />
          <VStack alignItems={"flex-start"} gap={1}>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              Bright Stars Creche and Kindergarten
            </Text>
          </VStack>
        </Flex>
        <Text fontWeight={"bold"}>Report Card</Text>
      </Flex>

      <Box backgroundColor={"#747474"} mt={"1rem"} height={"1.5px"}></Box>

      <VStack py={"0.5rem"}>
        <Flex justifyContent={"space-between"} w={"full"}>
          <Text>
            <span style={{ fontWeight: "bold" }}>Student Name:</span> Monica
            Geller-Bing
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Teacher Name:</span> 1st Term
          </Text>
        </Flex>

        <Flex justifyContent={"space-between"} w={"full"}>
          <Text>
            <span style={{ fontWeight: "bold" }}>Age:</span> 3 Years Old
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Term:</span> 1st Term
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Year:</span> 2024/2025
          </Text>
        </Flex>
      </VStack>

      <Box backgroundColor={"#747474"} mb={"0.5rem"} height={"2px"}></Box>

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
            border={"2px solid #000"}
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
            child's achievement, attitude, behaviour, and effort. This report is
            one of the strategies used by{" "}
            <span style={{ fontWeight: "bold" }}>Bright Star Schools</span> to
            communicate with you about your child's progress.
          </Text>
        </Flex>
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          background="url(/images/schoollogo.png)"
          backgroundRepeat="no-repeat"
          backgroundSize="contain"
          backgroundPosition="center"
          opacity="0.1" // Adjust opacity here
          zIndex="0"
        />
        <Flex justifyContent={"space-between"}>
          <VStack gap={4} alignItems={"start"}>
            <TableContainer position="relative" zIndex="1" w={"full"}>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th
                      textTransform="none"
                      color="#000"
                      fontWeight="bold"
                      fontSize="md"
                      colSpan={2}
                    >
                      MATHEMATICS
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td fontWeight={"semibold"}>Can count numbers 1-200.</Td>
                    <Td fontWeight={"semibold"}></Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight={"semibold"}>
                      Identify in sequence and at random numbers 1-200.
                    </Td>
                    <Td fontWeight={"semibold"}></Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight={"semibold"}>Write numbers 1-200</Td>
                    <Td fontWeight={"semibold"}></Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight={"semibold"}>
                      Use the language of more and fewer to compare two sets of
                      objects.
                    </Td>
                    <Td fontWeight={"semibold"}></Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight={"semibold"}>
                      Can fill the missing numnbers on a line of numbers.
                    </Td>
                    <Td fontWeight={"semibold"}></Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight={"semibold"}>
                      Can order numbers 1-20 using the terms before and after.
                    </Td>
                    <Td fontWeight={"semibold"}></Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>

            <TableContainer position="relative" zIndex="1" w={"full"}>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th
                      textTransform="none"
                      color="#000"
                      fontWeight="bold"
                      fontSize="md"
                      colSpan={2}
                    >
                      COMMUNICATION, LANGUAGE AND LITERACY
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td fontWeight={"semibold"}>
                      Segments sounds in simple words and blends them together.
                    </Td>
                    <Td fontWeight={"semibold"}></Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight={"semibold"}>Can follow directions.</Td>
                    <Td fontWeight={"semibold"}></Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight={"semibold"}>
                      Listens to sounds in words, spells and writes them.
                    </Td>
                    <Td fontWeight={"semibold"}></Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight={"semibold"}>
                      Differentiates between vowel and consonant sounds.
                    </Td>
                    <Td fontWeight={"semibold"}></Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </VStack>

          <VStack gap={4} alignItems={"start"}>
            <TableContainer position="relative" zIndex="1" w={"full"}>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th
                      textTransform="none"
                      color="#000"
                      fontWeight="bold"
                      fontSize="md"
                      colSpan={2}
                    >
                      COMMUNICATION, LANGUAGE AND LITERACY
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td fontWeight={"semibold"}>
                      Segments sounds in simple words and blends them together.
                    </Td>
                    <Td fontWeight={"semibold"}></Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight={"semibold"}>Can follow directions.</Td>
                    <Td fontWeight={"semibold"}></Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight={"semibold"}>
                      Listens to sounds in words, spells and writes them.
                    </Td>
                    <Td fontWeight={"semibold"}></Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight={"semibold"}>
                      Differentiates between vowel and consonant sounds.
                    </Td>
                    <Td fontWeight={"semibold"}></Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer> 

            <TableContainer position="relative" zIndex="1" w={"full"}>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th
                      textTransform="none"
                      color="#000"
                      fontWeight="bold"
                      fontSize="md"
                      colSpan={2}
                    >
                      MATHEMATICS
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td fontWeight={"semibold"}>Can count numbers 1-200.</Td>
                    <Td fontWeight={"semibold"}></Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight={"semibold"}>
                      Identify in sequence and at random numbers 1-200.
                    </Td>
                    <Td fontWeight={"semibold"}></Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight={"semibold"}>Write numbers 1-200</Td>
                    <Td fontWeight={"semibold"}></Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight={"semibold"}>
                      Use the language of more and fewer to compare two sets of
                      objects.
                    </Td>
                    <Td fontWeight={"semibold"}></Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight={"semibold"}>
                      Can fill the missing numnbers on a line of numbers.
                    </Td>
                    <Td fontWeight={"semibold"}></Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight={"semibold"}>
                      Can order numbers 1-20 using the terms before and after.
                    </Td>
                    <Td fontWeight={"semibold"}></Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </VStack>
        </Flex>
      <VStack gap={4} mt={"2rem"}>
        <Box w={"full"} display={"grid"} gap={2}>
          <Text>
            <span style={{ fontWeight: "bold" }}>Teacher's Remark:</span> Rachel
            Zing
          </Text>
        </Box>

        <Box w={"full"} display={"grid"} gap={2}>
          <Text>
            <span style={{ fontWeight: "bold" }}>Admin Name:</span> Dr.
            Nigglesworth Alex
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Admin Remark:</span> Rachel
            Zing
          </Text>
        </Box>
      </VStack>
      </Box>
    </Box>
  );
});

export default ResultSheetTemplateThree;
