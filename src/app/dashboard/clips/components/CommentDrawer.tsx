import { FC } from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
  Flex,
  Box,
  Text,
  Icon,
} from "@chakra-ui/react";

interface CommentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const comments = [
  {
    profileUrl: "",
    userName: "Buharimustgo21",
    timePosted: "1w",
    comment:
      "I have to be very careful during this buhari regime so i don't starve",
    likeCount: 144,
    replies: [
      {
        profileUrl: "",
        userName: "cantTaykeith982",
        timePosted: "5d",
        repliedTo: "Buharimustgo21",
        comment: "way too funny😂👌",
        likeCount: 1,
      },
      {
        profileUrl: "",
        userName: "oldscoolNigga419",
        timePosted: "4d",
        repliedTo: "cantTaykeith982",
        comment: "couldn't agree more man",
        likeCount: 8,
      },
    ],
  },
];

const CommentItem = () => {
  return(
    <>
    <Flex>
      
    </Flex>
    </>
  )
}

const CommentDrawer: FC<CommentDrawerProps> = ({isOpen, onClose}) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg={"#F5F7F8"} rounded={'xl'}>
        <DrawerCloseButton />
        <DrawerHeader fontSize={'md'} fontWeight={'bold'}>Comments</DrawerHeader>

        <DrawerBody>
          <Input placeholder="Type here..." />
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue">Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default CommentDrawer