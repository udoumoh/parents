"use client";
import React, { useEffect, useRef, FC } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { ClipItem } from "./components/ClipItem";

interface ClipsProps {}

const Clips: FC<ClipsProps> = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.5, // Adjust the threshold as needed
      }
    );

    videoRefs.current.forEach((video) => {
      if (video) {
        observer.observe(video);
      }
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) {
          observer.unobserve(video);
        }
      });
    };
  }, []);

  const tempData = [
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  ];

  return (
    <Box
      height="100vh"
      overflowY="scroll"
      css={{ scrollSnapType: "y mandatory" }}
      py={'2rem'}
      pb={'6rem'}
    >
      {tempData.map((item, index) => (
        <ClipItem
          videoLink={item}
          key={index}
          ref={(el) => {
            videoRefs.current[index] = el;
          }}
        />
      ))}
    </Box>
  );
};

export default Clips;
