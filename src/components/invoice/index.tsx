"use client";
import { FC, useState } from "react";
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
  Image,
  Button,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { IoReceiptOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import AcceptInvoiceModal from "../shared/acceptInvoiceModal";

interface InvoiceItemProps {
  studentInvoice: StudentInvoiceProps;
}
interface InvoiceProps {}

interface StudentInvoiceProps {
  term: string;
  year: string;
  billType: string;
  amountPaid: string;
  id:number;
}

const InvoiceItem: FC<InvoiceItemProps> = ({
  studentInvoice
}) => {
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  return (
    <Box
      height={"100%"}
      border={"1px solid #C2C2C2"}
      rounded={"lg"}
      p={"0.4rem"}
      w={"full"}
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
          <Flex gap={3}>
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
                onClick={onModalOpen}
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
        <AcceptInvoiceModal isOpen={isModalOpen} onOpen={onModalOpen} onClose={onModalClose} invoiceId = {studentInvoice.id}/>
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
      id:1,
    },
    {
      term: "1st Term",
      year: "2023/2024",
      billType: "Extra-Curricular",
      amountPaid: "265,000",
      id:2,
    },
    {
      term: "1st Term",
      year: "2023/2024",
      billType: "Extra-Curricular",
      amountPaid: "265,000",
      id:3,
    },
  ];

  return (
    <Box
      p={"1rem"}
      backgroundColor={"#fff"}
      rounded={"lg"}
      w={"full"}
      border={"1px solid #C2C2C2"}
    >
      <Flex>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <Icon as={IoReceiptOutline} boxSize={"5"} color={"#189879"} />
          <Text fontWeight={"600"} fontSize={"xl"}>
            {"Invoice Received"}
          </Text>
        </Box>
      </Flex>

      <Divider color={"#C2C2C2"} my={"0.8rem"} />

      {studentInvoiceData.length > 0 ? (
        <Wrap spacing={'15px'}>
          {studentInvoiceData.map((student, index) => {
            return (
              <WrapItem key={index} w={'auto'}>
                <InvoiceItem
                  studentInvoice={student}
                />
              </WrapItem>
            );
          })}
        </Wrap>
      ) : (
        <Box display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'center'} mt={'3rem'}>
          <Image src="/images/emptyStateInvoice.svg" alt="No invoice card" width={'300px'}/>
          <Text color={"#747474"} mt={"2rem"}>
            Your ward has no active invoice
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default Invoice;
