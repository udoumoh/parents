import { FC } from 'react'
import { Box, Flex, Text, Avatar, Icon, Button, Image } from '@chakra-ui/react'
import TopCreatorBadge from '../utils/TopCreatorBadge'
import { LuClock2 } from "react-icons/lu";
import { IoIosStar } from "react-icons/io";
import { PiHeart} from "react-icons/pi";

interface ProductCardProps {
  creator: string;
  courseTitle: string;
  courseLength: string;
  courseAverageRating: number;
  numberOfRatings: number;
  coursePrice: string;
  courseImage: string;
}

const ProductCard: FC<ProductCardProps> = ({creator, courseTitle, courseLength, courseAverageRating, numberOfRatings, coursePrice, courseImage}) => {
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      p={"0.5rem"}
      border={"1px solid #E2E2E2"}
      rounded={"xl"}
      h={{base:"290px", md:"325px"}}
      boxShadow="sm"
      transition="all 0.3s"
     _hover={{ boxShadow: "sm", transform: "translateY(-3px)" }}
      justifyContent={'space-between'}
    >
      <Box>
      <Image
        w={"full"}
        rounded={"10px"}
        height={{base:120, md:150}}
        objectFit={"cover"}
        objectPosition={"center"}
        src={courseImage}
        alt="Course Image"
      />

      <Flex gap={4} alignItems={"center"} mt={"0.5rem"}>
        <Flex alignItems={"center"} gap={2} justifyContent={"center"}>
          <Avatar
            src="https://th.bing.com/th/id/R.17c378ecd14228068c7fdec834145e1d?rik=zS00P6Rn7vbTmQ&pid=ImgRaw&r=0"
            size={{base:"xs",  md:"sm"}}
          />
          <Text fontSize={{base:"2xs", md:"sm"}} fontWeight={"semibold"} noOfLines={1}>
            {creator}
          </Text>
        </Flex>
        <TopCreatorBadge />
      </Flex>

      <Text fontSize={{base:"xs", md:"sm"}} fontWeight={"bold"} mt={"0.5rem"} noOfLines={2}>
        {courseTitle}
      </Text>

      <Flex mt={"0.5rem"} gap={3}>
        <Flex alignItems={"center"} gap={1}>
          <Icon as={LuClock2} boxSize={3} color={"#007C7B"} />
          <Text fontSize={"2xs"} fontWeight={"bold"}>
            {courseLength} Hours
          </Text>
        </Flex>

        <Flex alignItems={"center"} gap={1}>
          <Icon as={IoIosStar} boxSize={3} color={"#FDBC52"} />
          <Text fontSize={"2xs"} fontWeight={"bold"}>
            {courseAverageRating}
          </Text>
          <Text fontSize={"2xs"}>{`(${numberOfRatings})`}</Text>
        </Flex>
      </Flex>
      </Box>

      <Flex
        alignItems={"center"}
        mt={"1rem"}
        gap={2}
        justifyContent={"space-between"}
      >
        <Text fontWeight={"bold"} fontSize={{base:"md", md:"xl"}}>
          {coursePrice == "Free"
            ? "Free"
            : `₦${Number(coursePrice).toLocaleString()}`}
        </Text>
        <Flex alignItems={"center"} gap={2} h={'full'}>
          <Icon as={PiHeart} boxSize={5} _hover={{ cursor: "pointer", transform:"scale(1.1)" }} transition={'0.3s ease'}/>
          <Button
            fontSize={{base:"2xs", sm:"xs"}}
            backgroundColor={"#007C7B"}
            color={"#fff"}
            rounded={"3px"}
            h={"30px"}
            _hover={{ backgroundColor: "#159895" }}
          >
            Add to Cart
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default ProductCard