import React, { createContext, useContext, useState, FC, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LIKE_PROFILE, UNLIKE_PROFILE } from "@/gql/mutations";
import { GET_SCHOOLS } from "@/gql/queries";
import { useQuery } from "@apollo/client";

// Define the context shape
interface UserLikesContextProps {
  likePost: (postId: number) => void;
  unlikePost: (postId: number) => void;
  isPostLiked: (postId: number) => boolean;
  getNumberOfLikes: (postId: number) => number;
  setLikedPosts: React.Dispatch<
    React.SetStateAction<{ [postId: number]: boolean }>
  >;
  activeProfileIndex: number;
  setActiveProfileIndex: (id: number) => void;
  schoolProfiles: {
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
  }[];
}

interface UserLikesApiProviderProps {
  children: React.ReactNode;
}

// Create the context
const UserLikesContext = createContext<UserLikesContextProps | undefined>(
  undefined
);

// Custom provider component
export const UserLikesAPIProvider: FC<UserLikesApiProviderProps> = ({ children }) => {
    const { data: getSchools, loading } = useQuery(GET_SCHOOLS);
    const [schoolProfiles, setSchoolProfiles] = useState([]);
  const [activeProfileIndex, setActiveProfileIndex] = useState(0)
  const [likedPosts, setLikedPosts] = useState<{ [postId: number]: boolean }>(
    {}
  );
  const [numberOfLikes, setNumberOfLikes] = useState<{
    [postId: number]: number;
  }>({});
  const [likeMutation] = useMutation(LIKE_PROFILE);
  const [unlikeMutation] = useMutation(UNLIKE_PROFILE);

  const likePost = async (postId: number) => {
    // Perform like mutation
    await likeMutation({
      variables: {
        schoolId: postId,
      },
    });

    // Update liked state and number of likes
    setLikedPosts((prevState) => ({
      ...prevState,
      [postId]: true,
    }));

    setNumberOfLikes((prevState) => ({
      ...prevState,
      [postId]: (prevState[postId] || 0) + 1,
    }));
  };

  const unlikePost = async (postId: number) => {
    // Perform unlike mutation
    await unlikeMutation({
      variables: {
        schoolId: postId,
      },
    });

    // Update liked state and number of likes
    setLikedPosts((prevState) => ({
      ...prevState,
      [postId]: false,
    }));

    setNumberOfLikes((prevState) => ({
      ...prevState,
      [postId]: Math.max((prevState[postId] || 0) - 1, 0),
    }));
  };

  const isPostLiked = (postId: number) => likedPosts[postId] || false;
  const getNumberOfLikes = (postId: number) => numberOfLikes[postId] || 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSchools;
        if (response) {
          const filteredProfiles = response?.getSchools?.filter(
            (item: any) => item?.schoolMedia !== null
          );
          setSchoolProfiles(filteredProfiles);
        }
      } catch (err: any) {
        console.log(err?.message);
      }
    };
    fetchData();
  }, [getSchools]);

  const contextValue: UserLikesContextProps = {
    likePost,
    unlikePost,
    isPostLiked,
    getNumberOfLikes,
    setLikedPosts,
    activeProfileIndex,
    setActiveProfileIndex,
    schoolProfiles,
  };

  return (
    <UserLikesContext.Provider value={contextValue}>
      {children}
    </UserLikesContext.Provider>
  );
};

// Custom hook to consume the context
export const useUserLikesAPI = () => {
  const context = useContext(UserLikesContext);

  if (!context) {
    throw new Error(
      "useUserLikesAPI must be used within a UserLikesAPIProvider"
    );
  }

  return context;
};

export default UserLikesAPIProvider;