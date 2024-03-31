import { useState, useEffect, FC } from "react";
import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  List,
  ListItem,
  ListIcon,
  useToast,
} from "@chakra-ui/react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useUserAPI } from "@/hooks/UserContext";
import { useRouter } from "next/navigation";

interface SelectPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SelectPlanModal: FC<SelectPlanModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter()
  const {
    isOpen: isPlanOpen,
    onOpen: onPlanOpen,
    onClose: onPlanClose,
  } = useDisclosure();
  const toast = useToast();
  const {parentData} = useUserAPI()
  const [trial, setTrial] = useState("");

  const handleSubmit = async (plan: any) => {
    const monthlyUrl = `https://paystack.com/pay/gn-parent-monthly/?email=${parentData?.email}&first_name=${parentData?.firstName}&last_name=${parentData?.lastName}&readonly=first_name,last_name,email`;
    const quaterlyUrl = `https://paystack.com/pay/gn-parent-quarterly/?email=${parentData?.email}&first_name=${parentData?.firstName}&last_name=${parentData?.lastName}&readonly=first_name,last_name,email`;
    const yearlyUrl = `https://paystack.com/pay/gn-parent-yearly/?email=${parentData?.email}&first_name=${parentData?.firstName}&last_name=${parentData?.lastName}&readonly=first_name,last_name,email`;
    if(plan === 'monthly'){
      router.replace(monthlyUrl)
    } else if(plan === 'quaterly'){
      router.replace(quaterlyUrl)
    } else if(plan === 'yearly'){
      router.replace(yearlyUrl)
    } else {
      toast({
        title: "No plan chosen",
        description: "Please select a plan to proceed",
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
        status: "error",
      });
    }
  };

  const tabStyle = {
    bg: "#AEF0D8",
    color: "#000000",
    border: "1px solid #005D5D",
    borderRadius: "4px",
  };

  // Check local storage to see if the modal has been opened before
  // useEffect(() => {
  //   if (me?.me?.admin?.plan?.length! <= 0) {
  //     onOpen();
  //   }
  //   // onOpen();
  // }, [onOpen]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        size={{ base: "lg", sm: "lg", md: "xl" }}
      >
        <ModalOverlay />
        <ModalContent
          as={Flex}
          borderRadius={"10px"}
          p={1}
          align="center"
          w="full"
          bg="#F0F0F0"
        >
          <ModalCloseButton />
          <Flex
            borderRadius="9px"
            w="full"
            h="100px"
            overflow="hidden"
            border="1px solid #E2E2E2"
            bg="#005D5D"
            direction="column"
            p={2}
          >
            <Flex direction="column" w="full" mt={4} px={2} color={"#FFFFFF"}>
              <Text fontWeight={"semibold"} fontSize={"lg"}>
                Select a plan you would like to try
              </Text>
              <Text fontSize={"xs"} mb={2}>
                Choose the package that fits best
              </Text>
            </Flex>
          </Flex>
          <Flex direction="column" w="full" mt={4} px={2}>
            <Tabs
              orientation={"vertical"}
              variant="unstyled"
              gap={4}
              w="full"
              defaultIndex={1}
            >
              <TabList gap="2" w="full">
                <Tab
                  _selected={{ ...tabStyle }}
                  onClick={() => setTrial("basic")}
                  bg="white"
                  _hover={{ border: "1px solid #d1d1d1" }}
                  border="1px solid #E2E2E2"
                  borderRadius={"md"}
                >
                  <Flex justify="space-between" w="full">
                    <Text fontWeight={600} fontSize={{ base: "xs", md: "md" }}>
                      Monthly
                    </Text>
                    <Text
                      textAlign={"right"}
                      fontSize={{ base: "xs", md: "md" }}
                    >
                      <strong>₦250</strong>
                      <sub>/month</sub>
                    </Text>
                  </Flex>
                </Tab>
                <Tab
                  _selected={{ ...tabStyle }}
                  onClick={() => setTrial("basic plus")}
                  bg="white"
                  _hover={{ border: "1px solid #d1d1d1" }}
                  border="1px solid #E2E2E2"
                  borderRadius={"md"}
                >
                  <Flex justify="space-between" w="full">
                    <Text fontWeight={600} fontSize={{ base: "xs", md: "md" }}>
                      Quaterly
                    </Text>
                    <Text
                      textAlign={"right"}
                      fontSize={{ base: "xs", md: "md" }}
                    >
                      <strong>₦750</strong>
                      <sub>/3months</sub>
                    </Text>
                  </Flex>
                </Tab>
                <Tab
                  _selected={{ ...tabStyle }}
                  bg="white"
                  _hover={{ border: "1px solid #d1d1d1" }}
                  border="1px solid #E2E2E2"
                  borderRadius={"md"}
                  onClick={() => setTrial("standard")}
                >
                  <Flex justify="space-between" w="full">
                    <Text fontWeight={600} fontSize={{ base: "xs", md: "md" }}>
                      Yearly
                    </Text>
                    <Text
                      textAlign={"right"}
                      fontSize={{ base: "xs", md: "md" }}
                    >
                      <strong>₦2500</strong>
                      <sub>/Year</sub>
                    </Text>
                  </Flex>
                </Tab>
              </TabList>

              <TabPanels bg="white" borderRadius={"8px"}>
                <TabPanel>
                  <Flex direction="column">
                    <Text fontWeight="semibold">Monthly Plan</Text>
                    <List
                      mt={2}
                      spacing={1}
                      fontSize={{ base: "xs", md: "sm" }}
                    >
                      <ListItem>
                        <ListIcon as={IoCheckmarkCircle} color="green.500" />
                        Register up to <strong>4</strong> children
                      </ListItem>
                      <ListItem>
                        <ListIcon as={IoCheckmarkCircle} color="green.500" />
                        Pay an additional <strong>₦65</strong> per child if you
                        have more than 4 children
                      </ListItem>
                    </List>
                    <Button
                      size="sm"
                      _hover={{ bg: "#343434" }}
                      bg="black"
                      color="white"
                      borderRadius={"full"}
                      mt={14}
                      onClick={() => handleSubmit("monthly")}
                    >
                      Select Monthly Plan
                    </Button>
                  </Flex>
                </TabPanel>
                <TabPanel p={2}>
                  <Flex direction="column">
                    <Text fontWeight="semibold">Quaterly Plan</Text>
                    <List
                      mt={2}
                      spacing={1}
                      fontSize={{ base: "xs", md: "sm" }}
                    >
                      <ListItem>
                        <ListIcon as={IoCheckmarkCircle} color="green.500" />
                        Register up to <strong>4</strong> children
                      </ListItem>
                      <ListItem>
                        <ListIcon as={IoCheckmarkCircle} color="green.500" />
                        Pay an additional <strong>₦195</strong> per child if you
                        have more than 4 children
                      </ListItem>
                    </List>
                    <Button
                      size="sm"
                      _hover={{ bg: "#343434" }}
                      bg="black"
                      color="white"
                      borderRadius={"full"}
                      mt={14}
                      onClick={() => handleSubmit("quaterly")}
                    >
                      Select Quartely Plan
                    </Button>
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <Flex direction="column">
                    <Text fontWeight="semibold">Yearly Plan</Text>
                    <List
                      mt={2}
                      spacing={1}
                      fontSize={{ base: "xs", md: "sm" }}
                    >
                      <ListItem>
                        <ListIcon as={IoCheckmarkCircle} color="green.500" />
                        Register up to <strong>4</strong> children
                      </ListItem>
                      <ListItem>
                        <ListIcon as={IoCheckmarkCircle} color="green.500" />
                        Pay an additional <strong>₦500</strong> per child if you
                        have more than 4 children
                      </ListItem>
                    </List>

                    <Button
                      size="sm"
                      _hover={{ bg: "#343434" }}
                      bg="black"
                      color="white"
                      borderRadius={"full"}
                      mt={14}
                      onClick={() => handleSubmit("yearly")}
                    >
                      Select Yearly Plan
                    </Button>
                  </Flex>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SelectPlanModal;
