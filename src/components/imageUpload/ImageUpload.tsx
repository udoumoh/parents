import { FC } from "react";
import {
  Box,
  Flex,
  Icon,
  Text,
  Button,
  useToast,
  Modal,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Divider,
  Input,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { RxUpload, RxFile } from "react-icons/rx";
import React, { useState } from "react";
import TopBarProgress from "react-topbar-progress-indicator";
import { IoImagesOutline } from "react-icons/io5";

interface ImageUploadProps {
  isModalOpen: boolean;
  onModalClose: () => void;
  profileUrl: any;
}

interface FormValues {
  file: File | null;
}

const ImageUpload: FC<ImageUploadProps> = ({
  isModalOpen,
  onModalClose,
  profileUrl,
}) => {
  const toast = useToast();
  const [uploading, setUploading] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      file: null,
    },
    onSubmit: async (values) => {
      if (values.file) {
        const formData = new FormData();
        formData.append("file", values.file);
        formData.append("folder", "gn_profile_images");
        formData.append("upload_preset", "greynote");
        setUploading(true);
        try {
          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dgtfoc2ee/upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.status === 200) {
            toast({
              title: "Upload Successful",
              position: "top-right",
              status: "success",
              variant: "left-accent",
              duration: 5000,
              isClosable: true,
            });
          }
          window.localStorage.setItem("imageSrc", response.data.secure_url);
          profileUrl(response.data.secure_url);
        } catch (error) {
          if (error) {
            setUploading(false);
            toast({
              title: "Upload Error",
              position: "top-right",
              description: "We were unable to upload your note😞",
              status: "error",
              variant: "left-accent",
              duration: 5000,
              isClosable: true,
            });
          }
          console.error("Upload error:", error);
        }
      }
    },
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      formik.setFieldValue("file", acceptedFiles[0]);
    },
  });
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex align="center" gap={2}>
              <Icon as={IoImagesOutline} w="3" h="3" color="#016B6A" />
              <Text fontSize={13} fontWeight={500} color="#212121">
                Profile Image Upload
              </Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <Divider mb={3} />
          <ModalBody>
            <Flex direction="column">
              {uploading && <TopBarProgress />}
              <Box
                p={4}
                h="17vh"
                border="2px dotted"
                borderColor={isDragActive ? "green.500" : "gray.300"}
                borderRadius="md"
                cursor="pointer"
                display="flex"
                flexDirection="column"
                gap={4}
                mb={14}
                justifyItems="center"
                alignItems="center"
                _hover={{ bg: "#FFF7EB" }}
                {...(getRootProps() as React.InputHTMLAttributes<HTMLInputElement>)}
              >
                <Icon as={RxUpload} mt={2} w="8" h="8" color="#202020" />
                <input
                  {...(getInputProps() as React.InputHTMLAttributes<HTMLInputElement>)}
                />
                {isDragActive ? (
                  <Text color="green.500">Drop the file here</Text>
                ) : (
                  <Text color="#202020">
                    Drag and drop a file here, or click to select a file
                  </Text>
                )}
                {formik.values.file && (
                  <Flex mt={4} align="center" gap={1}>
                    <Icon as={RxFile} w="4" h="4" />
                    <Text fontWeight="500" fontSize={12}>
                      Selected File: {formik.values.file.name}
                    </Text>
                  </Flex>
                )}
              </Box>
              <Button
                type="submit"
                mt={4}
                // onClick={handleFormSubmit}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                  event.preventDefault(); // Prevent the default form submission behavior
                  formik.handleSubmit();
                }}
                color="#FDBC52"
                border="1px solid #FDBC52"
                _hover={{ bg: "#FDBC52", color: "white" }}
                variant="outline"
                disabled={!formik.values.file}
                isLoading={formik.isSubmitting}
              >
                Upload
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageUpload;
