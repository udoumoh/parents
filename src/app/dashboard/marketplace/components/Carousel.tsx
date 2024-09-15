import { FC, useRef, useState, useEffect } from 'react'
import { Box, Icon, Flex, Heading } from '@chakra-ui/react';
import Slider from 'react-slick';
import '../styles.css'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface CarouselProps {
  children: React.ReactNode;
  test1: string;
  test2: string;
}

const Carousel: FC<CarouselProps> = ({children, test1, test2}) => {
    const sliderRef = useRef< Slider | null>(null);
    const [slideIndex, setSlideIndex] = useState(0);
    const [updateCount, setUpdateCount] = useState(0);
    const [dotsCount, setDotsCount] = useState(0);

     const settings = {
       accessibility:true,
       dots: true,
       infinite: false,
       speed: 500,
       slidesToShow: 4.5,
       slidesToScroll: 4,
       initialSlide: 0,
       arrows: false,
       afterChange: () => {
         const dots = document.querySelectorAll(".slick-dots li");
         setDotsCount(dots.length);
         setUpdateCount(updateCount + 1);
       },
       beforeChange: (next: any, current: any) => {
         setSlideIndex(current);
       },
       responsive: [
         {
           breakpoint: 1024,
           settings: {
             slidesToShow: 3,
             slidesToScroll: 3,
           },
         },
         {
           breakpoint: 600,
           settings: {
             slidesToShow: 2,
             slidesToScroll: 2,
           },
         },
         {
           breakpoint: 480,
           settings: {
             slidesToShow: 1.5,
             slidesToScroll: 1,
           },
         },
       ],
     };

    const goToNext = () => {
      sliderRef?.current?.slickNext();
    };

    const goToPrevious = () => {
      sliderRef?.current?.slickPrev();
    };

    useEffect(() => {
      const dots = document.querySelectorAll(".slick-dots li");
      setDotsCount(dots.length);
    }, []);

  return (
    <Box mt={"3rem"} display={"flex"} flexDir={"column"}>
      <Heading
        fontSize={"lg"}
        fontWeight={"semibold"}
        px={{ base: "0.8rem", md: "3rem" }}
      >
        <span style={{ color: "#007C7B" }}>{test1}</span> {test2}
      </Heading>

      <Flex gap={1} pb={"0.5rem"} justifyContent={"flex-end"} px={{base:"0.5rem", md:"3rem"}} display={{base:"none", md:"flex"}}>
        {[...Array(dotsCount)].map((_, index) => (
          <Box
            as="span"
            display="block"
            width={{base:"20px", md:"30px"}}
            height="2px"
            backgroundColor={
              index === Math.max(Math.floor(slideIndex) - 1, 0)
                ? "#007C7B"
                : "#DCDCDC"
            }
            borderRadius="2px"
            key={index}
          />
        ))}
      </Flex>

      <Flex alignItems={"center"} px={{base:"0.5rem", md:"0rem"}}>
        <Icon
          display={{ base: "none", md: "flex" }}
          as={MdKeyboardArrowLeft}
          boxSize={6}
          mx={{ base: "0.3rem", md: "0.6rem" }}
          transition={"0.3s ease"}
          _hover={{
            cursor: "pointer",
            transition: "0.5s ease",
            transform: "scale(1.3)",
          }}
          onClick={goToPrevious}
        />

        <Box
          className="slider-container"
          h={"full"}
          w={"100%"}
          overflow={"hidden"}
        >
          <Slider ref={sliderRef} {...settings}>
            {children}
          </Slider>
        </Box>

        <Icon
          display={{ base: "none", md: "flex" }}
          as={MdKeyboardArrowRight}
          boxSize={6}
          mx={{ base: "0.3rem", md: "0.6rem" }}
          transition={"0.3s ease"}
          _hover={{
            cursor: "pointer",
            transition: "0.5s ease",
            transform: "scale(1.3)",
          }}
          onClick={goToNext}
        />
      </Flex>
    </Box>
  );
}

export default Carousel