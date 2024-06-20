import { FC, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Input,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Avatar,
  Flex,
  useToast,
  Icon,
  Divider,
} from "@chakra-ui/react";
import { ImageUpload } from "@/components/imageUpload/ImageUpload";
import { useMutation } from "@apollo/client";
import { UPDATE_PARENT } from "@/gql/queries";
import { FaEdit } from "react-icons/fa";
import { useUserAPI } from "@/hooks/UserContext";

interface EditProfileModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const EditProfileModal: FC<EditProfileModalProps> = ({
  isOpen,
  onOpen,
  onClose,
}) => {
  const {
    isOpen: isModalOpen,
    onClose: onModalClose,
    onOpen: onModalOpen,
  } = useDisclosure();
  const [updateparent] = useMutation(UPDATE_PARENT);
  const [profileUrl, setProfileUrl] = useState("");
  const [profileData, setProfileData] = useState({
    email: "",
    phoneNumber: "",
    lastName: "",
    middleName: "",
    firstName: "",
  })
  const [folder, setFolder] = useState<string>("");
  const toast = useToast();

  const handleImageUpload = (
    uploadedImageUrl: string,
    uploadedFolder: string
  ) => {
    setProfileUrl(uploadedImageUrl); // Set the image URL received from the upload component
    setFolder(uploadedFolder); // Set the folder received from the upload component
  };

  const handleProfileChange = (field: any, value: any) => {
    setProfileData(previous => ({
      ...previous, 
      [field]: value
    })
  )
  }

  const handleProfileUpdate = async () => {
    try {
      const response = await updateparent({
        variables: {
          profileImgUrl: profileUrl,
          email: "",
          phoneNumber: "",
          lastName: "",
          middleName: "",
          firstName: "",
        },
      });

      if (!response) {
        toast({
          title: "Oops! Something went wrong. Please try again later.",
          position: "top-right",
          variant: "left-accent",
          isClosable: true,
          status: "error",
        });
      }

      if (response?.data?.updateParentDetails) {
        toast({
          title: "Success",
          description: "Successfully updated profile image",
          position: "top-right",
          variant: "left-accent",
          isClosable: true,
          status: "success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "xs", sm: "sm", md: "md", lg:"2xl" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={'lg'} fontWeight={'bold'}>Edit your profile</ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody>
          <Flex justifyContent={"center"} mt={"1rem"}>
            <Avatar size={"xl"} src={profileUrl} />
            <Icon
              as={FaEdit}
              boxSize={4}
              color={"#005D5D"}
              onClick={() => {
                onModalOpen();
              }}
              _hover={{ cursor: "pointer" }}
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
};

export default EditProfileModal;
