import { FC } from "react";
import { Box } from "@chakra-ui/react";
import EmptyInboxCard from "@/components/shared/emptyInboxCard";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <Box w={"full"} h={"full"} display={"flex"}>
      <EmptyInboxCard />
    </Box>
  );
};

export default page;
