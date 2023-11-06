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
  Input,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  CloseButton
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

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface SidebarWithHeader {
  children: React.ReactNode;
}

const SecondSidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const [active, setActive] = useState("")
  const pathName = usePathname()
  const router = useRouter()

  useEffect(() => {
    if(pathName.includes("/results")){
      setActive('results')
    } else if(pathName.includes("/graycases")){
      setActive('graycases')
    } else {
      setActive("dashboard")
    }
  }, [pathName])
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
          <Box>
          <Image
            src="/images/profileImg.jpeg"
            width={{base:"2rem", md: "40px" }}
            height={{base:"2rem", md: "40px" }}
            borderRadius={"50%"}
            alt="profile"
            pointerEvents={'none'}
          ></Image>
          <Box lineHeight={"20px"}>
            <Text fontWeight={"600"}>Chibuzor Ali-Williams</Text>
            <Text fontSize={"12px"} color={"#AAAAAA"}>
              GN24002
            </Text>
          </Box>
          </Box>
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Box>

        <Box
          as="button"
          color={active === 'dashboard' ? "#fff" : '#979797'}
          textAlign={"start"}
          alignItems={"center"}
          display={"flex"}
          p={"10px"}
          gap={3}
          backgroundColor={active === 'dashboard' ? "#005D5D" : ""}
          rounded={'md'}
          _hover={{
            backgroundColor: `${active === 'dashboard' ? "#005D5D" : "#B4B4B3"}`,
            color: "#fff",
            borderRadius: "5px",
            transitionDuration:'0.5s'
          }}
          onClick={() => router.push('/')}
        >
          <BsGrid size={"20"} />
          <Text>Dashboard</Text>
        </Box>
        <Box
          as="button"
          color={active === 'results' ? "#fff" : '#979797'}
          textAlign={"start"}
          alignItems={"center"}
          display={"flex"}
          p={"10px"}
          gap={3}
          rounded={'md'}
          backgroundColor={active === 'results' ? "#005D5D" : ""}
          _hover={{
            backgroundColor: `${active === 'results' ? "#005D5D" : "#B4B4B3"}`,
            color: "#fff",
            borderRadius: "5px",
            transitionDuration:'0.5s'
          }}
          onClick={() => router.push('results')}
        >
          <AiOutlineFile size={"20"} />
          <Text>Results</Text>
        </Box>
        <Box
          as="button"
          color={active === 'gra  ycases' ? "#fff" : '#979797'}
          textAlign={"start"}
          alignItems={"center"}
          display={"flex"}
          p={"10px"}
          gap={3}
          rounded={'md'}
          backgroundColor={active === 'greycases' ? "#005D5D" : ""}
          _hover={{
            backgroundColor: `${active === 'greycases' ? "#005D5D" : "#B4B4B3"}`,
            color: "#fff",
            borderRadius: "5px",
            transitionDuration:'0.5s'
          }}
          onClick={() => router.push('greycases')}
        >
          <RiContactsBookLine size={"20"} />
          <Text>Greycases</Text>
        </Box>
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
        color={'#000'}
        display={{ base: 'flex', md: 'none' }}
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

      <Button backgroundColor={"#005D5D"} color={"#fff"}>
        <AiOutlinePlus />
        <Text fontWeight={"light"} pl="2px">
          Register Child
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
    } else if(pathName.includes('/greycases')){
      setActive('greycases')
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
