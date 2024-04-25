'use client'
import { FC, useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Flex,
  Box,
  Input,
  Divider,
  Icon,
  Select,
} from "@chakra-ui/react";
import { IoFilterOutline } from "react-icons/io5";
import { states, LGAs } from '../utils/data';
import { useUserLikesAPI } from '@/hooks/UserLikesContext';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;  
}

const FilterModal: FC<FilterModalProps> = ({isOpen, onClose}) => {
    const { handleFilterChange, filterParams, applyFilters, setFilterParams } =
    useUserLikesAPI();

    const handleReset = () => {
        const defaultParams = {
          type: "",
          schoolType: "",
          genderType: "",
          schoolSize: "",
          state: "",
          lga: "",
          address: "",
          priceRange: "",
        };
        setFilterParams(defaultParams)
        applyFilters()
    }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "xs", sm: "sm", md: "xl", lg: "2xl" }}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex alignItems={"center"} gap={3}>
            <Icon as={IoFilterOutline} boxSize={5} color={"#005D5D"} />
            <Text fontSize={"md"}>Filter posts</Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <Flex flexDir={"column"} gap={4} py={"1rem"} px={"0.5rem"}>
            <Box>
              <Text color={"#005D5D"} fontWeight={"semibold"} fontSize={"lg"}>
                Select filter criteria
              </Text>
            </Box>

            <Flex gap={5} justifyContent={"space-between"}>
              <Box display={"flex"} flexDir={"column"} gap={2} w={"full"}>
                <Text fontWeight={"semibold"}>Type</Text>
                <Select
                  placeholder={"Select Type"}
                  value={filterParams?.type}
                  focusBorderColor="green.500"
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </Select>
              </Box>

              <Box display={"flex"} flexDir={"column"} gap={2} w={"full"}>
                <Text fontWeight={"semibold"}>School Type</Text>
                <Select
                  placeholder={"Select School Type"}
                  value={filterParams?.schoolType}
                  focusBorderColor="green.500"
                  onChange={(e) =>
                    handleFilterChange("schoolType", e.target.value)
                  }
                >
                  <option value="day">Day</option>
                  <option value="boarding">Boarding</option>
                  <option value="mixed">Mixed</option>
                </Select>
              </Box>
            </Flex>

            <Flex
              gap={5}
              justifyContent={"space-between"}
              flexDir={{ base: "column", sm: "row" }}
            >
              <Box display={"flex"} flexDir={"column"} gap={2} w={"full"}>
                <Text fontWeight={"semibold"}>Gender Type</Text>
                <Select
                  placeholder={"Select Gender Type"}
                  value={filterParams?.genderType}
                  focusBorderColor="green.500"
                  onChange={(e) =>
                    handleFilterChange("genderType", e.target.value)
                  }
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="mixed-genders">Mixed-Genders</option>
                </Select>
              </Box>

              <Box display={"flex"} flexDir={"column"} gap={2} w={"full"}>
                <Text fontWeight={"semibold"}>School Size</Text>
                <Input
                  placeholder={"Enter School Size"}
                  value={filterParams?.schoolSize}
                  type="number"
                  focusBorderColor="green.500"
                  onChange={(e) =>
                    handleFilterChange("schoolSize", e.target.value)
                  }
                />
              </Box>
            </Flex>

            <Flex gap={5} justifyContent={"space-between"}>
              <Box display={"flex"} flexDir={"column"} gap={2} w={"full"}>
                <Text fontWeight={"semibold"}>State</Text>
                <Select
                  placeholder={"Select State"}
                  focusBorderColor="green.500"
                  value={filterParams?.state}
                  onChange={(e) => handleFilterChange("state", e.target.value)}
                >
                  {states?.map((state, index) => (
                    <option value={state} key={index}>{state}</option>
                  ))}
                </Select>
              </Box>

              <Box display={"flex"} flexDir={"column"} gap={2} w={"full"}>
                <Text fontWeight={"semibold"}>LGA</Text>
                <Select
                  placeholder={"Select Lga"}
                  focusBorderColor="green.500"
                  value={filterParams?.lga}
                  onChange={(e) => handleFilterChange("lga", e.target.value)}
                >
                  {LGAs[filterParams.state]?.map((lga, index) => (
                    <option value={lga} key={index}>{lga}</option>
                  ))}
                </Select>
              </Box>
            </Flex>

            <Flex
              gap={5}
              justifyContent={"space-between"}
              flexDir={{ base: "column", sm: "row" }}
            >
              <Box display={"flex"} flexDir={"column"} gap={2} w={"full"}>
                <Text fontWeight={"semibold"}>Address</Text>
                <Input
                  placeholder={"Enter Address"}
                  type="text"
                  focusBorderColor="green.500"
                  value={filterParams?.address}
                  onChange={(e) =>
                    handleFilterChange("address", e.target.value)
                  }
                />
              </Box>

              <Box display={"flex"} flexDir={"column"} gap={2} w={"full"}>
                <Text fontWeight={"semibold"}>Price Range</Text>
                <Input
                  placeholder={"Enter Price Range"}
                  type="number"
                  focusBorderColor="green.500"
                  value={filterParams?.priceRange}
                  onChange={(e) =>
                    handleFilterChange("priceRange", e.target.value)
                  }
                />
              </Box>
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={handleReset}>
            Clear filters
          </Button>
          <Button colorScheme="teal" onClick={applyFilters}>
            Filter schools
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default FilterModal