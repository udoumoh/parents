"use client";
import { FC, useState, createContext, useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_PARENT } from "@/gql/queries";
import { format } from "date-fns";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
import { GET_STUDENT_INVOICE } from "@/gql/queries";
import { formatDate } from "@/helpers/formatDate";
import { Parent, Student } from "@/gql/types";

interface UserBio {
  firstName: string;
  lastName: string;
  middleName: string;
  profileImage: string;
  email: string;
  parentRole: string;
}

interface Graycase {
  category: string;
  createdAt: string;
  id: number;
  isActive: boolean;
  notes: string;
  owingAmount: number;
  updatedAt: string;
  wasEdited: boolean;
}

export interface UserChildren {
  firstName: string;
  lastName: string;
  middleName: string;
  greynoteNumber: string;
  profileImage: string;
  gender: string;
  class: string;
  dateOfBirth: string;
  school: string;
  schoollogo: string;
  id: number;
  age: number;
  schoolId: number;
  graycase?:Graycase[] | null;
  isVisible: boolean;
  schoolAccountName: string[];
  schoolAccountNumber: string[];
  schoolBankName: string[];
  wallet: number;
  isPaid: boolean;
  collectibleDuration: string;
  collectibleType: string;
  subscribedAt: string;
}

export interface StudentInvoiceProps {
  term: string;
  year: string;
  category: string;
  amountPaid: number;
  id: number;
  status: string;
  summary: string;
  createdAt: string;
  invoiceId: string;
  schoolname: string;
  schoollogo: string;
  balance: number;
  isRefundable: boolean;
  receipt: {
    amountPaid: number;
    createdAt: string;
    creator: string;
    fileType: string;
    id: number;
    parentInvoiceId: string;
    status: string;
    summary: string;
    updatedAt: string;
    uploadedDocument: string;
  }[];
}

