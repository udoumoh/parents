import { FC } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Flex,
  Box,
  Input,
  Divider,
  Icon,
} from "@chakra-ui/react";
import { IoFilterOutline } from "react-icons/io5";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;  
}

const FilterModal: FC<FilterModalProps> = ({isOpen, onClose}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex alignItems={'center'} gap={3}>
            <Icon as={IoFilterOutline} boxSize={5} color={'#005D5D'}/>
            <Text fontSize={'md'}>Filter posts</Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
          <Divider />
        <ModalBody>
        <Flex>
            
        </Flex>

        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default FilterModal