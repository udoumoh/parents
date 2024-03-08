"use client";

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
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { RxUpload, RxFile } from "react-icons/rx";
import React, { useState } from "react";
import TopBarProgress from "react-topbar-progress-indicator";
import { IoImagesOutline } from "react-icons/io5";
import { TbUpload } from "react-icons/tb";

interface FormValues {
  file: File | null;
}
interface ImageUploadProps {
  type: string;
  imageFolder?: string;
  isModalOpen: any;
  onModalClose: any;
  onUpload: (imageUrl: string, folder: string) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  type,
  imageFolder,
  isModalOpen,
  onModalClose,
  onUpload,
}) => {
  const toast = useToast();
  const [uploading, setUploading] = useState(false);

  function generateRandomAlphanumeric(length: number): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }
  const formik = useFormik<FormValues>({
    initialValues: {
      file: null,
    },
    onSubmit: async (values) => {
      if (values.file) {
        const formData = new FormData();
        const folder = imageFolder || generateRandomAlphanumeric(8);
        formData.append("file", values.file);
        formData.append("folder", `gn_profile_images/parents/${folder}`);
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
          const uploadedImageUrl = response?.data?.secure_url;
          const uploadedFolder = folder;
          onUpload(uploadedImageUrl, uploadedFolder);
          onModalClose()
        } catch (error) {
          if (error) {
            setUploading(false);
            toast({
              title: "Upload Error",
              position: "top-right",
              description: "We were unable to upload your file",
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
    <Modal
      isOpen={isModalOpen}
      onClose={onModalClose}
      scrollBehavior={'inside'}
    >
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
        <ModalCloseButton onClick={() => formik.resetForm()} />
        <Divider mb={3} />
        <ModalBody>
          <Flex direction="column">
            {uploading && <TopBarProgress />}
            {formik.values.file && (
              <Text
                color={"red"}
                fontSize="14"
                display={
                  formik.values.file.size / (1024 * 1024) > 5 ? "block" : "none"
                }
              >
                File Size: {(formik.values.file.size / (1024 * 1024)).toFixed()}{" "}
                MB <br />
                File size exceeds the maximum limit of 5 MB
              </Text>
            )}
            <Box
              p={4}
              h="17vh"
              border="2px dashed"
              borderColor={isDragActive ? "green.500" : "gray.300"}
              borderRadius="md"
              cursor="pointer"
              display="flex"
              flexDirection="column"
              gap={4}
              mb={14}
              justifyItems="center"
              alignItems="center"
              _hover={{ bg: "#007C7B10", borderColor: "#007C7B80" }}
              {...getRootProps()}
            >
              <Icon as={RxUpload} mt={2} w="8" h="8" color="#202020" />
              <input {...getInputProps()} />
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
              color="#007C7B"
              border="1px solid #007C7B"
              _hover={{ bg: "#007C7B", color: "white" }}
              variant="outline"
              fontWeight={500}
              leftIcon={<TbUpload />}
              isDisabled={
                !formik.values.file ||
                formik.values.file.size / (1024 * 1024) > 5
              }
              isLoading={formik.isSubmitting}
            >
              Upload
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
