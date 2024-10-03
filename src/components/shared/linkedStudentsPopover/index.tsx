'use client'
import { FC } from 'react'
import {
  Box,
  Flex,
  Text,
  useDisclosure,
  Button,
  Avatar,
  CloseButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { useUserAPI } from '@/hooks/UserContext';
import { AiOutlinePlus } from "react-icons/ai";
import SearchStudentModal from '../searchStudentModal';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

interface LinkedStudentsPopoverProps {
  onClose: () => void;
  isPopoverOpen: boolean;
  onPopoverClose: () => void;
  onPopoverOpen: () => void;
}

const LinkedStudentsPopover: FC<LinkedStudentsPopoverProps> = ({onClose, isPopoverOpen, onPopoverClose, onPopoverOpen, ...rest}) => {
    const router = useRouter()
    const {
      isOpen: isModalOpen,
      onOpen: onModalOpen,
      onClose: onModalClose,
    } = useDisclosure();
    const { currentId, setLocalstorageId, currentWardProfile, childData } =
      useUserAPI();
    const pathName = usePathname()
      
  return (
    <Box
      display={{
        base: "none",
        md: pathName.includes("marketplace") ? "none" : "flex",
      }}
      w={"auto"}
      alignItems={"center"}
      {...rest}
    >
      <Popover
        isOpen={isPopoverOpen}
        onOpen={onPopoverOpen}
        onClose={onPopoverClose}
        isLazy
        // matchWidth={true}
      >
        <PopoverTrigger>
          <Box
            display={"flex"}
            alignItems={"center"}
            width={"full"}
            justifyContent={"space-between"}
            _hover={{ cursor: "pointer" }}
            gap={4}
          >
            <Flex alignItems={"center"} gap={2}>
              <Avatar
                size={"sm"}
                src={currentWardProfile?.profileImage}
                name={`${currentWardProfile?.firstName} ${currentWardProfile?.lastName}`}
                pointerEvents={"none"}
              />
              <Box lineHeight={"20px"}>
                <Text fontWeight={"600"} fontSize={"sm"}>
                  {`${currentWardProfile?.firstName || ""} ${
                    currentWardProfile?.middleName || ""
                  } ${currentWardProfile?.lastName || ""}`}
                </Text>
                <Text fontSize={"12px"} color={"#AAAAAA"} fontWeight={"600"}>
                  {currentWardProfile?.greynoteNumber || ""}
                </Text>
              </Box>
            </Flex>
            <BsThreeDots color={"#005D5D"} />
          </Box>
        </PopoverTrigger>
        <PopoverContent rounded={"xl"} w={"auto"} shadow={"lg"}>
          <PopoverBody p={"0.4rem"}>
            {childData?.map((ward: any, index: number) => {
              return (
                <Flex
                  alignItems={"center"}
                  gap={2}
                  bgColor={currentId === ward.id ? "#3F999830" : ""}
                  rounded={"md"}
                  py={"0.5rem"}
                  px={"0.5rem"}
                  mb={"0.4rem"}
                  _hover={{
                    backgroundColor: "#3F999830",
                    cursor: "pointer",
                  }}
                  key={index}
                  onClick={() => {
                    setLocalstorageId(ward?.id || 0);
                    onPopoverClose();
                    router.refresh();
                  }}
                >
                  <Avatar
                    size={"md"}
                    src={ward?.profileImage}
                    pointerEvents={"none"}
                    name={`${ward?.firstName} ${ward.lastName}`}
                  />
                  <Box lineHeight={"20px"}>
                    <Text fontWeight={"600"} fontSize={"sm"}>
                      {`${ward?.firstName} ${ward?.middleName} ${ward.lastName}`}
                    </Text>
                    <Text
                      fontSize={"12px"}
                      color={"#AAAAAA"}
                      fontWeight={"600"}
                    >
                      {ward?.greynoteNumber}
                    </Text>
                  </Box>
                </Flex>
              );
            })}
            <Flex justifyContent={"center"} mb={"1rem"} mt={"2rem"}>
              <Button
                backgroundColor={"#005D5D"}
                color={"#fff"}
                colorScheme="teal"
                w={"90%"}
                _hover={{ backgroundColor: "#044141" }}
                onClick={onModalOpen}
              >
                <AiOutlinePlus />
                <Text fontWeight={"light"} pl="0.5rem">
                  Link your Child
                </Text>
              </Button>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      <SearchStudentModal
        isSearchOpen={isModalOpen}
        onSearchOpen={onModalOpen}
        onSearchClose={onModalClose}
      />
    </Box>
  );
}

export default LinkedStudentsPopover