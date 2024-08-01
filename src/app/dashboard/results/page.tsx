"use client";
import React, { FC, useRef } from "react";
import { Box, Button } from "@chakra-ui/react";
// import ResultSheetTemplateThree from "@/components/ResultSheet/TemplateThree";
import {useReactToPrint} from 'react-to-print';

interface ResultProps {}

const Result: FC<ResultProps> = () => {
  const resultSheetRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
      content: () => resultSheetRef.current,
    });

  return (
    <Box p={4}>
      {/* <ResultSheetTemplateThree ref={resultSheetRef} /> */}
      <Button mt={4} onClick={handlePrint}>
        Print Result Sheet
      </Button>
    </Box>
  );
};

export default Result;
