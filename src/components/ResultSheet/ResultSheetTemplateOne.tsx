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
import './ResultStyles.css'
import Image from "next/image";

const ResultSheetTemplateOne = forwardRef<HTMLDivElement>((props, ref) => {
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
              Bright Stars High School
            </Text>
            <Text fontSize={"xs"} maxW={'400px'} fontWeight={"semibold"} fontStyle={"italic"}>
              1, Eyitope close, off Bayo Shodipo Street, Royal Palmswill Estate,
              Remlek Bus stop, Badore, Ajah, Lagos, Badore, Lagos
            </Text>
          </VStack>
        </Flex>
        <Text fontWeight={"bold"}>Report Card</Text>
      </Flex>

      <Box backgroundColor={"#747474"} mt={"0.5rem"} height={"2px"}></Box>

      <VStack py={"0.5rem"}>
        <Flex justifyContent={"space-between"} w={"full"}>
          <Text>
            <span style={{ fontWeight: "bold" }}>Student Name:</span> Monica
            Geller-Bing
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Term:</span> 1st Term
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Year:</span> 2024/2025
          </Text>
        </Flex>

        <Flex justifyContent={"space-between"} w={"full"}>
          <Text>
            <span style={{ fontWeight: "bold" }}>Age:</span> 13 Years Old
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Class:</span> JSS2 Science
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Attendance:</span> 50
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Percentage:</span> 78%
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
          background="url(/images/schoollogo.png)"
          backgroundRepeat="no-repeat"
          backgroundSize="contain"
          backgroundPosition="center"
          opacity="0.1" // Adjust opacity here
          zIndex="0"
        />
        <TableContainer position="relative" zIndex="1">
          <Table size="sm">
            <Thead>
              <Tr>
                <Th
                  textTransform="none"
                  color="#000"
                  fontWeight="bold"
                  fontSize="md"
                >
                  Subject
                </Th>
                <Th
                  textTransform="none"
                  color="#000"
                  fontWeight="bold"
                  fontSize="md"
                >
                  Test1
                </Th>
                <Th
                  textTransform="none"
                  color="#000"
                  fontWeight="bold"
                  fontSize="md"
                >
                  Test2
                </Th>
                <Th
                  textTransform="none"
                  color="#000"
                  fontWeight="bold"
                  fontSize="md"
                >
                  Exam
                </Th>
                <Th
                  textTransform="none"
                  color="#000"
                  fontWeight="bold"
                  fontSize="md"
                >
                  Total
                </Th>
                <Th
                  textTransform="none"
                  color="#000"
                  fontWeight="bold"
                  fontSize="md"
                >
                  Grade
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Mathematics</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td>English</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td>Social Studies</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td>Civic Education</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td>Physics</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td>Geography</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td>Economics</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td>Biology</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td>Government</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td>History</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td>Data Processing</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td>French</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td>Further Maths</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td>Chemistry</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Total</Td>
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
      <VStack gap={4} mt={"2rem"} px={"2rem"}>
        <Box w={"full"} display={"grid"} gap={2}>
          <Text>
            <span style={{ fontWeight: "bold" }}>Teacher Name:</span> Rachel
            Zing
          </Text>
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

      <Text fontSize={"xs"} fontWeight={"semibold"} mt={"5rem"} color={"#747474"}>
        Generated with Greynote . Mon Feb 12 2024 11:08:32 GMT +01:00 (West
        African Standard Time)
      </Text>
    </Box>
  );
});

export default ResultSheetTemplateOne;
