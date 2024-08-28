"use client";
import {
  FC,
  useState,
  useEffect,
  lazy,
} from "react";
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
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { useUserAPI } from "@/hooks/UserContext";
import formatNumberWithCommas from "@/helpers/formatNumberWithCommas";
import {
  MdAccountBalanceWallet,
} from "react-icons/md";
import { GET_STUDENT_EDUCATION_HISTORY } from "@/gql/queries";
import { useQuery } from "@apollo/client";
import { IoFilterOutline } from "react-icons/io5";
import { StudentInvoiceProps } from "@/hooks/UserContext";
import InvoiceTable from "./components/InvoiceTable";

const AcceptInvoiceModal = lazy(
  () => import("@/components/shared/acceptInvoiceModal")
);
const RejectInvoiceModal = lazy(
  () => import("@/components/shared/rejectinvoicemodal")
);
const OverpaidBalancePaymentModal = lazy(
  () => import("@/components/shared/overpaidBalancePaymentModal")
);
const SchoolAccountDetailsModal = lazy(
  () => import("@/components/shared/schoolAccountDetailsModal")
);
const InvoiceDataModal = lazy(
  () => import("@/components/shared/InvoiceDataModal")
);

const OverviewCard = ({count, totalInvoiceValue, title}: any) => {
  return (
    <>
      <Flex
        flexDir={"column"}
        backgroundColor={"#DBEEFC"}
        border={"1px solid #83ACC960"}
        rounded={"lg"}
        px={5}
        py={2}
        gap={"2"}
        w={"full"}
        _hover={{ boxShadow: "md", transitionDuration: "0.5s" }}
      >
        <Text fontSize={"md"} color={"blue.800"} fontWeight={"500"}>
          {title}
        </Text>
        <Text fontSize={"3xl"} fontWeight={"700"} color={"gray.700"}>
          ₦
          {totalInvoiceValue === undefined
            ? 0
            : formatNumberWithCommas(totalInvoiceValue)}
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
          {count?.length || 0} invoices
        </Badge>
      </Flex>
    </>
  );
}

interface InvoiceProps {}

