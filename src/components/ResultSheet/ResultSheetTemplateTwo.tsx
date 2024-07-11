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
  VStack,
} from "@chakra-ui/react";
import "./ResultStyles.css";
import Image from "next/image";

const ResultSheetTemplateTwo = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <Box ref={ref} p={4} w={"full"}>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Image
          alt="logo"
          src={"/images/schoollogo.png"}
          height={"80"}
          width={"80"}
        />
        <VStack textAlign={"center"} gap={1} maxW={"400px"}>
          <Text fontSize={"lg"} fontWeight={"bolder"}>
            LAKEFIELD SCHOOLS
          </Text>
          <Text
            fontStyle={"italic"}
            fontWeight={"semibold"}
            fontSize={"xs"}
            textAlign={"center"}
            px={"0.5rem"}
          >
            1, Eyitope close, off Bayo Shodipo Street, Royal Palmswill Estate,
            Remlek Bus stop, Badore, Ajah, Lagos, Badore, Lagos
          </Text>
          <Text fontStyle={"italic"} fontWeight={"semibold"} fontSize={"xs"}>
            Tel: 07025007703
          </Text>
          <Text fontStyle={"italic"} fontWeight={"semibold"} fontSize={"xs"}>
            Email: info@thelakefieldschools.com
          </Text>
        </VStack>
        <Image
          alt="logo"
          src={"/images/schoollogo.png"}
          height={"80"}
          width={"80"}
        />
      </Flex>

      <Flex justifyContent={"center"} mt={"1rem"} w={"full"}>
        <Text textAlign={"center"} fontWeight={"bold"} fontSize={"lg"}>
          SUMMER TERM REPORT FOR 2023/2024 Session ACADEMIC SESSION
        </Text>
      </Flex>

      <Box
        backgroundColor={"#f2f7fc"}
        mt={"0.5rem"}
        display={"flex"}
        p={"0.5rem"}
        justifyContent={"space-between"}
        alignItems={"flex-end"}
        gap={2}
      >
        <VStack
          fontSize={"xs"}
          alignItems={"flex-start"}
          w="full"
          p={"0.5rem"}
          gap={1}
        >
          <Text fontWeight={"bold"}>Student: KING DAVID BANKOLE</Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Admission No: </span>
            LFS002-22-0241
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Gender: </span>
            Male
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Class Teacher: </span>
            Godswill Ogwa
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Times school opened: </span>
            65
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Start term date: </span>
            22/04/2024
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Next term begins: </span>
            not defined
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
            23/09/2022
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Year level: </span>5
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Class: </span>
            Year 5 Pansy
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Times student absent: </span>0
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>End term date: </span>
            19/07/2024
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Next term ends: </span>
            not defined
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
            2023/2024 Session
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Term: </span>
            Summer Term
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Class term average: </span>
            Godswill Ogwa
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Student term average: </span>
            65%
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Student term grade: </span>
            22/04/2024
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Remark: </span>
            not defined
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
                <Th fontWeight="bold" color={"#FFFFFF"}>
                  SUBJECT
                </Th>
                <Th fontWeight="bold" color={"#FFFFFF"}>
                  CONTINUOUS{" "}
                  <span style={{ display: "block" }}>ASSESSMENT</span>
                </Th>
                <Th fontWeight="bold" color={"#FFFFFF"}>
                  FINAL EXAM
                </Th>
                <Th fontWeight="bold" color={"#FFFFFF"}>
                  TERM TOTAL
                </Th>
                <Th fontWeight="bold" color={"#FFFFFF"}>
                  TERM GRADE
                </Th>
                <Th fontWeight="bold" color={"#FFFFFF"}>
                  REMARKS
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td fontWeight={"bold"}>Literacy</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td fontWeight={"bold"}>Yoruba Language</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </Tr>
              <Tr backgroundColor={"#253f5b"}>
                <Td fontWeight={"bold"} color={"#FFFFFF"}>
                  TOTAL
                </Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </Tr>
              <Tr backgroundColor={"#253f5b"}>
                <Td fontWeight="bold" color={"#FFFFFF"}>
                  AVERAGE (%)
                </Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
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
              <Text color={"#FFFFFF"} px={"0.5rem"} py={'0.2rem'} fontSize={"2xs"}>
                CLASS TEACHER'S COMMENT
              </Text>
            </Box>
            <Box p={"0.5rem"}>
              <Text fontStyle={"italic"} fontSize={"2xs"}>
                Godswill is a very silly boy
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
        <Box display={"grid"} w={"full"}>
          <Box display={"flex"} flexDir={"column"} mt={"0.3rem"}>
            <Box backgroundColor={"#253f5b"} color={"#FFFFFF"} px={"0.5rem"}>
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

          <Box display={"flex"} flexDir={"column"} w={"full"} mt={"0.3rem"}>
            <Box backgroundColor={"#253f5b"} color={"#FFFFFF"} px={"0.5rem"}>
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

      {/* <Text
        fontSize={"xs"}
        fontWeight={"semibold"}
        mt={"1rem"}
        color={"#747474"}
      >
        Generated with Greynote . Mon Feb 12 2024 11:08:32 GMT +01:00 (West
        African Standard Time)
      </Text> */}
    </Box>
  );
});

export default ResultSheetTemplateTwo;
