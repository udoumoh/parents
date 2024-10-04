import { Flex, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useUserAPI } from "@/hooks/UserContext";

interface FreeTrialProps {
  createdAt: number;
}

const FreeTrial: React.FC<FreeTrialProps> = ({ createdAt }) => {
  const targetDate = new Date(createdAt);
  targetDate.setDate(targetDate.getDate() + 98);

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      // Countdown has reached zero or beyond
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [createdAt]);

  const expired =
    timeLeft.days + timeLeft.hours + timeLeft.minutes + timeLeft.seconds;

  return (
    <Flex direction="column" align="center">
      {/* <Text my={2} fontSize={12} display={expired === 0 ? "block" : "none"} >Your free trial period has ended</Text> */}
      <Flex gap={2}>
        <Flex
          direction="column"
          align="center"
          p={2}
          borderRadius="md"
          bg="#005D5D30"
        >
          <strong>{timeLeft.days}</strong>
          <Text fontSize={13}>{timeLeft.days > 1 ? "Days" : "Day"} </Text>
        </Flex>
        <Flex
          direction="column"
          align="center"
          p={2}
          borderRadius="md"
          bg="#005D5D30"
        >
          <strong>{timeLeft.hours}</strong>
          <Text fontSize={13}>{timeLeft.hours > 1 ? "Hours" : "Hour"}</Text>
        </Flex>
        <Flex
          direction="column"
          align="center"
          p={2}
          borderRadius="md"
          bg="#005D5D30"
        >
          <strong>{timeLeft.minutes}</strong>
          <Text fontSize={13}>{timeLeft.minutes > 1 ? "Mins" : "Min"}</Text>
        </Flex>
        <Flex
          direction="column"
          align="center"
          p={2}
          borderRadius="md"
          bg="#005D5D30"
        >
          <strong>{timeLeft.seconds}</strong>
          <Text fontSize={13}>{timeLeft.seconds > 1 ? "Secs" : "Sec"}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default FreeTrial;
