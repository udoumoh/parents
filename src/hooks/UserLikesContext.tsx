"use client";
import { FC, useState, createContext, useContext, useEffect } from "react";
import { LIKE_PROFILE, UNLIKE_PROFILE } from "@/gql/mutations";
import { useUserAPI } from "@/hooks/UserContext";
import { useMutation } from "@apollo/client";

interface UserLikesContextProps {
  setProfile: (profile: any) => void;
  handleLike: (profile: any) => void;
  handleUnlike: (profile: any) => void;
  isLiked: boolean;
  numberOfLikes: number | undefined;
  setIsLiked: (value: boolean) => void;
}

interface ProfileProps {
    bannerImgUrl: string;
    country: string;
    createdAt: string;
    description: string;
    email: string;
    facebookUrl: string;
    id: number;
    instagramUrl: string;
    lgarea: string;
    linkedinUrl: string;
    logoImgUrl: string;
    phonenumber: string;
    profileLikes: number;
    profileViews: number;
    rcnumber: string;
    schoolName: string;
    state: string;
    twitterUrl: string;
    websiteUrl: string;
    whoLikedProfile: string[];
    schoolMedia: string[];
}

const UserLikesContext = createContext<UserLikesContextProps | undefined>(undefined);

interface UserLikesAPIProviderProps {
  children: React.ReactNode;
}

export const UserLikesAPIProvider: FC<UserLikesAPIProviderProps> = ({ children }) => {
    const [profile, setProfile] = useState<ProfileProps>()
    const [isLiked, setIsLiked] = useState(false);
    const [like] = useMutation(LIKE_PROFILE);
    const [unlike] = useMutation(UNLIKE_PROFILE);
    const [numberOfLikes, setNumberOfLikes] = useState(profile?.profileLikes);

    const handleLike = async (profile: any) => {
      try {
        const response = await like({
          variables: {
            schoolId: profile?.id,
          },
        });
        if (response.data) {
          setIsLiked(true);
          setNumberOfLikes((numberOfLikes || 0) + 1);
        }
      } catch (err: any) {
        console.log(err.message);
      }
    };

    const handleUnlike = async (profile: any) => {
      try {
        const response = await unlike({
          variables: {
            schoolId: profile?.id,
          },
        });
        if (response.data) {
          setIsLiked(false); // Update state only if mutation is successful
          setNumberOfLikes((numberOfLikes || 0) - 1);
        }
      } catch (err: any) {
        console.log(err.message);
      }
    };


  return (
    <UserLikesContext.Provider
      value={{
        setProfile,
        handleLike,
        handleUnlike,
        isLiked,
        numberOfLikes,
        setIsLiked
      }}
    >
      {children}
    </UserLikesContext.Provider>
  );
};

export const useUserLikesAPI = () => {
  const context = useContext(UserLikesContext);

  if (!context) {
    throw new Error("useUserLikesAPI must be used within a UserLikesAPIProvider");
  }

  return context;
};

export default UserLikesAPIProvider;
