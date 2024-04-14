'use client'
import { FC, useState, useEffect } from "react";
import {
  Box,
  Text,
  Button,
  Flex,
  Icon,
  Avatar,
  Badge,
  useDisclosure,
  Collapse,
  Divider,
  Center,
  Tooltip,
} from "@chakra-ui/react";
import { CiReceipt } from "react-icons/ci";
import { IoReceiptOutline } from "react-icons/io5";
import { LiaCoinsSolid } from "react-icons/lia";
import { FaFilePdf } from "react-icons/fa6";
import { PDFViewer } from "@/components/shared/uploadedResultPdfViewer";
import ImgViewer from "@/components/shared/imageViewer";
import { useUserAPI } from "@/hooks/UserContext";
import formatNumberWithCommas from "@/helpers/formatNumberWithCommas";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { MdOutlinePayment } from "react-icons/md";
import OverpaidBalancePaymentModal from "@/components/shared/overpaidBalancePaymentModal";

interface Params {
  id: number;
}

interface InvoiceProps {
  params: Params;
}

const Invoice: FC<InvoiceProps> = ({ params }: { params: { id: number } }) => {
    const router = useRouter()
    const { currentWardProfile, invoiceData } = useUserAPI();
    const [overpaidId, setOverpaidId] = useState();
    const { isOpen: isCollapseOpen, onToggle: onCollapseToggle } =
      useDisclosure();
    const {
      isOpen: isPdfOpen,
      onOpen: onPdfOpen,
      onClose: onPdfClose,
    } = useDisclosure();

    const {
      isOpen: isOverpaidModalModalOpen,
      onOpen: onOverpaidModalModalOpen,
      onClose: onOverpaidModalModalClose,
    } = useDisclosure();

    const {
      isOpen: isImageViewerOpen,
      onOpen: onImageViewerOpen,
      onClose: onImageViewerClose,
    } = useDisclosure();

    const getCompletedInvoiceAmount = (invoice: any) => {
      const totalCompletedAmount = invoice?.receipt
        ?.map((receipt: any) => receipt?.amountPaid)
        .reduce((acc: any, item: any) => acc + item, 0);
      return totalCompletedAmount;
    };

    const currentInvoice = invoiceData?.find(
      (invoice: any) => Number(invoice?.id) === Number(params?.id)
    );

    const handleOverpaidInvoice = (id: any) => {
      setOverpaidId(id);
      onOverpaidModalModalOpen();
    };

  return (
    <Box
      display={"flex"}
      alignItems={"start"}
      justifyContent={"center"}
      flexDir={"column"}
      pb={"10rem"}
    >
      <OverpaidBalancePaymentModal
        isOpen={isOverpaidModalModalOpen}
        onOpen={onOverpaidModalModalOpen}
        onClose={onOverpaidModalModalClose}
        invoiceId={overpaidId}
        balance={currentWardProfile?.wallet}
      />
      <Button
        mb={"2rem"}
        leftIcon={<IoIosArrowRoundBack />}
        variant={"outline"}
        colorScheme="green"
        onClick={() => router.push("/dashboard/home/invoice")}
      >
        Back to invoice page
      </Button>
      <Box rounded={"lg"} border={"1px solid #005D5D40"} w={"full"} p={"1rem"}>
        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          flexDir={"column"}
          w={"full"}
        >
          <Avatar
            src={currentWardProfile?.profileImage}
            name={`${currentWardProfile?.firstName} ${currentWardProfile?.lastName}`}
            size={"xl"}
            border={"2px solid #005D5D"}
            p={"0.2rem"}
            mb={"0.5rem"}
          />
          <Text fontSize={"lg"}>
            {`${currentWardProfile?.firstName} ${currentWardProfile?.middleName} ${currentWardProfile?.lastName}`}
          </Text>
          <Text fontSize={"sm"} color={"#00000090"}>
            {currentWardProfile?.gender} • {currentWardProfile?.age} Years Old
          </Text>
          <Flex gap={{base:"2", md:"5"}} alignItems={"center"} justifyContent={"center"} flexDir={{base:"column", md:"row"}}>
            <Button
              size={"sm"}
              colorScheme="gray"
              gap={"2"}
              mt={"0.5rem"}
              onClick={onCollapseToggle}
            >
              <Icon as={CiReceipt} boxSize={"4"} />
              <Text fontSize={"sm"}>View Receipt</Text>
            </Button>

            <Button
              display={
                !["active", "partial payment"].includes(
                  currentInvoice?.status || ""
                ) || (currentWardProfile?.wallet || 0) > 0
                  ? "none"
                  : "flex"
              }
              size={"sm"}
              colorScheme="red"
              gap={"2"}
              mt={"0.5rem"}
              onClick={()=>handleOverpaidInvoice(currentInvoice?.id)}
            >
              <Icon as={MdOutlinePayment} boxSize={"4"} />
              <Text fontSize={"sm"}>Pay with overpaid balance</Text>
            </Button>
          </Flex>
          <Box w={"full"}>
            <Collapse in={isCollapseOpen} animateOpacity>
              {currentInvoice?.receipt?.length === 0 ? (
                <Box
                  border={"1px solid #005D5D60"}
                  p={3}
                  color="white"
                  mt="4"
                  rounded="lg"
                  shadow="md"
                >
                  <Text fontSize={"lg"} color={"#00000060"}>
                    No receipt has been added
                  </Text>
                </Box>
              ) : (
                currentInvoice?.receipt?.map((receipt, index) => {
                  return (
                    <Box
                      key={index}
                      border={"1px solid #005D5D60"}
                      p={3}
                      color="white"
                      mt="4"
                      rounded="lg"
                      shadow="md"
                    >
                      <Flex justifyContent={"space-between"}>
                        <Box display={"flex"} gap={1} alignItems={"center"}>
                          <Icon as={CiReceipt} boxSize={5} color={"#005D5D"} />
                          <Text
                            fontSize={"lg"}
                            fontWeight={"bold"}
                            color={"#000000"}
                          >
                            Receipt Details
                          </Text>
                        </Box>
                        <Box>
                          <Badge
                            backgroundColor={"green.600"}
                            variant={"solid"}
                          >
                            {receipt?.status}
                          </Badge>
                        </Box>
                      </Flex>
                      <Divider my="0.6rem" />
                      <Flex
                        my={"1rem"}
                        justifyContent={"space-between"}
                        gap={"4"}
                      >
                        <Box
                          display={"flex"}
                          flexDir={"column"}
                          justifyContent={"space-between"}
                          gap={"4"}
                        >
                          <Box>
                            <Text
                              fontSize={"xs"}
                              color={"#00000080"}
                              fontWeight={"bold"}
                            >
                              Category
                            </Text>
                            <Text
                              fontSize={"md"}
                              fontWeight={"bold"}
                              color={"#000000"}
                            >
                              {currentInvoice?.category}
                            </Text>
                          </Box>
                          <Box>
                            <Icon
                              as={LiaCoinsSolid}
                              boxSize={5}
                              color={"#00000060"}
                            />
                            <Flex gap={"3"}>
                              <Box>
                                <Text
                                  fontSize={"xs"}
                                  fontWeight={"bold"}
                                  color={"#00000080"}
                                >
                                  Amount Paid
                                </Text>
                                <Text
                                  fontSize={"md"}
                                  fontWeight={"bold"}
                                  color={"#000000"}
                                >
                                  ₦{formatNumberWithCommas(receipt?.amountPaid)}
                                </Text>
                              </Box>
                            </Flex>
                          </Box>
                        </Box>

                        <Tooltip
                          label="Show uploaded document"
                          backgroundColor={"#005D5D"}
                          py={"0.3rem"}
                          rounded={"md"}
                        >
                          <Box
                            display={"flex"}
                            border={"1px solid #00000020"}
                            rounded={"lg"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            _hover={{ cursor: "pointer" }}
                            onClick={
                              receipt?.uploadedDocument?.endsWith(".pdf")
                                ? onPdfOpen
                                : onImageViewerOpen
                            }
                          >
                            <Icon
                              as={FaFilePdf}
                              color={"#930808"}
                              boxSize={"6"}
                              mx={"2rem"}
                            />
                            <PDFViewer
                              isOpen={isPdfOpen}
                              onClose={onPdfClose}
                              path={receipt?.uploadedDocument}
                            />
                            <ImgViewer
                              isOpen={isImageViewerOpen}
                              onClose={onImageViewerClose}
                              path={receipt?.uploadedDocument}
                            />
                          </Box>
                        </Tooltip>
                      </Flex>

                      <Divider />

                      <Box
                        display={"flex"}
                        flexDir={"column"}
                        gap={"4"}
                        mt={"1rem"}
                      >
                        <Box>
                          <Text
                            fontSize={"xs"}
                            fontWeight={"bold"}
                            color={"#00000080"}
                            mb={"0.4rem"}
                          >
                            Summary
                          </Text>
                          <Box
                            display={receipt?.summary?.length > 0 ? 'block' : 'none'}
                            border={"1px solid #005D5D"}
                            backgroundColor={"#005D5D30"}
                            p={2}
                            rounded={"md"}
                          >
                            <Text fontSize={"md"} color={"#000000"}>
                              {receipt?.summary}
                            </Text>
                          </Box>
                        </Box>

                        <Box>
                          <Text
                            fontSize={{ base: "xs", md: "sm" }}
                            color={"gray.500"}
                          >
                            {currentInvoice?.term} - {currentInvoice?.year}
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  );
                })
              )}
            </Collapse>
          </Box>
        </Flex>

        <Flex flexDir={"column"}>
          <Box
            border={"1px solid #93080830"}
            p={3}
            color="white"
            mt="4"
            rounded="lg"
            shadow="md"
          >
            <Flex justifyContent={"space-between"}>
              <Box display={"flex"} gap={2} alignItems={"center"}>
                <Icon as={IoReceiptOutline} boxSize={4} color={"#005D5D"} />
                <Text fontSize={"lg"} fontWeight={"bold"} color={"#000000"}>
                  Invoice Details
                </Text>
              </Box>
              <Box>
                <Badge
                  variant={"solid"}
                  colorScheme={
                    currentInvoice?.status === "active"
                      ? "green"
                      : currentInvoice?.status === "rejected by parent"
                      ? "red"
                      : currentInvoice?.status === "processing"
                      ? "yellow"
                      : "purple"
                  }
                >
                  {currentInvoice?.status}
                </Badge>
              </Box>
            </Flex>
            <Divider my="0.6rem" />
            <Flex my={"1rem"} justifyContent={"space-between"} gap={"4"}>
              <Box
                display={"flex"}
                flexDir={"column"}
                justifyContent={"space-between"}
                gap={"4"}
              >
                <Box>
                  <Text fontSize={"xs"} color={"#00000080"} fontWeight={"bold"}>
                    Category
                  </Text>
                  <Text fontSize={"md"} fontWeight={"bold"} color={"#000000"}>
                    {currentInvoice?.category}
                  </Text>
                </Box>

                <Box>
                  <Text fontSize={"xs"} color={"#00000080"} fontWeight={"bold"}>
                    Invoice Id
                  </Text>
                  <Text fontSize={"md"} fontWeight={"bold"} color={"#000000"}>
                    {currentInvoice?.invoiceId}
                  </Text>
                </Box>

                <Box>
                  <Icon as={LiaCoinsSolid} boxSize={5} color={"#00000060"} />
                  <Flex gap={"3"}>
                    <Box>
                      <Text
                        fontSize={"xs"}
                        fontWeight={"bold"}
                        color={"#00000080"}
                      >
                        Amount to be Paid
                      </Text>
                      <Text
                        fontSize={"md"}
                        fontWeight={"bold"}
                        color={"#000000"}
                      >
                        ₦
                        {(currentInvoice?.status === "active" || currentInvoice?.status === "processing")
                          ? formatNumberWithCommas(currentInvoice?.amountPaid)
                          : formatNumberWithCommas(
                              currentInvoice?.amountPaid +
                                getCompletedInvoiceAmount(currentInvoice)
                            )}
                      </Text>
                    </Box>

                    <Center height={"40px"}>
                      <Divider
                        orientation="vertical"
                        borderColor={"#00000060"}
                      />
                    </Center>

                    <Box>
                      <Text
                        fontSize={"xs"}
                        fontWeight={"bold"}
                        color={"#00000080"}
                      >
                        Balance
                      </Text>
                      <Text
                        fontSize={"md"}
                        fontWeight={"bold"}
                        color={"#000000"}
                      >
                        ₦{formatNumberWithCommas(currentInvoice?.balance)}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </Flex>

            <Divider />

            <Box display={"flex"} flexDir={"column"} gap={"4"} mt={"1rem"}>
              <Box>
                <Text
                  fontSize={"xs"}
                  fontWeight={"bold"}
                  color={"#00000080"}
                  mb={"0.4rem"}
                >
                  Summary
                </Text>
                <Box
                  display={(currentInvoice?.summary ?? '')?.length > 0 ? 'block' : 'none'}
                  border={"1px solid #005D5D"}
                  backgroundColor={"#005D5D30"}
                  p={2}
                  rounded={"md"}
                >
                  <Text fontSize={"md"} color={"#000000"}>
                    {currentInvoice?.summary}
                  </Text>
                </Box>
              </Box>

              <Box
                display={"flex"}
                justifyContent={"space-between"}
                gap={"2"}
                flexDir={{ base: "column", md: "row" }}
              >
                <Text fontSize={{ base: "xs", md: "sm" }} color={"gray.500"}>
                  {currentInvoice?.term} - {currentInvoice?.year}
                </Text>
                <Text fontSize={{ base: "xs", md: "sm" }} color={"gray.500"}>
                  Created on {currentInvoice?.createdAt}
                </Text>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Invoice;
