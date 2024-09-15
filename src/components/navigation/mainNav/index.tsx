"use client";
import { FC, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
  Icon,
  IconButton,
  Tooltip,
  DrawerFooter,
  DrawerBody,
  DrawerHeader,
  Divider,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useToast,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  AvatarBadge,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";
import { RiMailOpenFill } from "react-icons/ri";
import { PiChatsTeardrop, PiChatsTeardropFill } from "react-icons/pi";
import { GoHome, GoHomeFill } from "react-icons/go";
import { RiArrowRightSLine } from "react-icons/ri";
import { AiOutlinePlus, AiOutlineSetting } from "react-icons/ai";
import { MdArrowDropDown, MdMovieFilter, MdOutlineMovieFilter } from "react-icons/md";
import {
  IoClose,
  IoHelpCircleOutline,
  IoLogOut,
  IoReceiptOutline,
  IoReceipt,
  IoGridOutline,
  IoGrid,
  IoFolderOutline,
  IoFolder,
  IoCompassOutline,
  IoCompass,
  IoAdd,
  IoStorefrontOutline,
  IoStorefront,
} from "react-icons/io5";
import { IconType } from "react-icons";
import { useUserAPI } from "@/hooks/UserContext";
import SearchStudentModal from "@/components/shared/searchStudentModal";
import { LOGOUT_PARENTS } from "@/gql/mutations";
import { useMutation, useQuery } from "@apollo/client";
import Lottie from "react-lottie";
import animationData from "../../../../public/lotties/noNotifications.json";
import { GET_NOTIFICATIONS } from "@/gql/queries";
import { formatDateWithSuffix } from "@/helpers/formatDate";
import { GoAlertFill } from "react-icons/go";
import { PiHeart, PiShoppingCart, PiBell } from "react-icons/pi";
import LinkedStudentsPopover from "@/components/shared/linkedStudentsPopover";

interface MobileProps extends FlexProps {
  onOpen: () => void;
  onClose: () => void;
}

interface Notifications {
  action: string;
  createdAt: string;
  id: number;
  isSeen: boolean;
  message: string;
  ref: string;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  link: string;
  name: string;
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

interface MainNav {
  children: React.ReactNode;
}

const LinkItems: Array<LinkItemProps> = [
  {
    name: "Inbox",
    iconLight: PiChatsTeardrop,
    iconFill: PiChatsTeardropFill,
    url: "/dashboard/inbox",
  },
  {
    name: "Discover",
    iconLight: IoCompassOutline,
    iconFill: IoCompass,
    url: "/dashboard/discover",
  },
  {
    name: "Clips",
    iconLight: MdOutlineMovieFilter,
    iconFill: MdMovieFilter,
    url: "/dashboard/clips",
  },
  {
    name: "Settings",
    iconLight: AiOutlineSetting,
    iconFill: IoMdSettings,
    url: "/dashboard/settings",
  },
];

const DrawerNavLinkItems = {
  HomeSubLinks: [
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
  ],
  NavLinks: [
    {
      name: "Discover",
      iconLight: IoCompassOutline,
      iconFill: IoCompass,
      url: "dashboard/discover",
    },
    {
      name: "Inbox",
      iconLight: PiChatsTeardrop,
      iconFill: PiChatsTeardropFill,
      url: "dashboard/inbox",
    },
    {
      name: "Clips",
      iconLight: MdOutlineMovieFilter,
      iconFill: MdMovieFilter,
      url: "dashboard/clips",
    },
    {
      name: "Settings",
      iconLight: AiOutlineSetting,
      iconFill: IoMdSettings,
      url: "dashboard/settings",
    },
  ],
};

const options = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const pathName = usePathname();
  const { parentData } = useUserAPI();

  return (
    <Box
      bg={"#005D5D"}
      borderRight="1px"
      borderRightColor={"gray.300"}
      w={{ base: "full", md: "4.1rem" }}
      pos="fixed"
      h="100vh"
      py={5}
      display={{ base: "none" }}
      overflowY={"auto"}
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
            src={"/images/greylight.svg"}
            width={"2.5rem"}
            height={"2.5rem"}
            alt="logolight"
            pointerEvents={"none"}
          />
        </Box>
        <Grid justifyContent={"center"} gap={4}>
          <NavItem
            icon={pathName.includes('dashboard/home') ? GoHomeFill : GoHome}
            link={
              (parentData?.children ?? []).length > 0
                ? "/dashboard/home/overview"
                : "/dashboard"
            }
            backgroundColor={
              pathName.includes('/dashboard/home') ? "#144646" : "transparent"
            }
            name={"Dashboard"}
          />
          {LinkItems.map((item, index) => {
            return (
              <NavItem
                key={index}
                icon={pathName === item.url ? item.iconFill : item.iconLight}
                link={item.url}
                backgroundColor={
                  pathName === item.url ? "#144646" : "transparent"
                }
                name={item.name}
              />
            );
          })}
        </Grid>
        <Box
          justifyContent={"center"}
          display={"flex"}
          alignItems={"center"}
        ></Box>
      </Box>
    </Box>
  );
};

const NavItem = ({ icon, link, name, ...rest }: NavItemProps) => {
  const router = useRouter();
  return (
    <Tooltip
      hasArrow
      bg={"#144646"}
      rounded={"md"}
      py={"0.3rem"}
      transition={"0.3s"}
      px={"1rem"}
      label={name}
      placement="right"
    >
      <Box
        as="a"
        w={"auto"}
        h={"auto"}
        onClick={() => {
          router.push(link);
        }}
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
        display={"flex"}
        justifyContent={"center"}
      >
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          fontSize="md"
          color={"#fff"}
          py={"3"}
          px={"3"}
          rounded={"md"}
          role="group"
          cursor="pointer"
          transition={"0.5s"}
          _hover={{
            bg: "#144646",
            transitionDuration: "0.5s",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              color={"#fff"}
              fontSize="23"
              transition={"0.5s"}
              _groupHover={{
                color: "#fff",
                transform: "scale(1.1)",
                transition: "0.5s",
              }}
              as={icon}
            />
          )}
        </Flex>
      </Box>
    </Tooltip>
  );
};

const MobileNav = ({ onOpen, onClose, ...rest }: MobileProps) => {
  const pathName = usePathname()
  const toast = useToast();
  const router = useRouter();
  const { profileData, parentData } = useUserAPI();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const {
    onOpen: onPopoverOpen,
    onClose: onPopoverClose,
    isOpen: isPopoverOpen,
  } = useDisclosure();
  const [logoutParent] = useMutation(LOGOUT_PARENTS);
  const { data: getnotifications, loading } = useQuery(GET_NOTIFICATIONS, {
    variables: { ref: "parent" },
    pollInterval: 5000,
  });
  const [notifications, setNotifications] = useState<Notifications[]>([]);

  const handleLogout = async () => {
    const response = await logoutParent();
    if (response.data.logoutParent) {
      toast({
        title: "Logout",
        description: "You have been successfully logged out",
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
        status: "info",
      });
      window.location.assign("/signin");
      localStorage.removeItem("currentId");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getnotifications;
        if (!response)
          console.log("Client error occurred while fetching notifications");
        if (response) {
          if (
            notifications.length > 0 &&
            response?.fetchMyNotifications?.length > notifications.length
          ) {
            toast({
              title: "You have a new notification 🔔",
              position: "top-right",
              variant: "left-accent",
              isClosable: true,
              status: "info",
            });
          }
          setNotifications((prevNotifications) =>
            response?.fetchMyNotifications?.slice(0, 5)
          );
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [getnotifications, toast]);

  return (
    <Flex
      ml={{ base: 0, md: 16 }}
      px={{ base: 4, md: 4 }}
      display={
        !pathName.includes("clips") ? "flex" : { base: "none", md: "flex" }
      }
      height="12"
      alignItems="center"
      bg={"#fff"}
      borderBottom={"1px solid"}
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

      {/* Display on every page other than marketplace */}
      <LinkedStudentsPopover
        onClose={onClose}
        isPopoverOpen={isPopoverOpen}
        onPopoverClose={onPopoverClose}
        onPopoverOpen={onPopoverOpen}
      />

      {/* display only on the marketplace page */}
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        gap={1}
        display={{
          base: "none",
          md: pathName.includes("marketplace") ? "flex" : "none",
        }}
      >
        <Icon as={IoStorefrontOutline} boxSize={5} color={"#007C7B"} />
        <Text fontSize={"sm"} fontWeight={"semibold"}>
          Greynote Marketplace
        </Text>
      </Flex>

      {/* Show on large screens */}
      <Flex
        as={motion.button}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.9 }}
        px={"1rem"}
        py={"0.3rem"}
        backgroundColor={"#C80036"}
        rounded={"3px"}
        alignItems={"center"}
        display={parentData?.isPaid ? "none" : { base: "none", md: "flex" }}
        gap={2}
      >
        <Icon as={GoAlertFill} color={"#fff"} />
        <Text color="#FFFFFF" fontSize={{ base: "2xs", md: "xs" }}>
          You are currently on the 14-day Trial Plan
        </Text>
      </Flex>

      {/* Show on mobile screens */}
      <Flex
        as={motion.button}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.9 }}
        px={"1rem"}
        py={"0.3rem"}
        backgroundColor={"#C80036"}
        rounded={"3px"}
        alignItems={"center"}
        display={parentData?.isPaid ? "none" : { base: "flex", md: "none" }}
      >
        <Text color="#FFFFFF" fontSize={{ base: "2xs", md: "sm" }}>
          Trial Plan
        </Text>
      </Flex>

      <Flex gap={{ base: 3, md: 4 }} alignItems={"center"}>
        <Flex gap={5} alignItems={"center"}>
          <Popover>
            <PopoverTrigger>
              <Flex
                alignItems={"center"}
                justifyContent={"center"}
                as={motion.button}
                whileHover={{
                  rotateZ: [0, -30, 30, -30, 30, -30, 30, 0],
                  transition: { duration: 0.8 },
                }}
              >
                <Icon
                  aria-label="notification"
                  as={PiBell}
                  boxSize={{ base: 4, md: 5 }}
                  _hover={{ color: "#005D5D" }}
                  rounded={"full"}
                  transition={"0.3s"}
                  color={"gray.600"}
                />
              </Flex>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Notifications</PopoverHeader>
              <PopoverBody p={1}>
                <Box>
                  {notifications?.length === 0 ? (
                    <Flex flexDir={"column"} alignItems={"center"} py={"1rem"}>
                      <Lottie
                        options={options}
                        height={"auto"}
                        width={"auto"}
                      />
                      <Text
                        textAlign={"center"}
                        color={"#00000070"}
                        fontSize={"sm"}
                        fontWeight={"bold"}
                      >
                        NO NOTIFICATIONS
                      </Text>
                      <Text
                        textAlign={"center"}
                        color={"#00000070"}
                        fontSize={"xs"}
                      >{`We'll notify you when there's something new`}</Text>
                    </Flex>
                  ) : (
                    notifications.map((notification, index) => {
                      return (
                        <Box
                          as={motion.div}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={"0.2s"}
                          key={index}
                          p={"0.4rem"}
                          _hover={{
                            backgroundColor: "#005D5D10",
                            cursor: "pointer",
                          }}
                        >
                          <Flex justifyContent={"space-between"} mb={"0.2rem"}>
                            <Text
                              fontSize={"xs"}
                              color={"#005D5D"}
                              fontWeight={"semibold"}
                            >
                              {notification?.action}
                            </Text>
                            <Text
                              fontSize={"xs"}
                              color={"#005D5D"}
                              fontWeight={"semibold"}
                            >
                              {formatDateWithSuffix(notification?.createdAt)}
                            </Text>
                          </Flex>
                          <Text fontSize={"sm"}>
                            {notification?.message} 📬{" "}
                          </Text>
                          <Divider mt={"0.3rem"} />
                        </Box>
                      );
                    })
                  )}
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <Icon
            as={PiHeart}
            boxSize={{ base: 4, md: 5 }}
            color={"gray.600"}
            _hover={{ color: "#005D5D", cursor: "pointer" }}
            display={pathName.includes("marketplace") ? "block" : "none"}
          />

          <Icon
            as={PiShoppingCart}
            boxSize={{ base: 4, md: 5 }}
            color={"gray.600"}
            _hover={{ color: "#005D5D", cursor: "pointer" }}
            display={pathName.includes("marketplace") ? "block" : "none"}
          />
        </Flex>
        <Menu>
          <MenuButton>
            <Box display={"flex"} alignItems={"center"} gap={2}>
              <Text
                fontWeight={"600"}
                color={"gray.600"}
                fontSize={"sm"}
                display={{ base: "none", md: "block" }}
              >
                Hi, {profileData.userBio.firstName}
              </Text>
              <Avatar
                src={profileData.userBio.profileImage}
                size={"sm"}
                pointerEvents={"none"}
              />
              <Icon as={MdArrowDropDown} color={"#005D5D"} boxSize={4} />
            </Box>
          </MenuButton>
          <MenuList>
            <MenuItem
              px={"1rem"}
              onClick={() => router.push("/dashboard/settings")}
              display={"flex"}
              gap={"3"}
            >
              <Icon as={IoMdSettings} boxSize={"4"} color={"#005D5D"} />
              <Text color={"#005D5D"} fontWeight={"600"}>
                Settings
              </Text>
            </MenuItem>
            <MenuItem
              px={"1rem"}
              onClick={() => router.push("/dashboard/inbox")}
              display={"flex"}
              gap={"3"}
            >
              <Icon as={RiMailOpenFill} boxSize={"4"} color={"#005D5D"} />
              <Text color={"#005D5D"} fontWeight={"600"}>
                Inbox
              </Text>
            </MenuItem>
            <MenuDivider />
            <MenuItem onClick={handleLogout} display={"flex"} gap={"3"}>
              <Icon as={IoLogOut} boxSize={"4"} color={"red.600"} />
              <Text color={"#005D5D"} fontWeight={"600"}>
                Logout
              </Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <SearchStudentModal
        isSearchOpen={isModalOpen}
        onSearchClose={onModalClose}
        onSearchOpen={onModalOpen}
      />
    </Flex>
  );
};

