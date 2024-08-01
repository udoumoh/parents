"use client";
import { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  Box,
  Flex,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
} from "@chakra-ui/react";
import { HiOutlineHome } from "react-icons/hi";
import {
  IoReceiptOutline,
  IoReceipt,
  IoGridOutline,
  IoGrid,
  IoFolderOutline,
  IoFolder,
} from "react-icons/io5";
import { BiChevronRight } from "react-icons/bi";
import { IconType } from "react-icons";
import LinkedStudentsPopover from "@/components/shared/linkedStudentsPopover";

interface NavItemProps extends FlexProps {
  icon: IconType;
  link: string;
  children: React.ReactNode;
}

interface LinkItemProps {
  name: string;
  iconLight: IconType;
  iconFill: IconType;
  url: string;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface SidebarWithHeader {
  children: React.ReactNode;
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
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { onOpen: onPopoverOpen, onClose: onPopoverClose, isOpen: isPopoverOpen } = useDisclosure();
  const pathName = usePathname();
  return (
    <Box
      transition="3s ease"
      borderRight="1px solid #C2C2C2"
      w={{ base: "full", md: "16rem" }}
      pos="fixed"
      h="full"
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
          <LinkedStudentsPopover onClose={onClose} isPopoverOpen={isPopoverOpen} onPopoverClose={onPopoverClose} onPopoverOpen={onPopoverOpen}/>
        {LinkItems.map((item, index) => {
          return (
            <NavItem
              key={index}
              icon={pathName === item.url ? item.iconFill : item.iconLight}
              link={item.url}
              bg={pathName === item.url ? "#005D5D" : ""}
            >
              {item.name}
            </NavItem>
          );
        })}
      </Box>
    </Box>
  );
};

const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
  const router = useRouter()
  const pathName = usePathname();
  return (
    <Box
      as="a"
      onClick={() => router.push(link)}
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
          bg: pathName === link ? "" : "#005D5D29",
          color: pathName === link ? "#fff" : "#979797",
          transition: "0.5s",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            color={pathName === link ? "#FFF" : "#979797"}
            fontSize="20"
            _groupHover={{
              color: pathName === link ? "#fff" : "#979797",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const SidebarWithHeader: FC<SidebarWithHeader> = ({ children }) => {
  const [profileData] = useState({
    name: "",
    numberOfChildren: 1,
  });
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [active, setActive] = useState("");
  const pathName = usePathname();

  useEffect(() => {
    if (pathName.includes("/results")) {
      setActive("results");
    } else {
      setActive("overview");
    }
  }, [pathName]);

  return (
    <>
        <Box minH="100vh" bg={"#fff"}>
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
          <Box ml={{ base: 0, md: 64 }} p="4" h={"100vh"} overflowY={'auto'} >
            {/* Content */}
            <Box>
              <Breadcrumb
                mb={"1rem"}
                spacing="4px"
                separator={<BiChevronRight color="gray.500" />}
              >
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/"
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
                  <BreadcrumbLink
                    href={"/"}
                    fontSize={"sm"}
                    fontWeight={"bold"}
                    color={"#005D5D"}
                  >
                    {active}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Box>
            {children}
          </Box>
        </Box>
    </>
  );
};

export default SidebarWithHeader;
