"use client";
import { FC, useState, useEffect } from "react";
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

interface InvoiceItemProps {
  studentInvoice: StudentInvoiceProps;
}
interface InvoiceProps {}

interface StudentInvoiceProps {
  term: string;
  year: string;
  category: string;
  amountPaid: string;
  id:number;
  status: string;
  summary: string;
  createdAt: string;
}

const InvoiceItem: FC<InvoiceItemProps> = ({
  studentInvoice
}) => {
  const { isOpen: isAcceptModalOpen, onOpen: onAcceptModalOpen, onClose: onAcceptModalClose } = useDisclosure();
  const {
    isOpen: isRejectModalOpen,
    onOpen: onRejectModalOpen,
    onClose: onRejectModalClose,
  } = useDisclosure();
  return (
    <Box border={"1px solid #C2C2C2"} rounded={"xl"} p={"0.4rem"} mb={"1rem"}>
      <Box
        backgroundColor={"#44506960"}
        rounded={"lg"}
        p={"0.6rem"}
        pb={"1rem"}
      >
        <Box display={"flex"} gap={1} alignItems={"center"}>
          <Text fontSize={"xs"}>{studentInvoice.term}</Text> •{" "}
          <Text fontSize={"xs"}>{studentInvoice.year}</Text>
        </Box>
        <Text mt={"1.3rem"} fontSize={"xs"}>
          {studentInvoice.category}
        </Text>
        <Text color={"#000"} fontSize={"2xl"} fontWeight={"600"}>
          ₦{formatNumberWithCommas(studentInvoice.amountPaid)}
        </Text>
      </Box>
      <Box px={"0.5rem"} w={"auto"} mb={"0.5rem"}>
        <Text color={"#666666"} fontSize={"xs"} fontWeight={"400"} mt={"1rem"}>
          Summary
        </Text>
        <Text
          fontSize={{ base: "sm", lg: "16px" }}
          fontWeight={"500"}
          color={"#000000"}
          isTruncated={true}
          maxW={"180px"}
        >
          {`${studentInvoice.summary || studentInvoice.category}`}
        </Text>

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
          px={"1rem"}
          py={"0.1rem"}
          fontSize={"2xs"}
          borderRadius={"3px"}
          my={"0.5rem"}
        >
          {studentInvoice.status}
        </Badge>
      </Box>

      <Flex
        alignItems={"end"}
        justifyContent={"space-between"}
        px={"0.5rem"}
        mt={"0.3rem"}
        gap={3}
      >
        <Text color={"#C2C2C2"} fontSize={"2xs"}>
          Generated on {studentInvoice?.createdAt}
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
              onClick={onAcceptModalOpen}
              size={"sm"}
              isDisabled={
                !["active", "partial payment"].includes(studentInvoice?.status)
                  ? true
                  : false
              }
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
              onClick={onRejectModalOpen}
              size={"sm"}
              isDisabled={
                !["active", "partial payment"].includes(studentInvoice?.status)
                  ? true
                  : false
              }
            />
          </Tooltip>
        </Flex>
        <AcceptInvoiceModal
          isOpen={isAcceptModalOpen}
          onOpen={onAcceptModalOpen}
          onClose={onAcceptModalClose}
          invoiceId={studentInvoice.id}
        />
        <RejectInvoiceModal
          isOpen={isRejectModalOpen}
          onOpen={onRejectModalOpen}
          onClose={onRejectModalClose}
          invoiceId={studentInvoice.id}
        />
      </Flex>
    </Box>
  );
};

const Invoice: FC<InvoiceProps> = ({}) => {
  const {currentWardProfile} = useUserAPI()
  const [invoiceData, setInvoiceData] = useState([]);
  const { data: getinvoice } = useQuery(GET_STUDENT_INVOICE, {
    variables: { studentId: currentWardProfile?.id},
  });
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getinvoice;
        const parsedInvoiceData = response?.getStudentInvoice?.map(
          (item: any) => ({
            term: item.academicTerm,
            year: item.academicYear,
            category: item.category,
            amountPaid: item.amount,
            id: item.id,
            createdAt: formatDate(item.createdAt),
            summary: item.summary,
            status: item.status,
          })
        );
        setInvoiceData(parsedInvoiceData.reverse());
      } catch (err: any) {
        console.log(err.message);
      }
    };
    fetchData();
  }, [getinvoice]);

  return (
    <Box
      p={"1rem"}
      backgroundColor={"#fff"}
      rounded={"2xl"}
      w={"full"}
      border={"1px solid #005D5D50"}
    >
      <Flex w={"full"} justifyContent={"space-between"} gap={3}>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <Icon as={IoReceiptOutline} boxSize={"5"} color={"#189879"} />
          <Text fontWeight={"600"} fontSize={"xl"}>
            {"Invoice Received"}
          </Text>
        </Box>
        <Button
          backgroundColor={"transparent"}
          rounded={"md"}
          border={"1px solid #E2E2E2"}
          size={"sm"}
          onClick={() => router.push("/dashboard/home/invoice")}
        >
          <Text fontSize={"sm"} color={"#747474"}>
            See All
          </Text>
        </Button>
      </Flex>

      <Divider color={"#C2C2C2"} my={"0.8rem"} />

      {invoiceData?.length > 0 ? (
        <Wrap spacing={"15px"}>
          {invoiceData?.slice(0, 3)?.map((student, index) => {
            return (
              <WrapItem key={index} w={"auto"}>
                <InvoiceItem studentInvoice={student} />
              </WrapItem>
            );
          })}
        </Wrap>
      ) : (
        <Box
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          mt={"3rem"}
        >
          <Image
            src="/images/emptyStateInvoice.svg"
            alt="No invoice card"
            width={"300px"}
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
