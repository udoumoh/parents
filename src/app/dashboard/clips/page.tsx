"use client";
import React, { FC, useRef } from "react";
import { Box, Button } from "@chakra-ui/react";
import ResultSheet from "@/components/ResultSheet";

interface ClipsProps {}

const Clips: FC<ClipsProps> = () => {
  const resultSheetRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContent = resultSheetRef.current;
    const WindowPrint = window.open("", "", "width=1920,height=1080");

    if (WindowPrint && printContent) {
      const printDocument = WindowPrint.document;

      // Append the content of the resultSheet
      printDocument.write("<html><head><title>Print</title>");

      // Copy styles from the main document
      Array.from(
        document.head.querySelectorAll("style, link[rel='stylesheet']")
      ).forEach((styleElement) => {
        printDocument.write(styleElement.outerHTML);
      });

      // Add custom styles directly
      printDocument.write(`
        <style>
          table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
          }
          td, th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
          }
          tr:nth-child(even) {
            background-color: #dddddd;
          }
        </style>
      `);

      printDocument.write("</head><body>");
      printDocument.write(printContent.outerHTML);
      printDocument.write("</body></html>");

      printDocument.close();
      WindowPrint.focus();
      WindowPrint.print();
      WindowPrint.close();
    }
  };

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
