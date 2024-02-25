'use client'
import { FC, useState } from 'react'
import {
  Box,
  Text,
  Flex,
  Divider,
  Icon,
  Badge,
  IconButton,
  Tooltip,
  ScaleFade,
  useDisclosure,
} from "@chakra-ui/react";
import { IoReceiptOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

interface InvoiceItemProps {
  studentInvoice: StudentInvoiceProps;
  mouseEnter: () => void; // Define the type for mouseEnter
  mouseLeave: () => void; // Define the type for mouseLeave
  hovered: boolean;
}
interface InvoiceProps {

}

interface StudentInvoiceProps {
  term: string;
  year: string;
  billType: string;
  amountPaid: string;
}

const InvoiceItem: FC<InvoiceItemProps> = ({
  studentInvoice,
  mouseEnter,
  mouseLeave,
  hovered,
}) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box
      height={"100%"}
      border={"1px solid #449c7c"}
      rounded={"lg"}
      p={"0.4rem"}
      w={"full"}
      onMouseEnter={() => {
        mouseEnter();
        onToggle();
      }}
      onMouseLeave={() => {
        mouseLeave();
        onToggle();
      }}
      mb={"1rem"}
    >
      <Box backgroundColor={"#E2E2E2"} rounded={"lg"} p={"0.6rem"} pb={"2rem"}>
        <Box display={"flex"} gap={1} alignItems={"center"}>
          <Text fontSize={"sm"} color={"#666666"}>
            {studentInvoice.term}
          </Text>{" "}
          •{" "}
          <Text fontSize={"xs"} color={"#666666"}>
            {studentInvoice.year}
          </Text>
        </Box>
        <Text color={"#666666"} mt={"1.8rem"} fontSize={"xs"}>
          {studentInvoice.billType}
        </Text>
        <Text color={"#000"} fontSize={"2xl"} fontWeight={"500"}>
          ₦ {studentInvoice.amountPaid}
        </Text>
      </Box>
      <Box px={"0.5rem"}>
        <Text color={"#666666"} fontSize={"xs"} fontWeight={"400"} mt={"1rem"}>
          Summary
        </Text>
        <Text fontSize={"16px"} color={"#000000"}>
          Excursion to Regus Mulliner Towers
        </Text>

        <Badge
          variant={"solid"}
          colorScheme="green"
          px={"1rem"}
          py={"0.1rem"}
          fontSize={"2xs"}
        >
          Active
        </Badge>
      </Box>

      <Flex alignItems={"end"} justifyContent={"space-between"} mt={"1rem"}>
        <Text color={"#C2C2C2"} fontSize={"2xs"}>
          Generated on 14th Jan, 2024
        </Text>
        <ScaleFade initialScale={0.9} in={isOpen}>
          <Flex gap={3} display={hovered ? "flex" : "none"}>
            <Tooltip
              hasArrow
              label="Accept Invoice"
              bg="green.300"
              color="black"
              placement="left-start"
            >
              <IconButton
                colorScheme="green"
                aria-label="Search database"
                icon={<FaCheck />}
              />
            </Tooltip>
            <Tooltip
              hasArrow
              label="Reject Invoice"
              bg="red.300"
              color="black"
              placement="right-start"
            >
              <IconButton
                colorScheme="red"
                aria-label="Search database"
                icon={<IoClose size="24" />}
              />
            </Tooltip>
          </Flex>
        </ScaleFade>
      </Flex>
    </Box>
  );
};

const Invoice: FC<InvoiceProps> = ({}) => {
  const studentInvoiceData = [
    {
      term: "1st Term",
      year: "2023/2024",
      billType: "Extra-Curricular",
      amountPaid: "265,000",
    },
    {
      term: "1st Term",
      year: "2023/2024",
      billType: "Extra-Curricular",
      amountPaid: "265,000",
    },
    {
      term: "1st Term",
      year: "2023/2024",
      billType: "Extra-Curricular",
      amountPaid: "265,000",
    },
  ];

  const [hoveredStates, setHoveredStates] = useState(
    new Array(studentInvoiceData.length).fill(false)
  );

  const handleMouseEnter = (index: number) => {
    const newHoveredStates = [...hoveredStates];
    newHoveredStates[index] = true;
    setHoveredStates(newHoveredStates);
  };

  const handleMouseLeave = (index: number) => {
    const newHoveredStates = [...hoveredStates];
    newHoveredStates[index] = false;
    setHoveredStates(newHoveredStates);
  };
  
  return (
    <Box
      p={"1rem"}
      backgroundColor={"#fff"}
      rounded={"lg"}
      w={"full"}
      border={"1px solid #449c7c"}
    >
      <Flex>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <Icon as={IoReceiptOutline} boxSize={"5"} color={"#189879"} />
          <Text fontWeight={"600"} fontSize={"xl"}>
            {"Invoice Received"}
          </Text>
        </Box>
      </Flex>

      <Divider color={"#E2E2E2"} my={"0.8rem"} />

      <Box display={{base:"column", xl:"flex"}} gap={3}>
        {studentInvoiceData.map((student, index) => {
          return (
            <InvoiceItem
              studentInvoice={student}
              key={index}
              mouseEnter={() => handleMouseEnter(index)}
              mouseLeave={() => handleMouseLeave(index)}
              hovered={hoveredStates[index]}
            />
          );
        })}
      </Box>
    </Box>
  );
}

export default Invoice