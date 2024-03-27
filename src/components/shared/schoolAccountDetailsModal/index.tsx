import { FC, useState } from 'react'
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Avatar,
  Text,
  Button,
  Divider,
  Icon,
  Tooltip,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { MdOutlineAccountBalance } from "react-icons/md";
import { useUserAPI } from '@/hooks/UserContext';

interface SchoolAccountDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SchoolAccountDetailsModal: FC<SchoolAccountDetailsModalProps> = ({isOpen, onClose}) => {
    const {currentWardProfile} = useUserAPI()
    const schoolAccountDetails = currentWardProfile?.schoolAccountName?.map((item, index) => ({
      schoolLogo: currentWardProfile?.schoollogo,
      accountName: currentWardProfile?.schoolAccountName[index],
      accountNumber: currentWardProfile?.schoolAccountNumber[index],
      bankName: currentWardProfile?.schoolBankName[index],
    }));

    // const schoolAccountDetails = [
    //   {
    //     schoolLogo:
    //       "https://th.bing.com/th?id=OIF.Ik%2bZvTuSYLB%2fFKtY5ZjcDg&w=191&h=140&c=7&r=0&o=5&pid=1.7",
    //     accountName: "Lecture Mate College",
    //     accountNumber: "2261911004",
    //     bankName:"Zenith Bank"
    //   },
    //   {
    //     schoolLogo:
    //       "https://th.bing.com/th?id=OIF.Ik%2bZvTuSYLB%2fFKtY5ZjcDg&w=191&h=140&c=7&r=0&o=5&pid=1.7",
    //     accountName: "Lecture Mate College",
    //     accountNumber: "2261911004",
    //     bankName:"Zenith Bank"
    //   },
    //   {
    //     schoolLogo:
    //       "https://th.bing.com/th?id=OIF.Ik%2bZvTuSYLB%2fFKtY5ZjcDg&w=191&h=140&c=7&r=0&o=5&pid=1.7",
    //     accountName: "Lecture Mate College",
    //     accountNumber: "2261911004",
    //     bankName:"Zenith Bank"
    //   },
    // ];

    const toast = useToast()

    const [copiedText, setCopiedText] = useState("")

    const { hasCopied, onCopy } = useClipboard(copiedText);

    const handleCopy = (text: string) => {
      onCopy();
      setCopiedText(text);
      toast({
        title: "Copied!",
        description:"Account number has been copied to clipboard",
        variant: 'left-accent',
        position:'top-right',
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={{ base: "xs", sm: "lg", md: "2xl" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize={"xl"} fontWeight={"bold"} color={"#005D5D"}>
            School Account Information
          </Text>
          <Divider />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mb={"2rem"}>
          <Box display={"flex"} flexDir={"column"} gap={"4"}>
            {schoolAccountDetails?.map((item, index) => {
              return (
                <Flex
                  key={index}
                  justifyContent={"space-between"}
                  backgroundColor={"#F1FBF6"}
                  p={3}
                  rounded={"lg"}
                >
                  <Flex gap={"3"} alignItems={"center"}>
                    <Avatar
                      src={
                        "https://th.bing.com/th?id=OIF.Ik%2bZvTuSYLB%2fFKtY5ZjcDg&w=191&h=140&c=7&r=0&o=5&pid=1.7"
                      }
                      size={"md"}
                    />
                    <Box>
                      <Text fontSize={"lg"} fontWeight={"500"} color={"#000"}>
                        {item?.accountName}
                      </Text>
                      <Flex alignItems={"center"} gap={3}>
                        <Text color={"#000"}>{item?.bankName}</Text>
                        <Text color={"#000"}>{"•"}</Text>
                        <Text color={"#000"}>{item?.accountNumber}</Text>
                      </Flex>
                    </Box>
                  </Flex>
                  <Tooltip label="Copy Account Number">
                    <Button
                      size={"xs"}
                      colorScheme="green"
                      variant={"outline"}
                      onClick={() => handleCopy(item?.accountNumber)}
                    >
                      Copy
                    </Button>
                  </Tooltip>
                </Flex>
              );
            })}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SchoolAccountDetailsModal