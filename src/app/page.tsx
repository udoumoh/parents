"use client";
import { FC } from "react";
import { Box, Image, Text, Button, Grid } from "@chakra-ui/react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import {BsArrowRightShort} from 'react-icons/bs'
import Dashboard from "@/app/dashboard";

interface pageProps {}

const Home: FC<pageProps> = ({}) => {
  return (
    <div>
      <Dashboard />
      {/* <SidebarWithHeader /> */}
      {/* <Box p={"1.5rem"} > 
        <Box>
          <Box display={'flex'} justifyContent={'space-between'} >
            <Box
              width={"auto"}
              rounded={"xl"}
              border={"1px solid"}
              borderColor={"gray.300"}
              overflow={"hidden"}
            >
              <Box
                backgroundImage={"/images/dbimg.png"}
                width={"auto"}
                h={"10rem"}
                bgRepeat={"no-repeat"}
              />
              <Image
                src="/images/schoollogo.png"
                alt="logo"
                w={"5rem"}
                h={"5rem"}
                mx={"auto"}
                mt={"-100px"}
                border={"5px solid #fff"}
                rounded={"2xl"}
              />
              <Box textAlign={"center"} my={"0.5rem"} px={'2rem'}>
                <Text fontSize={"xl"} fontWeight={"600"}>
                  Green Springs High School
                </Text>
                <Text fontSize="md" color={"#959595"}>
                  Your ward attends this school
                </Text>
                <Button
                  bg={"#005D5D"}
                  color={"#fff"}
                  my={"2rem"}
                  fontWeight={"light"}
                  _hover={{ backgroundColor: "#005F" }}
                >
                  <BiMessageRoundedDetail size={"1.3rem"} />
                  <Text mx={"0.2rem"}>Contact School</Text>
                </Button>
              </Box>
            </Box>

            <Box
              width={"70%"}
              rounded={"xl"}
              border={"1px solid"}
              borderColor={"gray.300"}
              overflow={"hidden"}
              p={"1rem"}
              bgImage={'/images/childcard.png'}
              bgSize={'cover'}
            >
              <Box display={'flex'} justifyContent={'space-between'}>
                <Box display={"flex"} alignItems={"center"} gap={4}>
                  <Image
                    src="/images/profileImg.jpeg"
                    width={{ md: "4rem" }}
                    height={{ md: "4rem" }}
                    borderRadius={"50%"}
                    alt="profile"
                  />
                  <Box lineHeight={"20px"}>
                    <Text fontWeight={"600"} fontSize={"lg"}>
                      Chibuzor Ali-Williams
                    </Text>
                    <Text
                      fontSize={"1rem"}
                      fontWeight={"600"}
                      color={"#AAAAAA"}
                    >
                      GN24002
                    </Text>
                  </Box>
                </Box>
                <Image
                  src="/images/schoollogo.png"
                  alt="profileImg"
                  w={"4.5rem"}
                  h={"4.5rem"}
                />
              </Box>
              <Box>
                <Text fontWeight={'600'} my={'0.5rem'}>Student Cases</Text>
                <Box textAlign={'center'} display={'flex'} gap={10} mb={'1rem'}>
                  <Grid>
                    <Text fontSize={'lg'} fontWeight={'600'}>5</Text>
                    <Text color={'#8F8F8F'} fontWeight={'600'} fontSize={'0.7rem'}>Fees Default</Text>
                  </Grid>
                  <Grid>
                    <Text fontSize={'lg'} fontWeight={'600'}>1</Text>
                    <Text color={'#8F8F8F'} fontWeight={'600'} fontSize={'0.7rem'}>Suspension</Text>
                  </Grid>
                  <Grid>
                    <Text fontSize={'lg'} fontWeight={'600'}>0</Text>
                    <Text color={'#8F8F8F'} fontWeight={'600'} fontSize={'0.7rem'}>Expulsion</Text>
                  </Grid>
                </Box>

                <Box textAlign={'start'} display={'flex'} gap={10} my={'1rem'}>
                  <Grid>
                    <Text color={'#8F8F8F'} fontSize={'0.8rem'} fontWeight={'600'}>Gender</Text>
                    <Text fontWeight={'600'} fontSize={'lg'}>Male</Text>
                  </Grid>
                  <Grid>
                    <Text color={'#8F8F8F'} fontSize={'0.8rem'} fontWeight={'600'}>Class</Text>
                    <Text fontWeight={'600'} fontSize={'lg'}>JSS 1</Text>
                  </Grid>
                  <Grid>
                    <Text color={'#8F8F8F'} fontSize={'0.8rem'} fontWeight={'600'}>Date of Birth</Text>
                    <Text fontWeight={'600'} fontSize={'lg'}>15th July 2010</Text>
                  </Grid>
                </Box>

                <Box textAlign={'start'} display={'flex'} gap={10} my={'1rem'}>
                  <Grid>
                    <Text color={'#8F8F8F'} fontSize={'0.8rem'} fontWeight={'600'}>Date Enrolled</Text>
                    <Text fontWeight={'600'} fontSize={'lg'}>13th August 2019</Text>
                  </Grid>
                  <Grid>
                    <Text color={'#8F8F8F'} fontSize={'0.8rem'} fontWeight={'600'}>Expected Graduation</Text>
                    <Text fontWeight={'600'} fontSize={'lg'}>15th July 2025</Text>
                  </Grid>
                  <Grid>
                    <Text color={'#8F8F8F'} fontSize={'0.8rem'} fontWeight={'600'}>Date Registered</Text>
                    <Text fontWeight={'600'} fontSize={'lg'}>21st July 2023</Text>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box border={'1px solid'} borderColor={'gray.300'} rounded={'xl'}>
            <Box textAlign={'center'}>
              <Image src="/images/udcard.png" alt="card" mx={'auto'} mb={'1.5rem'}></Image>
              <Text fontWeight={'600'}>You have no messages</Text>
              <Text fontWeight={'600'}>Send a message to see them here</Text>
            </Box>

            <Box>
              <Box>
                <Grid>
                  <Text>Greycases</Text>
                  <Text>Student cases that require action</Text>
                </Grid>
                <Button color={'#005D5D'} bg={'#E8E8E8'}>
                  <Text>Show all</Text>
                  <BsArrowRightShort />
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box> */}
    </div>
  );
};

export default Home;
