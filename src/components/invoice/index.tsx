"use client";
import { FC, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Text,
  Flex,
  Divider,
  Icon,
  Badge,
  IconButton,
  Tooltip,
  useDisclosure,
  Image,
  Wrap,
  WrapItem,
  Button,
} from "@chakra-ui/react";
import { IoReceiptOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import AcceptInvoiceModal from "../shared/acceptInvoiceModal";
import RejectInvoiceModal from "../shared/rejectinvoicemodal";
import { GET_STUDENT_INVOICE } from "@/gql/queries";
import { useQuery } from "@apollo/client";
import { useUserAPI } from "@/hooks/UserContext";
import { formatDate } from "@/helpers/formatDate";
import formatNumberWithCommas from "@/helpers/formatNumberWithCommas";
import { useRouter } from "next/navigation";
import InvoiceDataModal from "../shared/InvoiceDataModal";

interface InvoiceItemProps {
  studentInvoice: StudentInvoiceProps;
}
interface InvoiceProps {}

interface StudentInvoiceProps {
  term: string;
  year: string;
  category: string;
  amountPaid: number;
  id: number;
  status: string;
  summary: string;
  createdAt: string;
  invoiceId: string;
  isRefundable: boolean;
  schoolname: string;
  schoollogo: string;
  balance: number;
  receipt: {
    amountPaid: number;
    createdAt: string;
    creator: string;
    fileType: string;
    id: number;
    parentInvoiceId: string;
    status: string;
    summary: string;
    updatedAt: string;
    uploadedDocument: string;
  }[];
}

const InvoiceItem: FC<InvoiceItemProps> = ({
  studentInvoice
}) => {
  const router = useRouter()
  const { isOpen: isAcceptModalOpen, onOpen: onAcceptModalOpen, onClose: onAcceptModalClose } = useDisclosure();
  const {
    isOpen: isRejectModalOpen,
    onOpen: onRejectModalOpen,
    onClose: onRejectModalClose,
  } = useDisclosure();

  const {
    isOpen: isInvoiceDataModalOpen,
    onOpen: onInvoiceDataModalOpen,
    onClose: onInvoiceDataModalClose,
  } = useDisclosure();

  const getCompletedInvoiceAmount = (invoice: any) => {
    const totalCompletedAmount = invoice?.receipt
      ?.filter((item: any) => item?.status !== "rejected by school")
      .map((receipt: any) => receipt?.amountPaid)
      .reduce((acc: any, item: any) => acc + item, 0);
    return totalCompletedAmount;
  };

  return (
    <Box
      border={"1px solid #E2E2E2"}
      rounded={"md"}
      p={{ base: "0.5rem", md: "1rem" }}
      mb={"1rem"}
    >
      <InvoiceDataModal
        isOpen={isInvoiceDataModalOpen}
        onClose={onInvoiceDataModalClose}
        invoice={studentInvoice}
      />
      <AcceptInvoiceModal
        isOpen={isAcceptModalOpen}
        onOpen={onAcceptModalOpen}
        onClose={onAcceptModalClose}
        invoiceData={studentInvoice}
      />
      <RejectInvoiceModal
        isOpen={isRejectModalOpen}
        onOpen={onRejectModalOpen}
        onClose={onRejectModalClose}
        invoiceData={studentInvoice}
      />
      <Box
        display={{ base: "grid", md: "flex" }}
        justifyContent={"space-between"}
        alignItems={"initial"}
        gap={2}
      >
        <Flex gap={1}>
          <Box backgroundColor={"#E6E6E6"} rounded={"2px"}>
            <Text
              color={"#747474"}
              fontWeight={"semibold"}
              fontSize={{ base: "3xs", md: "2xs" }}
              px={{ base: "0.4rem", md: "0.8rem" }}
              py={"0.2rem"}
            >
              {studentInvoice?.term}
            </Text>
          </Box>

          <Box backgroundColor={"#E6E6E6"} rounded={"2px"}>
            <Text
              color={"#747474"}
              fontWeight={"semibold"}
              fontSize={{ base: "3xs", md: "2xs" }}
              px={{ base: "0.4rem", md: "0.8rem" }}
              py={"0.2rem"}
            >
              {studentInvoice?.year}
            </Text>
          </Box>

          <Badge
            variant={"solid"}
            colorScheme={
              studentInvoice?.status === "active"
                ? "green"
                : studentInvoice?.status === "rejected by parent"
                ? "red"
                : studentInvoice?.status === "processing"
                ? "yellow"
                : studentInvoice?.status === "completed"
                ? "blue"
                : "purple"
            }
            px={{ base: "0.4rem", md: "0.8rem" }}
            py={"0.2rem"}
            fontSize={{ base: "3xs", md: "2xs" }}
            borderRadius={"3px"}
          >
            {studentInvoice.status.split(" ")[0]}
          </Badge>

          <Badge
            variant={"solid"}
            px={{ base: "0.4rem", md: "0.8rem" }}
            py={"0.2rem"}
            fontSize={{ base: "3xs", md: "2xs" }}
            borderRadius={"3px"}
            backgroundColor={"#DC791E"}
          >
            non-refundable
          </Badge>
        </Flex>
        <Text color={"#666666"} fontSize={"2xs"} fontWeight={"semibold"}>
          Generated on {studentInvoice?.createdAt}
        </Text>
      </Box>

      <Box>
        <Text
          mt={"1.3rem"}
          fontSize={"xs"}
          color={"#666666"}
          fontWeight={"semibold"}
        >
          {studentInvoice.category}
        </Text>

        <Box
          display={"flex"}
          flexDir={{ base: "column", md: "row" }}
          justifyContent={"space-between"}
          gap={{ base: 2, md: 8}}
          w={"full"}
        >
          <Text color={"#000"} fontSize={"2xl"} fontWeight={"semibold"}>
            ₦
            {studentInvoice?.status === "active" ||
            studentInvoice?.status === "processing"
              ? formatNumberWithCommas(studentInvoice?.amountPaid)
              : formatNumberWithCommas(
                  studentInvoice?.amountPaid +
                    getCompletedInvoiceAmount(studentInvoice)
                )}
          </Text>

          <Flex gap={2} maxW={{base:"full", md:"300px"}}>
            <Button
              px={"2rem"}
              w={"full"}
              rounded={"3px"}
              colorScheme="gray"
              size={'sm'}
              fontSize={{base:'xs', md:"md"}}
              onClick={() => onInvoiceDataModalOpen()}
            >
              More Details
            </Button>
            <Button
              onClick={onRejectModalOpen}
              px={"0.8rem"}
              w={"full"}
              rounded={"3px"}
              colorScheme="gray"
              size={'sm'}
              fontSize={{base:'xs', md:"md"}}
              isDisabled={
                !["active", "partial payment"].includes(studentInvoice?.status)
                  ? true
                  : false
              }
            >
              Reject
            </Button>
            <Button
              onClick={onAcceptModalOpen}
              px={"0.8rem"}
              w={"full"}
              rounded={"3px"}
              colorScheme="teal"
              size={'sm'}
              fontSize={{base:'xs', md:"md"}}
              isDisabled={
                !["active", "partial payment"].includes(studentInvoice?.status)
                  ? true
                  : false
              }
            >
              Accept
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

const Invoice: FC<InvoiceProps> = ({}) => {
  const {invoiceData} = useUserAPI()
  const router = useRouter();

  const tempData = [
    {
      term: "1st Term",
      year: "2014/2015",
      category: "School Fees",
      amountPaid: 250000,
      id: 5,
      status: "active",
      summary: "",
      createdAt: "21st June 2024",
      invoiceId: "12",
      isRefundable: true,
      schoolname: "Alice International",
      schoollogo: "/",
      balance: 5000,
      receipt: [
        {
          amountPaid: 10000,
          createdAt: "",
          creator: "",
          fileType: "",
          id: 3,
          parentInvoiceId: "",
          status: "",
          summary: "",
          updatedAt: "",
          uploadedDocument: "",
        },
      ],
    },
    {
      term: "1st Term",
      year: "2014/2015",
      category: "School Fees",
      amountPaid: 250000,
      id: 5,
      status: "rejected by parent",
      summary: "",
      createdAt: "21st June 2024",
      invoiceId: "12",
      isRefundable: true,
      schoolname: "Alice International",
      schoollogo: "/",
      balance: 5000,
      receipt: [
        {
          amountPaid: 10000,
          createdAt: "",
          creator: "",
          fileType: "",
          id: 3,
          parentInvoiceId: "",
          status: "",
          summary: "",
          updatedAt: "",
          uploadedDocument: "",
        },
      ],
    },
    {
      term: "1st Term",
      year: "2014/2015",
      category: "School Fees",
      amountPaid: 250000,
      id: 5,
      status: "active",
      summary: "",
      createdAt: "21st June 2024",
      invoiceId: "12",
      isRefundable: true,
      schoolname: "Alice International",
      schoollogo: "/",
      balance: 5000,
      receipt: [
        {
          amountPaid: 10000,
          createdAt: "",
          creator: "",
          fileType: "",
          id: 3,
          parentInvoiceId: "",
          status: "",
          summary: "",
          updatedAt: "",
          uploadedDocument: "",
        },
      ],
    },
  ];

  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transitionDuration={"1s"}
      pt={"1rem"}
      px={{base:"0.5rem", md:'1rem'}}
      backgroundColor={"#fff"}
      rounded={"md"}
      w={"full"}
      border={"1px solid #E2E2E2"}
    >
      <Flex w={"full"} justifyContent={"space-between"} gap={3}>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <Icon as={IoReceiptOutline} boxSize={"5"} color={"#189879"} />
          <Text fontWeight={"bold"} fontSize={"md"}>
            {"Invoice Received"}
          </Text>
        </Box>
        <Button
          backgroundColor={"transparent"}
          rounded={"md"}
          border={"1px solid #E2E2E2"}
          size={"sm"}
          onClick={() => window.location.assign("/dashboard/home/invoice")}
        >
          <Text fontSize={"sm"} color={"#747474"}>
            See All
          </Text>
        </Button>
      </Flex>

      <Divider color={"#C2C2C2"} my={"0.8rem"} />

      {invoiceData?.length > 0 ? (
        <Box
          maxH={"500px"}
          overflowY={"auto"}
          sx={{
            "::-webkit-scrollbar": { display: "none" },
          }}
        >
          {invoiceData?.slice(0, 3)?.map((student, index) => {
            return <InvoiceItem studentInvoice={student} key={index}/>;
          })}
        </Box>
      ) : (
        <Box
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          py={'1rem'}
        >
          <Image
            src="/images/emptyStateInvoice.svg"
            alt="No invoice card"
            maxW={{ base: "200px", md: "300px" }}
            pointerEvents={"none"}
          />
          <Text color={"#747474"} mt={"2rem"}>
            Your ward has no active invoice
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default Invoice;
