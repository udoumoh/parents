'use client'
import { FC } from "react";
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Button, Text, Icon} from "@chakra-ui/react";
import {
  IoReceiptOutline,
} from "react-icons/io5";
import { TbLayoutDashboard, TbFileInvoice } from "react-icons/tb";
import { PiAddressBook } from "react-icons/pi";
import Invoice from "./components/Invoice/page";
import Overview from "./components/Overview/page";
import Results from "./components/Results/page";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const invoiceTabs = [
    {
      tabName: "Overview",
      iconLight: TbLayoutDashboard,
      content: <Overview />,
    },
    {
      tabName: "Academics",
      iconLight: PiAddressBook,
      content: <Results />,
    },
    {
      tabName: "Invoice",
      iconLight: TbFileInvoice,
      content: <Invoice />,
    },
  ];

  return (
    <Box w={'full'}>
      <Box>
        <Box>
          <Tabs variant={"unstyled"} size={"xs"} w={"full"}>
            <TabList
              // backgroundColor={"#005D5D40"}
              backgroundColor={"#E9E9E9"}
              p={"0.4rem"}
              rounded={"md"}
              gap={{ base: "1", md: "3" }}
              w={'fit-content'}
            >
              {invoiceTabs.map((tab) => (
                <Tab
                  key={tab.tabName}
                  fontSize={{ base: "xs", md: "md" }}
                  color={"#00000080"}
                  px={{ base: "0.5rem", md: "1rem" }}
                  py={"0.3rem"}
                  borderRadius={"4px"}
                  _selected={{ backgroundColor: "#007C7B", color: "#FFFFFF" }}
                >
                  <Flex alignItems={'center'} gap={2}>
                  <Icon as={tab.iconLight} boxSize={{base:4, md:5}}/>
                  {tab.tabName}
                  </Flex>
                </Tab>
              ))}
            </TabList>

            <TabPanels>
              {invoiceTabs.map((tab, index) => (
                <TabPanel px={0}>
                  {tab.content}
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
