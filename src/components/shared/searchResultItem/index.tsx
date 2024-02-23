'use client'
import {
  Box,
  Text,
  Avatar,
  Icon,
} from "@chakra-ui/react";

interface SearchResultItemProps {
  student: {
    name: string;
    profileImageUrl: string;
    gender: string;
    className: string;
    age: number;
  };
}

const SearchResultItem = ({ student}: SearchResultItemProps) => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      gap={3}
      w={"auto"}
      rounded={"md"}
      py={"0.5rem"}
      px={"1rem"}
      mb={"0.4rem"}
      _hover={{
        backgroundColor: "#3F999830",
        cursor: "pointer",
      }}
    >
      <Avatar
        size={"md"}
        src={student.profileImageUrl}
        pointerEvents={"none"}
      />
      <Box lineHeight={"20px"}>
        <Text fontWeight={"700"} fontSize={"lg"}>
          {`${student.name}`}
        </Text>
        <Text fontSize={"sm"} color={"#AAAAAA"} fontWeight={"600"}>
          {student.gender} • {student.age} • {student.className}
        </Text>
      </Box>
    </Box>
  );
};

export default SearchResultItem
