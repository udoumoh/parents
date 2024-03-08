'use client'
import { FC, useState, useEffect } from 'react'
import {
  Box,
  Flex,
  Text,
  useDisclosure,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
  Divider,
  Modal,
  ModalContent,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Avatar,
} from "@chakra-ui/react";
import SearchResultItem from '../searchResultItem';
import { FaLink } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import {
  AiOutlinePlus,
} from "react-icons/ai";
import LinkRequestModal from '../linkRequestModal';
import { gql, useQuery } from "@apollo/client";
import { GET_STUDENTS } from '@/gql/queries';

interface SearchStudentModalProps {
  isSearchOpen: boolean;
  onSearchOpen: () => void;
  onSearchClose: () => void;
}

const SearchStudentModal: FC<SearchStudentModalProps> = ({isSearchOpen, onSearchOpen, onSearchClose}) => {
    const {
      isOpen: isModalOpen,
      onOpen: onModalOpen,
      onClose: onModalClose,
    } = useDisclosure();
    const [searchInput, setSearchInput] = useState("");
    const [selectedStudent, setSelectedStudent] = useState({
      name: "",
      profileImageUrl: "",
      age: 0,
      gender: "",
      className: "",
      id: "",
    });
    const [studentData, setStudentData] = useState([{
      name: "",
      age: 0,
      className: "",
      gender: "",
      profileImageUrl:
        "",
        id: "",
    }])
    const {data:search} = useQuery(GET_STUDENTS)
    const handleSearchChange = (e: any) => {
    setSearchInput(e.target.value)
  };

  useEffect( () => {
    const fetchData = async () => {
      try {
        const response = await search?.getStudent || [];
        const data = response.map((student: any) => ({
          name: student?.firstName + " " + student.lastName,
          age: student?.ageInput,
          className: student?.classroom?.classroom?.className || "",
          gender: student?.gender,
          profileImageUrl: student?.profileImgUrl,
          id: student?.id,
        }));
        setStudentData(data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [search]);

  const filteredSearchData = studentData.filter((item) =>
    item?.name?.toLowerCase().includes(searchInput.toLowerCase())
  );
  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isSearchOpen}
      onClose={onSearchClose}
      scrollBehavior={"inside"}
      size={{base:"xs", sm:"sm", md:"lg"}}
    >
      <ModalOverlay />
      <ModalContent rounded={"xl"}>
        <ModalHeader>
          <Flex alignItems={"center"} gap={4}>
            <Icon as={FaLink} color={"#005D5D"} boxSize={6} />
            <Text fontWeight={"600"} fontSize={"lg"}>
              Link your child
            </Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody pb={6}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <IoIosSearch color="#C2C2C2" size="20" />
            </InputLeftElement>
            <Input
              onChange={handleSearchChange}
              value={searchInput}
              type="text"
              placeholder="Search for your child"
              backgroundColor={"#F4F4F4"}
              _placeholder={{ color: "#C2C2C2" }}
            />
          </InputGroup>
          {searchInput && (
            <Box
              w={"full"}
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              mt={"1rem"}
            >
              {filteredSearchData.length == 0 ? (
                <Text textAlign={"center"} fontSize={"xl"} color={"#484848"}>
                  No results match your search criteria
                </Text>
              ) : (
                filteredSearchData?.map((item, index) => (
                  <Box key={index} onClick={() => setSelectedStudent(item)}>
                    <SearchResultItem student={item} key={index} />
                  </Box>
                ))
              )}
            </Box>
          )}

          {selectedStudent.age == 0 ? (
            <></>
          ) : (
            <Box
              mt={"2rem"}
              display={"flex"}
              alignItems={"center"}
              gap={3}
              w={"full"}
              rounded={"md"}
              py={"0.5rem"}
              px={"1rem"}
              mb={"0.4rem"}
              backgroundColor="#3F999830"
            >
              <Avatar
                size={"md"}
                src={selectedStudent.profileImageUrl}
                pointerEvents={"none"}
              />
              <Box lineHeight={"20px"}>
                <Text fontWeight={"700"} fontSize={"lg"}>
                  {`${selectedStudent.name}`}
                </Text>
                <Text fontSize={"sm"} color={"#AAAAAA"} fontWeight={"600"}>
                  {`${selectedStudent.age} years old`} •{" "}
                  {selectedStudent.gender} • {selectedStudent.className}
                </Text>
              </Box>
            </Box>
          )}
        </ModalBody>

        <ModalFooter justifyContent={"center"}>
          <Button
            backgroundColor={"#005D5D"}
            mr={3}
            gap={2}
            px={"3rem"}
            _hover={{ backgroundColor: "#044141" }}
            onClick={onModalOpen}
            isDisabled={selectedStudent?.age === 0 ? true : false}
          >
            <Icon as={AiOutlinePlus} color={"#fff"} />
            <Text color={"#fff"} fontWeight={"300"} fontSize={"md"}>
              Send Request Link
            </Text>
          </Button>
          <LinkRequestModal
            student={selectedStudent}
            isOpen={isModalOpen}
            onOpen={onModalOpen}
            onClose={onModalClose}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
export default SearchStudentModal