const MainNav: FC<MainNav> = ({ children }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const toast = useToast();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const {
    isOpen: isPopoverOpen,
    onOpen: onPopoverOpen,
    onClose: onPopoverClose,
  } = useDisclosure();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    profileData,
    childData,
    currentId,
    setLocalstorageId,
    currentWardProfile,
  } = useUserAPI();
  const pathName = usePathname();
  const [active, setActive] = useState("");
  const [logoutParent] = useMutation(LOGOUT_PARENTS);

  const handleLogout = async () => {
    const response = await logoutParent();
    if (response.data.logoutParent) {
      toast({
        title: "Logout",
        description: "You have been successfully logged out",
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
        status: "info",
      });
      window.location.assign("/signin");
      localStorage.removeItem("currentId");
    }
  };

  useEffect(() => {
    if (pathName.includes("/home/overview")) {
      setActive("Overview");
    } else if (pathName.includes("/home/results")) {
      setActive("Results");
    } else if (pathName.includes("/home/greycases")) {
      setActive("Greycases");
    } else if (pathName.includes("/dashboard/inbox")) {
      setActive("Inbox");
    } else if (pathName.includes("/dashboard/settings")) {
      setActive("Settings");
    } else {
      setActive("/");
    }
  }, [pathName]);

  return (
    <Box
      // minH={isMobile && pathName.includes("clips") ? "90vh" : "100vh"}
      bg={"#fff"}
      w={"full"}
      // pos={pathName.includes("clips") ? "relative" : "fixed"}
      minH={'100VH'}
    >
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
      >
        <DrawerContent overflowY={"auto"}>
          <Box
            h={"full"}
            display={"flex"}
            flexDir={"column"}
            justifyContent={"space-between"}
            overflowY={"auto"}
          >
            <Accordion allowToggle>
              <AccordionItem>
                <DrawerHeader bgColor={"#005D5D"} pb={0}>
                  <Flex justifyContent={"space-between"} alignItems={"start"}>
                    <Avatar
                      src={currentWardProfile?.profileImage}
                      size={"lg"}
                      pointerEvents={"none"}
                      name={`${currentWardProfile?.firstName} ${currentWardProfile?.lastName}`}
                    />
                    <Icon
                      as={IoClose}
                      boxSize={6}
                      color={"#FFFFFF"}
                      onClick={onClose}
                      _hover={{ cursor: "pointer" }}
                    />
                  </Flex>
                  <AccordionButton
                    px={0}
                    mt={"0.7rem"}
                    _hover={{ backgroundColor: "transparent" }}
                  >
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      color={"#FFFFFF"}
                      gap={2}
                      display={"flex"}
                      flexDir={"column"}
                    >
                      <Text fontWeight={"semibold"} fontSize={"md"}>
                        {`${currentWardProfile?.firstName} ${
                          currentWardProfile?.middleName || ""
                        } ${currentWardProfile?.lastName}`}
                      </Text>
                      <Text fontSize={"sm"} color={"#B8E7E7"}>
                        {currentWardProfile?.greynoteNumber}
                      </Text>
                    </Box>
                    <AccordionIcon color={"#ffffff"} boxSize={"8"} />
                  </AccordionButton>
                </DrawerHeader>

                <DrawerBody p={0} overflowY={"auto"}>
                  <AccordionPanel p={0}>
                    <Box>
                      {childData?.map((ward: any, index: number) => {
                        return (
                          <Flex
                            alignItems={"center"}
                            gap={3}
                            px={"1rem"}
                            py={"0.8rem"}
                            key={index}
                            onClick={() => {
                              setLocalstorageId(ward?.id || 0);
                              router.refresh();
                            }}
                            _hover={{
                              cursor: "pointer",
                              backgroundColor: "gray.300",
                              transitionDuration: "0.5s",
                            }}
                          >
                            <Avatar
                              size={"md"}
                              src={ward.profileImage}
                              pointerEvents={"none"}
                              name={`${ward.firstName} ${ward?.middleName} ${ward.lastName}`}
                            >
                              <AvatarBadge
                                display={
                                  currentId === ward.id ? "block" : "none"
                                }
                                boxSize="1.25em"
                                bg="green.500"
                              />
                            </Avatar>
                            <Box>
                              <Text fontWeight={"bold"} fontSize={"md"}>
                                {`${ward.firstName} ${ward?.middleName} ${ward.lastName}`}
                              </Text>
                              <Text fontSize={"sm"} color={"#AAAAAA"}>
                                {ward.greynoteNumber}
                              </Text>
                            </Box>
                          </Flex>
                        );
                      })}
                      <Box
                        w={"full"}
                        as="button"
                        display={"flex"}
                        alignItems={"center"}
                        gap={6}
                        py={"0.8rem"}
                        onClick={onModalOpen}
                        _hover={{
                          cursor: "pointer",
                          backgroundColor: "gray.300",
                          transitionDuration: "0.5s",
                        }}
                        px={"1.3rem"}
                      >
                        <Icon as={IoAdd} color={"gray.500"} boxSize={7} />
                        <Text color={"gray.800"} fontWeight={"semibold"}>
                          Link your child
                        </Text>
                      </Box>
                      <Divider borderColor={"gray.300"} />
                    </Box>
                  </AccordionPanel>

                  <Box my={"1rem"}>
                    {DrawerNavLinkItems.HomeSubLinks.map((item, index) => {
                      return (
                        <Box
                          as="a"
                          key={index}
                          display={"flex"}
                          alignItems={"center"}
                          gap={6}
                          py={"0.8rem"}
                          color={"gray.500"}
                          onClick={() => {
                            router.push(item?.url);
                            onClose();
                          }}
                          _hover={{
                            cursor: "pointer",
                            backgroundColor: "gray.300",
                            transitionDuration: "0.5s",
                          }}
                          px={"1.5rem"}
                        >
                          <Icon
                            as={active ? item.iconLight : item.iconFill}
                            color={"gray.500"}
                            boxSize={6}
                          />
                          <Text color={"gray.800"} fontWeight={"semibold"}>
                            {item.name}
                          </Text>
                        </Box>
                      );
                    })}
                  </Box>
                  <Divider borderColor={"gray.300"} />

                  <Box my={"1rem"}>
                    {DrawerNavLinkItems.NavLinks.map((item, index) => {
                      return (
                        <Box
                          as="a"
                          key={index}
                          display={"flex"}
                          alignItems={"center"}
                          gap={6}
                          py={"0.8rem"}
                          onClick={() => {
                            router.push(`/${item.url}`);
                            onClose();
                          }}
                          _hover={{
                            cursor: "pointer",
                            backgroundColor: "gray.300",
                            transitionDuration: "0.5s",
                          }}
                          px={"1.5rem"}
                        >
                          <Icon
                            as={active ? item.iconLight : item.iconFill}
                            color={"gray.500"}
                            boxSize={7}
                          />
                          <Text color={"gray.800"} fontWeight={"semibold"}>
                            {item.name}
                          </Text>
                        </Box>
                      );
                    })}
                  </Box>
                  <SearchStudentModal
                    isSearchOpen={isModalOpen}
                    onSearchOpen={onModalOpen}
                    onSearchClose={onModalClose}
                  />
                </DrawerBody>
              </AccordionItem>
            </Accordion>

            <Box px={"1.5rem"} my={"1rem"}>
              <Popover>
                <PopoverTrigger>
                  <Box
                    as={"a"}
                    w={"full"}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    href="#"
                  >
                    <Box display={"flex"} alignItems={"center"} gap={2}>
                      <Image
                        src={profileData.userBio.profileImage}
                        width={"2.5rem"}
                        height={"2.5rem"}
                        alt="profile"
                        pointerEvents={"none"}
                        rounded={"md"}
                      />
                      <Grid lineHeight={"1rem"}>
                        <Text
                          color={"gray.800"}
                          fontWeight={"semibold"}
                          fontSize={"md"}
                        >{`${profileData.userBio.firstName} ${
                          profileData?.userBio?.middleName || ""
                        } ${profileData.userBio.lastName}`}</Text>
                        <Text color={"#AAAAAA"} fontSize={"sm"}>
                          {profileData.userBio.email}
                        </Text>
                      </Grid>
                    </Box>
                    <Icon
                      as={RiArrowRightSLine}
                      color={"gray.800"}
                      boxSize={6}
                    />
                  </Box>
                </PopoverTrigger>
                <PopoverContent
                  p={2}
                  borderRadius="15px"
                  justifyContent="center"
                  alignItems="center"
                  gap={2}
                  maxW={"270px"}
                >
                  <Flex
                    direction="column"
                    justify="center"
                    align="center"
                    border="1px solid #e3e3e3"
                    borderRadius={"10px"}
                    p={3}
                    w={"full"}
                  >
                    <Avatar
                      src={profileData?.userBio?.profileImage}
                      name={`${profileData?.userBio?.firstName} ${profileData?.userBio?.lastName}`}
                    />
                    <Flex align="center" justify="center" mt={2} gap={1}>
                      <Text
                        textTransform={"capitalize"}
                        fontSize={{ base: "lg", lg: "2xl" }}
                        fontWeight={"bold"}
                      >{`${profileData?.userBio?.firstName} ${
                        profileData?.userBio?.middleName || ""
                      } ${profileData?.userBio?.lastName}`}</Text>
                      <Image
                        src="/images/verifiedtag.png"
                        alt="badge"
                        w={"1rem"}
                        h={"1rem"}
                        pointerEvents={"none"}
                        display={
                          (childData ?? []).length === 0 ? "none" : "block"
                        }
                      />
                    </Flex>
                    <Text color="#A7A7A7" fontSize="12">
                      {profileData?.userBio?.email}
                    </Text>
                  </Flex>
                  <Button
                    leftIcon={<IoHelpCircleOutline />}
                    variant="ghost"
                    fontWeight={400}
                    w="full"
                    color="#747474"
                    onClick={() =>
                      (window.location.href = `mailto:admin@greynote.app?subject=Parent app (${encodeURIComponent(
                        `${profileData?.userBio?.firstName} ${
                          profileData?.userBio?.middleName || ""
                        } ${profileData.userBio?.lastName}`
                      )}): Support`)
                    }
                  >
                    Contact Support
                  </Button>
                  <Button
                    mb={4}
                    bg="#FFC5C5"
                    color="#E03F3F"
                    _hover={{ bg: "#E03F3F", color: "white" }}
                    onClick={handleLogout}
                    fontWeight={400}
                    w="full"
                    leftIcon={<IoLogOut size={"22"} />}
                  >
                    Logout
                  </Button>
                </PopoverContent>
              </Popover>
            </Box>
          </Box>
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} onClose={onPopoverClose}/>
      <Box ml={{ base: 0, md: "4.1rem" }} p={pathName.includes("clips") || pathName.includes("marketplace") ? 0 : 4}>
        {/* Content */}
        {children}
      </Box>
    </Box>
  );
};

export default MainNav;
