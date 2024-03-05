import { FC, useEffect, useState } from 'react'
import { 
    Box,
    Text,
    Flex,
    Divider,
    Icon,
    Image,
 } from '@chakra-ui/react';
import { BsArchive } from "react-icons/bs";
import { PrimaryBadge } from '../shared/badge';
import { SecondaryBadge } from '../shared/badge';
import { useQuery } from '@apollo/client';
import { GET_STUDENT_ATTENDANCE } from '@/gql/queries/queries';
import { useUserAPI } from '@/hooks/UserContext';

interface AttendanceProps {
  
}

interface AttendanceItemProps {
  id: number | undefined;
  createdAt: string | undefined;
  present: boolean | undefined;
  note: string | undefined;
};


const Attendance: FC<AttendanceProps> = ({}) => {
  const {currentWardProfile} = useUserAPI()
  const [attendance, setAttendance] = useState<AttendanceItemProps[]>([]);
  const { data: getattendance } = useQuery(GET_STUDENT_ATTENDANCE, {
    variables: { studentId: currentWardProfile?.id },
  });
  useEffect(() => {
    const fetchData = async() => {
      try{
        const response = await getattendance
        const parsedAttendance = response?.fetchStudentAttendance?.map((item: any) => ({
            id: item.id,
            createdAt: item.createdAt,
            present: item.isPresent,
            note: item.note,
          }))
          setAttendance(parsedAttendance)
      } catch(err: any){
        console.log(err.message)
      }
    }
    fetchData()
  }, [getattendance])

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

     {attendance?.length > 0 ? (
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
                   <Text fontSize={{ base: "sm", lg: "md" }} fontWeight={"500"}>
                     {item.createdAt}
                   </Text>
                   <Text fontSize={{ base: "2xs", lg: "xs" }} color={"#747474"}>
                     {item.note}
                   </Text>
                 </Box>
                 {item.present ? <PrimaryBadge /> : <SecondaryBadge />}
               </Flex>
             ) : (
               <>
                 <Text>
                   No absences reported for this week for this child.🌟
                 </Text>
               </>
             )
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
                   <Text fontSize={{ base: "sm", lg: "md" }} fontWeight={"500"}>
                     {item.createdAt}
                   </Text>
                   <Text fontSize={{ base: "2xs", lg: "xs" }} color={"#747474"}>
                     {item.note}
                   </Text>
                 </Box>
                 {item.present ? <PrimaryBadge /> : <SecondaryBadge />}
               </Flex>
             ) : (
               <>
                 <Text>
                   ⚠️ Your child has not been in school this week.
                 </Text>
               </>
             )
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
           pointerEvents={"none"}
         />
         <Text color={"#747474"} mt={"2rem"}>
           No attendance has been recorded for your ward
         </Text>
       </Box>
     )}
   </Box>
 );
}

export default Attendance