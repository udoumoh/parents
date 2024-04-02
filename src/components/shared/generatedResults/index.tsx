/* eslint-disable jsx-a11y/alt-text */
import {
  Button,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  Image,
  PDFViewer,
} from "@react-pdf/renderer";
import React from "react";
import { formatDate } from "@/helpers/formatDate";

interface GeneratedResultsProps {
  result: {
    test1: [];
    test2: [];
    test3: [];
    test4: [];
    scores: [];
    authorsFirstName: string;
    authorsSchoolName: string;
    authorsLastName: string;
    authorsMiddleName: string;
    studentsFirstName: string;
    studentsLastName: string;
    academicTerm: string;
    resultType: string;
    creator: string;
    schoolLogo: string;
    schoolName: string;
    studentProfileImgUrl: string;
    studentAge: number;
    className: string;
    classStudents: number;
    attendance: number;
    subjects: [];
    grades: [];
    remark: string;
    createdAt: string;
    authorsProfileImgUrl: string;
    documentPath: string;
    authorsCreatedAt: string;
    isOfficial: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const styles = StyleSheet.create({
  document: {
    fontFamily: "Helvetica",
    width: "100%",
    height: "100%",
  },
  page: {
    borderLeft: "10px solid #666",
    borderRight: "10px solid #666",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
  },
  section: {
    flexGrow: 1,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: "10px",
    paddingLeft: "5px",
  },
  header: {
    fontSize: 20,
    width: "250px",
  },
  rowContainer: {
    marginTop: "10px",
    height: "100%",
    paddingVertical: "5px",
    paddingHorizontal: "20px",
  },

  table: {
    width: "100%",
    height: "100%",
    marginTop: "30px",
  },
  row: {
    flexDirection: "row",
    border: "1px solid #bfbfbf",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerCell: {
    fontWeight: "bold",
    textTransform: "uppercase",
    flexDirection: "row",
    border: "1px solid #bfbfbf",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cell: {
    flexGrow: 1,
    width: "100%",
    alignItems: "flex-start",
    fontSize: "12px",
    padding: "2px",
  },
  watermark: {
    position: "absolute",
    top: "25%",
    left: "25%",
    opacity: 0.1,
    width: "50%",
  },
  prefooter: {
    padding: "1px",
    border: "1px solid #2f2f2f",
  },
  prefooter_attendance: {
    padding: "1px",
    marginBottom: "10px",
    border: "1px solid #2f2f2f",
  },
  footerContainer: {
    position: "absolute",
    bottom: "10%",
    paddingHorizontal: "15px",
  },
  footer: {
    position: "absolute",
    bottom: "0%",
    opacity: 0.3,
    fontSize: "8px",
  },
});

const GeneratedResults: React.FC<GeneratedResultsProps> = ({
  result,
  isOpen,
  onClose,
}) => {
  const sumOfTest1 = result?.test1?.reduce(
    (acc: any, num: any) => acc + num,
    0
  );
  const sumOfTest2 = result?.test2?.reduce(
    (acc: any, num: any) => acc + num,
    0
  );
  const sumOfTest3 = result?.test3?.reduce(
    (acc: any, num: any) => acc + num,
    0
  );
  const sumOfTest4 = result?.test4?.reduce(
    (acc: any, num: any) => acc + num,
    0
  );
  const sumOfScore = result?.scores?.reduce(
    (acc: any, num: any) => acc + num,
    0
  );
  const averageOfScore =
    (sumOfTest1 + sumOfTest2 + sumOfTest3 + sumOfTest4 + sumOfScore) /
    (result?.subjects?.length)
  const percentageAverage = (averageOfScore / 100) * 100;

  const resultHeader = [
    "Subjects",
    "Test 1",
    "Test 2",
    "Test 3",
    "Test 4",
    "Exam",
    "Total",
    "Grade",
  ];

  const author = `${result?.authorsFirstName} ${
    result?.authorsMiddleName?.length! > 1 ? result?.authorsMiddleName : ""
  } ${result?.authorsLastName}`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="3xl">
      <ModalOverlay />
      <ModalContent h="90vh">
        <ModalHeader>
          Viewing {result?.studentsFirstName} {result?.studentsLastName}{" "}
          Academic Result
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack h="full">
            <PDFViewer
              height="100%"
              width="100%"
              style={{ borderRadius: "10px" }}
            >
              <Document
                title={`${result?.studentsFirstName} ${result?.studentsLastName} ${result?.academicTerm}(${result?.resultType})`}
                author={result?.creator}
                style={styles.document}
                subject={`${result?.academicTerm} ${result?.resultType} Result`}
                producer="Greynote Result Generator"
              >
                <Page
                  size="A4"
                  bookmark={{ title: "Greynote Result", zoom: 0.5 }}
                  style={styles.page}
                >
                  {/* Watermark */}
                  <Image src={result?.schoolLogo} style={styles.watermark} />
                  <View style={styles.section}>
                    {/* Header with School Logo and Name */}

                    <View style={styles.headerContainer} fixed>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 10,
                        }}
                      >
                        <Image
                          src={result?.schoolLogo}
                          style={{ width: 50, height: 50, marginRight: 10 }}
                        />
                        <Text style={styles.header}>
                          {result?.authorsSchoolName}
                        </Text>
                      </View>
                      <View
                        style={{
                          backgroundColor: "#666",
                          paddingVertical: "5px",
                          paddingHorizontal: "20px",
                          height: "30px",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ color: "white", fontSize: "14px" }}>
                          Report Card
                        </Text>
                      </View>
                    </View>
                    <View style={styles.rowContainer}>
                      {/* Student Information */}
                      <View fixed>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 10,
                          }}
                        >
                          <Image
                            src={result?.studentProfileImgUrl}
                            style={{ width: 70, height: 70, marginRight: 10 }}
                          />
                          <View
                            style={{
                              gap: "5px",
                              width: "100%",
                              paddingHorizontal: "2px",
                              border: "1px solid #2f2f2f",
                            }}
                          >
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <View style={{ display: "flex" }}>
                                <Text style={{ fontSize: "12px" }}>
                                  Student Name:{" "}
                                </Text>
                              </View>
                              <Text
                                style={{
                                  color: "#343434",
                                  fontSize: "12px",
                                }}
                              >
                                {result?.studentsFirstName}{" "}
                                {result?.studentsLastName}
                              </Text>
                            </View>
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <Text style={{ fontSize: "12px" }}>Age:</Text>
                              <Text
                                style={{ fontSize: "12px", color: "#343434" }}
                              >
                                {result?.studentAge} years old{" "}
                              </Text>
                            </View>
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <Text style={{ fontSize: "12px" }}>Term: </Text>
                              <Text
                                style={{ fontSize: "12px", color: "#343434" }}
                              >
                                {result?.academicTerm || "no input provided"}
                              </Text>
                            </View>
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <Text style={{ fontSize: "12px" }}>Year: </Text>
                              <Text
                                style={{ fontSize: "12px", color: "#343434" }}
                              >
                                {result?.resultType}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: "10px",
                            paddingHorizontal: "2px",
                            border: "1px solid #2f2f2f",
                          }}
                        >
                          <Text
                            style={{ fontSize: "12px", marginBottom: "2px" }}
                          >
                            Class:{" "}
                            <Text style={{ color: "#343434" }}>
                              {" "}
                              {result?.className}{" "}
                            </Text>
                          </Text>
                          <View
                            style={{
                              width: "1px",
                              height: "100%",
                              backgroundColor: "#2f2f2f",
                            }}
                          ></View>
                          <Text style={{ fontSize: "12px" }}>
                            Total no. in Class:
                            <Text style={{ color: "#343434" }}>
                              {" "}
                              {result?.classStudents} Students
                            </Text>
                          </Text>
                          <View
                            style={{
                              width: "1px",
                              height: "100%",
                              backgroundColor: "#2f2f2f",
                            }}
                          ></View>

                          <Text style={{ fontSize: "12px" }}>
                            Total Attendance:{" "}
                            <Text
                              style={{
                                color: "#343434",
                              }}
                            >
                              {result?.attendance}
                            </Text>
                          </Text>
                          <View
                            style={{
                              width: "1px",
                              height: "100%",
                              backgroundColor: "#2f2f2f",
                            }}
                          ></View>

                          <Text style={{ fontSize: "12px" }}>
                            Percentage:{" "}
                            <Text
                              style={{
                                color: "#343434",
                              }}
                            >
                              {percentageAverage.toPrecision(3)}%
                            </Text>
                          </Text>
                        </View>
                      </View>

                      {/* Results Table */}
                      <View style={styles.table}>
                        {/* Table Header */}
                        <View style={styles.row}>
                          {resultHeader.map((item, index) => (
                            <View key={index} style={styles.row}>
                              <View style={[styles.headerCell, styles.cell]}>
                                <Text>{item}</Text>

                                <View
                                  style={{
                                    width: "1px",
                                    height: "100%",
                                    borderLeft: "1px solid #d4d4d4",
                                    paddingRight: "20px",
                                  }}
                                ></View>
                              </View>
                            </View>
                          ))}
                        </View>
                        {/* Table Rows */}
                        {result?.subjects?.map((subject: any, index: any) => (
                          <View style={styles.row} key={index}>
                            <View style={styles.cell}>
                              <Text>{subject}</Text>
                            </View>
                            <View
                              style={{
                                width: "1px",
                                height: "100%",
                                backgroundColor: "#2f2f2f",
                              }}
                            ></View>

                            <View style={styles.cell}>
                              <Text>
                                {(result?.test1 && result?.test1[index]) || 0}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: "1px",
                                height: "100%",
                                backgroundColor: "#2f2f2f",
                              }}
                            ></View>

                            <View style={styles.cell}>
                              <Text>
                                {(result?.test2 && result?.test2[index]) || 0}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: "1px",
                                height: "100%",
                                backgroundColor: "#2f2f2f",
                              }}
                            ></View>

                            <View style={styles.cell}>
                              <Text>
                                {(result?.test3 && result?.test3[index]) || 0}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: "1px",
                                height: "100%",
                                backgroundColor: "#2f2f2f",
                              }}
                            ></View>

                            <View style={styles.cell}>
                              <Text>
                                {(result?.test4 && result?.test4![index]) || 0}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: "1px",
                                height: "100%",
                                backgroundColor: "#2f2f2f",
                              }}
                            ></View>

                            <View style={styles.cell}>
                              <Text>
                                {(result?.scores && result?.scores![index]) ||
                                  0}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: "1px",
                                height: "100%",
                                backgroundColor: "#2f2f2f",
                              }}
                            ></View>

                            <View style={styles.cell}>
                              <Text>
                                {((result?.test1 && result?.test1[index]) ||
                                  0) +
                                  ((result?.test2 && result?.test2[index]) ||
                                    0) +
                                  ((result?.test3 && result?.test3[index]) ||
                                    0) +
                                  ((result?.test4 && result?.test4[index]) ||
                                    0) +
                                  ((result?.scores && result?.scores[index]) ||
                                    0)}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: "1px",
                                height: "100%",
                                backgroundColor: "#2f2f2f",
                              }}
                            ></View>

                            <View style={styles.cell}>
                              <Text style={{ textTransform: "uppercase" }}>
                                {result?.grades[index]}
                              </Text>
                            </View>
                          </View>
                        ))}
                      </View>
                    </View>

                    <View style={styles.footerContainer}>
                      {/* <View style={styles.prefooter_attendance}>
                <View style={{ border: '1px solid #E2E2E2', padding: '5px'}} >
                  <Text>Attendance</Text>
                </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "10px",
                      padding: '5px'
                    }}
                  >
                    <Text style={{ fontSize: "12px", marginRight: "24px" }}>
                      Times Present:{" "}
                    </Text>
                    <Text
                      style={{
                        color: "#343434",
                        fontSize: "12px",
                        textTransform: "capitalize",
                      }}
                    >
                      {author}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: '5px'
                    }}
                  >
                    <Text style={{ fontSize: "12px", marginRight: "8px" }}>
                      Times Absent:
                    </Text>
                    <Text style={{ fontSize: "12px", color: "#343434", width: '400px' }}>
                      {results?.remark ||
                        "No Comment"}
                    </Text>
                  </View>
                </View> */}

                      <View style={styles.prefooter}>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            marginBottom: "10px",
                          }}
                        >
                          <Text
                            style={{ fontSize: "12px", marginRight: "24px" }}
                          >
                            {`Teacher's Name: `}
                          </Text>
                          <Text
                            style={{
                              color: "#343434",
                              fontSize: "12px",
                              textTransform: "capitalize",
                            }}
                          >
                            {author}
                          </Text>
                        </View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <Text
                            style={{ fontSize: "12px", marginRight: "8px" }}
                          >
                            {`Teacher's Comment: `}
                          </Text>
                          <Text
                            style={{
                              fontSize: "12px",
                              color: "#343434",
                              width: "400px",
                            }}
                          >
                            {result?.remark || "No Comment"}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <Text style={styles.footer}>
                      Generated with Greynote - {formatDate(result?.createdAt)}
                    </Text>
                  </View>
                </Page>
              </Document>
            </PDFViewer>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default GeneratedResults;
