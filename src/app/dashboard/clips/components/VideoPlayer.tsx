import React, { forwardRef, useRef, useState, useEffect, useImperativeHandle } from "react";
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
import { AiFillMessage } from "react-icons/ai";
import { IoHeart } from "react-icons/io5";
import { MdOutlineContentCopy } from "react-icons/md";
import { TiSocialFacebook } from "react-icons/ti";
import { FaWhatsapp } from "react-icons/fa6";
import {
  FaBookmark,
  FaShare,
  FaTelegramPlane,
  FaInstagram,
  FaPlay,
  FaPause,
} from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { useUserAPI } from "@/hooks/UserContext";
import { useRouter } from "next/navigation";
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
} from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { RiMailOpenFill } from "react-icons/ri";
import { PiChatsTeardrop, PiChatsTeardropFill } from "react-icons/pi";
import { GoHome, GoHomeFill } from "react-icons/go";
import { RiArrowRightSLine } from "react-icons/ri";
import { AiOutlinePlus, AiOutlineSetting } from "react-icons/ai";
import {
  MdArrowDropDown,
  MdMovieFilter,
  MdOutlineMovieFilter,
} from "react-icons/md";
import SearchStudentModal from "@/components/shared/searchStudentModal";
import { usePathname } from "next/navigation";
import { useMutation } from "@apollo/client";
import { LOGOUT_PARENTS } from "@/gql/mutations";


interface VideoPlayerProps {
  link: string;
}

