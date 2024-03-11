import { FC } from "react";
import { Box } from "@chakra-ui/react";
import ChatBox from "./component/ChatBox";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <Box w={"full"} h={"full"} display={"flex"}>
      <ChatBox />
    </Box>
  );
};

export default page;
