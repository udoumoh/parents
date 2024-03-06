import { FC, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Avatar,
  Flex,
  Box,
} from "@chakra-ui/react";
import { ImageUpload } from '@/components/imageUpload/ImageUpload';

interface EditProfileModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const EditProfileModal: FC<EditProfileModalProps> = ({isOpen, onOpen, onClose}) => {
  const { isOpen: isModalOpen, onClose: onModalClose, onOpen: onModalOpen } = useDisclosure();
    const [profileUrl, setProfileUrl] = useState("");
    const [folder, setFolder] = useState<string>("");

    const handleImageUpload = (
      uploadedImageUrl: string,
      uploadedFolder: string
    ) => {
      setProfileUrl(uploadedImageUrl); // Set the image URL received from the upload component
      setFolder(uploadedFolder); // Set the folder received from the upload component
    };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update your profile image</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            justifyContent={"center"}
            mt={"1rem"}
            _hover={{ cursor: "pointer"}}
          >
            <Avatar
              size={"xl"}
              src={profileUrl}
              onClick={() => {
                onModalOpen();
              }}
            />
          </Flex>

          <Flex justifyContent={"center"} mb={"1.5rem"}>
            <Button
              mt={4}
              fontSize={"md"}
              backgroundColor={"#007C7B"}
              color={"#fff"}
              fontWeight={"400"}
              onClick={() => {}}
              _hover={{ backgroundColor: "#099C9B" }}
            >
              Update profile image
            </Button>
            <ImageUpload
              isModalOpen={isModalOpen}
              onModalClose={onModalClose}
              type="parentImg"
              imageFolder={folder}
              onUpload={handleImageUpload}
            />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default EditProfileModal