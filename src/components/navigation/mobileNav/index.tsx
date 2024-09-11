'use client'
import { FC } from 'react'
import { Box, Text, Icon, Flex} from '@chakra-ui/react'
import { IconType } from 'react-icons';
import {
  IoReceiptOutline,
  IoReceipt,
  IoGridOutline,
  IoGrid,
  IoFolderOutline,
  IoFolder,
  IoCompassOutline,
  IoCompass,
} from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { PiChatsTeardrop, PiChatsTeardropFill } from "react-icons/pi";
import {
  AiOutlineSetting,
} from "react-icons/ai";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface LinkItemProps {
  name: string;
  iconLight: IconType;
  iconFill: IconType;
  url: string;
}

interface BottomNavProps {
  
}

const LinkItems: Array<LinkItemProps> = [
  {
    name: "Home",
    iconLight: IoGridOutline,
    iconFill: IoGrid,
    url: "/dashboard/home/overview",
  },
  {
    name: "Results",
    iconLight: IoFolderOutline,
    iconFill: IoFolder,
    url: "/dashboard/home/results",
  },
  {
    name: "Invoice",
    iconLight: IoReceiptOutline,
    iconFill: IoReceipt,
    url: "/dashboard/home/invoice",
  },
  {
    name: "Discover",
    iconLight: IoCompassOutline,
    iconFill: IoCompass,
    url: "/dashboard/discover",
  },
  {
    name: "Inbox",
    iconLight: PiChatsTeardrop,
    iconFill: PiChatsTeardropFill,
    url: "/dashboard/inbox",
  },
];

const BottomNav: FC<BottomNavProps> = ({}) => {
    const pathName = usePathname()
    const router = useRouter()
  return (
    <Box
      border={'1px solid #007C7B'}
      display={{ base: "block", md: "none" }}
      position={"fixed"}
      bottom="5"
      left="0"
      right="0"
      bg={pathName.includes("clips") ? "#000000" : "#ffffff80"}
      boxShadow="xl"
      zIndex="1000"
      height={"8vh"}
      borderTopWidth={pathName.includes("clips") ? "0.5px" : "0px"}
      borderTopColor={"gray.600"}
      borderRadius={'full'}
      mx={'0.7rem'}
      backdropFilter={'blur(10px)'}
    >
      <Flex justify={"space-around"} alignItems={"center"} h={"full"}>
        {LinkItems.map((item, index) => (
          <Flex
            key={index}
            _hover={{
              cursor: "pointer",
            }}
            onClick={() => router.push(item?.url)}
            alignItems={"center"}
            flexDir={"column"}
          >
            <Icon
              as={pathName.includes(item.url) ? item.iconFill : item.iconLight}
              color={
                pathName.includes("clips")
                  ? "white"
                  : pathName.includes(item.url)
                  ? "#000"
                  : "gray.600"
              }
              boxSize={5}
              _hover={{
                transform: "scale(1.1)",
                transition: "0.5s",
              }}
            />
            <Text
              color={
                pathName.includes("clips")
                  ? "white"
                  : pathName.includes(item.url)
                  ? "#000"
                  : "gray.600"
              }
              fontSize={"2xs"}
            >
              {item?.name}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
}

export default BottomNav