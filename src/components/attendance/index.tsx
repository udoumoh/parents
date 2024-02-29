import { FC, useEffect } from 'react'
import { 
    Box,
    Text,
    Flex,
    Divider,
    Button,
    Icon,
    Avatar,
    Image,
 } from '@chakra-ui/react';
import { BsArchive } from "react-icons/bs";
import { PrimaryBadge } from '../shared/badge';
import { SecondaryBadge } from '../shared/badge';
import { useQuery } from '@apollo/client';
import { FETCH_STUDENT_ATTENDANCE } from '@/gql/queries/queries';

interface AttendanceProps {
  
}


const Attendance: FC<AttendanceProps> = ({}) => {
  const {data: getattendance} = useQuery(FETCH_STUDENT_ATTENDANCE)

  useEffect(() => {
    try{
      const response = getattendance
      console.log("attendance data", response)
    } catch(err: any){
      console.log(err.message)
    }
  })

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
      border={"1px solid #C2C2C2"}
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

      {attendance.length > 0 ? (
        <>
          {/* Section for absent pupils */}
          <Box>
            <Text fontSize={"sm"} color={"#747474"}>
              Absent
            </Text>

            {attendance.map((item, index) =>
              item.present === false ? (
                <Flex justifyContent={"space-between"} my={"1rem"} key={index}>
                  <Box display={"flex"} flexDir={"column"}>
                    <Text
                      fontSize={{ base: "sm", lg: "md" }}
                      fontWeight={"500"}
                    >
                      Moday 12th February 2024
                    </Text>
                    <Text
                      fontSize={{ base: "2xs", lg: "xs" }}
                      color={"#747474"}
                    >
                      Marked Absent by Korede Nelson, JSS 1 Teacher
                    </Text>
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
                  <Box display={"flex"} flexDir={"column"}>
                    <Text
                      fontSize={{ base: "sm", lg: "md" }}
                      fontWeight={"500"}
                    >
                      Tuesday 13th February 2024
                    </Text>
                    <Text
                      fontSize={{ base: "2xs", lg: "xs" }}
                      color={"#747474"}
                    >
                      Marked Present by Korede Nelson, JSS 1 Teacher
                    </Text>
                  </Box>
                  {item.present ? <PrimaryBadge /> : <SecondaryBadge />}
                </Flex>
              ) : null
            )}
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          mt={"3rem"}
        >
          <Image
            src="/images/attendanceEmptyState.svg"
            alt="No invoice card"
            width={"300px"}
          />
          <Text color={"#747474"} mt={"2rem"}>
            Your ward has no active invoice
          </Text>
        </Box>
      )}
    </Box>
  );
}

export default Attendance