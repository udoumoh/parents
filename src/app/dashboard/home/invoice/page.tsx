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
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { useUserAPI } from "@/hooks/UserContext";
import formatNumberWithCommas from "@/helpers/formatNumberWithCommas";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineClose } from "react-icons/md";
import AcceptInvoiceModal from "@/components/shared/acceptInvoiceModal";
import RejectInvoiceModal from "@/components/shared/rejectinvoicemodal";
import { TbFileInvoice } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { MdOutlinePayment } from "react-icons/md";
import OverpaidBalancePaymentModal from "@/components/shared/overpaidBalancePaymentModal";
import { MdAccountBalanceWallet } from "react-icons/md";
import SchoolAccountDetailsModal from "@/components/shared/schoolAccountDetailsModal";

interface InvoiceProps {}

const Invoice: FC<InvoiceProps> = ({}) => {
  const router = useRouter()
  const { parentData, invoiceData } = useUserAPI();

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

  const [currentInvoiceId, setCurrentInvoiceId] = useState()

  const getCompletedInvoiceAmount = (invoice: any) => {
    const totalCompletedAmount = invoice?.receipt
      ?.map((receipt: any) => receipt?.amountPaid)
      .reduce((acc: any, item: any) => acc + item, 0);
    return totalCompletedAmount;
  };

  const completedInvoice = invoiceData?.filter(
    (invoice) => invoice.status === "completed"
  );
  const activeInvoice = invoiceData?.filter(
    (invoice) => invoice.status === "active"
  );
  const rejectedInvoice = invoiceData?.filter(
    (invoice) => invoice.status === "rejected by parent"
  );
  const processingInvoice = invoiceData?.filter(
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

  const totalOverpaidAmount = invoiceData?.filter((invoice) => invoice.status === "parent overpaid")?.reduce((acc, item) => acc + Math.abs(item.balance), 0);

  const nonEmptyReceipts = invoiceData
    ?.map((invoice) => invoice?.receipt)
    ?.filter((receipt: any) => receipt?.length !== 0);

  const totalAmountPaid = nonEmptyReceipts
    ?.map((receiptItem) =>
      receiptItem?.reduce((acc, item) => acc + item?.amountPaid, 0)
    )
    .reduce((acc: any, item: any) => acc + item, 0);

  

  const handleSelectedInvoice = (id: any) => {
      router.push(`/dashboard/home/invoice/${id}`);
  }

  const handleAcceptInvoice = (id: any) => {
    setCurrentInvoiceId(id);
    onAcceptModalOpen();
  }

  const handleRejectInvoice = (id: any) => {
    setCurrentInvoiceId(id);
    onRejectModalOpen();
  };

  const handleOverpaidInvoice = (id: any) => {
    setCurrentInvoiceId(id)
    onOverpaidModalModalOpen();
  }

  console.log(parentData)
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
          invoiceId={currentInvoiceId}
        />
        <RejectInvoiceModal
          isOpen={isRejectModalOpen}
          onOpen={onRejectModalOpen}
          onClose={onRejectModalClose}
          invoiceId={currentInvoiceId}
        />
        <OverpaidBalancePaymentModal
          isOpen={isOverpaidModalModalOpen}
          onOpen={onOverpaidModalModalOpen}
          onClose={onOverpaidModalModalClose}
          invoiceId={currentInvoiceId}
          balance={totalOverpaidAmount}
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

        <Box mt={'1.5rem'}>
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
        </Box>
      </Box>

      <Box mt={"3rem"}>
        <Box>
          <Tabs variant={"unstyled"} size={"xs"} w={"full"}>
            <Flex
              gap={4}
              overflowX={"auto"}
              justifyContent={{base:"start", md:"space-between"}}
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

              <Button
                display={{ base: "none", lg: "flex" }}
                leftIcon={<MdAccountBalanceWallet />}
                backgroundColor={"#005D5D"}
                color={"#ffffff"}
                _hover={{ backgroundColor: "#004A4A" }}
                onClick={onSchoolAccountDetailsModalOpen}
              >
                School Account
              </Button>
            </Flex>

            <TabPanels>
              <TabPanel
                border={"1px solid #005D5D50"}
                rounded={"lg"}
                mt={"1rem"}
              >
                <TableContainer>
                  <Table variant="simple" size={{ base: "sm", md: "md" }}>
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
                      {invoiceData?.map((item, index) => {
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
                                    onClick={() =>
                                      handleAcceptInvoice(item?.id)
                                    }
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
                                    onClick={() =>
                                      handleRejectInvoice(item?.id)
                                    }
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
                                      handleSelectedInvoice(item?.id);
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
                                      !["active", "partial payment"].includes(
                                        item?.status
                                      ) || totalOverpaidAmount > 0
                                        ? "none"
                                        : "flex"
                                    }
                                    gap={"3"}
                                    onClick={() =>
                                      handleOverpaidInvoice(item?.id)
                                    }
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
              </TabPanel>

              <TabPanel
                border={"1px solid #005D5D50"}
                rounded={"lg"}
                mt={"1rem"}
              >
                <TableContainer>
                  <Table variant="simple" size={{ base: "sm", md: "md" }}>
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
                                      handleSelectedInvoice(item?.id);
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
                  <Table variant="simple" size={{ base: "sm", md: "md" }}>
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
                                    onClick={() =>
                                      handleAcceptInvoice(item?.id)
                                    }
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
                                    onClick={() =>
                                      handleRejectInvoice(item?.id)
                                    }
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
                                    onClick={() =>
                                      handleOverpaidInvoice(item?.id)
                                    }
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
                                      handleSelectedInvoice(item?.id);
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
                  <Table variant="simple" size={{ base: "sm", md: "md" }}>
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
                                      handleSelectedInvoice(item?.id);
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
                  <Table variant="simple" size={{ base: "sm", md: "md" }}>
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
                                    onClick={() =>
                                      handleAcceptInvoice(item?.id)
                                    }
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
                                    onClick={() =>
                                      handleRejectInvoice(item?.id)
                                    }
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
                                      handleSelectedInvoice(item?.id);
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
