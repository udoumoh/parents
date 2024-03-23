"use client";
import { FC, useState, createContext, useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_PARENT } from "@/gql/queries";
import { format } from "date-fns";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";

interface UserBio {
  firstName: string;
  lastName: string;
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
  graycase?:Graycase[];
  isVisible: boolean;
}

interface ParentDataProps {
  agreedTo: boolean;
  children: [];
  createdAt: string;
  email: string;
  firstName: string;
  folder: string;
  id: number;
  isDisabled: boolean;
  isPaid: boolean;
  isReferred: boolean;
  isVerified: boolean;
  lastName: string;
  middleName: string;
  parentRole: string;
  phoneNumber: string;
  profileImgUrl: string;
  role: string;
  status: string;
  userId: string;
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
  parentData: ParentDataProps | undefined;
  childData: UserChildren[] | undefined;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserApiProviderProps {
  children: React.ReactNode;
}

export const UserApiProvider: FC<UserApiProviderProps> = ({ children }) => {
  const { data: parent } = useQuery(GET_PARENT);
  const [profileData, setProfileData] = useState({
    userBio: {
      firstName: "",
      lastName: "",
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
      },
    ],
  });
  const [parentData, setParentData] = useState<ParentDataProps | undefined>(
    undefined
  );
  const [childData, setChildData] = useState<UserChildren[]>([]);

  const currentId = Number(localStorage.getItem("currentId") || 0);

  const updateUserBio = (newBio: any) => {
    setProfileData((previousData) => {
      return {
        ...previousData,
        userBio: newBio,
      };
    });
  };

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
          })
        );

        setChildData(userChildren);
        // if((childData ?? []).length !== 0) {
        //   setCurrentId(userChildren[0].id);
        // }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [parent]);

  const setLocalstorageId = (id: any) => {
    localStorage.setItem("currentId", id);
  };

  const currentWardProfile = (childData || []).find(
    (child) => child.id === Number(localStorage.getItem("currentId") || 0)
  );

  return (
    <UserContext.Provider
      value={{
        profileData,
        setProfileData,
        currentId,
        currentWardProfile,
        parentData,
        childData,
        setLocalstorageId,
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
