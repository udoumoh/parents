"use client";
import { FC, useState } from "react";
import {
  Box,
  Image,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Link,
  Icon,
} from "@chakra-ui/react";
import SearchResultItem from "@/components/shared/searchResultItem";
import { IoIosSearch } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const [searchInput, setSearchInput] = useState("");
  const handleSearchChange = (e: any) => {
    setSearchInput(e.target.value);
  };
  const studentData = [
    {
      name: "Chibuzor Ali-Williams",
      age: 9,
      className: "Nursery 1",
      gender: "Male",
      profileImageUrl:
        "https://th.bing.com/th/id/R.4c5a711143bfb1a8d5a5c8e4c806b86c?rik=5Syk2%2bsOsteflA&riu=http%3a%2f%2f4.bp.blogspot.com%2f-KR2kHf628f0%2fUxDZbTxRBBI%2fAAAAAAAAAw8%2f0wLIlZKXZ0Q%2fs1600%2f(1%2bof%2b2)%2ba.jpg&ehk=bQbTKqYjeuycfjjYeGGOXi9mQxAZFG4F2z6AmjVgV%2bI%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      name: "ALicia keys",
      age: 9,
      className: "Primary 2",
      gender: "Female",
      profileImageUrl:
        "https://thumbs.dreamstime.com/b/image-child-profile-watched-tv-note-shallow-depth-field-189047061.jpg",
    },
    {
      name: "Priyanka Rishi",
      age: 9,
      className: "Kindergarten",
      gender: "Female",
      profileImageUrl:
        "https://images.statusfacebook.com/profile_pictures/beautiful-children-photos/beautiful-children-dp-profile-pictures-for-whatsapp-facebook-15.jpg",
    },
    {
      name: "Grace Williams",
      age: 9,
      className: "Nuersery 2",
      gender: "Female",
      profileImageUrl:
        "https://dp.profilepics.in/profile_pictures/beautiful-children-photos/beautiful-children-dp-profile-pictures-for-whatsapp-facebook-167.jpg",
    },
    {
      name: "Emeka Steve",
      age: 9,
      className: "Primary 2",
      gender: "Male",
      profileImageUrl:
        "https://th.bing.com/th/id/R.738aafb18f512a8b87b225a3279e9b9f?rik=qd5iSoMbrXsY8w&pid=ImgRaw&r=0&sres=1&sresct=1",
    },
    {
      name: "Emeka Chibuzor",
      age: 9,
      className: "Primary 1",
      gender: "Male",
      profileImageUrl:
        "https://dp.profilepics.in/profile_pictures/beautiful-children-photos/beautiful-children-dp-profile-pictures-for-whatsapp-facebook-167.jpg",
    },
  ];
  const filteredSearchData = studentData.filter((item) =>
    item.name.toLowerCase().includes(searchInput.toLowerCase())
  );
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      minH={"100vh"}
    >
      <Box
        px={"2rem"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={"column"}
        gap={10}
      >
        <Image src="/images/greylightBordered.svg" alt="logo" />
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          backgroundImage={"/images/linkchildbg.png"}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          w={{ base: "auto", lg: "670px" }}
          h={{ base: "auto", lg: "176px" }}
          p={{ base: "1rem", lg: "0rem" }}
          rounded={"xl"}
        >
          <Text
            textAlign={"center"}
            color={"#fff"}
            fontSize={{ base: "xl", lg: "3xl" }}
            fontWeight={"700"}
          >
            Link your child to your account
          </Text>
        </Box>
        <Box
          w={"full"}
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <InputGroup>
            <InputLeftElement pointerEvents="none" mt="0.9rem">
              <IoIosSearch color="#C2C2C2" size="28" />
            </InputLeftElement>
            <Input
              fontSize={"xl"}
              py={"2rem"}
              onChange={handleSearchChange}
              value={searchInput}
              type="text"
              placeholder="Search for your child"
              backgroundColor={"#F4F4F4"}
              _placeholder={{ color: "#C2C2C2" }}
            />
          </InputGroup>
          {searchInput && (
            <Box
              w={"full"}
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              mt={"1rem"}
            >
              {filteredSearchData.map((item, index) => (
                <SearchResultItem student={item} key={index} />
              ))}
            </Box>
          )}

          <Button
            mt="6rem"
            w={"70%"}
            py={"2rem"}
            px={{base:'4rem', lg:"0rem"}}
            backgroundColor={"#007C7B"}
            color={"#fff"}
            colorScheme="teal"
            _hover={{ backgroundColor: "#044141" }}
            rounded={{base:"md", lg:"lg"}}
          >
            <Icon as={AiOutlinePlus} color={'#fff'} boxSize={{base:"5", lg:'8'}}/>
            <Text fontWeight={"light"} fontSize={{base:"md", lg:"2xl"}} pl="0.5rem">
              Send Link Request
            </Text>
          </Button>

          <Link color={"#B5B5B5"} fontSize={'xl'} mt={'2rem'}>Skip</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
