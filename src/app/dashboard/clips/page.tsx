"use client";
import React, { FC, useRef } from "react";
import { Box, Button } from "@chakra-ui/react";
import ResultSheet from "@/components/ResultSheet";
import {useReactToPrint} from 'react-to-print';

interface ClipsProps {}

const Clips: FC<ClipsProps> = () => {
  const resultSheetRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
      content: () => resultSheetRef.current,
    });

  return (
    <Box p={4}>
      <ResultSheet ref={resultSheetRef} />
      <Button mt={4} onClick={handlePrint}>
        Print Result Sheet
      </Button>
    </Box>
  );
};

export default Clips;
