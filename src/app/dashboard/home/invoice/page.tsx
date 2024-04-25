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
  Button,
  IconButton,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { useUserAPI } from "@/hooks/UserContext";
import formatNumberWithCommas from "@/helpers/formatNumberWithCommas";
import { FaCheck } from "react-icons/fa6";
import AcceptInvoiceModal from "@/components/shared/acceptInvoiceModal";
import RejectInvoiceModal from "@/components/shared/rejectinvoicemodal";
import { TbFileInvoice } from "react-icons/tb";
import {
  MdOutlinePayment,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdOutlineClose,
  MdAccountBalanceWallet,
} from "react-icons/md";
import OverpaidBalancePaymentModal from "@/components/shared/overpaidBalancePaymentModal";
import SchoolAccountDetailsModal from "@/components/shared/schoolAccountDetailsModal";
import { GET_STUDENT_EDUCATION_HISTORY } from "@/gql/queries";
import { useQuery } from "@apollo/client";
import { IoFilterOutline } from "react-icons/io5";

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

interface InvoiceProps {}

const Invoice: FC<InvoiceProps> = ({}) => {
  const { invoiceData, currentWardProfile } = useUserAPI();
  const { data: getEducationHistory } = useQuery(
    GET_STUDENT_EDUCATION_HISTORY,
    {
      variables: { studentId: currentWardProfile?.id },
    }
  );

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
    isOpen: isOverpaidModalModalOpen,
    onOpen: onOverpaidModalModalOpen,
    onClose: onOverpaidModalModalClose,
  } = useDisclosure();

  const {
    isOpen: isSchoolAccountDetailsModalOpen,
    onOpen: onSchoolAccountDetailsModalOpen,
    onClose: onSchoolAccountDetailsModalClose,
  } = useDisclosure();

  const [filterParam, setFilterParam] = useState("");
  const [invoices, setInvoices] = useState<StudentInvoiceProps[]>([]);
  const [schoolsAttended, setSchoolsAttended] = useState([]);
  const [currentInvoice, setCurrentInvoice] = useState<StudentInvoiceProps>();
  const [invoiceToShow, setInvoiceToShow] = useState<StudentInvoiceProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, invoices?.length);
    setInvoiceToShow(invoices?.slice(startIndex, endIndex));

    const newTotalPages = Math.ceil(invoices?.length / itemsPerPage);
    setTotalNumberOfPages(newTotalPages);
  }, [invoices, currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEducationHistory;
        if (response) {
          const schools = response?.getStudentEducationHistory?.map(
            (history: any) => history?.school
          );
          setSchoolsAttended(schools);
        }
      } catch (err: any) {
        console.log(err);
      }
    };
    fetchData();
  }, [getEducationHistory]);

  useEffect(() => {
    setInvoices(invoiceData);
  }, []);

  const handleFilterChange = (filterParam: any) => {
    let filteredInvoices = invoiceData;
    setFilterParam(filterParam);
    if (filterParam) {
      filteredInvoices = filteredInvoices?.filter(
        (invoice) => invoice?.schoolname === filterParam
      );
    }
    setInvoices(filteredInvoices);
  };

  const getCompletedInvoiceAmount = (invoice: any) => {
    const totalCompletedAmount = invoice?.receipt
      ?.filter((item: any) => item?.status !== "rejected by school")
      .map((receipt: any) => receipt?.amountPaid)
      .reduce((acc: any, item: any) => acc + item, 0);
    return totalCompletedAmount;
  };

  const completedInvoice = invoices?.filter(
    (invoice) => invoice.status === "completed"
  );
  const activeInvoice = invoices?.filter(
    (invoice) => invoice.status === "active"
  );
  const rejectedInvoice = invoices?.filter(
    (invoice) => invoice.status === "rejected by parent"
  );
  const processingInvoice = invoices?.filter(
    (invoice) => invoice.status === "processing"
  );

  const totalActiveAmount = activeInvoice?.reduce(
    (accumulator, invoice) =>
      accumulator + (invoice.amountPaid + getCompletedInvoiceAmount(invoice)),
    0
  );

  const totalRejectedAmount = rejectedInvoice?.reduce(
    (accumulator, invoice) => accumulator + invoice.amountPaid,
    0
  );

  const totalProcessingAmount = processingInvoice?.reduce(
    (accumulator, invoice) => accumulator + invoice.amountPaid,
    0
  );

  const nonEmptyReceipts = invoices
    ?.map((invoice) => invoice?.receipt)
    ?.filter((receipt: any) => receipt?.length !== 0);

  const totalAmountPaid = nonEmptyReceipts
    ?.map((receiptItem) =>
      receiptItem?.reduce((acc, item) => acc + item?.amountPaid, 0)
    )
    .reduce((acc: any, item: any) => acc + item, 0);

  const handleSelectedInvoice = (invoice: any) => {
    window.location.replace(`/dashboard/home/invoice/${invoice?.id}`);
  };

  const handleAcceptInvoice = (invoice: any) => {
    setCurrentInvoice(invoice);
    onAcceptModalOpen();
  };

  const handleRejectInvoice = (invoice: any) => {
    setCurrentInvoice(invoice);
    onRejectModalOpen();
  };

  const handleOverpaidInvoice = (invoice: any) => {
    setCurrentInvoice(invoice);
    onOverpaidModalModalOpen();
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, invoices?.length);
    if (startIndex < invoices?.length) {
      setInvoiceToShow(invoices?.slice(startIndex, endIndex));
      setCurrentPage(nextPage);
    }
  };

  const handlePreviousPage = () => {
    const prevPage = currentPage - 1;
    if (prevPage > 0) {
      const startIndex = (prevPage - 1) * itemsPerPage;
      setInvoiceToShow(invoices.slice(startIndex, startIndex + itemsPerPage));
      setCurrentPage(prevPage);
    }
  };
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
        <AcceptInvoiceModal
          isOpen={isAcceptModalOpen}
          onOpen={onAcceptModalOpen}
          onClose={onAcceptModalClose}
          invoiceData={currentInvoice}
        />
        <RejectInvoiceModal
          isOpen={isRejectModalOpen}
          onOpen={onRejectModalOpen}
          onClose={onRejectModalClose}
          invoiceData={currentInvoice}
        />
        <OverpaidBalancePaymentModal
          isOpen={isOverpaidModalModalOpen}
          onOpen={onOverpaidModalModalOpen}
          onClose={onOverpaidModalModalClose}
          invoiceData={currentInvoice}
          balance={currentWardProfile?.wallet}
        />
        <SchoolAccountDetailsModal
          isOpen={isSchoolAccountDetailsModalOpen}
          onClose={onSchoolAccountDetailsModalClose}
        />
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
            _hover={{ boxShadow: "md", transitionDuration: "0.5s" }}
          >
            <Text fontSize={"md"} color={"blue.800"} fontWeight={"500"}>
              Total Amount Paid
            </Text>
            <Text fontSize={"3xl"} fontWeight={"700"} color={"gray.700"}>
              ₦
              {totalAmountPaid === undefined
                ? 0
                : formatNumberWithCommas(totalAmountPaid)}
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
              {completedInvoice?.length || 0} invoices
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
            _hover={{ boxShadow: "md", transitionDuration: "0.5s" }}
          >
            <Text fontSize={"md"} color={"blue.800"} fontWeight={"500"}>
              Active
            </Text>
            <Text fontSize={"3xl"} fontWeight={"700"} color={"gray.700"}>
              ₦
              {totalActiveAmount === undefined
                ? 0
                : formatNumberWithCommas(totalActiveAmount)}
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
              {activeInvoice?.length || 0} invoices
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
            _hover={{ boxShadow: "md", transitionDuration: "0.5s" }}
          >
            <Text fontSize={"lg"} color={"blue.800"} fontWeight={"500"}>
              Rejected
            </Text>
            <Text fontSize={"3xl"} fontWeight={"700"} color={"gray.700"}>
              ₦
              {totalRejectedAmount === undefined
                ? 0
                : formatNumberWithCommas(totalRejectedAmount)}
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
              {rejectedInvoice?.length || 0} invoices
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
            _hover={{ boxShadow: "md", transitionDuration: "0.5s" }}
          >
            <Text fontSize={"md"} color={"blue.800"} fontWeight={"500"}>
              Processing
            </Text>
            <Text fontSize={"3xl"} fontWeight={"700"} color={"gray.700"}>
              ₦
              {totalProcessingAmount === undefined
                ? 0
                : formatNumberWithCommas(totalProcessingAmount)}
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
              {processingInvoice?.length || 0} invoices
            </Badge>
          </Flex>
        </SimpleGrid>

        <Flex alignItems={"center"} mt={"1.5rem"} gap={2}>
          <Menu isLazy>
            <MenuButton>
              <IconButton
                display={{ base: "flex", lg: "none" }}
                size={"md"}
                variant={"outline"}
                aria-label="filter"
                colorScheme="teal"
                icon={<IoFilterOutline size={20} />}
              />
            </MenuButton>
            <MenuList px={"0.5rem"}>
              <MenuItem
                _hover={{
                  backgroundColor: "#005D5D15",
                  color: "#005D5D",
                }}
                onClick={() => handleFilterChange("")}
              >
                - Any -
              </MenuItem>
              {schoolsAttended?.map((school, index) => {
                return (
                  <MenuItem
                    _hover={{
                      backgroundColor: "#005D5D15",
                      color: "#005D5D",
                    }}
                    key={index}
                    onClick={() => handleFilterChange(school)}
                  >
                    {school}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
          <Button
            display={{ base: "flex", lg: "none" }}
            leftIcon={<MdAccountBalanceWallet />}
            backgroundColor={"#005D5D"}
            color={"#ffffff"}
            _hover={{ backgroundColor: "#004A4A" }}
            onClick={onSchoolAccountDetailsModalOpen}
          >
            School Account
          </Button>
        </Flex>
      </Box>

      <Box mt={"3rem"}>
        <Box>
          <Tabs variant={"unstyled"} size={"xs"} w={"full"}>
            <Flex
              gap={4}
              overflowX={"auto"}
              justifyContent={{ base: "start", md: "space-between" }}
              alignItems={"center"}
              flexDir={{ base: "column", md: "row" }}
            >
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

              <Flex
                alignItems={"center"}
                gap={2}
                display={{ base: "none", lg: "flex" }}
              >
                <Menu isLazy>
                  <MenuButton>
                    <IconButton
                      size={"md"}
                      variant={"outline"}
                      aria-label="filter"
                      colorScheme="teal"
                      icon={<IoFilterOutline size={20} />}
                    />
                  </MenuButton>
                  <MenuList px={"0.5rem"}>
                    <MenuItem
                      _hover={{
                        backgroundColor: "#005D5D15",
                        color: "#005D5D",
                      }}
                      onClick={() => handleFilterChange("")}
                    >
                      - Any -
                    </MenuItem>
                    {schoolsAttended?.map((school, index) => {
                      return (
                        <MenuItem
                          _hover={{
                            backgroundColor: "#005D5D15",
                            color: "#005D5D",
                          }}
                          key={index}
                          onClick={() => handleFilterChange(school)}
                        >
                          {school}
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </Menu>
                <Button
                  leftIcon={<MdAccountBalanceWallet />}
                  backgroundColor={"#005D5D"}
                  color={"#ffffff"}
                  _hover={{ backgroundColor: "#004A4A" }}
                  onClick={onSchoolAccountDetailsModalOpen}
                >
                  School Account
                </Button>
              </Flex>
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
                        <Th>Balance</Th>
                        <Th>Status</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {invoiceToShow?.map((item, index) => {
                        return (
                          <Tr key={index}>
                            <Td
                              fontWeight={"bold"}
                              fontSize={"sm"}
                              color={"green.700"}
                            >
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
                              ₦
                              {item?.status === "completed"
                                ? formatNumberWithCommas(
                                    getCompletedInvoiceAmount(item)
                                  )
                                : item?.status === "processing"
                                ? formatNumberWithCommas(item?.amountPaid)
                                : formatNumberWithCommas(
                                    item?.amountPaid +
                                      getCompletedInvoiceAmount(item)
                                  )}
                            </Td>
                            <Td fontWeight={"bold"}>
                              {item?.status === "rejected by parent"
                                ? `-`
                                : `₦${formatNumberWithCommas(item?.balance)}`}
                            </Td>
                            <Td>
                              <Badge
                                variant="subtle"
                                colorScheme={
                                  item?.status === "active"
                                    ? "green"
                                    : item?.status === "rejected by parent"
                                    ? "red"
                                    : item?.status === "processing"
                                    ? "yellow"
                                    : item?.status === "completed"
                                    ? "blue"
                                    : "purple"
                                }
                              >
                                {item?.status}
                              </Badge>
                            </Td>
                            <Td>
                              <Menu>
                                <MenuButton>
                                  <Icon
                                    as={BsThreeDots}
                                    _hover={{ cursor: "pointer" }}
                                    boxSize={6}
                                  />
                                </MenuButton>
                                <MenuList>
                                  <MenuItem
                                    px={"1rem"}
                                    display={
                                      !["active", "partial payment"].includes(
                                        item?.status
                                      )
                                        ? "none"
                                        : "flex"
                                    }
                                    gap={"3"}
                                    onClick={() => handleAcceptInvoice(item)}
                                  >
                                    <Icon
                                      as={FaCheck}
                                      boxSize={"4"}
                                      color={"#005D5D"}
                                    />
                                    <Text color={"#005D5D"} fontWeight={"600"}>
                                      Accept Invoice
                                    </Text>
                                  </MenuItem>
                                  <MenuItem
                                    px={"1rem"}
                                    display={
                                      !["active", "partial payment"].includes(
                                        item?.status
                                      )
                                        ? "none"
                                        : "flex"
                                    }
                                    gap={"3"}
                                    onClick={() => handleRejectInvoice(item)}
                                  >
                                    <Icon
                                      as={MdOutlineClose}
                                      boxSize={"4"}
                                      color={"red.600"}
                                    />
                                    <Text color={"red.600"} fontWeight={"600"}>
                                      Reject Invoice
                                    </Text>
                                  </MenuItem>
                                  <MenuItem
                                    px={"1rem"}
                                    display={"flex"}
                                    gap={"3"}
                                    onClick={() => {
                                      handleSelectedInvoice(item);
                                    }}
                                  >
                                    <Icon
                                      as={TbFileInvoice}
                                      boxSize={"4"}
                                      color={"#005D5D"}
                                    />
                                    <Text color={"#005D5D"} fontWeight={"600"}>
                                      View Invoice Details
                                    </Text>
                                  </MenuItem>
                                  <MenuItem
                                    px={"1rem"}
                                    display={
                                      ["active", "partial payment"].includes(
                                        item?.status
                                      ) && (currentWardProfile?.wallet || 0) > 0
                                        ? "flex"
                                        : "none"
                                    }
                                    gap={"3"}
                                    onClick={() => handleOverpaidInvoice(item)}
                                  >
                                    <Icon
                                      as={MdOutlinePayment}
                                      boxSize={"4"}
                                      color={"#005D5D"}
                                    />
                                    <Text color={"#005D5D"} fontWeight={"600"}>
                                      Pay with overpaid balance
                                    </Text>
                                  </MenuItem>
                                </MenuList>
                              </Menu>
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
                <Flex justifyContent={"center"}>
                  <Box
                    mt={"1rem"}
                    display={"flex"}
                    gap={4}
                    alignItems={"center"}
                  >
                    <IconButton
                      aria-label="paginate"
                      icon={<MdKeyboardArrowLeft />}
                      onClick={handlePreviousPage}
                    />
                    <Text>
                      Page {currentPage} of {totalNumberOfPages || currentPage}
                    </Text>
                    <IconButton
                      aria-label="paginate"
                      icon={<MdKeyboardArrowRight />}
                      onClick={handleNextPage}
                    />
                  </Box>
                </Flex>
              </TabPanel>

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
                        <Th>Balance</Th>
                        <Th>Status</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {completedInvoice?.map((item, index) => {
                        return (
                          <Tr key={index}>
                            <Td
                              color={"green.700"}
                              fontWeight={"bold"}
                              fontSize={"sm"}
                            >
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
                              ₦
                              {formatNumberWithCommas(
                                getCompletedInvoiceAmount(item)
                              )}
                            </Td>
                            <Td fontWeight={"bold"}>
                              {item?.status === "rejected by parent"
                                ? `-`
                                : `₦${formatNumberWithCommas(item?.balance)}`}
                            </Td>
                            <Td>
                              <Badge
                                variant="subtle"
                                colorScheme={
                                  item?.status === "active"
                                    ? "green"
                                    : item?.status === "rejected by parent"
                                    ? "red"
                                    : item?.status === "processing"
                                    ? "yellow"
                                    : item?.status === "completed"
                                    ? "blue"
                                    : "purple"
                                }
                              >
                                {item?.status}
                              </Badge>
                            </Td>
                            <Td>
                              <Menu>
                                <MenuButton>
                                  <Icon
                                    as={BsThreeDots}
                                    _hover={{ cursor: "pointer" }}
                                    boxSize={6}
                                  />
                                </MenuButton>
                                <MenuList>
                                  <MenuItem
                                    px={"1rem"}
                                    display={"flex"}
                                    gap={"3"}
                                    onClick={() => {
                                      handleSelectedInvoice(item);
                                    }}
                                  >
                                    <Icon
                                      as={TbFileInvoice}
                                      boxSize={"4"}
                                      color={"#005D5D"}
                                    />
                                    <Text color={"#005D5D"} fontWeight={"600"}>
                                      View Invoice Details
                                    </Text>
                                  </MenuItem>
                                </MenuList>
                              </Menu>
                            </Td>
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
                  <Table variant="simple" size={"sm"}>
                    <Thead>
                      <Tr>
                        <Th>Inv. ID</Th>
                        <Th>School</Th>
                        <Th>Category</Th>
                        <Th>Date</Th>
                        <Th>Amount</Th>
                        <Th>Balance</Th>
                        <Th>Status</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {activeInvoice?.map((item, index) => {
                        return (
                          <Tr key={index}>
                            <Td
                              color={"green.700"}
                              fontWeight={"bold"}
                              fontSize={"sm"}
                            >
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
                            <Td fontWeight={"bold"}>
                              {item?.status === "rejected by parent"
                                ? `-`
                                : `₦${formatNumberWithCommas(item?.balance)}`}
                            </Td>
                            <Td>
                              <Badge
                                variant="subtle"
                                colorScheme={
                                  item?.status === "active"
                                    ? "green"
                                    : item?.status === "rejected by parent"
                                    ? "red"
                                    : item?.status === "processing"
                                    ? "yellow"
                                    : item?.status === "completed"
                                    ? "blue"
                                    : "purple"
                                }
                              >
                                {item?.status}
                              </Badge>
                            </Td>
                            <Td>
                              <Menu>
                                <MenuButton>
                                  <Icon
                                    as={BsThreeDots}
                                    _hover={{ cursor: "pointer" }}
                                    boxSize={6}
                                  />
                                </MenuButton>
                                <MenuList>
                                  <MenuItem
                                    px={"1rem"}
                                    display={"flex"}
                                    gap={"3"}
                                    onClick={() => handleAcceptInvoice(item)}
                                  >
                                    <Icon
                                      as={FaCheck}
                                      boxSize={"4"}
                                      color={"#005D5D"}
                                    />
                                    <Text color={"#005D5D"} fontWeight={"600"}>
                                      Accept Invoice
                                    </Text>
                                  </MenuItem>
                                  <MenuItem
                                    px={"1rem"}
                                    display={"flex"}
                                    gap={"3"}
                                    onClick={() => handleRejectInvoice(item)}
                                  >
                                    <Icon
                                      as={MdOutlineClose}
                                      boxSize={"4"}
                                      color={"red.600"}
                                    />
                                    <Text color={"red.600"} fontWeight={"600"}>
                                      Reject Invoice
                                    </Text>
                                  </MenuItem>
                                  <MenuItem
                                    px={"1rem"}
                                    display={"flex"}
                                    gap={"3"}
                                    onClick={() => handleOverpaidInvoice(item)}
                                  >
                                    <Icon
                                      as={MdOutlinePayment}
                                      boxSize={"4"}
                                      color={"#005D5D"}
                                    />
                                    <Text color={"#005D5D"} fontWeight={"600"}>
                                      Pay with overpaid balance
                                    </Text>
                                  </MenuItem>
                                  <MenuItem
                                    px={"1rem"}
                                    display={"flex"}
                                    gap={"3"}
                                    onClick={() => {
                                      handleSelectedInvoice(item);
                                    }}
                                  >
                                    <Icon
                                      as={TbFileInvoice}
                                      boxSize={"4"}
                                      color={"#005D5D"}
                                    />
                                    <Text color={"#005D5D"} fontWeight={"600"}>
                                      View Invoice Details
                                    </Text>
                                  </MenuItem>
                                </MenuList>
                              </Menu>
                            </Td>
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
                  <Table variant="simple" size={"sm"}>
                    <Thead>
                      <Tr>
                        <Th>Inv. ID</Th>
                        <Th>School</Th>
                        <Th>Category</Th>
                        <Th>Date</Th>
                        <Th>Amount</Th>
                        <Th>Balance</Th>
                        <Th>Status</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {rejectedInvoice?.map((item, index) => {
                        return (
                          <Tr key={index}>
                            <Td
                              color={"green.700"}
                              fontWeight={"bold"}
                              fontSize={"sm"}
                            >
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
                            <Td fontWeight={"bold"}>
                              {item?.status === "rejected by parent"
                                ? `-`
                                : `₦${formatNumberWithCommas(item?.balance)}`}
                            </Td>
                            <Td>
                              <Badge
                                variant="subtle"
                                colorScheme={
                                  item?.status === "active"
                                    ? "green"
                                    : item?.status === "rejected by parent"
                                    ? "red"
                                    : item?.status === "processing"
                                    ? "yellow"
                                    : item?.status === "completed"
                                    ? "blue"
                                    : "purple"
                                }
                              >
                                {item?.status}
                              </Badge>
                            </Td>
                            <Td>
                              <Menu>
                                <MenuButton>
                                  <Icon
                                    as={BsThreeDots}
                                    _hover={{ cursor: "pointer" }}
                                    boxSize={6}
                                  />
                                </MenuButton>
                                <MenuList>
                                  <MenuItem
                                    px={"1rem"}
                                    display={"flex"}
                                    gap={"3"}
                                    onClick={() => {
                                      handleSelectedInvoice(item);
                                    }}
                                  >
                                    <Icon
                                      as={TbFileInvoice}
                                      boxSize={"4"}
                                      color={"#005D5D"}
                                    />
                                    <Text color={"#005D5D"} fontWeight={"600"}>
                                      View Invoice Details
                                    </Text>
                                  </MenuItem>
                                </MenuList>
                              </Menu>
                            </Td>
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
                  <Table variant="simple" size={"sm"}>
                    <Thead>
                      <Tr>
                        <Th>Inv. ID</Th>
                        <Th>School</Th>
                        <Th>Category</Th>
                        <Th>Date</Th>
                        <Th>Amount</Th>
                        <Th>Balance</Th>
                        <Th>Status</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {processingInvoice?.map((item, index) => {
                        return (
                          <Tr key={index}>
                            <Td
                              color={"green.700"}
                              fontWeight={"bold"}
                              fontSize={"sm"}
                            >
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
                            <Td fontWeight={"bold"}>
                              {item?.status === "rejected by parent"
                                ? `-`
                                : `₦${formatNumberWithCommas(item?.balance)}`}
                            </Td>
                            <Td>
                              <Badge
                                variant="subtle"
                                colorScheme={
                                  item?.status === "active"
                                    ? "green"
                                    : item?.status === "rejected by parent"
                                    ? "red"
                                    : item?.status === "processing"
                                    ? "yellow"
                                    : item?.status === "completed"
                                    ? "blue"
                                    : "purple"
                                }
                              >
                                {item?.status}
                              </Badge>
                            </Td>
                            <Td>
                              <Menu>
                                <MenuButton>
                                  <Icon
                                    as={BsThreeDots}
                                    _hover={{ cursor: "pointer" }}
                                    boxSize={6}
                                  />
                                </MenuButton>
                                <MenuList>
                                  <MenuItem
                                    px={"1rem"}
                                    display={
                                      !["active", "partial payment"].includes(
                                        item?.status
                                      )
                                        ? "none"
                                        : "flex"
                                    }
                                    gap={"3"}
                                    onClick={() => handleAcceptInvoice(item)}
                                  >
                                    <Icon
                                      as={FaCheck}
                                      boxSize={"4"}
                                      color={"#005D5D"}
                                    />
                                    <Text color={"#005D5D"} fontWeight={"600"}>
                                      Accept Invoice
                                    </Text>
                                  </MenuItem>
                                  <MenuItem
                                    px={"1rem"}
                                    display={
                                      !["active", "partial payment"].includes(
                                        item?.status
                                      )
                                        ? "none"
                                        : "flex"
                                    }
                                    gap={"3"}
                                    onClick={() => handleRejectInvoice(item)}
                                  >
                                    <Icon
                                      as={MdOutlineClose}
                                      boxSize={"4"}
                                      color={"#005D5D"}
                                    />
                                    <Text color={"red.600"} fontWeight={"600"}>
                                      Reject Invoice
                                    </Text>
                                  </MenuItem>
                                  <MenuItem
                                    px={"1rem"}
                                    display={"flex"}
                                    gap={"3"}
                                    onClick={() => {
                                      handleSelectedInvoice(item);
                                    }}
                                  >
                                    <Icon
                                      as={TbFileInvoice}
                                      boxSize={"4"}
                                      color={"#005D5D"}
                                    />
                                    <Text color={"#005D5D"} fontWeight={"600"}>
                                      View Invoice Details
                                    </Text>
                                  </MenuItem>
                                </MenuList>
                              </Menu>
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
};

export default Invoice;
