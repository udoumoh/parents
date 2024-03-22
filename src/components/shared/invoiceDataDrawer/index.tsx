import { FC } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Text,
  Button,
  Flex,
  Icon,
  Avatar,
  Badge,
  useDisclosure,
  Fade,
  ScaleFade,
  Slide,
  SlideFade,
  Collapse,
  Divider,
  Center,
  Tooltip,
} from "@chakra-ui/react";
import { CiReceipt } from "react-icons/ci";
import { LiaCoinsSolid } from "react-icons/lia";
import { FaFilePdf } from "react-icons/fa6";
import { TbFileInvoice } from "react-icons/tb";
import { PDFViewer } from "../uploadedResultPdfViewer";
import ImgViewer from "../imageViewer";
import { useUserAPI } from "@/hooks/UserContext";
import formatNumberWithCommas from "@/helpers/formatNumberWithCommas";

interface InvoiceData {
  term?: string;
  year?: string;
  category?: string;
  amountPaid?: number;
  id?: number;
  status?: string;
  summary?: string;
  createdAt?: string;
  invoiceId?: string;
  schoolname?: string;
  schoollogo?: string;
  receipt: {
    amountPaid?: number;
    createdAt?: string;
    creator?: string;
    fileType?: string;
    id?: number;
    parentInvoiceId?: string;
    status?: string;
    summary?: string;
    updatedAt?: string;
    uploadedDocument?: string;
  }[];
}

interface InvoiceDataDrawerProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  invoiceData: InvoiceData | undefined;
}

const InvoiceDataDrawer: FC<InvoiceDataDrawerProps> = ({
  onClose,
  isOpen,
  onOpen,
  invoiceData,
}) => {
  const { currentWardProfile } = useUserAPI();
  const { isOpen: isCollapseOpen, onToggle: onCollapseToggle } =
    useDisclosure();
  const {
    isOpen: isPdfOpen,
    onOpen: onPdfOpen,
    onClose: onPdfClose,
  } = useDisclosure();
  const {
    isOpen: isImageViewerOpen,
    onOpen: onImageViewerOpen,
    onClose: onImageViewerClose,
  } = useDisclosure();
  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={"sm"}>
      {/* <DrawerOverlay/> */}
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Text fontWeight={"bold"}>Student Invoice</Text>
        </DrawerHeader>
        <DrawerBody>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            flexDir={"column"}
            w={"full"}
          >
            <Avatar
              src={currentWardProfile?.profileImage}
              size={"xl"}
              border={"2px solid #005D5D"}
              p={"0.2rem"}
              mb={"0.5rem"}
            />
            <Text
              fontSize={"lg"}
            >{`${currentWardProfile?.firstName} ${currentWardProfile?.middleName} ${currentWardProfile?.lastName}`}
            </Text>
            <Text fontSize={"sm"} color={"#00000090"}>
              {currentWardProfile?.gender} • {currentWardProfile?.age} Years Old
            </Text>
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
            <Box w={"full"}>
              <Collapse in={isCollapseOpen} animateOpacity>
                {invoiceData?.receipt?.length === 0 ? (
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
                  (invoiceData && invoiceData.receipt)?.map((receipt, index) => {
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
                            <Icon
                              as={CiReceipt}
                              boxSize={5}
                              color={"#005D5D"}
                            />
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
                                {invoiceData?.category}
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
                                    N/A
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
                                path={receipt?.uploadedDocument || ""}
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
                            >
                              Summary
                            </Text>
                            <Text
                              fontSize={"md"}
                              fontWeight={"bold"}
                              color={"#000000"}
                            >
                              {receipt?.summary}
                            </Text>
                          </Box>

                          <Box>
                            <Text
                              fontSize={{ base: "xs", md: "sm" }}
                              color={"gray.500"}
                            >
                              {invoiceData?.term} - {invoiceData?.year}
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
                <Box display={"flex"} gap={1} alignItems={"center"}>
                  <Icon as={TbFileInvoice} boxSize={5} color={"#005D5D"} />
                  <Text fontSize={"lg"} fontWeight={"bold"} color={"#000000"}>
                    Invoice Details
                  </Text>
                </Box>
                <Box>
                  <Badge
                    variant={"solid"}
                    colorScheme={
                      invoiceData?.status === "active"
                        ? "green"
                        : invoiceData?.status === "rejected by parent"
                        ? "red"
                        : invoiceData?.status === "processing"
                        ? "yellow"
                        : "purple"
                    }
                  >
                    {invoiceData?.status}
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
                    <Text
                      fontSize={"xs"}
                      color={"#00000080"}
                      fontWeight={"bold"}
                    >
                      Category
                    </Text>
                    <Text fontSize={"md"} fontWeight={"bold"} color={"#000000"}>
                      {invoiceData?.category}
                    </Text>
                  </Box>

                  <Box>
                    <Text
                      fontSize={"xs"}
                      color={"#00000080"}
                      fontWeight={"bold"}
                    >
                      Invoice Id
                    </Text>
                    <Text fontSize={"md"} fontWeight={"bold"} color={"#000000"}>
                      {invoiceData?.invoiceId}
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
                          Amount Paid
                        </Text>
                        <Text
                          fontSize={"md"}
                          fontWeight={"bold"}
                          color={"#000000"}
                        >
                          ₦{formatNumberWithCommas(invoiceData?.amountPaid)}
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
                          N/A
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              </Flex>

              <Divider />

              <Box display={"flex"} flexDir={"column"} gap={"4"} mt={"1rem"}>
                <Box>
                  <Text fontSize={"xs"} fontWeight={"bold"} color={"#00000080"}>
                    Summary
                  </Text>
                  <Text fontSize={"md"} fontWeight={"bold"} color={"#000000"}>
                    {invoiceData?.summary}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  gap={"2"}
                  flexDir={{ base: "column", md: "row" }}
                >
                  <Text fontSize={{ base: "xs", md: "sm" }} color={"gray.500"}>
                    {invoiceData?.term} - {invoiceData?.year}
                  </Text>
                  <Text fontSize={{ base: "xs", md: "sm" }} color={"gray.500"}>
                    Created on {invoiceData?.createdAt}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default InvoiceDataDrawer;
