"use client";
import { FC } from "react";
import { Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";
import Image from "next/image";
import VideoPlayer from "./VideoPlayer";

const settings = {
  dots: true,
  arrows: false,
  speed: 500,
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
};

interface CarouselProps {
  media: string[];
  slider: any;
  setSlider: any;
}

const Carousel: FC<CarouselProps> = ({ media, slider, setSlider }) => {
  const top = useBreakpointValue({ base: "50%", md: "50%" });
  const side = useBreakpointValue({ base: "10%", md: "10px" });
  const videoLinks: string[] = [];
  const imageLinks: string[] = [];

  media?.forEach((link) => {
    if (
      link.endsWith(".mp4") ||
      link.endsWith(".webm") ||
      link.endsWith(".mov")
    ) {
      videoLinks.push(link);
    } else if (
      link.endsWith(".jpg") ||
      link.endsWith(".jpeg") ||
      link.endsWith(".png")
    ) {
      imageLinks.push(link);
    }
  });

  return (
    <Box position={"relative"} width={"full"}>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        backgroundColor={"#FFFFFF"}
        color={"#000000"}
        borderRadius="full"
        position="absolute"
        left={side}
        top={top}
        size={"sm"}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => {
          slider?.slickPrev();
        }}
        display={{ base: "none", md: "flex" }}
      >
        <BiLeftArrowAlt size={18} />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        backgroundColor={"#FFFFFF"}
        color={"#000000"}
        borderRadius="full"
        position="absolute"
        right={side}
        size={"sm"}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => {
          slider?.slickNext();
        }}
        display={{ base: "none", md: "flex" }}
      >
        <BiRightArrowAlt size={18} />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {imageLinks?.map((url, index) => (
          <Box
            key={index}
            height={{ base: "300px", md: "400px" }}
            position="relative"
            backgroundColor={"#000000"}
            backdropFilter={"blur(6px)"}
          >
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              backgroundImage={`url(${url})`}
              backgroundSize="cover"
              backgroundPosition="center"
              filter="blur(10px)"
              zIndex={1}

            />
            <Box
              position="relative"
              w="100%"
              h="100%"
              zIndex={2}

            >
              <Image
                src={url}
                layout="fill"
                alt={`image-${index}`}
                style={{ borderRadius: "30px", objectFit:"contain" }}
              />
            </Box>
          </Box>
        ))}
        {videoLinks?.map((url, index) => (
          <VideoPlayer url={url} key={index} />
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;
