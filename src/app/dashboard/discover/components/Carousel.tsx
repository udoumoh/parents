'use client'
import { FC, useState } from 'react'
import { Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from 'react-slick'
import VideoPlayer from './VideoPlayer';

const settings = {
  dots: true,
  arrows: false,
  speed: 500,
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
};

interface CarouselProps {
  media: string [];
}

const Carousel: FC<CarouselProps> = ({media}) => {
    const [slider, setSlider] = useState<Slider | null>(null);
    const videoLinks: string [] = [];
    const imageLinks: string [] = []

    const top = useBreakpointValue({ base: "90%", md: "50%" });
    const side = useBreakpointValue({ base: "30%", md: "10px" });

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

    const cards = [
      "https://images.unsplash.com/photo-1612852098516-55d01c75769a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
      "https://images.unsplash.com/photo-1627875764093-315831ac12f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
      "https://images.unsplash.com/photo-1571432248690-7fd6980a1ae2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
    ];
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
        backgroundColor={'#FFFFFF'}
        color={'#000000'}
        borderRadius="full"
        position="absolute"
        left={side}
        top={top}
        size={'sm'}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt size={18}/>
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        backgroundColor={'#FFFFFF'}
        color={'#000000'}
        borderRadius="full"
        position="absolute"
        right={side}
        size={'sm'}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size={18}/>
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {imageLinks?.map((url, index) => (
          <Box
            key={index}
            height={{base:"sm", md:"lg"}}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${url})`}
          />
        ))}
        {
          videoLinks?.map((url, index) => (
            <VideoPlayer url={url} key={index}/>
          ))
        }
      </Slider>
    </Box>
  );
}

export default Carousel