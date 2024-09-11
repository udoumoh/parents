import { FC } from 'react'
import { Flex, Text, Icon } from '@chakra-ui/react'
import { IoDiamondOutline } from "react-icons/io5";

interface TopCreatorBadgeProps {
  
}

const TopCreatorBadge: FC<TopCreatorBadgeProps> = ({}) => {
  return (
    <>
      <Flex
        gap={1}
        rounded={"full"}
        py={"0.3rem"}
        px={"0.6rem"}
        alignItems={"center"}
        justifyContent={'center'}
        bg={"#FFD596"}
      >
        <Icon as={IoDiamondOutline} boxSize={{base:2, md:3}} color={"#5F4929"}/>
        <Text color={"#5F4929"} fontSize={{base:"6px", md:'3xs'}} fontWeight={'semibold'}>
          Top Creator
        </Text>
      </Flex>
    </>
  );
}

export default TopCreatorBadge