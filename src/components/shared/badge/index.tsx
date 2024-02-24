import { FC } from "react";
import { Box, Icon, Text } from "@chakra-ui/react";
import { BsDashCircle, BsCheckCircle } from "react-icons/bs";

interface SecondaryBadgeProps {}

interface PrimaryBadgeProps {}

export const SecondaryBadge: FC<SecondaryBadgeProps> = ({}) => {
  return (
    <>
      <Box
        display={{ base: "none", xl: "flex" }}
        alignItems={"center"}
        backgroundColor={"#E6E6E6"}
        h={"full"}
        rounded={"full"}
        px={"0.5rem"}
        py={"0.4rem"}
        gap={1}
      >
        <Icon
          as={BsDashCircle}
          backgroundColor={"#747474"}
          color={"#fff"}
          rounded={"full"}
        />
        <Text fontSize={"xs"} color={"#747474"} fontWeight={"600"}>
          Absent
        </Text>
      </Box>

      <Box
        display={{ base: "flex", xl: "none" }}
        alignItems={"center"}
        backgroundColor={"#E6E6E6"}
        h={"full"}
        rounded={"full"}
        px={"0.5rem"}
        py={"0.4rem"}
        gap={1}
      >
        <Icon
          as={BsDashCircle}
          backgroundColor={"#747474"}
          color={"#fff"}
          rounded={"full"}
        />
      </Box>
    </>
  );
};

export const PrimaryBadge: FC<PrimaryBadgeProps> = ({}) => {
  return (
    <>
      <Box
        display={{ base: "none", xl: "flex" }}
        alignItems={"center"}
        backgroundColor={"#C4FBDD"}
        h={"full"}
        rounded={"full"}
        px={"0.5rem"}
        py={"0.4rem"}
        gap={1}
      >
        <Icon
          as={BsCheckCircle}
          backgroundColor={"#00863E"}
          color={"#fff"}
          rounded={"full"}
        />
        <Text fontSize={"xs"} color={"#00863E"} fontWeight={"600"}>
          Present
        </Text>
      </Box>

      <Box
        display={{ base: "flex", xl: "none" }}
        alignItems={"center"}
        backgroundColor={"#C4FBDD"}
        h={"full"}
        rounded={"full"}
        px={"0.5rem"}
        py={"0.4rem"}
        gap={1}
      >
        <Icon
          as={BsCheckCircle}
          backgroundColor={"#00863E"}
          color={"#fff"}
          rounded={"full"}
        />
      </Box>
    </>
  );
};

// export default index;
