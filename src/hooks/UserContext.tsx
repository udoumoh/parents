"use client";
import { FC, useState, createContext, useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_PARENT } from "@/gql/queries/queries";
import { format } from "date-fns";

interface UserBio {
  firstName: string;
  lastName: string;
  profileImage: string;
  email: string;
  parentRole: string;
}

export interface UserChildren {
  firstName: string;
  lastName: string;
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
  // chats: {
  //   profileImage: string;
  //   firstName: string;
  //   lastName: string;
  //   schoolName: string;
  //   lastMessage: string;
  //   timeSent: string;
  //   position: string;
  //   id: number;
  // }[];
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
  currentId: number | undefined;
  setProfileData: React.Dispatch<
    React.SetStateAction<{
      userBio: UserBio;
      userChildren: UserChildren[];
    }>
  >;
  setCurrentId: React.Dispatch<React.SetStateAction<number>>;
  currentWardProfile?: UserChildren;
  parentData: ParentDataProps | undefined;
  childData:
    | [
        {
          firstName: string;
          lastName: string;
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
        }
      ]
    | undefined;
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
      },
    ],
  });
  const [parentData, setParentData] = useState<ParentDataProps | undefined>(
    undefined
  );
  const [childData, setChildData] = useState<
    | [
        {
          firstName: string;
          lastName: string;
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
        }
      ]
    | undefined
  >(undefined);
  const [currentId, setCurrentId] = useState<number>(
    childData?.[0]?.id || 0
  );

  const updateUserBio = (newBio: any) => {
    setProfileData((previousData) => {
      return {
        ...previousData,
        userBio: newBio,
      };
    });
  };

  const capitalizeFirstLetter = (name: string) => {
    if (name?.length === 0) {
      return name;
    }

    const newName = name[0].toUpperCase() + name.substring(1);
    return newName;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await parent;
        setParentData(response?.parent?.parent);
        const newData = {
          firstName: capitalizeFirstLetter(response?.parent?.parent?.firstName || ""),
          lastName: capitalizeFirstLetter(response?.parent?.parent?.lastName || ""),
          profileImage: response?.parent?.parent?.profileImgUrl,
          email: response?.parent?.parent?.email,
          parentRole: response?.parent?.parent?.parentRole,
        };

        console.log(response?.parent?.parent)

        const userChildren = (response?.parent?.parent?.children || []).map(
          (child: any) => ({
            firstName: child.firstName || "",
            lastName: child.lastName || "",
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
            schoolId: child?.school?.school?.id || 0
          })
        );

        setChildData(userChildren);
        setCurrentId(userChildren[0].id);
        updateUserBio(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [parent, currentId]);

  const currentWardProfile = (childData || []).find(
    (child) => child.id === currentId
  );

  return (
    <UserContext.Provider
      value={{
        profileData,
        setProfileData,
        currentId,
        setCurrentId,
        currentWardProfile,
        parentData,
        childData,
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
