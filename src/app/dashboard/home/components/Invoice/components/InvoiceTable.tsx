"use client";
import {
  FC, useMemo
} from "react";
import {
  Box,
  Text,
  Flex,
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
  IconButton,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import formatNumberWithCommas from "@/helpers/formatNumberWithCommas";
import { FaCheck } from "react-icons/fa6";
import { TbFileInvoice } from "react-icons/tb";
import {
  MdOutlinePayment,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdOutlineClose,
} from "react-icons/md";
import { StudentInvoiceProps } from "@/hooks/UserContext";
import { UserChildren } from "@/hooks/UserContext";

interface InvoiceTableProps {
  getFormattedInvoiceAmount: (invoice: StudentInvoiceProps) => string;
  invoices: StudentInvoiceProps[];
  handleAcceptInvoice: (invoice: StudentInvoiceProps) => void;
  handleRejectInvoice: (invoice: StudentInvoiceProps) => void;
  handleOverpaidInvoice: (invoice: StudentInvoiceProps) => void;
  handleInvoiceDetailsModal: (invoice: StudentInvoiceProps) => void;
  currentWardProfile: UserChildren | undefined;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  currentPage: number;
  totalPages: number;
}

const InvoiceTable: FC<InvoiceTableProps> = ({
  getFormattedInvoiceAmount,
  invoices,
  handleAcceptInvoice,
  handleRejectInvoice,
  handleOverpaidInvoice,
  handleInvoiceDetailsModal,
  currentWardProfile,
  handlePreviousPage,
  handleNextPage,
  currentPage,
  totalPages,
}) => useMemo(() =>{
  return (
    <>
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
            {invoices?.map((item, index) => {
              return (
                <Tr key={index}>
                  <Td fontWeight={"bold"} fontSize={"sm"} color={"green.700"}>
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
                    ₦ {getFormattedInvoiceAmount(item)}
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
                          <Icon as={FaCheck} boxSize={"4"} color={"#005D5D"} />
                          <Text color={"#005D5D"} fontWeight={"600"}>
                            Accept Invoice
                          </Text>
                        </MenuItem>
                        <MenuItem
                          px={"1rem"}
                          display={
                            !["active", "partial payment"].includes(
                              item?.status
                            ) ||
                            ["school fees", "extra-curricular"].includes(
                              item?.category
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
                            handleInvoiceDetailsModal(item);
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
        <Box mt={"1rem"} display={"flex"} gap={4} alignItems={"center"}>
          <IconButton
            aria-label="paginate"
            icon={<MdKeyboardArrowLeft />}
            onClick={handlePreviousPage}
            boxSize={{ base: 6, md: 10 }}
          />
          <Text fontSize={{base:"xs", md:"md"}}>
            Page {currentPage} of {totalPages || currentPage}
          </Text>
          <IconButton
            aria-label="paginate"
            icon={<MdKeyboardArrowRight />}
            onClick={handleNextPage}
            boxSize={{ base: 6, md: 10 }}
          />
        </Box>
      </Flex>
    </>
  );
}, [invoices]);

export default InvoiceTable;