const DrawerNavLinkItems = {
  HomeSubLinks: [
    {
      name: "Overview",
      iconLight: IoGridOutline,
      iconFill: IoGrid,
      url: "/dashboard/home",
    },
    {
      name: "Academic Results",
      iconLight: IoFolderOutline,
      iconFill: IoFolder,
      url: "/dashboard/home",
    },
    {
      name: "Invoice",
      iconLight: IoReceiptOutline,
      iconFill: IoReceipt,
      url: "/dashboard/home",
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

const ShareLinks = [
  { icon: MdOutlineContentCopy, label: "Copy Link", bg: "#000000" },
  { icon: TiSocialFacebook, label: "Share to Facebook", bg: "#4267B2" },
  { icon: FaWhatsapp, label: "Share to Whatsapp", bg: "#25D366" },
  { icon: FaTelegramPlane, label: "Share to Telegram", bg: "#03346E" },
  { icon: FaInstagram, label: "Share to Instagram", bg: "#E1306C" },
];

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ link }, ref) => {
const {isOpen, onOpen, onClose} = useDisclosure()   
const {
  isOpen: isModalOpen,
  onOpen: onModalOpen,
  onClose: onModalClose,
} = useDisclosure(); 
const videoRef = useRef<HTMLVideoElement>(null);
const [isPlaying, setIsPlaying] = useState(false);
const [showControls, setShowControls] = useState(true);
const {
  profileData,
  childData,
  currentId,
  setLocalstorageId,
  currentWardProfile,
} = useUserAPI();
const router = useRouter()
const [active, setActive] = useState("");
const pathName = usePathname()
const toast = useToast();

useEffect(() => {
  if (pathName.includes("/home")) {
    setActive("Overview");
  } else if (pathName.includes("/home")) {
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

useImperativeHandle(ref, () => videoRef.current as HTMLVideoElement);

useEffect(() => {
  const video = videoRef.current;

  if (video) {
    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }
}, []);

const handleVideoClick = () => {
  const video = videoRef.current;

  if (video) {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
};
    return (
      <Box
        maxW={"600px"}
        w={{ base: "full", md: "60vw", xl: "30vw" }}
        height={["92dvh", "90dvh"]}
        position="relative"
        shadow={"xl"}
        rounded={"xl"}
        _hover={{ cursor: "pointer" }}
        onClick={handleVideoClick}
        sx={{
          "&:focus": {
            outline: "none",
          },
          "-webkit-tap-highlight-color": "transparent",
        }}
      >
        <Box
          as="video"
          ref={videoRef}
          preload="auto"
          playsInline
          autoPlay
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
          rounded={{ base: "0", md: "xl" }}
          onTouchStart={() => setShowControls(true)}
          onTouchEnd={() => setShowControls(false)}
        >
          <source src={link} type="video/mp4" />
        </Box>

        {/* Overlay for mobile */}
        <Box
          display={{ base: "flex", md: "none" }}
          position={"absolute"}
          top={"0"}
          height={"full"}
          w={"full"}
          py={"0.5rem"}
          px={"0.6rem"}
          flexDir={"column"}
          justifyContent={"space-between"}
          backgroundColor={"#00000020"}
          sx={{
            "&:focus": {
              outline: "none",
            },
          }}
        >
          {/* Drawer component */}
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
                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"start"}
                      >
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

          <Flex
            justifyContent={"space-between"}
            w={"full"}
            px={"0.5rem"}
            alignItems={"center"}
          >
            <Box display={"flex"} alignItems={"center"}>
              <Icon
                as={FiMenu}
                color={"#ffffff"}
                boxSize={"5"}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen();
                }}
              />
            </Box>

            <Flex
              gap={"2"}
              alignItems={"center"}
              background={"#00000070"}
              px={"0.5rem"}
              py={"0.3rem"}
              rounded={"full"}
            >
              <Image
                alt="logo"
                src={"/images/greylightBordered.svg"}
                width={"20px"}
                height={"16px"}
              />
              <Text
                fontSize={"xs"}
                fontWeight={"bold"}
                color={"#fff"}
                bgGradient="linear(to-r, #c9ffbf, #ffafbd)"
                bgClip="text"
              >
                Greynote Clips
              </Text>
            </Flex>
            <Box></Box>
          </Flex>

          <Flex justifyContent={"space-between"}>
            <Box></Box>

            <Box></Box>
          </Flex>

          <Box py={"0.5rem"} display={"grid"} gap={"2"}>
            <Flex alignItems={"flex-end"} justifyContent={"space-between"}>
              <Grid gap={2}>
                <Flex gap={2}>
                  <Avatar size={"sm"} />
                  <Flex alignItems={"center"} gap={2}>
                    <Text fontWeight={"bold"} color={"#fff"} fontSize={"sm"}>
                      Patrick_harry
                    </Text>
                    <Text color={"#fff"}>•</Text>
                    <Button
                      size={"xs"}
                      variant="outline"
                      color={"#fff"}
                      fontWeight={"bold"}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Follow
                    </Button>
                  </Flex>
                </Flex>

                <Flex>
                  <Text color={"#fff"} fontSize={"xs"} fontWeight={"semibold"}>
                    #Godnogoshameus
                  </Text>
                </Flex>
              </Grid>

              <Grid gap={3}>
                <Grid alignContent="center" gap={1}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    rounded="full"
                    _hover={{ cursor: "pointer" }}
                    sx={{
                      "&:hover > svg": {
                        transform: "scale(1.1)",
                        transition: "transform 0.5s",
                      },
                    }}
                  >
                    <Icon
                      as={IoHeart}
                      boxSize="7"
                      color={"#fe2c55"}
                      transition="transform 0.5s"
                    />
                  </Box>
                  <Text
                    fontWeight="bold"
                    textAlign="center"
                    fontSize="xs"
                    color={"#fff"}
                  >
                    1.4M
                  </Text>
                </Grid>

                <Grid alignContent="center" gap={1}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    rounded="full"
                    height={"40px"}
                    width={"40px"}
                    _hover={{ cursor: "pointer" }}
                    sx={{
                      "&:hover > svg": {
                        transform: "scale(1.1)",
                        transition: "transform 0.5s",
                      },
                    }}
                  >
                    <Icon
                      as={AiFillMessage}
                      boxSize="6"
                      transition="transform 0.5s"
                      color={"#fff"}
                    />
                  </Box>
                  <Text
                    fontWeight="bold"
                    textAlign="center"
                    fontSize="xs"
                    color={"#fff"}
                  >
                    6161
                  </Text>
                </Grid>

                <Grid alignContent="center" gap={1}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    rounded="full"
                    _hover={{ cursor: "pointer" }}
                    sx={{
                      "&:hover > svg": {
                        transform: "scale(1.1)",
                        transition: "transform 0.5s",
                      },
                    }}
                  >
                    <Icon
                      as={FaBookmark}
                      boxSize="5"
                      transition="transform 0.5s"
                      color="#FF8225"
                    />
                  </Box>
                  <Text
                    fontWeight="bold"
                    textAlign="center"
                    fontSize="xs"
                    color={"#fff"}
                  >
                    88.2K
                  </Text>
                </Grid>

                <Grid alignContent="center" gap={1}>
                  <Popover isLazy matchWidth={true}>
                    <PopoverTrigger>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        rounded="full"
                        _hover={{ cursor: "pointer" }}
                      >
                        <Icon as={FaShare} boxSize="5" color={"#fff"} />
                      </Box>
                    </PopoverTrigger>
                    <PopoverContent
                      rounded={"xl"}
                      border={"transparent"}
                      shadow={"lg"}
                      fontWeight={"semibold"}
                      maxWidth={"250px"}
                    >
                      <PopoverBody p={"0.5rem"}>
                        {ShareLinks.map((item, key) => (
                          <Flex
                            key={key}
                            gap={3}
                            py={"0.6rem"}
                            my={"0.3rem"}
                            rounded={"lg"}
                            alignItems={"center"}
                            _hover={{
                              cursor: "pointer",
                              backgroundColor: "#00000008",
                            }}
                            px={"1rem"}
                          >
                            <Box
                              width={"25px"}
                              height={"25px"}
                              rounded={"full"}
                              backgroundColor={item.bg}
                              display={"flex"}
                              justifyContent={"center"}
                              alignItems={"center"}
                              p={"0.8rem"}
                            >
                              <Icon
                                as={item?.icon}
                                boxSize={"4"}
                                color={"#ffffff"}
                              />
                            </Box>{" "}
                            {item.label}
                          </Flex>
                        ))}
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>

                  <Text
                    fontWeight="bold"
                    textAlign="center"
                    fontSize="xs"
                    color={"#fff"}
                  >
                    12.1K
                  </Text>
                </Grid>
              </Grid>
            </Flex>
          </Box>
        </Box>

        {/* Overlay for large screens */}
        <Box
          display={{ base: "none", md: "flex" }}
          position={"absolute"}
          top={"0"}
          height={"full"}
          w={"full"}
          py={"0.5rem"}
          px={"1rem"}
          flexDir={"column"}
          justifyContent={"space-between"}
          backgroundColor={"#00000020"}
          rounded={"xl"}
        >
          <Flex justifyContent={"center"} w={"full"}>
            <Flex
              gap={"2"}
              alignItems={"center"}
              background={"#00000070"}
              px={"0.5rem"}
              py={"0.3rem"}
              rounded={"full"}
            >
              <Image
                alt="logo"
                src={"/images/greylightBordered.svg"}
                width={"20px"}
                height={"16px"}
              />
              <Text
                fontSize={"xs"}
                fontWeight={"bold"}
                color={"#fff"}
                bgGradient="linear(to-r, #c9ffbf, #ffafbd)"
                bgClip="text"
              >
                Greynote Clips
              </Text>
            </Flex>
          </Flex>

          <Flex justifyContent={"space-between"}>
            <Box></Box>

            <Box></Box>
          </Flex>

          <Box py={"0.5rem"} display={"grid"} gap={"2"}>
            <Flex alignItems={"flex-end"} justifyContent={"space-between"}>
              <Flex gap={2}>
                <Avatar size={"sm"} name="patrick henry" />
                <Flex alignItems={"center"} gap={2}>
                  <Text fontWeight={"bold"} color={"#fff"} fontSize={"sm"}>
                    Patrick_harry
                  </Text>
                  <Text color={"#fff"}>•</Text>
                  <Button
                    size={"sm"}
                    variant="outline"
                    color={"#fff"}
                    fontWeight={"bold"}
                  >
                    Follow
                  </Button>
                </Flex>
              </Flex>
            </Flex>

            <Flex>
              <Text color={"#fff"} fontSize={"sm"} fontWeight={"bold"}>
                #Godnogoshameus
              </Text>
            </Flex>
          </Box>
        </Box>

        {showControls && (
          <Flex
            position="absolute"
            top="50%"
            left="50%"
            transform={`translate(-50%, -50%) scale(${isPlaying ? 0 : 1})`}
            opacity={isPlaying ? 0 : 1}
            alignItems="center"
            justifyContent="center"
            backgroundColor="#00000080"
            borderRadius="50%"
            w="70px"
            h="70px"
            _hover={{ cursor: "pointer" }}
            transition="opacity 0.5s ease, transform 0.5s ease"
          >
            <Icon
              as={FaPlay}
              color="#fff"
              boxSize={5}
              _hover={{ cursor: "pointer" }}
            />
          </Flex>
        )}
      </Box>
    );
  }
);

export default VideoPlayer;