interface UserContextProps {
  profileData: {
    userBio: UserBio;
    userChildren: UserChildren[];
  };
  setLocalstorageId: (id: any) => void;
  currentId: number | undefined;
  setProfileData: React.Dispatch<
    React.SetStateAction<{
      userBio: UserBio;
      userChildren: UserChildren[];
    }>
  >
  currentWardProfile?: UserChildren;
  parentData: Parent | undefined;
  childData: UserChildren[] | undefined;
  invoiceData: StudentInvoiceProps[];
  loading: boolean;
  isTrialOver: boolean;
  setIsTrialOver: (arg: boolean) => void;
  currentStudentData: Student | undefined;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserApiProviderProps {
  children: React.ReactNode;
}

export const UserApiProvider: FC<UserApiProviderProps> = ({ children }) => {
  const { data: parent, loading } = useQuery(GET_PARENT);
  const [currentStudentData, setCurrentStudentData] = useState<Student>();
  const [profileData, setProfileData] = useState({
    userBio: {
      firstName: "",
      lastName: "",
      middleName: "",
      profileImage: "",
      email: "",
      parentRole: "",
    },
    userChildren: [
      {
        firstName: "",
        lastName: "",
        middleName: "",
        greynoteNumber: "",
        profileImage: "",
        gender: "",
        class: "",
        dateOfBirth: "",
        school: "",
        schoollogo: "",
        id: 0,
        age: 0,
        schoolId: 0,
        isVisible: false,
        schoolAccountName: [""],
        schoolAccountNumber: [""],
        schoolBankName: [""],
        wallet: 0,
        isPaid: false,
        collectibleDuration: "",
        collectibleType: "",
        subscribedAt: "",
      },
    ],
  });

  const [parentData, setParentData] = useState<Parent>();

  const [isTrialOver, setIsTrialOver] = useState<boolean>(false)

  const [childData, setChildData] = useState<UserChildren[]>([]);

  const currentId = Number(localStorage.getItem("currentId") || 0);

  const [invoiceData, setInvoiceData] = useState<StudentInvoiceProps[]>([]);

  const currentWardProfile = (childData || []).find(
    (child) => child.id === Number(localStorage.getItem("currentId") || 0)
  );

   const { data: getinvoice } = useQuery(GET_STUDENT_INVOICE, {
     variables: { studentId: currentWardProfile?.id},
   });

  const updateUserBio = (newBio: any) => {
    setProfileData((previousData) => {
      return {
        ...previousData,
        userBio: newBio,
      };
    });
  };

  useEffect(() => {
    const studentData = parentData?.children?.find(
      (child) => child.id === currentId
    );
    setCurrentStudentData(studentData);
  }, [parentData, currentId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await parent;
        setParentData(response?.parent?.parent);
        const newData = {
          firstName: capitalizeFirstLetter(
            response?.parent?.parent?.firstName || ""
          ),
          lastName: capitalizeFirstLetter(
            response?.parent?.parent?.lastName || ""
          ),
          middleName: capitalizeFirstLetter(
            response?.parent?.parent?.middleName || ""
          ),
          profileImage: response?.parent?.parent?.profileImgUrl || "",
          email: response?.parent?.parent?.email || "",
          parentRole: response?.parent?.parent?.parentRole || "",
        };
        updateUserBio(newData);

        const userChildren = (response?.parent?.parent?.children || []).map(
          (child: any) => ({
            firstName: capitalizeFirstLetter(child.firstName) || "",
            lastName: capitalizeFirstLetter(child.lastName) || "",
            middleName: capitalizeFirstLetter(child.middleName) || "",
            greynoteNumber: child.grayId || "",
            profileImage: child.profileImgUrl || "",
            gender: child.gender || "",
            class: child?.classroom?.classroom?.className || "",
            dateOfBirth:
              format(new Date(child?.birthDate), "do MMMM yyyy") || "",
            school: child?.school?.school?.schoolName || 0,
            schoollogo: child?.school?.school?.logoImgUrl || 0,
            id: child.id || 0,
            age: child?.ageInput || 0,
            schoolId: child?.school?.school?.id || 0,
            graycase: child?.studentCase?.grayCase,
            isVisible: child?.isVisible,
            schoolAccountName: child?.school?.school?.accountName,
            schoolAccountNumber: child?.school?.school?.accountNumber,
            schoolBankName: child?.school?.school?.bankName,
            wallet: child?.wallet,
            isPaid: child?.isPaid,
            collectibleDuration: child?.collectibleDuration,
            collectibleType: child?.collectibleType,
            subscribedAt: child?.subscribedAt,
          })
        );

        setChildData(userChildren);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      try {
        const invoiceResponse = await getinvoice;
        const parsedInvoiceData = invoiceResponse?.getStudentInvoice?.map(
          (item: any) => ({
            term: item?.academicTerm,
            year: item?.academicYear,
            category: item?.category,
            amountPaid: item?.amount,
            id: item?.id,
            invoiceId: item?.invoiceId,
            createdAt: formatDate(item?.createdAt),
            summary: item?.summary,
            status: item?.status,
            schoolname: item?.creatorSchool,
            schoollogo: item?.student?.creator?.admin?.schoolImg,
            receipt: item?.receipt,
            balance: item?.balance,
            isRefundable: item?.isRefundable,
          })
        );
        setInvoiceData(parsedInvoiceData?.reverse());
      } catch (err: any) {
        console.log(err?.message);
      }

    };

    fetchData();
  }, [parent, getinvoice]);

  useEffect(() => {
    const targetDate = new Date(Number(parentData?.createdAt));
    targetDate.setDate(targetDate.getDate() + 14);
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      setIsTrialOver(true);
    }
  }, [parentData])

  const setLocalstorageId = (id: any) => {
    localStorage.setItem("currentId", id);
  };

  return (
    <UserContext.Provider
      value={{
        currentStudentData,
        invoiceData,
        profileData,
        setProfileData,
        currentId,
        currentWardProfile,
        parentData,
        childData,
        loading,
        setLocalstorageId,
        isTrialOver,
        setIsTrialOver,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserAPI = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserAPI must be used within a UserApiProvider");
  }

  return context;
};

export default UserApiProvider;
