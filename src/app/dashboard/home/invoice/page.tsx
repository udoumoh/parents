"use client";
import { FC, useState, useEffect } from "react";
import {
  Box,
  Text,
  Flex,
  SimpleGrid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Avatar,
  Badge,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import { GET_STUDENT_INVOICE } from "@/gql/queries";
import { BsThreeDots } from "react-icons/bs";
import { useUserAPI } from "@/hooks/UserContext";
import { useQuery } from "@apollo/client";
import { formatDate } from "@/helpers/formatDate";
import formatNumberWithCommas from "@/helpers/formatNumberWithCommas";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineClose } from "react-icons/md";
import AcceptInvoiceModal from "@/components/shared/acceptInvoiceModal";
import RejectInvoiceModal from "@/components/shared/rejectinvoicemodal";
import InvoiceDataDrawer from "@/components/shared/invoiceDataDrawer";

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
  schoolname: string;
  schoollogo: string;
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

const Invoice: FC<InvoiceProps> = ({}) => {
  const { currentWardProfile } = useUserAPI();

  const {
    isOpen: isAcceptModalOpen,
    onOpen: onAcceptModalOpen,
    onClose: onAcceptModalClose,
  } = useDisclosure();
  const {
    isOpen: isRejectModalOpen,
    onOpen: onRejectModalOpen,
    onClose: onRejectModalClose,
  } = useDisclosure();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();

  const [invoiceData, setInvoiceData] = useState<StudentInvoiceProps[]>([]);

  const [selectedInvoiceData, setSelectedInvoiceData] = useState<StudentInvoiceProps>({
  term: "Spring",
  year: "2024",
  category: "Education",
  amountPaid: 1500,
  id: 123,
  status: "Paid",
  summary: "Payment for tuition fees",
  createdAt: "2024-03-17",
  invoiceId: "INV123456",
  schoolname: "Example School",
  schoollogo: "school_logo.png",
  receipt: [
    {
      amountPaid: 1500,
      createdAt: "2024-03-17",
      creator: "John Doe",
      fileType: "pdf",
      id: 1,
      parentInvoiceId: "INV123456",
      status: "Paid",
      summary: "Payment receipt for tuition fees",
      updatedAt: "2024-03-17",
      uploadedDocument: "receipt_123.pdf",
    },
    {
      amountPaid: 500,
      createdAt: "2024-03-15",
      creator: "Jane Smith",
      fileType: "pdf",
      id: 2,
      parentInvoiceId: "INV123456",
      status: "Paid",
      summary: "Payment receipt for textbooks",
      updatedAt: "2024-03-15",
      uploadedDocument: "receipt_456.pdf",
    },
  ],
  })

  const { data: getinvoice } = useQuery(GET_STUDENT_INVOICE, {
    variables: { studentId: currentWardProfile?.id },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getinvoice;
        const parsedInvoiceData = response?.getStudentInvoice?.map(
          (item: any) => ({
            term: item?.academicTerm,
            year: item?.academicYear,
            category: item?.category,
            amountPaid: item?.amount,
            id: item?.id,
            invoiceId: item?.invoiceId,
            createdAt: formatDate(item?.createdAt),
            summary: item?.summary,
            status: item?.status,
            schoolname: item?.creatorSchool,
            schoollogo: item?.student?.creator?.admin?.schoolImg,
            receipt: item?.receipt,
          })
        );
        setInvoiceData(parsedInvoiceData);
      } catch (err: any) {
        console.log(err.message);
      }
    };
    fetchData();
  }, [getinvoice]);

  // const completedInvoice = invoiceData?.filter(
  //   (invoice) => invoice.status === "completed"
  // );
  // const activeInvoice = invoiceData?.filter(
  //   (invoice) => invoice.status === "active"
  // );
  // const rejectedInvoice = invoiceData?.filter(
  //   (invoice) => invoice.status === "rejected by parent"
  // );
  // const processingInvoice = invoiceData?.filter(
  //   (invoice) => invoice.status === "processing"
  // );

  // const totalActiveAmount = activeInvoice?.reduce(
  //   (accumulator, invoice) => accumulator + invoice.amountPaid,
  //   0
  // );
  // const totalRejectedAmount = rejectedInvoice?.reduce(
  //   (accumulator, invoice) => accumulator + invoice.amountPaid,
  //   0
  // );
  // const totalProcessingAmount = processingInvoice?.reduce(
  //   (accumulator, invoice) => accumulator + invoice.amountPaid,
  //   0
  // );

  // const nonEmptyReceipts = invoiceData
  //   ?.map((invoice) => invoice?.receipt)
  //   ?.filter((receipt: any) => receipt?.length !== 0);
  // const totalAmountPaid = nonEmptyReceipts
  //   ?.map((receiptItem) =>
  //     receiptItem?.reduce((acc, item) => acc + item?.amountPaid, 0)
  //   )
  //   .reduce((acc: any, item: any) => acc + item, 0);

  // const getCompletedInvoiceAmount = (invoice: any) => {
  //   const totalCompletedAmount = invoice?.receipt?.map((receipt: any) => receipt?.amountPaid)
  //     .reduce((acc: any, item: any) => acc + item, 0);
  //   return formatNumberWithCommas(totalCompletedAmount);
  // };

  const handleSelectedInvoice = (invoice: any) => {
      setSelectedInvoiceData(invoice)
      onDrawerOpen();
      console.log(invoice)
  }

  return (
    <Box mb={{ base: "8rem", lg: "5rem" }}>
      <Box>
        <Box>
          <Text
            color={"#005D5D"}
            fontSize={"2xl"}
            fontWeight={"600"}
            mb={"1rem"}
          >
            Overview
          </Text>
        </Box>
        <SimpleGrid minChildWidth="200px" spacing={"10px"}>
          <Flex
            flexDir={"column"}
            backgroundColor={"#DBEEFC"}
            border={"1px solid #83ACC960"}
            rounded={"2xl"}
            px={5}
            py={2}
            gap={"2"}
            w={"full"}
            shadow={"md"}
            _hover={{ boxShadow: "sm" }}
            
          >
            <Text fontSize={"md"} color={"blue.800"} fontWeight={"500"}>
              Total Amount Paid
            </Text>
            <Text fontSize={"3xl"} fontWeight={"700"} color={"gray.700"}>
              ₦
              
            </Text>
            <Badge
              backgroundColor={"black"}
              rounded="full"
              py={"0.1rem"}
              px={"0.5rem"}
              color={"#fff"}
              maxW={"100px"}
              fontSize={"2xs"}
              shadow={"md"}
            >
             invoices
            </Badge>
          </Flex>
          <Flex
            flexDir={"column"}
            backgroundColor={"#E7FDF5"}
            border={"1px solid #449C8760"}
            rounded={"2xl"}
            px={5}
            py={2}
            gap={"2"}
            w={"full"}
            shadow={"md"}
            _hover={{ boxShadow: "sm" }}
            
          >
            <Text fontSize={"md"} color={"blue.800"} fontWeight={"500"}>
              Active
            </Text>
            <Text fontSize={"3xl"} fontWeight={"700"} color={"gray.700"}>
              ₦
              
            </Text>
            <Badge
              backgroundColor={"black"}
              rounded="full"
              py={"0.1rem"}
              px={"0.5rem"}
              color={"#fff"}
              maxW={"100px"}
              fontSize={"2xs"}
            >
               invoices
            </Badge>
          </Flex>
          <Flex
            flexDir={"column"}
            backgroundColor={"#FDE7E7"}
            border={"1px solid #9C444460"}
            rounded={"2xl"}
            px={5}
            py={2}
            gap={"2"}
            w={"full"}
            shadow={"md"}
            _hover={{ boxShadow: "sm" }}
            
          >
            <Text fontSize={"lg"} color={"blue.800"} fontWeight={"500"}>
              Rejected
            </Text>
            <Text fontSize={"3xl"} fontWeight={"700"} color={"gray.700"}>
              ₦
              

            </Text>
            <Badge
              backgroundColor={"black"}
              rounded="full"
              py={"0.1rem"}
              px={"0.5rem"}
              color={"#fff"}
              maxW={"100px"}
              fontSize={"2xs"}
            >
             invoices
            </Badge>
          </Flex>
          <Flex
            flexDir={"column"}
            backgroundColor={"#FCF1DB"}
            border={"1px solid #C9973760"}
            rounded={"2xl"}
            px={5}
            py={2}
            gap={"2"}
            w={"full"}
            shadow={"md"}
            _hover={{ boxShadow: "sm" }}
            
          >
            <Text fontSize={"md"} color={"blue.800"} fontWeight={"500"}>
              Processing
            </Text>
            <Text fontSize={"3xl"} fontWeight={"700"} color={"gray.700"}>
              ₦
              
            </Text>
            <Badge
              backgroundColor={"black"}
              rounded="full"
              py={"0.1rem"}
              px={"0.5rem"}
              color={"#fff"}
              maxW={"100px"}
              fontSize={"2xs"}
            >
               invoices
            </Badge>
          </Flex>
        </SimpleGrid>
      </Box>

      <Box mt={"3rem"}>
        <Box>
          <Tabs variant={"unstyled"} size={"xs"} w={"full"}>
            <Flex overflowX={"auto"}>
              <TabList
                backgroundColor={"#005D5D40"}
                p={"0.4rem"}
                rounded={"md"}
                gap={{ base: "1", md: "3" }}
              >
                <Tab
                  fontSize={{ base: "xs", md: "md" }}
                  color={"#000"}
                  px={{ base: "0.5rem", md: "1rem" }}
                  py={"0.3rem"}
                  borderRadius={"4px"}
                  _selected={{ backgroundColor: "#005D5D", color: "#FFFFFF" }}
                >
                  All
                </Tab>
                <Tab
                  fontSize={{ base: "xs", md: "md" }}
                  color={"#000"}
                  px={{ base: "0.5rem", md: "1rem" }}
                  borderRadius={"4px"}
                  _selected={{ backgroundColor: "#005D5D", color: "#FFFFFF" }}
                >
                  Completed
                </Tab>
                <Tab
                  fontSize={{ base: "xs", md: "md" }}
                  color={"#000"}
                  px={{ base: "0.5rem", md: "1rem" }}
                  borderRadius={"4px"}
                  _selected={{ backgroundColor: "#005D5D", color: "#FFFFFF" }}
                >
                  Active
                </Tab>
                <Tab
                  fontSize={{ base: "xs", md: "md" }}
                  color={"#000"}
                  px={{ base: "0.5rem", md: "1rem" }}
                  borderRadius={"4px"}
                  _selected={{ backgroundColor: "#005D5D", color: "#FFFFFF" }}
                >
                  Rejected
                </Tab>
                <Tab
                  fontSize={{ base: "xs", md: "md" }}
                  color={"#000"}
                  px={{ base: "0.5rem", md: "1rem" }}
                  borderRadius={"4px"}
                  _selected={{ backgroundColor: "#005D5D", color: "#FFFFFF" }}
                >
                  Processing
                </Tab>
              </TabList>
            </Flex>

            <TabPanels>
              <TabPanel
                border={"1px solid #005D5D50"}
                rounded={"lg"}
                mt={"1rem"}
              >
                <TableContainer>
                  <Table variant="simple" size={"sm"}>
                    <Thead>
                      <Tr>
                        <Th>Inv. ID</Th>
                        <Th>School</Th>
                        <Th>Category</Th>
                        <Th>Date</Th>
                        <Th>Amount</Th>
                        <Th>Status</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {invoiceData?.map((item, index) => {
                        return (
                          <Tr
                            key={index}
                            _hover={{
                              backgroundColor: "#005D5D10",
                              cursor: "pointer",
                            }}
                            onClick={() => {handleSelectedInvoice(item)}}
                          >
                            <Td fontWeight={"bold"} fontSize={"sm"}>
                              {item?.invoiceId}
                            </Td>
                            <Td>
                              <Flex gap={2} alignItems={"center"}>
                                <Avatar
                                  src={item?.schoollogo}
                                  pointerEvents={'none'}
                                  size={"sm"}
                                />
                                <Text fontSize={"sm"} fontWeight={"500"}>
                                  {item?.schoolname}
                                </Text>
                              </Flex>
                            </Td>
                            <Td>{item?.category}</Td>
                            <Td>{item?.createdAt}</Td>
                            <Td fontWeight={"bold"}>
                              ₦
                              
                            </Td>
                            <Td>
                              <Badge
                                variant="solid"
                                colorScheme={
                                  item?.status === "active"
                                    ? "green"
                                    : item?.status === "rejected by parent"
                                    ? "red"
                                    : item?.status === "processing"
                                    ? "yellow"
                                    : "purple"
                                }
                              >
                                {item?.status}
                              </Badge>
                            </Td>
                            <Td>
                              <Menu size={"sm"}>
                                <MenuButton p={4}>
                                  <Icon
                                    as={BsThreeDots}
                                    _hover={{ cursor: "pointer" }}
                                    boxSize={6}
                                  />
                                </MenuButton>
                                <MenuList>
                                  <MenuItem
                                    icon={<FaCheck />}
                                    isDisabled={
                                      item?.status === "active" ? false : true
                                    }
                                    onClick={onAcceptModalOpen}
                                  >
                                    Accept Invoice
                                  </MenuItem>
                                  <MenuItem
                                    icon={<MdOutlineClose />}
                                    isDisabled={
                                      item?.status === "active" ? false : true
                                    }
                                    onClick={onRejectModalOpen}
                                  >
                                    Reject Invoice
                                  </MenuItem>
                                </MenuList>
                              </Menu>
                            </Td>
                            <AcceptInvoiceModal
                              isOpen={isAcceptModalOpen}
                              onOpen={onAcceptModalOpen}
                              onClose={onAcceptModalClose}
                              invoiceId={item?.id}
                            />
                            <RejectInvoiceModal
                              isOpen={isRejectModalOpen}
                              onOpen={onRejectModalOpen}
                              onClose={onRejectModalClose}
                              invoiceId={item?.id}
                            />
                            <InvoiceDataDrawer
                              isOpen={isDrawerOpen}
                              onClose={onDrawerClose}
                              invoiceData={selectedInvoiceData}
                            />
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </TabPanel>

              <TabPanel
                border={"1px solid #005D5D50"}
                rounded={"lg"}
                mt={"1rem"}
              >
                <TableContainer>
                  {/* <Table variant="simple" size={"sm"}>
                    <Thead>
                      <Tr>
                        <Th>Inv. ID</Th>
                        <Th>School</Th>
                        <Th>Category</Th>
                        <Th>Date</Th>
                        <Th>Amount</Th>
                        <Th>Status</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {completedInvoice?.map((item, index) => {
                        return (
                          <Tr
                            key={index}
                            _hover={{
                              backgroundColor: "#005D5D10",
                              cursor: "pointer",
                            }}
                            onClick={() => {handleSelectedInvoice(item)}}
                          >
                            <Td fontWeight={"bold"} fontSize={"sm"}>
                              {item?.invoiceId}
                            </Td>
                            <Td>
                              <Flex gap={2} alignItems={"center"}>
                                <Avatar
                                  src={item?.schoollogo}
                                  pointerEvents={"none"}
                                  size={"sm"}
                                />
                                <Text fontSize={"sm"} fontWeight={"500"}>
                                  {item?.schoolname}
                                </Text>
                              </Flex>
                            </Td>
                            <Td>{item?.category}</Td>
                            <Td>{item?.createdAt}</Td>
                            <Td fontWeight={"bold"}>
                              ₦{getCompletedInvoiceAmount(formatNumberWithCommas(item))}
                            </Td>
                            <Td>
                              <Badge
                                variant="solid"
                                colorScheme={
                                  item?.status === "active"
                                    ? "green"
                                    : item?.status === "rejected by parent"
                                    ? "red"
                                    : item?.status === "processing"
                                    ? "yellow"
                                    : "purple"
                                }
                              >
                                {item?.status}
                              </Badge>
                            </Td>
                            <Td>
                              <Menu size={"sm"}>
                                <MenuButton>
                                  <Icon
                                    as={BsThreeDots}
                                    _hover={{ cursor: "pointer" }}
                                    boxSize={6}
                                  />
                                </MenuButton>
                                <MenuList>
                                  <MenuItem
                                    icon={<FaCheck />}
                                    isDisabled={
                                      item?.status === "active" ? false : true
                                    }
                                    onClick={onAcceptModalOpen}
                                  >
                                    Accept Invoice
                                  </MenuItem>
                                  <MenuItem
                                    icon={<MdOutlineClose />}
                                    isDisabled={
                                      item?.status === "active" ? false : true
                                    }
                                    onClick={onRejectModalOpen}
                                  >
                                    Reject Invoice
                                  </MenuItem>
                                </MenuList>
                              </Menu>
                            </Td>
                            <InvoiceDataDrawer
                              isOpen={isDrawerOpen}
                              onClose={onDrawerClose}
                              invoiceData={selectedInvoiceData}
                            />
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table> */}
                </TableContainer>
              </TabPanel>

              <TabPanel
                border={"1px solid #005D5D50"}
                rounded={"lg"}
                mt={"1rem"}
              >
                {/* <TableContainer>
                  <Table variant="simple" size={"sm"}>
                    <Thead>
                      <Tr>
                        <Th>Inv. ID</Th>
                        <Th>School</Th>
                        <Th>Category</Th>
                        <Th>Date</Th>
                        <Th>Amount</Th>
                        <Th>Status</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {activeInvoice?.map((item, index) => {
                        return (
                          <Tr
                            key={index}
                            _hover={{
                              backgroundColor: "#005D5D10",
                              cursor: "pointer",
                            }}
                            onClick={() => {handleSelectedInvoice(item)}}
                          >
                            <Td fontWeight={"bold"} fontSize={"sm"}>
                              {item?.invoiceId}
                            </Td>
                            <Td>
                              <Flex gap={2} alignItems={"center"}>
                                <Avatar
                                  src={item?.schoollogo}
                                  pointerEvents={"none"}
                                  size={"sm"}
                                />
                                <Text fontSize={"sm"} fontWeight={"500"}>
                                  {item?.schoolname}
                                </Text>
                              </Flex>
                            </Td>
                            <Td>{item?.category}</Td>
                            <Td>{item?.createdAt}</Td>
                            <Td fontWeight={"bold"}>
                              ₦{formatNumberWithCommas(item?.amountPaid)}
                            </Td>
                            <Td>
                              <Badge
                                variant="solid"
                                colorScheme={
                                  item?.status === "active"
                                    ? "green"
                                    : item?.status === "rejected by parent"
                                    ? "red"
                                    : item?.status === "processing"
                                    ? "yellow"
                                    : "purple"
                                }
                              >
                                {item?.status}
                              </Badge>
                            </Td>
                            <Td>
                              <Menu size={"sm"}>
                                <MenuButton>
                                  <Icon
                                    as={BsThreeDots}
                                    _hover={{ cursor: "pointer" }}
                                    boxSize={6}
                                  />
                                </MenuButton>
                                <MenuList>
                                  <MenuItem
                                    icon={<FaCheck />}
                                    isDisabled={
                                      item.status === "active" ? false : true
                                    }
                                    onClick={onAcceptModalOpen}
                                  >
                                    Accept Invoice
                                  </MenuItem>
                                  <MenuItem
                                    icon={<MdOutlineClose />}
                                    isDisabled={
                                      item.status === "active" ? false : true
                                    }
                                    onClick={onRejectModalOpen}
                                  >
                                    Reject Invoice
                                  </MenuItem>
                                </MenuList>
                              </Menu>
                            </Td>
                            <InvoiceDataDrawer
                              isOpen={isDrawerOpen}
                              onClose={onDrawerClose}
                              invoiceData={selectedInvoiceData}
                            />
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer> */}
              </TabPanel>

              <TabPanel
                border={"1px solid #005D5D50"}
                rounded={"lg"}
                mt={"1rem"}
              >
                {/* <TableContainer>
                  <Table variant="simple" size={"sm"}>
                    <Thead>
                      <Tr>
                        <Th>Inv. ID</Th>
                        <Th>School</Th>
                        <Th>Category</Th>
                        <Th>Date</Th>
                        <Th>Amount</Th>
                        <Th>Status</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {rejectedInvoice?.map((item, index) => {
                        return (
                          <Tr
                            key={index}
                            _hover={{
                              backgroundColor: "#005D5D10",
                              cursor: "pointer",
                            }}
                            onClick={() => {handleSelectedInvoice(item)}}
                          >
                            <Td fontWeight={"bold"} fontSize={"sm"}>
                              {item?.invoiceId}
                            </Td>
                            <Td>
                              <Flex gap={2} alignItems={"center"}>
                                <Avatar
                                  src={item?.schoollogo}
                                  pointerEvents={"none"}
                                  size={"sm"}
                                />
                                <Text fontSize={"sm"} fontWeight={"500"}>
                                  {item?.schoolname}
                                </Text>
                              </Flex>
                            </Td>
                            <Td>{item.category}</Td>
                            <Td>{item.createdAt}</Td>
                            <Td fontWeight={"bold"}>
                              ₦{formatNumberWithCommas(item.amountPaid)}
                            </Td>
                            <Td>
                              <Badge
                                variant="solid"
                                colorScheme={
                                  item.status === "active"
                                    ? "green"
                                    : item.status === "rejected by parent"
                                    ? "red"
                                    : item.status === "processing"
                                    ? "yellow"
                                    : "purple"
                                }
                              >
                                {item.status}
                              </Badge>
                            </Td>
                            <Td>
                              <Menu size={"sm"}>
                                <MenuButton>
                                  <Icon
                                    as={BsThreeDots}
                                    _hover={{ cursor: "pointer" }}
                                    boxSize={6}
                                  />
                                </MenuButton>
                                <MenuList>
                                  <MenuItem
                                    icon={<FaCheck />}
                                    isDisabled={
                                      item.status === "active" ? false : true
                                    }
                                    onClick={onAcceptModalOpen}
                                  >
                                    Accept Invoice
                                  </MenuItem>
                                  <MenuItem
                                    icon={<MdOutlineClose />}
                                    isDisabled={
                                      item.status === "active" ? false : true
                                    }
                                    onClick={onRejectModalOpen}
                                  >
                                    Reject Invoice
                                  </MenuItem>
                                </MenuList>
                              </Menu>
                            </Td>
                            <InvoiceDataDrawer
                              isOpen={isDrawerOpen}
                              onClose={onDrawerClose}
                              invoiceData={selectedInvoiceData}
                            />
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer> */}
              </TabPanel>

              <TabPanel
                border={"1px solid #005D5D50"}
                rounded={"lg"}
                mt={"1rem"}
              >
                {/* <TableContainer>
                  <Table variant="simple" size={"sm"}>
                    <Thead>
                      <Tr>
                        <Th>Inv. ID</Th>
                        <Th>School</Th>
                        <Th>Category</Th>
                        <Th>Date</Th>
                        <Th>Amount</Th>
                        <Th>Status</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {processingInvoice?.map((item, index) => {
                        return (
                          <Tr
                            key={index}
                            _hover={{
                              backgroundColor: "#005D5D10",
                              cursor: "pointer",
                            }}
                            onClick={() => {handleSelectedInvoice(item)}}
                          >
                            <Td fontWeight={"bold"} fontSize={"sm"}>
                              {item?.invoiceId}
                            </Td>
                            <Td>
                              <Flex gap={2} alignItems={"center"}>
                                <Avatar
                                  src={item?.schoollogo}
                                  pointerEvents={"none"}
                                  size={"sm"}
                                />
                                <Text fontSize={"sm"} fontWeight={"500"}>
                                  {item?.schoolname}
                                </Text>
                              </Flex>
                            </Td>
                            <Td>{item.category}</Td>
                            <Td>{item.createdAt}</Td>
                            <Td fontWeight={"bold"}>
                              ₦{formatNumberWithCommas(item.amountPaid)}
                            </Td>
                            <Td>
                              <Badge
                                variant="solid"
                                colorScheme={
                                  item.status === "active"
                                    ? "green"
                                    : item.status === "rejected by parent"
                                    ? "red"
                                    : item.status === "processing"
                                    ? "yellow"
                                    : "purple"
                                }
                              >
                                {item.status}
                              </Badge>
                            </Td>
                            <Td>
                              <Menu size={"sm"}>
                                <MenuButton>
                                  <Icon
                                    p={1}
                                    as={BsThreeDots}
                                    _hover={{ cursor: "pointer" }}
                                    boxSize={6}
                                  />
                                </MenuButton>
                                <MenuList>
                                  <MenuItem
                                    icon={<FaCheck />}
                                    isDisabled={
                                      item.status === "active" ? false : true
                                    }
                                    onClick={onAcceptModalOpen}
                                  >
                                    Accept Invoice
                                  </MenuItem>
                                  <MenuItem
                                    icon={<MdOutlineClose />}
                                    isDisabled={
                                      item.status === "active" ? false : true
                                    }
                                    onClick={onRejectModalOpen}
                                  >
                                    Reject Invoice
                                  </MenuItem>
                                </MenuList>
                              </Menu>
                            </Td>
                            <InvoiceDataDrawer
                              isOpen={isDrawerOpen}
                              onClose={onDrawerClose}
                              invoiceData={selectedInvoiceData}
                            />
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer> */}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
};

export default Invoice;
