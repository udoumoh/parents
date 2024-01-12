"use client";
import { FC, useState, createContext, useContext, useEffect } from "react";

interface UserBio {
  firstName: string;
  lastName: string;
  profileImage: string;
  email: string;
}

export interface UserChildren {
  firstName: string;
  lastName: string;
  greynoteNumber: string;
  profileImage: string;
  feesDefault: number;
  suspension: number;
  expulsion: number;
  gender: string;
  class: string;
  dateOfBirth: string;
  dateEnrolled: string;
  expectedGraduation: string;
  dateRegistered: string;
  school: string;
  schoollogo: string;
  id: number;
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
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserApiProviderProps {
  children: React.ReactNode;
}

export const UserApiProvider: FC<UserApiProviderProps> = ({ children }) => {
  const [profileData, setProfileData] = useState({
    userBio: {
      firstName: "Adenike",
      lastName: "Ali-Williams",
      profileImage:
        "https://media.istockphoto.com/id/1183107601/photo/african-american-lady-talking-on-phone-sitting-at-workplace.jpg?s=612x612&w=0&k=20&c=A5ABRClT_h8x-PkNlyP_fhMyH8BvlAfKuqygMGTL7OA=",
      email: "adenike.ali@mail.com",
    },
    userChildren: [
      {
        firstName: "Chibuzor",
        lastName: "Ali-Williams",
        greynoteNumber: "GN24002",
        profileImage: "/images/profileImg.jpeg",
        feesDefault: 5,
        suspension: 1,
        expulsion: 0,
        gender: "Male",
        class: "Jss 1",
        dateOfBirth: "15th July 2010",
        dateEnrolled: "13th August 2019",
        expectedGraduation: "15th July 2025",
        dateRegistered: "21st July 2023",
        school: "Green Springs High School",
        schoollogo: "/images/schoollogo.png",
        id: 1,
      },
      {
        firstName: "Chiamaka",
        lastName: "Ali-Williams",
        greynoteNumber: "GN24025",
        profileImage:
          "https://th.bing.com/th/id/R.5dcfec967642191443ae9a4b04c55d47?rik=oahz060yDmOp%2bA&pid=ImgRaw&r=0",
        feesDefault: 2,
        suspension: 3,
        expulsion: 0,
        gender: "Female",
        class: "SSS 2",
        dateOfBirth: "15th July 2004",
        dateEnrolled: "13th August 2014",
        expectedGraduation: "15th July 2020",
        dateRegistered: "21st July 2018",
        school: "Green Springs High School",
        schoollogo: "/images/schoollogo.png",
        id: 2,
      },
    ],
  });

  // const isClient = typeof window !== "undefined";

  const defaultId = 0;

  const [currentId, setCurrentId] = useState(() => {
    return defaultId;
  });

  useEffect(() => {
      const storedId = localStorage.getItem("currentId");
      setCurrentId(parseInt(storedId ?? `${defaultId}`, 10));
  }, []);

  const currentWardProfile = profileData.userChildren.find(
    (wardProfile) => wardProfile.id === currentId
  );

  return (
    <UserContext.Provider
      value={{
        profileData,
        setProfileData,
        currentId,
        setCurrentId,
        currentWardProfile,
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
