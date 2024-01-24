import { FC } from 'react'
import { 
    Flex,
    Image,
    Text,
    Button,
} from '@chakra-ui/react'

interface emptyInboxCardProps {
  
}

const EmptyInboxCard: FC<emptyInboxCardProps> = ({}) => {
  return (
    <Flex
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      w={"50%"}
      textAlign={"center"}
    >
      <Image
        src="/images/inboxillustration.svg"
        alt="No message"
        my={"1rem"}
        boxSize={"32"}
      />
      <Text fontSize={"xl"} fontWeight={"bold"} my={"0.8rem"}>
        Your Inbox
      </Text>
      <Text color={"#4B4B4B"} my={"0.8rem"}>
        Send and receive direct messages from school admins or teachers
      </Text>
      <Button
        size={"md"}
        backgroundColor={"#005D5D"}
        rounded={"lg"}
        my={"0.8rem"}
        colorScheme="teal"
      >
        <Text color={"#fff"} fontSize={"xs"} px={"1.5rem"}>
          Send Message
        </Text>
      </Button>
    </Flex>
  );
}

export default EmptyInboxCard