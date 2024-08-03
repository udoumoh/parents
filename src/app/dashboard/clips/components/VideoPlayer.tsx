import React, { forwardRef, useRef, useState, useEffect } from "react";
import {
  Box,
  Text,
  Flex,
  Grid,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Icon,
  Avatar,
  Button,
} from "@chakra-ui/react";
import Image from "next/image";
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
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";

interface VideoPlayerProps {
  link: string;
}

const ShareLinks = [
  { icon: MdOutlineContentCopy, label: "Copy Link", bg: "#000000" },
  { icon: TiSocialFacebook, label: "Share to Facebook", bg: "#4267B2" },
  { icon: FaWhatsapp, label: "Share to Whatsapp", bg: "#25D366" },
  { icon: FaTelegramPlane, label: "Share to Telegram", bg: "#03346E" },
  { icon: FaInstagram, label: "Share to Instagram", bg: "#E1306C" },
];

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ link }, ref) => {
    return (
      <Box
        maxW={"600px"}
        w={{ base: "full", md: "30vw" }}
        height={["90dvh", "90dvh"]}
        position="relative"
        shadow={"xl"}
      >
        <Box
          as="video"
          ref={ref}
          preload="auto"
          muted
          playsInline
          autoPlay
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
          rounded={{ base: "0", md: "xl" }}
        >
          <source src={link} type="video/mp4" />
        </Box>

        <Box
          display={{ base: "flex", md: "none" }}
          position={"absolute"}
          top={"0"}
          height={"full"}
          w={"full"}
          p={"0.5rem"}
          flexDir={"column"}
          justifyContent={"space-between"}
          backgroundColor={"#00000020"}
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
                width={"15"}
                height={"10"}
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

            {/* <Box>
              <Grid gap={5} py="1rem" px="0.6rem">
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
                      boxSize="8"
                      color={"#fe2c55"}
                      transition="transform 0.5s"
                    />
                  </Box>
                  <Text
                    fontWeight="bold"
                    textAlign="center"
                    fontSize="sm"
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
                      boxSize="7"
                      transition="transform 0.5s"
                      color={'#fff'}
                    />
                  </Box>
                  <Text
                    fontWeight="bold"
                    textAlign="center"
                    fontSize="sm"
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
                      boxSize="7"
                      transition="transform 0.5s"
                      color="#FF8225"
                    />
                  </Box>
                  <Text
                    fontWeight="bold"
                    textAlign="center"
                    fontSize="sm"
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
                        <Icon as={FaShare} boxSize="7" color={'#fff'}/>
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
                    fontSize="sm"
                    color={"#fff"}
                  >
                    12.1K
                  </Text>
                </Grid>
              </Grid>
            </Box> */}
          </Flex>

          <Box py={"0.5rem"} display={"grid"} gap={"2"}>
            <Flex alignItems={'flex-end'} justifyContent={'space-between'}>
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
                  >
                    Follow
                  </Button>
                </Flex>
              </Flex>

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
                        boxSize="7"
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
                        boxSize="7"
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
                          <Icon as={FaShare} boxSize="7" color={"#fff"} />
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

            <Flex>
              <Text color={"#fff"} fontSize={"sm"} fontWeight={"bold"}>
                #Godnogoshameus
              </Text>
            </Flex>
          </Box>
        </Box>

        {/* <Text height={'full'} w={'full'} position={'absolute'} top={'50%'} left={'50%'}> hello</Text> */}
      </Box>
    );
  }
);

export default VideoPlayer;
