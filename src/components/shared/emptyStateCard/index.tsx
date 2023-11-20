import { FC } from "react";
import { Card, Box, Image, Text } from "@chakra-ui/react";

interface EmptyStateCardProps {

}

const EmptyStateCard: FC<EmptyStateCardProps> = ({ }) => {
  return (
    <Card
      border={"1px solid #C2C2C2"}
      rounded={"xl"}
      w={"full"}
      p={10}
      my={{ base: "10px", md: "0" }}
      shadow={"none"}
    >
      <Box textAlign={"center"}>
        <Image
          src="/images/udcard.svg"
          alt="card"
          mx={"auto"}
          mb={"1.5rem"}
          pointerEvents={"none"}
        />
        <Text fontWeight={"600"}>You have no messages</Text>
        <Text fontWeight={"600"}>Send a message to see them here</Text>
      </Box>
    </Card>
  );
};

export default EmptyStateCard;
