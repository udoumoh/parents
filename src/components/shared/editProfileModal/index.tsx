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
  useToast,
} from "@chakra-ui/react";
import { ImageUpload } from '@/components/imageUpload/ImageUpload';
import { useMutation } from '@apollo/client';
import { UPDATE_PARENT } from '@/gql/queries/queries';

interface EditProfileModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const EditProfileModal: FC<EditProfileModalProps> = ({isOpen, onOpen, onClose}) => {
  const { isOpen: isModalOpen, onClose: onModalClose, onOpen: onModalOpen } = useDisclosure();
    const [updateparent ] = useMutation(UPDATE_PARENT);
    const [profileUrl, setProfileUrl] = useState("");
    const [folder, setFolder] = useState<string>("");
    const toast = useToast()

    const handleImageUpload = (
      uploadedImageUrl: string,
      uploadedFolder: string
    ) => {
      setProfileUrl(uploadedImageUrl); // Set the image URL received from the upload component
      setFolder(uploadedFolder); // Set the folder received from the upload component
    };

    const handleProfileUpdate = async() => {
        try{
            const response = await updateparent({
              variables: {
                profileImgUrl: profileUrl,
                email: null,
                phoneNumber: null,
                lastName: null,
                middleName: null,
                firstName: null,
              },
            });

            if(!response){
                toast({
                  title: "Client Error",
                  description:
                    "A client-side error occurred",
                  position: "bottom",
                  variant: "left-accent",
                  isClosable: true,
                  status: "error",
                });
            }
            console.log(response);
        } catch {

        }
    }

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
              onClick={handleProfileUpdate}
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