"use client";
import { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Box,
  Flex,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Image,
  Button,
  Grid,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { PiChatsTeardrop } from "react-icons/pi";
import { CiGrid41 } from "react-icons/ci";
import {
  AiOutlineSearch,
  AiOutlinePlus,
  AiOutlineHome,
  AiOutlineSetting,
} from "react-icons/ai";
import { IconType } from "react-icons";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  link: string;
}

interface LinkItemProps {
  name: string;
  icon: IconType;
  url: string;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface MainNav {
  children: React.ReactNode;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: AiOutlineHome, url: "/dashboard/overview" },
  { name: "Inbox", icon: PiChatsTeardrop, url: "/inbox" },
  { name: "Search", icon: IoIosSearch, url: "/search" },
  { name: "Settings", icon: AiOutlineSetting, url: "/settings" },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    const pathName = usePathname()

  return (
    <Box
      bg={"#005E5D"}
      borderRight="1px"
      borderRightColor={"gray.300"}
      w={{ base: "full", md: "4.1rem" }}
      pos="fixed"
      h="100vh"
      py={5}
      display={{ base: "none" }}
      overflowY={'auto'}
      {...rest}
    >
      <Box
        h="100%"
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        <Box justifyContent={"center"} alignItems={"center"} display={"flex"}>
          <Image
            src={"/images/greylight.png"}
            width={"3rem"}
            height={"3rem"}
            alt="logolight"
            pointerEvents={"none"}
          />
        </Box>
        <Grid justifyContent={"center"} gap={4}>
          {
            LinkItems.map((item, index) => {
                return (
                  <NavItem
                    key={index}
                    icon={item.icon}
                    link={item.url}
                    backgroundColor={
                      pathName.includes(item.url) ? "#114E4D" : "transparent"
                    }
                  />
                );
            })
          }
        </Grid>
        <Box justifyContent={"center"} display={"flex"} alignItems={"center"}>
          <Image
            src="/images/profile.png"
            width={"3rem"}
            height={"3rem"}
            alt="profile"
            pointerEvents={"none"}
          />
        </Box>
      </Box>
    </Box>
  );
};

const NavItem = ({ icon, link, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href={`${link}`}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      display={'flex'}
      justifyContent={'center'}
    >
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        fontSize="md"
        color={'#fff'}
        py={"2"}
        px={"2"}
        rounded={"md"}
        role="group"
        cursor="pointer"
        _hover={{
          bg: "#114E4A",
          transitionDuration: "0.5s",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            color={'#fff'}
            fontSize="23"
            _groupHover={{
              color: "#fff",
            }}
            as={icon}
          />
        )}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 16 }}
      px={{ base: 4, md: 4 }}
      height="16"
      alignItems="center"
      bg={"#fff"}
      borderBottomWidth="1px"
      borderBottomColor={"gray.300"}
      justifyContent={"space-between"}
      {...rest}
    >
      <IconButton
        color={"#000"}
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <InputGroup w={"30%"}>
        <InputLeftElement pointerEvents="none">
          <AiOutlineSearch color="gray.300" />
        </InputLeftElement>
        <Input
          type="tel"
          placeholder="Search"
          pl={10}
          borderColor={"gray.400"}
        />
      </InputGroup>

      <Button
        backgroundColor={"#005D5D"}
        color={"#fff"}
        _hover={{ backgroundColor: "#03594A" }}
      >
        <AiOutlinePlus />
        <Text fontWeight={"light"} pl="0.5rem">
          Link your Child
        </Text>
      </Button>
    </Flex>
  );
};

const MainNav: FC<MainNav> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pathName = usePathname();

  return (
    <Box minH="100vh" bg={"#fff"} w={'full'} pos={'fixed'}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: "4.1rem" }}>
        {/* Content */}
        {children}
      </Box>
    </Box>
  );
};

export default MainNav;
