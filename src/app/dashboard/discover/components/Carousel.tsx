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
    
    const top = useBreakpointValue({ base: "50%", md: "50%" });
    const side = useBreakpointValue({ base: "10%", md: "10px" });
    const videoLinks: string [] = [];
    const imageLinks: string [] = []

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
            height={{base:"2xs", md:"lg"}}
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