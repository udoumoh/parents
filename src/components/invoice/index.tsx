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
import RejectInvoiceModal from "../shared/rejectinvoicemodal";
import { GET_STUDENT_INVOICE } from "@/gql/queries/queries";
import { useQuery } from "@apollo/client";
import { useUserAPI } from "@/hooks/UserContext";
import { formatDate } from "@/helpers/formatDate";
import formatNumberWithCommas from "@/helpers/formatNumberWithCommas";

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
    <Box
      height={"100%"}
      border={"1px solid #C2C2C2"}
      rounded={"xl"}
      p={"0.4rem"}
      mb={"1rem"}
      w={{base:"full", lg:"300px"}}
      h={"auto"}
    >
      <Box backgroundColor={"#E2E2E2"} rounded={"lg"} p={"0.6rem"} pb={"1rem"}>
        <Box display={"flex"} gap={1} alignItems={"center"}>
          <Text fontSize={"sm"} color={"#666666"}>
            {studentInvoice.term}
          </Text>{" "}
          •{" "}
          <Text fontSize={"xs"} color={"#666666"}>
            {studentInvoice.year}
          </Text>
        </Box>
        <Text color={"#666666"} mt={"1.3rem"} fontSize={"xs"}>
          {studentInvoice.billType}
        </Text>
        <Text color={"#000"} fontSize={"2xl"} fontWeight={"500"}>
          ₦ {formatNumberWithCommas(studentInvoice.amountPaid)}
        </Text>
      </Box>
      <Box px={"0.5rem"}>
        <Text color={"#666666"} fontSize={"xs"} fontWeight={"400"} mt={"1rem"}>
          Summary
        </Text>
        <Text fontSize={"16px"} fontWeight={"500"} color={"#000000"} isTruncated>
          {`${studentInvoice.summary || studentInvoice.billType}`}
        </Text>

        <Badge
          variant={"solid"}
          colorScheme={studentInvoice.status === "active" ? "green" : "yellow"}
          px={"1rem"}
          py={"0.1rem"}
          fontSize={"2xs"}
          borderRadius={"3px"}
        >
          {studentInvoice.status}
        </Badge>
      </Box>

      <Flex
        alignItems={"end"}
        justifyContent={"space-between"}
        px={"0.5rem"}
        mt={"0.3rem"}
      >
        <Text color={"#C2C2C2"} fontSize={"2xs"}>
          Generated on {formatDate(studentInvoice?.createdAt)}
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
  const [invoiceData, setInvoiceData] = useState([])
  const { data: getinvoice } = useQuery(GET_STUDENT_INVOICE, {
    variables: { studentId: currentWardProfile?.id},
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getinvoice;
        const parsedInvoiceData = response?.getStudentInvoice?.map(
          (item: any) => ({
            term: item.academicTerm,
            year: item.academicYear,
            billType: item.category,
            amountPaid: item.amount,
            id: item.id,
            createdAt: item.createdAt,
            summary: item.summary,
            status: item.status,
          })
        );
        setInvoiceData(parsedInvoiceData);
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

      {invoiceData?.length > 0 ? (
        <Wrap spacing={"15px"}>
          {invoiceData?.map((student, index) => {
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
