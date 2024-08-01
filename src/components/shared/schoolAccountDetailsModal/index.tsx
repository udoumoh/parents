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
import { CiWarning } from "react-icons/ci";
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
        status: "info",
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
          <Text fontSize={{base:"md", md:"xl"}} fontWeight={"bold"} color={"#005D5D"}>
            School Account Information
          </Text>
          <Divider />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mb={"2rem"}>
          <Box display={"flex"} flexDir={"column"} gap={"4"}>
            {(schoolAccountDetails ?? []).length === 0 ? (
              <>
                <Box border={"1px solid #00000030"} p={4} rounded={"md"} display={'flex'} alignItems={'center'} gap={3}>
                  <Icon as={CiWarning} boxSize={5} color={'#00000060'} />
                  <Text color={"#00000090"}>
                    No Account details have been provided by this school
                  </Text>
                </Box>
              </>
            ) : (
              schoolAccountDetails?.map((item, index) => {
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
                          item?.schoolLogo
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
              })
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SchoolAccountDetailsModal