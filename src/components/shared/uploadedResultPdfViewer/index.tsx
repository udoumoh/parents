import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { Worker, Viewer, ZoomEvent } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";


export const PDFViewer = ({ isOpen, onClose, path }: any) => {
  const handleZoom = (e: ZoomEvent) => {
    console.log(`Zoom to ${e.scale}`);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent pos="fixed" mt={3} overflow="auto">
        <ModalHeader>Student Academic Result</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflow="auto" maxH="30rem">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
            <Viewer fileUrl={path || ""} onZoom={handleZoom} />
          </Worker>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