const Invoice: FC<InvoiceProps> = ({}) => {
  const { invoiceData, currentWardProfile } = useUserAPI();
  const { data: getEducationHistory } = useQuery(
    GET_STUDENT_EDUCATION_HISTORY,
    {
      variables: { studentId: currentWardProfile?.id},
    }
  );

  const {
    isOpen: isAcceptModalOpen,
    onOpen: onAcceptModalOpen,
    onClose: onAcceptModalClose,
  } = useDisclosure();

  const {
    isOpen: isInvoiceDataModalOpen,
    onOpen: onInvoiceDataModalOpen,
    onClose: onInvoiceDataModalClose,
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

  const [invoices, setInvoices] = useState<StudentInvoiceProps[]>([]);
  const [schoolsAttended, setSchoolsAttended] = useState([]);
  const [currentInvoice, setCurrentInvoice] = useState<StudentInvoiceProps>();
  const [invoiceToShow, setInvoiceToShow] = useState<StudentInvoiceProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    setInvoices(invoiceData);
  }, [invoiceData]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, invoices?.length);
    setInvoiceToShow(invoices?.slice(startIndex, endIndex));

    const newTotalPages = Math.ceil(invoices?.length / ITEMS_PER_PAGE);
    setTotalPages(newTotalPages);
  }, [invoices]);

  //Fetch schools attended by student to be used in filtering invoices based on school
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

  //handle the filtering of invoices based on school
  const handleFilterChange = (filterParam: any) => {
    let filteredInvoices = invoiceData;
    if (filterParam) {
      filteredInvoices = filteredInvoices?.filter(
        (invoice) => invoice?.schoolname.toLowerCase() === filterParam.toLowerCase()
      );
    }
    setInvoices(filteredInvoices);
  };

  //Calculate the total sum of all completed invoices
  const getCompletedInvoiceAmount = (invoice: any) => {
    const totalCompletedAmount = invoice?.receipt
      ?.filter((item: any) => item?.status !== "rejected by school")
      .map((receipt: any) => receipt?.amountPaid)
      .reduce((acc: any, item: any) => acc + item, 0);
    return totalCompletedAmount;
  };

  const filterInvoicesByStatus = (invoices: StudentInvoiceProps[], status: string[]) => {
    return invoices?.filter((invoice: StudentInvoiceProps) => status.includes(invoice.status))
  }

  const calculateTotalAmount = (invoices: StudentInvoiceProps[], amountFn: (invoice: StudentInvoiceProps) => number) => {
    return invoices?.reduce((acc, invoice) => acc + amountFn(invoice), 0)
  }

  const completedInvoice = filterInvoicesByStatus(invoices, ['completed'])
  const activeInvoice = filterInvoicesByStatus(invoices, ["active", "partial payment"]);
  const rejectedInvoice = filterInvoicesByStatus(invoices, ["rejected by parent"]);
  const processingInvoice = filterInvoicesByStatus(invoices, ["processing"]);

  const totalActiveAmount = calculateTotalAmount(
    activeInvoice,
    (invoice) => invoice?.amountPaid + getCompletedInvoiceAmount(invoice)
  );

  const totalRejectedAmount = calculateTotalAmount(rejectedInvoice, (invoice) => invoice?.amountPaid)
  
  const totalProcessingAmount = calculateTotalAmount(processingInvoice, (invoice) => invoice?.amountPaid)
  
  const nonEmptyReceipts = invoices
    ?.map((invoice) => invoice?.receipt)
    ?.filter((receipt: any) => receipt?.length !== 0);

  const totalAmountPaid = nonEmptyReceipts?.map((receiptItem) => receiptItem?.reduce((acc, item) => acc + item?.amountPaid, 0)).reduce((acc: any, item: any) => acc + item, 0);

  const handleAcceptInvoice = (invoice: StudentInvoiceProps) => {
    setCurrentInvoice(invoice);
    onAcceptModalOpen();
  };

  const handleRejectInvoice = (invoice: StudentInvoiceProps) => {
    setCurrentInvoice(invoice);
    onRejectModalOpen();
  };

  const handleOverpaidInvoice = (invoice: StudentInvoiceProps) => {
    setCurrentInvoice(invoice);
    onOverpaidModalModalOpen();
  };

  const handleInvoiceDetailsModal = (invoice: StudentInvoiceProps) => {
    setCurrentInvoice(invoice);
    onInvoiceDataModalOpen();
  }

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, invoices?.length);
    if (startIndex < invoices?.length) {
      setInvoiceToShow(invoices?.slice(startIndex, endIndex));
      setCurrentPage(nextPage);
    }
  };

  const handlePreviousPage = () => {
    const prevPage = currentPage - 1;
    if (prevPage > 0) {
      const startIndex = (prevPage - 1) * ITEMS_PER_PAGE;
      setInvoiceToShow(invoices.slice(startIndex, startIndex + ITEMS_PER_PAGE));
      setCurrentPage(prevPage);
    }
  };

  const invoiceTabs = [
    { tabName: "All", content: invoiceToShow },
    { tabName: "Completed", content: completedInvoice },
    { tabName: "Active", content: activeInvoice },
    { tabName: "Rejected", content: rejectedInvoice },
    { tabName: "Processing", content: processingInvoice },
  ];

  const getFormattedInvoiceAmount = (invoice: StudentInvoiceProps) => {
    const completedAmount = getCompletedInvoiceAmount(invoice);

    if (invoice?.status === "completed") {
      return formatNumberWithCommas(completedAmount);
    } else if (invoice?.status === "processing") {
      return formatNumberWithCommas(invoice?.amountPaid);
    } else {
      return formatNumberWithCommas(invoice?.amountPaid + completedAmount);
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
        <InvoiceDataModal
          isOpen={isInvoiceDataModalOpen}
          onClose={onInvoiceDataModalClose}
          invoice={currentInvoice}
        />

        {/* Overview grid cards for total, rejected, processing and active invoices */}
        <SimpleGrid minChildWidth="200px" spacing={"10px"}>
          <OverviewCard
            count={completedInvoice}
            title={"Total Amount Paid"}
            totalInvoiceValue={totalAmountPaid}
          />
          <OverviewCard
            count={activeInvoice}
            title={"Active"}
            totalInvoiceValue={totalActiveAmount}
          />
          <OverviewCard
            count={rejectedInvoice}
            title={"Rejected"}
            totalInvoiceValue={totalRejectedAmount}
          />
          <OverviewCard
            count={processingInvoice}
            title={"Processing"}
            totalInvoiceValue={totalProcessingAmount}
          />
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
                {invoiceTabs.map((tab) => (
                  <Tab
                    key={tab.tabName}
                    fontSize={{ base: "xs", md: "md" }}
                    color={"#000"}
                    px={{ base: "0.5rem", md: "1rem" }}
                    py={"0.3rem"}
                    borderRadius={"4px"}
                    _selected={{ backgroundColor: "#005D5D", color: "#FFFFFF" }}
                  >
                    {tab.tabName}
                  </Tab>
                ))}
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
              {invoiceTabs.map((tab) => (
                <TabPanel
                  key={tab.tabName}
                  border={"1px solid #E2E2E2"}
                  rounded={"lg"}
                  mt={"1rem"}
                >
                  <InvoiceTable
                    getFormattedInvoiceAmount={getFormattedInvoiceAmount}
                    invoices={tab.content}
                    handleAcceptInvoice={handleAcceptInvoice}
                    handleRejectInvoice={handleRejectInvoice}
                    handleOverpaidInvoice={handleOverpaidInvoice}
                    handleInvoiceDetailsModal={handleInvoiceDetailsModal}
                    currentWardProfile={currentWardProfile}
                    handlePreviousPage={handlePreviousPage}
                    handleNextPage={handleNextPage}
                    currentPage={currentPage}
                    totalPages={totalPages}
                  />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
};

export default Invoice;
