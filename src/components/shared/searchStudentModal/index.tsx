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
} from "@chakra-ui/react";
import SearchResultItem from '../searchResultItem';
import { FaLink } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import {
  AiOutlinePlus,
} from "react-icons/ai";
import { gql, useQuery } from "@apollo/client";

interface SearchStudentModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const GET_STUDENTS = gql(`
query GetStudent {
  getStudent {
    id
    createdAt
    transferedAt
    firstName
    middleName
    lastName
    gender
    ageInput
    folder
    isOwing
    isVisible
    isDuplicate
    startDate
    endDate
    birthDate
    isArchived
    profileImgUrl
    classroom {
      errors {
        field
        message
      }
      classroom {
        id
        isValid
        wasEdited
        createdAt
        updatedAt
        classId
        className
        description
        isDisabled
        students {
          id
          createdAt
          transferedAt
          firstName
          middleName
          lastName
          gender
          ageInput
          folder
          isOwing
          isVisible
          isDuplicate
          startDate
          endDate
          birthDate
          isArchived
          profileImgUrl
          grayId
          fatherName
          fatherEmail
          fatherNumber
          motherName
          motherEmail
          motherNumber
          homeAddress
          lgaOrigin
          state
        }
      }
    }
    school {
      school {
        id
        createdAt
        isDisabled
        isVerified
        schoolName
        rcnumber
        address
        type
        lgarea
        folder
        state
        country
        description
        phonenumber
        email
        websiteUrl
        instagramUrl
        facebookUrl
        twitterUrl
        linkedinUrl
        logoImgUrl
        bannerImgUrl
        license
      }
    }
    creator {
      admin {
        id
        isPaid
        userId
        folder
        status
        plan
        isReferred
        isDisabled
        agreedTo
        referralCode
        createdAt
        firstName
        middleName
        lastName
        phoneNumber
        email
        profileImgUrl
        role
        school
        schoolImg
        statusCode
      }
    }
    studentCase {
      grayCase {
        id
        createdAt
        updatedAt
        category
        owingAmount
        note
        isActive
        wasEdited
      }
    }
    grayId
    fatherName
    fatherEmail
    fatherNumber
    motherName
    motherEmail
    motherNumber
    homeAddress
    lgaOrigin
    state
  }
}`);

const SearchStudentModal: FC<SearchStudentModalProps> = ({isOpen, onOpen, onClose}) => {
    const [searchInput, setSearchInput] = useState("");
    const [studentData, setStudentData] = useState([{
      name: "",
      age: 0,
      className: "",
      gender: "",
      profileImageUrl:
        "",
    }])
    const {data:search} = useQuery(GET_STUDENTS)
    const handleSearchChange = (e: any) => {
    setSearchInput(e.target.value);
  };

  useEffect( () => {
    const fetchData = async () => {
      try {
        const response = await search?.getStudent || [];
        const data = response.map((student: any) => ({
          name: student.firstName + " " + student.lastName,
          age: student.ageInput,
          className: student.classroom.classroom.className,
          gender: student.gender,
          profileImageUrl: student.profileImgUrl,
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
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
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
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              mt={"1rem"}
            >
              {filteredSearchData.length == 0 ? (
                <Text textAlign={"center"} fontSize={"lg"} color={"#484848"}>
                  No results match your search criteria
                </Text>
              ) : (
                filteredSearchData?.map((item, index) => (
                  <SearchResultItem student={item} key={index} />
                ))
              )}
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
          >
            <Icon as={AiOutlinePlus} color={"#fff"} />
            <Text color={"#fff"} fontWeight={"300"} fontSize={"md"}>
              Send Request Link
            </Text>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
export default SearchStudentModal