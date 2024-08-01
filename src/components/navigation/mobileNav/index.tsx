'use client'
import { FC } from 'react'
import { Box, Text, Icon, Flex, IconButton } from '@chakra-ui/react'
import { IconType } from 'react-icons';
import { MdHome } from "react-icons/md";
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
    name: "Overview",
    iconLight: IoGridOutline,
    iconFill: IoGrid,
    url: "/dashboard/home/overview",
  },
  {
    name: "Academic Results",
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
  {
    name: "Settings",
    iconLight: AiOutlineSetting,
    iconFill: IoMdSettings,
    url: "/dashboard/settings",
  },
];

const BottomNav: FC<BottomNavProps> = ({}) => {
    const pathName = usePathname()
    const router = useRouter()
  return (
    <Box
      display={{ base: "block", md: "none" }}
      position={"fixed"}
      bottom="0"
      left="0"
      right="0"
      bg="white"
      boxShadow="0 -2px 5px rgba(0,0,0,0.1)"
      zIndex="1000"
    >
      <Flex justify={"space-around"} align={"center"} py={"0.8rem"}>
        {LinkItems.map((item, index) => (
          <Box
            as="a"
            key={index}
            _hover={{
              cursor: "pointer",
            }}
            onClick={() => router.push(item?.url)}
          >
            <Icon
              as={pathName.includes(item.url) ? item.iconFill : item.iconLight}
              color={"green.900"}
              boxSize={6}
              _hover={{
                transform: "scale(1.1)",
                transition: "0.5s",
              }}
            />
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

export default BottomNav