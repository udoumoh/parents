"use client";
import { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {useRouter} from "next/navigation";
import {
  IconButton,
  Box,
  Flex,
  useColorModeValue,
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
  Avatar,
  Input,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  CloseButton,
  Icon,
} from "@chakra-ui/react";
import {
  FiMenu,
} from 'react-icons/fi'
import { HiOutlineHome } from "react-icons/hi";
import {IoIosSearch} from 'react-icons/io'
import { PiChatsTeardropLight } from 'react-icons/pi'
import {CiGrid41} from 'react-icons/ci'
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { BsGrid } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { AiOutlineFile } from "react-icons/ai";
import { RiContactsBookLine } from "react-icons/ri";
import { BiChevronRight } from 'react-icons/bi';
import { IconType } from 'react-icons'

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  link: string;
  children: React.ReactNode;
}

interface LinkItemProps {
  name: string;
  icon: IconType;
  url: string;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface SidebarWithHeader {
  children: React.ReactNode;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: BsGrid, url: "/dashboard" },
  { name: "Results", icon: AiOutlineFile, url: "/results" },
  { name: "Graycases", icon: RiContactsBookLine, url: "/graycases" },
];

const SecondSidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const pathName = usePathname()
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: "16rem" }}
      pos="fixed"
      h="full"
      ml={{md:"4.1rem"}}
      {...rest}
    >
      <Box
        py={5}
        display={"flex"}
        flexDirection={"column"}
        justifyItems={"center"}
        mx={"0.5rem"}
        gap={2}
      >
        <Box display={"flex"} gap={2} mb={10} justifyContent={'space-between'}>
          <Box display={'flex'} alignItems={'center'} gap={2}>
          <Avatar size={"md"} src={"/images/profileImg.jpeg"} pointerEvents={"none"}/>
          <Box lineHeight={"20px"}>
            <Text fontWeight={"600"}>Chibuzor Ali-Williams</Text>
            <Text fontSize={"12px"} color={"#AAAAAA"}>
              GN24002
            </Text>
          </Box>
          </Box>
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Box>
        {
          LinkItems.map((item, index) => {
            return (
              <NavItem
                key={index}
                icon={item.icon}
                link={item.url}
                bg={pathName === `/${item.name.toLowerCase()}` ? "#005D5D" : ""}
              >
                {item.name}
              </NavItem>
            );
          })
        }
      </Box>
    </Box>
  );
};

const FirstSidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={"#005E5D"}
      borderRight="1px"
      borderRightColor={"gray.300"}
      w={{ base: "full", md: "4.1rem" }}
      pos="fixed"
      h="100%"
      py={5}
      display={{base:'none'}}
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
            pointerEvents={'none'}  
          />
        </Box>
        <Grid justifyContent={"center"} gap={5}>
          <Button bg={"none"} _hover={{ background: "#114E4A" }} py={5} background={'#114E4A'}>
            <CiGrid41
              size={"23"}
              color={"#fff"}
              focus={{ backgroundColor: "#114E4D" }}
            />
          </Button>
          <Button bg={"none"} _hover={{ background: "#114E4E" }} py={5}>
            <PiChatsTeardropLight size={"20"} color={"#fff"} />
          </Button>
          <Button bg={"none"} _hover={{ background: "#114E4E" }} py={5}>
            <IoIosSearch size={"20"} color={"#fff"} />
          </Button>
          <Button bg={"none"} _hover={{ background: "#114E4E" }} py={5}>
            <AiOutlineSetting size={"20"} color={"#fff"} />
          </Button>
        </Grid>
        <Box justifyContent={"center"} display={"flex"} alignItems={"center"}>
          <Image
            src="/images/profile.png"
            width={"3rem"}
            height={"3rem"}
            alt="profile"
            pointerEvents={'none'}
          />
        </Box>
      </Box>
    </Box>
  );
};

const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
  const pathName = usePathname()
  return (
    <Box
      as="a"
      href={`${link}`}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        fontSize="md"
        color={pathName === link ? "#FFF" : "#979797"}
        py={"2"}
        px={"2"}
        rounded={"md"}
        role="group"
        cursor="pointer"
        _hover={{
          bg: "#B4B4B3",
          color: "#fff",
          transitionDuration: "0.5s",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            color={pathName === link ? "#FFF" : "#979797"}
            fontSize="20"
            _groupHover={{
              color: "#fff",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: "20rem" }}
      px={{ base: 4, md: 4 }}
      height="20"
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

const SidebarWithHeader: FC<SidebarWithHeader> = ({children}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
   const [active, setActive] = useState("")
  const pathName = usePathname()

  useEffect(() => {
    if(pathName.includes('/results')){
      setActive('results')
    } else if(pathName.includes('/graycases')){
      setActive('graycases')
    } else {
      setActive('Dashboard')
    }
  }, [pathName])

  return (
    <Box minH="100vh" bg={"#fff"}>
      <FirstSidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <SecondSidebarContent
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
          <FirstSidebarContent onClose={onClose} />
          <SecondSidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 80 }} p="4">
        {/* Content */}
        <Breadcrumb
        px={"1rem"}
        mb={'1rem'}
        spacing="4px"
        separator={<BiChevronRight color="gray.500" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink
            href="#"
            fontSize={"sm"}
            fontWeight={"600"}
            display={"flex"}
            alignItems={"center"}
          >
            <HiOutlineHome />
            <Text ml={"5px"}>Home</Text>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href={'/'} fontSize={"sm"} fontWeight={"bold"} color={'#005D5D'}>
            {active}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
        {children}
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
