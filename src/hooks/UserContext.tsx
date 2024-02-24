"use client";
import { FC, useState, createContext, useContext, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

interface UserBio {
  firstName: string;
  lastName: string;
  middleName: string;
  profileImage: string;
  email: string;
  parentRole: string;
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
  chats: {
    profileImage: string;
    firstName: string;
    lastName: string;
    schoolName: string;
    lastMessage: string;
    timeSent: string;
    position: string;
    id: number;
  }[];
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

const GET_PARENT = gql(`
query Parent {
  parent {
    errors {
      field
      message
    }
    parent {
      id
      userId
      status
      isPaid
      isVerified
      isReferred
      agreedTo
      createdAt
      firstName
      middleName
      lastName
      parentRole
      phoneNumber
      email
      role
      folder
      isDisabled
      profileImgUrl
    }
  }
}
`);

export const UserApiProvider: FC<UserApiProviderProps> = ({ children }) => {
  const { data: parent } = useQuery(GET_PARENT);
  const [profileData, setProfileData] = useState({
    userBio: {
      firstName: "",
      lastName: "",
      middleName:"",
      profileImage:
        "",
      email: "",
      parentRole: "",
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
        chats: [
          {
            profileImage:
              "https://th.bing.com/th/id/OIP.KdBSw8TPL34eU6T7bjhpAAHaLH?rs=1&pid=ImgDetMain",
            firstName: "Mayowa",
            lastName: "Chinedu",
            schoolName: "Greeenfield High School",
            lastMessage: "Oga Mayowa, my childs result is still not verified",
            timeSent: "3m",
            position: "Admin",
            id: 1,
          },
          {
            profileImage:
              "https://th.bing.com/th/id/OIP._glmrtIyzUtogxZCkpiQBwHaLH?rs=1&pid=ImgDetMain",
            firstName: "Mary-Anne",
            lastName: "Ayodele",
            schoolName: "Greeenfield High School",
            lastMessage:
              "Ma, Chibuzor is still owing the school almost 300 thousand naira",
            timeSent: "17m",
            position: "Bursar",
            id: 2,
          },
          {
            profileImage:
              "https://th.bing.com/th/id/R.310437da9c381f5c5342434ff6a31107?rik=0CsDgDc9kcOspw&pid=ImgRaw&r=0",
            firstName: "Zainab",
            lastName: "Kayode",
            schoolName: "Greeenfield High School",
            lastMessage: "I am not authorized to verify any student’s result",
            timeSent: "Yesterday",
            position: "Teacher",
            id: 3,
          },
        ],
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
        chats: [
          {
            profileImage:
              "https://th.bing.com/th/id/OIP.KdBSw8TPL34eU6T7bjhpAAHaLH?rs=1&pid=ImgDetMain",
            firstName: "Tunde",
            lastName: "Oluwagbenga",
            schoolName: "Luthran High School",
            lastMessage: "Oga Tunde, my childs result is still not verified",
            timeSent: "3m",
            position: "Admin",
            id: 1,
          },
          {
            profileImage:
              "https://th.bing.com/th/id/OIP._glmrtIyzUtogxZCkpiQBwHaLH?rs=1&pid=ImgDetMain",
            firstName: "Grace",
            lastName: "Owoade",
            schoolName: "Luthran High School",
            lastMessage:
              "Ma, chiamaka is still not doing her homework, please assis",
            timeSent: "17m",
            position: "Bursar",
            id: 2,
          },
          {
            profileImage:
              "https://th.bing.com/th/id/R.310437da9c381f5c5342434ff6a31107?rik=0CsDgDc9kcOspw&pid=ImgRaw&r=0",
            firstName: "George",
            lastName: "Saviour",
            schoolName: "Luthran High School",
            lastMessage: "Your child was not in school today, hope all is well.",
            timeSent: "Yesterday",
            position: "Teacher",
            id: 3,
          },
        ],
      },
    ],
  });

  // const defaultId = 0;

  const [currentId, setCurrentId] = useState(0);

  const updateUserBio = (newBio: any) => {
    setProfileData((previousData) => {
      return{
        ...previousData,
        userBio: newBio
      }
    })
  }

  const capitalizeFirstLetter = (name: string) => {
    const newName = name[0].toUpperCase() + name.substring(1, name.length)
    return newName
  }

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = (await parent) || [];
          console.log(response)
          const newData = {
            firstName: capitalizeFirstLetter(response?.parent?.parent?.firstName),
            lastName: capitalizeFirstLetter(response?.parent?.parent?.lastName),
            middleName: capitalizeFirstLetter(response?.parent?.middleName),
            profileImage: response?.parent?.parent?.profileImgUrl,
            email: response?.parent?.parent?.email,
            parentRole:response?.parent?.parent?.parentRole,
          };
                    
          console.log(response);
          
          updateUserBio(newData)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      const storedId = localStorage.getItem("currentId");
      setCurrentId(parseInt(storedId ?? `${currentId}`, 10));
      fetchData()
  }, [parent, currentId]);

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
