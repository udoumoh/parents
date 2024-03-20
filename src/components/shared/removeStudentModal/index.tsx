import { FC, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Button,
  Avatar,
  Flex,
  Box,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { useUserAPI } from '@/hooks/UserContext';
import { useMutation } from '@apollo/client';
import { REMOVE_STUDENT } from '@/gql/mutations';

interface RemoveStudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
}

const RemoveStudentModal: FC<RemoveStudentModalProps> = ({isOpen, onClose, onOpen}) => {
    const {childData, currentId} = useUserAPI();
    const [removeStudent] = useMutation(REMOVE_STUDENT)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const toast = useToast()

    const handleRemoveStudent = async (id: any) => {
        setIsSubmitting(true)
        try{
            const response = await removeStudent({
                variables:{
                    studentId: id,
                }
            })
            if(!response) {
                toast({
                  title: "Client Error",
                  description: "A client-side error occurred",
                  position: "top-right",
                  variant: "left-accent",
                  isClosable: true,
                  status: "error",
                });
            }
            if(!response.data.gnRemoveStudent) {
                toast({
                  title: "Error",
                  description: "An error occured while removing this child from Greynote",
                  position: "top-right",
                  variant: "left-accent",
                  isClosable: true,
                  status: "error",
                });
            }
            if(response?.data?.gnRemoveStudent){
                toast({
                  title: "Successfully removed child from Greynote",
                  description: "Your request to remove this child from Greynote was successful",
                  position: "top-right",
                  variant: "left-accent",
                  isClosable: true,
                  status: "success",
                });
                window.location.reload();
            }
        } catch(err: any) {
            console.log(err)
        } finally {
            setIsSubmitting(false)
        } 
        
    }
  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      size={{ base: "xs", sm: "sm", md: "lg" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text mb={"0.5rem"} color={'red.600'}>Remove child from Greynote</Text>
        <ModalCloseButton />
          <Divider />
        </ModalHeader>
        <ModalBody>
          <Text mb={"2rem"}>
            Kindly select the child you want to perform this action for
          </Text>

          <Box>
            <Accordion allowToggle w={"full"}>
              {childData?.map((child, index) => {
                return (
                  <AccordionItem
                    border={"1px solid #A42020"}
                    rounded={"md"}
                    mt={"1rem"}
                    key={index}
                  >
                    <AccordionButton
                      alignItems={"center"}
                      gap={2}
                      rounded={"md"}
                      py={"0.5rem"}
                      px={"1rem"}
                      _hover={{
                        backgroundColor: "#FFE7E7",
                        cursor: "pointer",
                      }}
                    >
                      <Box as="span" flex="1" textAlign="left">
                        <Flex gap={2} alignItems={"center"}>
                          <Avatar
                            src={child.profileImage}
                            size={"md"}
                          />
                          <Box>
                            <Text fontWeight={"600"} fontSize={"sm"}>
                              {`${child.firstName} ${child.lastName}`}
                            </Text>
                            <Text
                              fontSize={"12px"}
                              color={"#AAAAAA"}
                              fontWeight={"600"}
                            >
                              {child.greynoteNumber}
                            </Text>
                          </Box>
                        </Flex>
                      </Box>
                    </AccordionButton>
                    <AccordionPanel>
                      <Text>
                        Are you sure you want to delete Kylian Mbappes data from
                        greynote?
                      </Text>
                      <Flex alignItems={"end"} mt={"1rem"}>
                        <Button colorScheme="red" isLoading={isSubmitting} ml={'auto'} onClick={()=>handleRemoveStudent(child.id)}>
                          Yes, delete data
                        </Button>
                      </Flex>
                    </AccordionPanel>
                  </AccordionItem>
                );
              })}
              {/* <AccordionItem border={"1px solid #A42020"} rounded={"md"} mt={'1rem'}>
                <AccordionButton
                  alignItems={"center"}
                  gap={2}
                  rounded={"md"}
                  py={"0.5rem"}
                  px={"1rem"}
                  _hover={{
                    backgroundColor: "#FFE7E7",
                    cursor: "pointer",
                  }}
                >
                  <Box as="span" flex="1" textAlign="left">
                    <Flex gap={2} alignItems={"center"}>
                      <Avatar
                        src="https://jooinn.com/images/model-photo-3.jpg"
                        size={"md"}
                      />
                      <Box>
                        <Text fontWeight={"600"} fontSize={"sm"}>
                          Kylian Mbappe
                        </Text>
                        <Text
                          fontSize={"12px"}
                          color={"#AAAAAA"}
                          fontWeight={"600"}
                        >
                          GN000419
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                </AccordionButton>
                <AccordionPanel>
                  <Text>
                    Are you sure you want to delete Kylian Mbappes data from
                    greynote?
                  </Text>
                  <Flex alignItems={"end"} mt={"1rem"}>
                    <Button colorScheme="red" ml={"auto"}>
                      Yes, delete data
                    </Button>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem border={"1px solid #A42020"} rounded={"md"} mt={'1rem'}>
                <AccordionButton
                  alignItems={"center"}
                  gap={2}
                  rounded={"md"}
                  py={"0.5rem"}
                  px={"1rem"}
                  _hover={{
                    backgroundColor: "#FFE7E7",
                    cursor: "pointer",
                  }}
                >
                  <Box as="span" flex="1" textAlign="left">
                    <Flex gap={2} alignItems={"center"}>
                      <Avatar
                        src="https://jooinn.com/images/model-photo-3.jpg"
                        size={"md"}
                      />
                      <Box>
                        <Text fontWeight={"600"} fontSize={"sm"}>
                          Kylian Mbappe
                        </Text>
                        <Text
                          fontSize={"12px"}
                          color={"#AAAAAA"}
                          fontWeight={"600"}
                        >
                          GN000419
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                </AccordionButton>
                <AccordionPanel>
                  <Text>
                    Are you sure you want to delete Kylian Mbappes data from
                    greynote?
                  </Text>
                  <Flex alignItems={"end"} mt={"1rem"}>
                    <Button colorScheme="red" ml={"auto"}>
                      Yes, delete data
                    </Button>
                  </Flex>
                </AccordionPanel>
              </AccordionItem> */}
            </Accordion>
          </Box>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default RemoveStudentModal