"use client";
import { FC, useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Image,
  keyframes,
  Input,
  InputLeftElement,
  InputGroup,
  Heading,
  Divider,
  Icon,
  HStack,
  SimpleGrid,
  Avatar,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import ProductCard from "./components/ProductCard";
import TutorCard from "./components/TutorCard";
import Carousel from "./components/Carousel";
import TopCreatorBadge from "./utils/TopCreatorBadge";
import { LuClock2 } from "react-icons/lu";
import { IoIosStar } from "react-icons/io";
import { PiHeart } from "react-icons/pi";
import './styles.css'
import Head from "next/head";

const marqueeLeft = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const marqueeRight = keyframes`
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
`;

interface MarketplaceProps {}


const Marketplace: FC<MarketplaceProps> = ({}) => {
  const [isSearchActive, setSearchActive] = useState(false);
  const tempCourseData = [
    {
      creator: "Joseph Lawan",
      courseTitle: "Learn Keyboard from scratch - Complete beginners course",
      courseLength: "3.5 Hours",
      courseAverageRating: 4.7,
      numberOfRatings: 1233,
      coursePrice: "25000",
      courseImage: "/images/marketplaceMisc/course1.png",
    },
    {
      creator: "Stephen Salisu",
      courseTitle:
        "Introduction to Quantitative Reasoning - Solve every problem with these steps",
      courseLength: "0.5 Hours",
      courseAverageRating: 4.2,
      numberOfRatings: 138,
      coursePrice: "5000",
      courseImage: "/images/marketplaceMisc/course2.png",
    },
    {
      creator: "Priscilla Anozie",
      courseTitle: "Teach your kids how to draw like a pro",
      courseLength: "5.5 Hours",
      courseAverageRating: 4.9,
      numberOfRatings: 563,
      coursePrice: "Free",
      courseImage: "/images/marketplaceMisc/course3.png",
    },
    {
      creator: "Victoria Ikiriko",
      courseTitle:
        "Dress up your kids stylishly - Fashion tips for new parents",
      courseLength: "2.0 Hours",
      courseAverageRating: 4.8,
      numberOfRatings: 1797,
      coursePrice: "45000",
      courseImage: "/images/marketplaceMisc/course4.png",
    },
    {
      creator: "Joseph Lawan",
      courseTitle: "Learn Keyboard from scratch - Complete beginners course",
      courseLength: "3.5 Hours",
      courseAverageRating: 4.7,
      numberOfRatings: 1233,
      coursePrice: "25000",
      courseImage: "/images/marketplaceMisc/course1.png",
    },
    {
      creator: "Stephen Salisu",
      courseTitle:
        "Introduction to Quantitative Reasoning - Solve every problem with these steps",
      courseLength: "0.5 Hours",
      courseAverageRating: 4.2,
      numberOfRatings: 138,
      coursePrice: "5000",
      courseImage: "/images/marketplaceMisc/course2.png",
    },
    {
      creator: "Priscilla Anozie",
      courseTitle: "Teach your kids how to draw like a pro",
      courseLength: "5.5 Hours",
      courseAverageRating: 4.9,
      numberOfRatings: 563,
      coursePrice: "Free",
      courseImage: "/images/marketplaceMisc/course3.png",
    },
    {
      creator: "Victoria Ikiriko",
      courseTitle:
        "Dress up your kids stylishly - Fashion tips for new parents",
      courseLength: "2.0 Hours",
      courseAverageRating: 4.8,
      numberOfRatings: 1797,
      coursePrice: "45000",
      courseImage: "/images/marketplaceMisc/course4.png",
    },
  ];
  // const tempTutorData = [
  //   {
  //     creator: "Grace Alade",
  //     studentsTaught: 14,
  //     subjectsTaught: ["IELTS", "TOEFL"],
  //     teachingDays: ["Weekdays"],
  //     teachingDuration: "1-3",
  //     pricing: 15000,
  //     likes: 133,
  //     dislikes: 3,
  //   },
  //   {
  //     creator: "Samuel Aganaba",
  //     studentsTaught: 25,
  //     subjectsTaught: ["Keyboard", "Guitar"],
  //     teachingDays: ["Weekends"],
  //     teachingDuration: "1-4",
  //     pricing: 25000,
  //     likes: 79,
  //     dislikes: 3,
  //   },
  //   {
  //     creator: "Kazeem Abubakar",
  //     studentsTaught: 32,
  //     subjectsTaught: ["Mathematics"],
  //     teachingDays: ["Mon", "Tue", "Fri"],
  //     teachingDuration: "1-5",
  //     pricing: 5000,
  //     likes: 56,
  //     dislikes: 2,
  //   },
  //   {
  //     creator: "Sarah Soyinka",
  //     studentsTaught: 28,
  //     subjectsTaught: ["Physics", "Chemistry"],
  //     teachingDays: ["Everyday"],
  //     teachingDuration: "1-5",
  //     pricing: 15000,
  //     likes: 55,
  //     dislikes: 1,
  //   },
  //   {
  //     creator: "Grace Alade",
  //     studentsTaught: 14,
  //     subjectsTaught: ["IELTS", "TOEFL"],
  //     teachingDays: ["Weekdays"],
  //     teachingDuration: "1-3",
  //     pricing: 15000,
  //     likes: 133,
  //     dislikes: 3,
  //   },
  //   {
  //     creator: "Samuel Aganaba",
  //     studentsTaught: 25,
  //     subjectsTaught: ["Keyboard", "Guitar"],
  //     teachingDays: ["Weekends"],
  //     teachingDuration: "1-4",
  //     pricing: 25000,
  //     likes: 79,
  //     dislikes: 3,
  //   },
  //   {
  //     creator: "Kazeem Abubakar",
  //     studentsTaught: 32,
  //     subjectsTaught: ["Mathematics"],
  //     teachingDays: ["Mon", "Tue", "Fri"],
  //     teachingDuration: "1-5",
  //     pricing: 5000,
  //     likes: 56,
  //     dislikes: 2,
  //   },
  //   {
  //     creator: "Sarah Soyinka",
  //     studentsTaught: 28,
  //     subjectsTaught: ["Physics", "Chemistry"],
  //     teachingDays: ["Everyday"],
  //     teachingDuration: "1-5",
  //     pricing: 15000,
  //     likes: 55,
  //     dislikes: 1,
  //   },
  // ];

  const categories = [
    {
      bgImg: "/images/marketplaceMisc/music.png",
      text: "Music",
    },
    {
      bgImg: "/images/marketplaceMisc/science.png",
      text: "Science",
    },
    {
      bgImg: "/images/marketplaceMisc/mathematics.png",
      text: "Mathematics",
    },
    {
      bgImg: "/images/marketplaceMisc/fashion.png",
      text: "Fashion",
    },
    {
      bgImg: "/images/marketplaceMisc/artsandcraft.png",
      text: "Arts & Craft",
    },
    {
      bgImg: "/images/marketplaceMisc/literature.png",
      text: "Literature",
    },
    {
      bgImg: "/images/marketplaceMisc/funandgames.png",
      text: "Fun & Games",
    },
    {
      bgImg: "/images/marketplaceMisc/language.png",
      text: "Language",
    },
  ];

  const newCourses = [
    {
      creator: "Joseph Suleiman",
      courseTitle: "How to play Scrabble like a pro",
      courseLength: "3.5 Hours",
      courseAverageRating: 4.9,
      numberOfRatings: 22,
      coursePrice: "Free",
      courseImage: "/images/marketplaceMisc/newcourse1.png",
    },
    {
      creator: "Ruth Okujagu",
      courseTitle: "Phonics and Numbers - First steps for your kid",
      courseLength: "1.5 Hours",
      courseAverageRating: 3.9,
      numberOfRatings: 5,
      coursePrice: "5000",
      courseImage: "/images/marketplaceMisc/newcourse2.png",
    },
  ];

  return (
    <Box
      h={"94vh"}
      overflowY={"auto"}
      overflowX={"hidden"}
      pb={{ base: "5rem", md: "0" }}
    >
      <Head>
        <title>Greynote Parent - Marketplace</title>
        <meta property="og:title" content="Greynote Parent - Marketplace" />
        <meta
          property="og:description"
          content="Explore a wide range of educational courses tailored for kids on the Greynote Marketplace. From interactive lessons to personalized tutoring, find the right resources to support your child's learning journey. Connect with qualified lesson teachers and provide your child with the tools they need to succeed."
        />
        <meta
          property="og:image"
          content="/images/openGraphImages/gnMarketplace.png"
        />
        <meta
          property="og:url"
          content="https://parent.greynote.app/dashboard/marketplace"
        />
      </Head>
      {/* Main Body */}
      <Box>
        {/* Main Content */}
        <Flex flexDir={"column"} justifyContent={"space-between"}>
          <Box>
            <Box
              position={"relative"}
              display={"flex"}
              flexDir={"column"}
              gap={2}
            >
              <Flex
                gap={2}
                animation={`${marqueeLeft} 100s linear infinite`}
                maxW="100%"
              >
                {[...Array(5)].map((_, index) =>
                  [...Array(13)].map((_, index) => (
                    <Image
                      src={`/images/marketplacebg/MQ${index + 1}.png`}
                      key={`marquee-${index}`}
                      alt={`Market Image ${index + 1}`}
                      boxSize="150px"
                    />
                  ))
                )}
              </Flex>
              <Flex
                gap={2}
                animation={`${marqueeRight} 150s linear infinite`}
                width="100%"
              >
                {[...Array(5)].map((_, index) =>
                  [...Array(13)].map((_, index) => (
                    <Image
                      src={`/images/marketplacebg/MQ${index + 13}.png`}
                      key={`marquee-${index}`}
                      alt={`Market Image ${index + 13}`}
                      boxSize="150px"
                    />
                  ))
                )}
              </Flex>
              <Flex
                gap={2}
                animation={`${marqueeLeft} 100s linear infinite`}
                width="100%"
              >
                {[...Array(5)].map((_, index) =>
                  [...Array(13)].map((_, index) => (
                    <Image
                      src={`/images/marketplacebg/MQ${index + 26}.png`}
                      key={`marquee-${index}`}
                      alt={`Market Image ${index + 26}`}
                      boxSize="150px"
                    />
                  ))
                )}
              </Flex>
              <Box
                position={"absolute"}
                top={0}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                w={"full"}
                h={"full"}
                flexDir={"column"}
                bg="rgba(0, 0, 0, 0.6)"
              >
                <Flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  flexDir={"column"}
                  p={"1rem"}
                  gap={6}
                >
                  <Text
                    fontWeight={"900"}
                    maxW={"500px"}
                    textAlign={"center"}
                    fontSize={{ base: "3xl", md: "4xl" }}
                    px={"1rem"}
                    color={"#fff"}
                  >
                    Find <span style={{ color: "#FFAD60" }}>Fun</span> and
                    <span style={{ color: "#FFAD60" }}> Captivating</span>{" "}
                    content for your kids
                  </Text>
                  <Flex>
                    <Box
                      bg={"#DCDCDC99"}
                      p={"0.4rem"}
                      rounded={"2xl"}
                      border={"1px solid #AEAEAE"}
                    >
                      <Box bg={"#fff"} rounded={"10px"}>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<FiSearch color="#999999" />}
                          />
                          <Input
                            border={"1px solid #fff"}
                            focusBorderColor="transparent"
                            rounded={"10px"}
                            bg={"#fff"}
                            w={{ base: "250px", md: "400px" }}
                            type="text"
                            _placeholder={{ color: "#C1C1C1" }}
                            placeholder="Guitar lessons"
                            onFocus={() => setSearchActive(true)}
                            onBlur={() => setSearchActive(false)}
                          />
                        </InputGroup>
                        <Flex
                          flexDir={"column"}
                          mt={"0.5rem"}
                          px={"1rem"}
                          pb={"2rem"}
                          display={isSearchActive ? "block" : "none"}
                        >
                          <Text
                            fontSize={"2xs"}
                            fontWeight={"semibold"}
                            color={"#747474"}
                          >
                            Suggested searches
                          </Text>
                        </Flex>
                      </Box>
                    </Box>
                  </Flex>
                </Flex>
              </Box>
            </Box>
          </Box>

          {/* Trending courses section */}
          <Carousel test1={"Trending Courses"} test2="on Greynote">
            {tempCourseData.map((item, index) => (
              <ProductCard
                key={index}
                creator={item.creator}
                courseTitle={item.courseTitle}
                courseLength={item.courseLength}
                courseAverageRating={item.courseAverageRating}
                numberOfRatings={item.numberOfRatings}
                coursePrice={item.coursePrice}
                courseImage={item.courseImage}
              />
            ))}
          </Carousel>

          {/* Tutors section */}
          <Carousel test1={"Find Tutors"} test2="on Greynote">
            {tempCourseData.map((item, index) => (
              <TutorCard
                key={index}
                creator={item.creator}
                courseTitle={item.courseTitle}
                courseLength={item.courseLength}
                courseAverageRating={item.courseAverageRating}
                numberOfRatings={item.numberOfRatings}
                coursePrice={item.coursePrice}
                courseImage={item.courseImage}
              />
            ))}
          </Carousel>

          {/* Top Categories on Greynote */}
          <Box
            mt={"3rem"}
            display={"flex"}
            flexDir={"column"}
            px={{ base: "0.8rem", md: "3rem" }}
            mb={"5rem"}
          >
            <Heading fontSize={"lg"} fontWeight={"semibold"}>
              <span style={{ color: "#007C7B" }}>Top Categories</span> on
              Greynote
            </Heading>
            <SimpleGrid
              templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
              spacing="8px"
              mt={"1rem"}
            >
              {categories.map((category, index) => (
                <Box
                  backgroundImage={category.bgImg}
                  backgroundPosition={"center"}
                  backgroundSize={"cover"}
                  backgroundRepeat={"no-repeat"}
                  display={"flex"}
                  alignItems={"center"}
                  h={70}
                  rounded={"4px"}
                  key={index}
                  transition={"0.3s ease"}
                  _hover={{ transform: "scale(1.02)", transition: "0.3s ease" }}
                >
                  <Text
                    pointerEvents={"none"}
                    fontSize={"2xl"}
                    ml={"2.5rem"}
                    fontWeight={"bold"}
                    color="#ffffff"
                  >
                    {category.text}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          {/* Last section */}
          <Flex
            px={{ base: "0.8rem", md: "3rem" }}
            gap={3}
            flexDir={{ base: "column", lg: "row" }}
          >
            <Box
              rounded={"4px"}
              display={"flex"}
              flexDir={"column"}
              backgroundImage={"/images/marketplaceMisc/newcoursesbg.png"}
              backgroundPosition={"center"}
              backgroundSize={"cover"}
              backgroundRepeat={"no-repeat"}
              flex={1}
              h={"full"}
              px={"1rem"}
              py={"0.8rem"}
            >
              <Heading
                fontSize={"xl"}
                fontWeight={"semibold"}
                color={"#ffffff"}
              >
                <span style={{ color: "#007C7B" }}>New Courses</span> on
                Greynote
              </Heading>

              <Flex gap={2} mt={"1rem"} flexDir={{ base: "column", sm: "row" }}>
                {newCourses.map((course, index) => (
                  <Box
                    backgroundColor={"#ffffff"}
                    display={"flex"}
                    flexDir={"column"}
                    p={"0.4rem"}
                    border={"1px solid #E2E2E2"}
                    rounded={"lg"}
                    h={{ base: "full", md: 250 }}
                    boxShadow="sm"
                    transition="all 0.3s"
                    _hover={{ boxShadow: "sm", transform: "translateY(-3px)" }}
                    justifyContent={"space-between"}
                    w={{ base: "auto", md: "270px" }}
                  >
                    <Box>
                      <Image
                        w={"full"}
                        rounded={"6px"}
                        height={{ base: 150, md: 110 }}
                        objectFit={"cover"}
                        objectPosition={"center"}
                        src={course.courseImage}
                        alt="Course Image"
                      />

                      <Flex gap={4} alignItems={"center"} mt={"0.5rem"}>
                        <Flex
                          alignItems={"center"}
                          gap={2}
                          justifyContent={"center"}
                        >
                          <Avatar
                            src="https://th.bing.com/th/id/R.17c378ecd14228068c7fdec834145e1d?rik=zS00P6Rn7vbTmQ&pid=ImgRaw&r=0"
                            size={{ base: "sm", md: "xs" }}
                          />
                          <Text
                            fontSize={{ base: "sm", md: "2xs" }}
                            fontWeight={"semibold"}
                            noOfLines={1}
                          >
                            {course.creator}
                          </Text>
                        </Flex>
                        <TopCreatorBadge />
                      </Flex>

                      <Text
                        fontSize={{ base: "sm", md: "2xs" }}
                        fontWeight={"bold"}
                        mt={"0.5rem"}
                        noOfLines={1}
                      >
                        {course.courseTitle}
                      </Text>

                      <Flex mt={"0.5rem"} gap={3}>
                        <Flex alignItems={"center"} gap={1}>
                          <Icon as={LuClock2} boxSize={3} color={"#007C7B"} />
                          <Text fontSize={"2xs"} fontWeight={"bold"}>
                            {course.courseLength} Hours
                          </Text>
                        </Flex>

                        <Flex alignItems={"center"} gap={1}>
                          <Icon as={IoIosStar} boxSize={3} color={"#FDBC52"} />
                          <Text fontSize={"2xs"} fontWeight={"bold"}>
                            {course.courseAverageRating}
                          </Text>
                          <Text
                            fontSize={"2xs"}
                          >{`(${course.numberOfRatings})`}</Text>
                        </Flex>
                      </Flex>
                    </Box>

                    <Flex
                      alignItems={"center"}
                      mt={"1rem"}
                      gap={2}
                      justifyContent={"space-between"}
                    >
                      <Text fontWeight={"bold"} fontSize={"md"}>
                        {course.coursePrice == "Free"
                          ? "Free"
                          : `₦${Number(course.coursePrice).toLocaleString()}`}
                      </Text>
                      <Flex alignItems={"center"} gap={2} h={"full"}>
                        <Icon
                          as={PiHeart}
                          boxSize={5}
                          _hover={{
                            cursor: "pointer",
                            transform: "scale(1.1)",
                          }}
                          transition={"0.3s ease"}
                        />
                        <Button
                          fontSize={"2xs"}
                          backgroundColor={"#007C7B"}
                          color={"#fff"}
                          rounded={"3px"}
                          h={"25px"}
                          _hover={{ backgroundColor: "#159895" }}
                        >
                          Add to Cart
                        </Button>
                      </Flex>
                    </Flex>
                  </Box>
                ))}
              </Flex>
            </Box>

            <Flex gap={3} flexDir={{ base: "column", sm: "row" }}>
              <Box
                rounded={"4px"}
                display={"flex"}
                flexDir={"column"}
                backgroundImage={"/images/marketplaceMisc/gncoinbg.png"}
                backgroundPosition={"center"}
                backgroundSize={"cover"}
                backgroundRepeat={"no-repeat"}
                px={"2rem"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={3}
                h={{ base: 300, md: "auto" }}
                maxW={{ base: "full", lg: "300px" }}
              >
                <Text
                  fontSize={{ base: "lg", md: "2xl" }}
                  color={"#ffffff"}
                  fontWeight={"semibold"}
                >
                  Greynote Coin
                </Text>

                <Text
                  color={"#ffffff"}
                  textAlign={"center"}
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight={"light"}
                >
                  The easiest and fastest way to purchase content for your kids
                  on Greynote
                </Text>

                <Button background={"#fff"} fontSize={"2xs"} color={"#007C7B"}>
                  Learn more
                </Button>
              </Box>

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
                px={"1.5rem"}
                gap={2}
                alignItems={"center"}
                maxW={{ base: "full", lg: "350px" }}
              >
                <Text
                  fontWeight={"semibold"}
                  fontSize={{ base: "lg", md: "xl" }}
                >
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
            </Flex>
          </Flex>
        </Flex>

        {/* Footer */}
        <Flex justifyContent={'space-between'} px={{base:"0.8rem", md:"3rem"}} mt={'4rem'}>
          <Flex gap={{base: 3, md:6}}>
            <Text color={'#959595'} fontSize={{base:"3xs", md:'sm'}}>Terms of use</Text>
            <Text color={'#959595'} fontSize={{base:"3xs", md:'sm'}}>Privacy Policy</Text>
          </Flex>

          <Text color={'#959595'} fontSize={{base:"3xs", md:'sm'}}>Copyright ©️ 2024 Greynote Ltd.</Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default Marketplace;
