'use client'
import React, { forwardRef } from "react";
import {
  Box,
  Flex,
  Grid,
  Icon,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Portal,
} from "@chakra-ui/react";
import VideoPlayer from "./VideoPlayer";
import {
  FaBookmark,
  FaShare,
  FaTelegramPlane,
  FaInstagram,
} from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { IoHeart } from "react-icons/io5";
import { MdOutlineContentCopy } from "react-icons/md";
import { TiSocialFacebook } from "react-icons/ti";
import { FaWhatsapp } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";
import { PiTelegramLogoLight } from "react-icons/pi";

interface ClipItemProps {
  videoLink: string;
}

const ShareLinks = [
  { icon: MdOutlineContentCopy, label: "Copy Link", bg: "#000000" },
  { icon: TiSocialFacebook, label: "Share to Facebook", bg: "#4267B2" },
  { icon: FaWhatsapp, label: "Share to Whatsapp", bg: "#25D366" },
  { icon: FaTelegramPlane, label: "Share to Telegram", bg: "#03346E" },
  { icon: FaInstagram, label: "Share to Instagram", bg: "#E1306C" },
];

const ClipItem = forwardRef<HTMLVideoElement, ClipItemProps>(
  ({ videoLink }, ref) => {
    return (
      <Flex
        w="full"
        justifyContent="center"
        gap={4}
        alignItems="flex-end"
        py="0.5rem"
        px={"2rem"}
        css={{ scrollSnapAlign: "center" }}
      >
        <VideoPlayer link={videoLink} ref={ref} />
        <Grid
          gap={5}
          backdropFilter="blur(6px)"
          bg="linear-gradient(135deg, #2ebf9115, #8360c315)"
          py="1rem"
          px="0.6rem"
          rounded="lg"
        >
          <Grid alignContent="center">
            <Box
              backgroundColor="#00000010"
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
                as={IoHeart}
                boxSize="6"
                color={"#fe2c55"}
                transition="transform 0.5s"
              />
            </Box>
            <Text fontWeight="bold" textAlign="center" fontSize="sm">
              1.4M
            </Text>
          </Grid>

          <Grid alignContent="center">
            <Box
              backgroundColor="#00000010"
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
                boxSize="5"
                transition="transform 0.5s"
              />
            </Box>
            <Text fontWeight="bold" textAlign="center" fontSize="sm">
              6161
            </Text>
          </Grid>

          <Grid alignContent="center">
            <Box
              backgroundColor="#00000010"
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
                as={FaBookmark}
                boxSize="5"
                transition="transform 0.5s"
                color="#FF8225"
              />
            </Box>
            <Text fontWeight="bold" textAlign="center" fontSize="sm">
              88.2K
            </Text>
          </Grid>

          <Grid alignContent="center">
            <Popover isLazy matchWidth={true}>
              <PopoverTrigger>
                <Box
                  backgroundColor="#00000010"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  rounded="full"
                  height={"40px"}
                  width={"40px"}
                  _hover={{ cursor: "pointer" }}
                >
                  <Icon as={FaShare} boxSize="5" />
                </Box>
              </PopoverTrigger>
              <PopoverContent
                rounded={"2xl"}
                border={"0px"}
                shadow={"lg"}
                fontWeight={"semibold"}
              >
                <PopoverBody p={'0.5rem'}>
                  {ShareLinks.map((item, key) => (
                    <Flex
                      key={key}
                      gap={3}
                      py={"0.6rem"}
                      my={"0.3rem"}
                      rounded={"lg"}
                      alignItems={"center"}
                      _hover={{ cursor: "pointer", backgroundColor:"#00000008" }}
                      px={'1rem'}
                    >
                      <Box
                        width={"25px"}
                        height={"25px"}
                        rounded={"full"}
                        backgroundColor={item.bg}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        p={"1rem"}
                      >
                        <Icon as={item?.icon} boxSize={"4"} color={"#ffffff"} />
                      </Box>{" "}
                      {item.label}
                    </Flex>
                  ))}
                </PopoverBody>
              </PopoverContent>
            </Popover>

            <Text fontWeight="bold" textAlign="center" fontSize="sm">
              12.1K
            </Text>
          </Grid>
        </Grid>
      </Flex>
    );
  }
);

export { ClipItem };
