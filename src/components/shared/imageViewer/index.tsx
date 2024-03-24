import { FC } from 'react'
import {
  Box,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

interface ImgViewerProps {
  isOpen: boolean;
  onClose: () => void;
  path: string;
}

const ImgViewer: FC<ImgViewerProps> = ({path, isOpen, onClose}) => {

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Image Viewer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={path} alt='logo' />
          </ModalBody>

          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ImgViewer