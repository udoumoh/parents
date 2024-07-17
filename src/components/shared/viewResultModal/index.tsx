import { FC } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Divider,
  Text,
} from "@chakra-ui/react";
import { GenerateResult } from '@/gql/types';
import { TemplateOne } from '@/components/ResultSheet/TemplateOne';
import { TemplateTwo } from "@/components/ResultSheet/TemplateTwo";
import { TemplateThree } from "@/components/ResultSheet/TemplateThree";
import { TemplateFour } from "@/components/ResultSheet/TemplateFour";

interface ViewResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: GenerateResult;
}

const ViewResultModal: FC<ViewResultModalProps> = ({isOpen, onClose, result}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={{ base: "lg", md: "2xl" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text
            fontSize={{ base: "md", md: "xl" }}
            fontWeight={"bold"}
            color={"#005D5D"}
          >
            Student Generated Result
          </Text>
          <Divider />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mb={"2rem"}>
          {result?.resultTemplate === 1 ? (
            <TemplateOne results={result} />
          ) : result?.resultTemplate === 2 ? (
            <TemplateTwo results={result} />
          ) : result?.resultTemplate === 3 ? (
            <TemplateThree results={result} />
          ) : (
            <TemplateFour results={result} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ViewResultModal