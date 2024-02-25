import { FC } from 'react'
import { 
    Box,
    Text,
    Flex,
    Divider,
    Button,
    Icon,
    Avatar,
 } from '@chakra-ui/react';
import { BsArchive, BsDot } from "react-icons/bs";
import { PrimaryBadge } from '../shared/badge';
import { SecondaryBadge } from '../shared/badge';

interface AttendanceProps {
  
}


const Attendance: FC<AttendanceProps> = ({}) => {
    const attendance = [
      {
        id: 1,
        profileUrl:
          "https://th.bing.com/th/id/OIP.R1WC47OEbMS_UFtDf7s22AHaI_?pid=ImgDet&rs=1",
        name: "Ajayi Samuel",
        regNo: "GN0230030",
        gender: "Male",
        age: 9,
        present: false,
      },
      {
        id: 2,
        profileUrl:
          "https://th.bing.com/th/id/OIP.R1WC47OEbMS_UFtDf7s22AHaI_?pid=ImgDet&rs=1",
        name: "Ajayi Samuel",
        regNo: "GN0230030",
        gender: "Male",
        age: 9,
        present: false,
      },
      {
        id: 3,
        profileUrl:
          "https://th.bing.com/th/id/OIP.R1WC47OEbMS_UFtDf7s22AHaI_?pid=ImgDet&rs=1",
        name: "Ajayi Samuel",
        regNo: "GN0230030",
        gender: "Male",
        age: 9,
        present: true,
      },
      {
        id: 4,
        profileUrl:
          "https://th.bing.com/th/id/OIP.R1WC47OEbMS_UFtDf7s22AHaI_?pid=ImgDet&rs=1",
        name: "Ajayi Samuel",
        regNo: "GN0230030",
        gender: "Male",
        age: 9,
        present: true,
      },
      {
        id: 5,
        profileUrl:
          "https://th.bing.com/th/id/OIP.R1WC47OEbMS_UFtDf7s22AHaI_?pid=ImgDet&rs=1",
        name: "Ajayi Samuel",
        regNo: "GN0230030",
        gender: "Male",
        age: 9,
        present: true,
      },
      {
        id: 6,
        profileUrl:
          "https://th.bing.com/th/id/OIP.R1WC47OEbMS_UFtDf7s22AHaI_?pid=ImgDet&rs=1",
        name: "Ajayi Samuel",
        regNo: "GN0230030",
        gender: "Male",
        age: 9,
        present: true,
      },
      {
        id: 7,
        profileUrl:
          "https://th.bing.com/th/id/OIP.R1WC47OEbMS_UFtDf7s22AHaI_?pid=ImgDet&rs=1",
        name: "Ajayi Samuel",
        regNo: "GN0230030",
        gender: "Male",
        age: 9,
        present: true,
      },
    ];
  return (
    <Box
      p={"1rem"}
      backgroundColor={"#fff"}
      rounded={"lg"}
      w={"full"}
      border={"1px solid #449c7c"}
      maxW={{ base: "auto", xl: "550px" }}
    >
      <Flex>
        <Box display={"flex"} alignItems={"center"} gap={3}>
          <Icon as={BsArchive} boxSize={"5"} color={"#189879"} />
          <Text fontWeight={"600"} fontSize={"xl"}>
            {"Weekly Attendance"}
          </Text>
        </Box>
      </Flex>

      <Divider color={"#E2E2E2"} my={"0.8rem"} />

      {/* Section for absent pupils */}
      <Box>
        <Text fontSize={"sm"} color={"#747474"}>
          Absent
        </Text>

        {attendance.map((item, index) =>
          item.present === false ? (
            <Flex justifyContent={"space-between"} my={"1rem"} key={index}>
              <Box display={"flex"} alignItems={"center"} gap={2}>
                <Avatar size={"sm"} src={item.profileUrl} />
                <Box>
                  <Text fontSize={"sm"} fontWeight={"500"}>
                    {item.name}
                  </Text>
                  <Flex alignItems={"flex-end"}>
                    <Text color={"#747474"} fontSize={"2xs"}>
                      {item.regNo}
                    </Text>
                    <Icon as={BsDot} color={"#747474"} />
                    <Text color={"#747474"} fontSize={"2xs"}>
                      {item.gender}
                    </Text>
                    <Icon as={BsDot} color={"#747474"} />
                    <Text color={"#747474"} fontSize={"2xs"}>
                      {item.age} Years
                    </Text>
                  </Flex>
                </Box>
              </Box>
              {item.present ? <PrimaryBadge /> : <SecondaryBadge />}
            </Flex>
          ) : null
        )}
      </Box>

      <Divider size={"10"} />

      {/* Section for present pupils */}
      <Box>
        <Text fontSize={"sm"} color={"#747474"} mt={"1rem"}>
          Present
        </Text>

        {attendance.map((item, index) =>
          item.present === true ? (
            <Flex justifyContent={"space-between"} my={"1rem"} key={index}>
              <Box display={"flex"} alignItems={"center"} gap={2}>
                <Avatar size={"sm"} src={item.profileUrl} />
                <Box>
                  <Text fontSize={"sm"} fontWeight={"500"}>
                    {item.name}
                  </Text>
                  <Flex alignItems={"flex-end"}>
                    <Text color={"#747474"} fontSize={"2xs"}>
                      {item.regNo}
                    </Text>
                    <Icon as={BsDot} color={"#747474"} />
                    <Text color={"#747474"} fontSize={"2xs"}>
                      {item.gender}
                    </Text>
                    <Icon as={BsDot} color={"#747474"} />
                    <Text color={"#747474"} fontSize={"2xs"}>
                      {item.age} Years
                    </Text>
                  </Flex>
                </Box>
              </Box>
              {item.present ? <PrimaryBadge /> : <SecondaryBadge />}
            </Flex>
          ) : null
        )}
      </Box>
    </Box>
  );
}

export default Attendance