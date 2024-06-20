'use client'
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
  Text,
  Box,
  Select,
} from "@chakra-ui/react";
import { ImageUpload } from "@/components/imageUpload/ImageUpload";
import { useMutation } from "@apollo/client";
import { UPDATE_PARENT } from "@/gql/queries";
import { FaEdit } from "react-icons/fa";
import { useUserAPI } from "@/hooks/UserContext";
import { CiEdit } from "react-icons/ci";

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
  const {parentData} = useUserAPI();
  const [updateparent] = useMutation(UPDATE_PARENT);
  const [profileUrl, setProfileUrl] = useState(parentData?.profileImgUrl);
  const [profileData, setProfileData] = useState({
    email: parentData?.email || "",
    phoneNumber: parentData?.phoneNumber || "",
    lastName: parentData?.lastName || "",
    middleName: parentData?.middleName || "",
    firstName: parentData?.firstName || "",
    countryCode: "",
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
          email: profileData.email,
          phoneNumber: profileData.phoneNumber,
          lastName: profileData.lastName,
          middleName: profileData.middleName,
          firstName: profileData.firstName,
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
      size={{ base: "xs", sm: "sm", md: "md", lg: "2xl" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex alignItems={"center"} gap={3}>
            <Icon as={CiEdit} boxSize={6} color={"#005D5D"} />
            <Text fontSize={"md"}>Edit your profile</Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <Flex gap={4}>
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

              <ImageUpload
                isModalOpen={isModalOpen}
                onModalClose={onModalClose}
                type="parentImg"
                imageFolder={folder}
                onUpload={handleImageUpload}
              />
            </Flex>
          </Flex>

          <Box>
            <Flex
              mt={"1rem"}
              gap={5}
              justifyContent={"space-between"}
              flexDir={{ base: "column", sm: "row" }}
            >
              <Box display={"flex"} flexDir={"column"} gap={2} w={"full"}>
                <Text fontWeight={"semibold"} fontSize={"sm"}>
                  First Name
                </Text>
                <Input
                  placeholder={"Enter First Name"}
                  value={profileData.firstName}
                  type="text"
                  focusBorderColor="green.500"
                  onChange={(e) =>
                    handleProfileChange("firstName", e.target.value)
                  }
                />
              </Box>

              <Box display={"flex"} flexDir={"column"} gap={2} w={"full"}>
                <Text fontWeight={"semibold"} fontSize={"sm"}>
                  Middle Name
                </Text>
                <Input
                  placeholder={"Enter Middle Name"}
                  value={profileData.middleName}
                  type="text"
                  focusBorderColor="green.500"
                  onChange={(e) =>
                    handleProfileChange("middleName", e.target.value)
                  }
                />
              </Box>
            </Flex>

            <Flex
              mt={"1rem"}
              gap={5}
              justifyContent={"space-between"}
              flexDir={{ base: "column", sm: "row" }}
            >
              <Box display={"flex"} flexDir={"column"} gap={2} w={"full"}>
                <Text fontWeight={"semibold"} fontSize={"sm"}>
                  Last Name
                </Text>
                <Input
                  placeholder={"Enter Last Name"}
                  value={profileData.lastName}
                  type="text"
                  focusBorderColor="green.500"
                  onChange={(e) =>
                    handleProfileChange("lastName", e.target.value)
                  }
                />
              </Box>

              <Box display={"flex"} flexDir={"column"} gap={2} w={"full"}>
                <Text fontWeight={"semibold"} fontSize={"sm"}>
                  Email
                </Text>
                <Input
                  placeholder={"Enter Email"}
                  value={profileData.email}
                  type="email"
                  focusBorderColor="green.500"
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                />
              </Box>
            </Flex>

            <Box mt={"1rem"}>
              <Text fontWeight={"semibold"} fontSize={"sm"}>
                Phone Number
              </Text>
              <Flex mt={"0.5rem"} gap={5} justifyContent={"space-between"}>
                <Box>
                  <Select
                    placeholder={"country code"}
                    focusBorderColor="green.500"
                    value={profileData?.countryCode}
                    onChange={(e) =>
                      handleProfileChange("countryCode", e.target.value)
                    }
                    w={"90px"}
                  >
                    <option value="+234">+234</option>
                  </Select>
                </Box>
                
                <Box display={"flex"} flexDir={"column"} gap={2} w={"full"}>
                  <Input
                    placeholder={"80 9999 9999"}
                    value={profileData.phoneNumber}
                    type="number"
                    focusBorderColor="green.500"
                    onChange={(e) =>
                      handleProfileChange("phoneNumber", e.target.value)
                    }
                  />
                </Box>
              </Flex>
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="teal" onClick={handleProfileUpdate}>
            Save changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditProfileModal;
