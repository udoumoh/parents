import React from "react";
import Slider from "react-slick";
import { Box, Text, Button } from "@chakra-ui/react";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const Carousel = () => (
  <Box display={"flex"} overflow={"hidden"} w={"full"}>
    <Slider {...settings}>
      <Box
        rounded={"6px"}
        display={"flex"}
        flexDir={"column"}
        backgroundImage={"/images/discoveradvert.svg"}
        backgroundPosition={"center"}
        backgroundSize={"cover"}
        backgroundRepeat={"no-repeat"}
        h={{ base: 300, md: "auto" }}
        textAlign={"center"}
        color={"#ffffff"}
        pt={"1rem"}
        px={"1rem"}
        gap={2}
        alignItems={"center"}
        maxW={{ base: "full", lg: "350px" }}
        minW={{ base: "auto", md: "350px" }}
      >
        <Text fontWeight={"semibold"} fontSize={{ base: "lg", md: "xl" }}>
          Discover Schools on Greynote
        </Text>
        <Text
          fontSize={{ base: "sm", md: "md" }}
          fontWeight={"light"}
          px={"1rem"}
        >
          Explore schools in your area for your child
        </Text>
        <Button background={"#fff"} fontSize={"2xs"} color={"#007C7B"}>
          Discover schools
        </Button>
      </Box>

      <Box
        rounded={"6px"}
        display={"flex"}
        flexDir={"column"}
        backgroundImage={"/images/discoverAdvert2.svg"}
        backgroundPosition={"center"}
        backgroundSize={"cover"}
        backgroundRepeat={"no-repeat"}
        h={{ base: 300, md: "auto" }}
        textAlign={"center"}
        color={"#ffffff"}
        pt={"1rem"}
        px={"1rem"}
        gap={2}
        justifyContent={"center"}
        maxW={{ base: "full", lg: "350px" }}
        minW={{ base: "auto", md: "350px" }}
        alignItems={"start"}
      >
        <Text fontWeight={"semibold"} fontSize={{ base: "lg", md: "xl" }}>
          Greynote Marketplace
        </Text>
        <Text
          fontSize={"sm"}
          fontWeight={"light"}
          textAlign={"start"}
          maxW={"250px"}
        >
          Find fun and captivating content for your kids
        </Text>
        <Button background={"#fff"} fontSize={"2xs"} color={"#007C7B"}>
          Explore Marketplace
        </Button>
      </Box>
    </Slider>
  </Box>
);

export default Carousel;
