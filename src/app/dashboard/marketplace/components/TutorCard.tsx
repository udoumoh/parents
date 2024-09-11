import { FC } from "react";
import { Box, Flex, Text, Avatar, Icon, Button, Image } from "@chakra-ui/react";
import { LuClock2 } from "react-icons/lu";
import { IoIosStar } from "react-icons/io";
import { PiHeart } from "react-icons/pi";
import { TbUsersGroup } from "react-icons/tb";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { BiLike, BiDislike } from "react-icons/bi";

interface TutorCardProps {
  creator: string;
  courseTitle: string;
  courseLength: string;
  courseAverageRating: number;
  numberOfRatings: number;
  coursePrice: string;
  courseImage: string;
}

const TutorCard: FC<TutorCardProps> = ({
  creator,
  courseTitle,
  courseLength,
  courseAverageRating,
  numberOfRatings,
  coursePrice,
  courseImage,
}) => {
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      px={{ base: "0.4rem", md: "0.8rem" }}
      py={{ base: "0.8rem", md: "0.8rem" }}
      border={"1px solid #E2E2E2"}
      rounded={"xl"}
      boxShadow="sm"
      transition="all 0.3s"
      _hover={{ boxShadow: "sm", transform: "translateY(-3px)" }}
    >
      <Flex gap={2} alignItems={"initial"}>
        <Avatar
          src="https://th.bing.com/th/id/R.17c378ecd14228068c7fdec834145e1d?rik=zS00P6Rn7vbTmQ&pid=ImgRaw&r=0"
          size={{ base: "sm", md: "md" }}
        />

        <Flex flexDir={"column"} justifyContent={"space-between"} gap={1}>
          <Text fontWeight={"semibold"} fontSize={{ base: "sm", md: "lg" }}>
            Grace Alade
          </Text>
          <Flex alignItems={"center"} gap={1}>
            <Icon as={TbUsersGroup} boxSize={3} color={"#007C7B"} />
            <Text fontSize={{ base: "2xs", md: "xs" }} fontWeight={"semibold"}>
              Students Taught: <strong>14</strong>
            </Text>
          </Flex>

          <Flex alignItems={"center"} gap={2}>
            <Flex alignItems={"center"} gap={1}>
              <Icon as={HiOutlineBookOpen} boxSize={3} color={"#007C7B"} />
              <Text
                fontSize={{ base: "2xs", md: "xs" }}
                fontWeight={"semibold"}
                isTruncated
                maxW={"40px"}
              >
                IELTS, TOEFL
              </Text>
            </Flex>

            <Flex alignItems={"center"} gap={1}>
              <Icon as={LuClock2} boxSize={3} color={"#007C7B"} />
              <Text
                fontSize={{ base: "2xs", md: "xs" }}
                fontWeight={"semibold"}
              >
                Weekdays • 1-4 hr
              </Text>
            </Flex>
          </Flex>

          <Flex alignItems={"center"} gap={2}>
            <Flex alignItems={"center"} gap={1}>
              <Icon as={AiOutlineDollarCircle} boxSize={3} color={"#007C7B"} />
              <Text
                fontSize={{ base: "2xs", md: "xs" }}
                fontWeight={"semibold"}
              >
                From ₦15,000
              </Text>
            </Flex>

            <Flex alignItems={"center"} gap={1}>
              <Icon as={BiLike} boxSize={3} color={"#007C7B"} />
              <Text fontSize={{ base: "2xs", md: "xs" }} fontWeight={"bold"}>
                133
              </Text>
            </Flex>

            <Flex alignItems={"center"} gap={1}>
              <Icon as={BiDislike} boxSize={3} color={"#007C7B"} />
              <Text fontSize={{ base: "2xs", md: "xs" }} fontWeight={"bold"}>
                3
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default TutorCard;
