import React, {
  createContext,
  useContext,
  useState,
  FC,
  useEffect,
  useCallback,
} from "react";
import { useMutation, useQuery } from "@apollo/client";
import { LIKE_PROFILE, UNLIKE_PROFILE } from "@/gql/mutations";
import { GET_SCHOOLS } from "@/gql/queries";

interface SchoolProfilesProps {
  genderType: string;
  schoolType: string;
  type: string;
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
  address: string;
  priceRange: string;
  studentPerClassroom: string;
  creator: {
    admin: {
      plan: string;
    };
  };
}

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
  schoolProfiles: SchoolProfilesProps[];
  filteredPosts: SchoolProfilesProps[];
  setFilteredPosts: (posts: any) => void;
  handleFilterChange: (filterName: any, value: any) => void;
  filterParams: {
    type: string;
    schoolType: string;
    genderType: string;
    schoolSize: string;
    state: string;
    lga: string;
    address: string;
    priceRange: string;
  };
  applyFilters: () => void;
  setFilterParams: (filters: any) => void;
}

interface UserLikesApiProviderProps {
  children: React.ReactNode;
}

const UserLikesContext = createContext<UserLikesContextProps | undefined>(
  undefined
);

export const UserLikesAPIProvider: FC<UserLikesApiProviderProps> = ({
  children,
}) => {
  const { data: getSchools } = useQuery(GET_SCHOOLS);
  const [schoolProfiles, setSchoolProfiles] = useState<SchoolProfilesProps[]>(
    []
  );
  const [activeProfileIndex, setActiveProfileIndex] = useState(0);
  const [likedPosts, setLikedPosts] = useState<{ [postId: number]: boolean }>(
    {}
  );
  const [numberOfLikes, setNumberOfLikes] = useState<{
    [postId: number]: number;
  }>({});
  const [likeMutation] = useMutation(LIKE_PROFILE);
  const [unlikeMutation] = useMutation(UNLIKE_PROFILE);
  const [filteredPosts, setFilteredPosts] = useState<SchoolProfilesProps[]>([]);

  const [filterParams, setFilterParams] = useState({
    type: "",
    schoolType: "",
    genderType: "",
    schoolSize: "",
    state: "",
    lga: "",
    address: "",
    priceRange: "",
  });

  useEffect(() => {
    setFilteredPosts(schoolProfiles);
  }, [schoolProfiles]);

  const handleFilterChange = useCallback((filterName: any, value: any) => {
    setFilterParams((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  }, []);

  const applyFilters = useCallback(() => {
    let filteredResults: SchoolProfilesProps[] = schoolProfiles;

    if (filterParams?.type) {
      filteredResults = filteredResults?.filter(
        (post) =>
          post?.type?.toLowerCase() === filterParams?.type?.toLowerCase()
      );
    }
    if (filterParams?.schoolType) {
      filteredResults = filteredResults?.filter(
        (post) =>
          post?.schoolType?.toLowerCase() ===
          filterParams?.schoolType?.toLowerCase()
      );
    }
    if (filterParams?.genderType) {
      filteredResults = filteredResults?.filter(
        (post) =>
          post?.genderType?.toLowerCase() ===
          filterParams?.genderType?.toLowerCase()
      );
    }
    if (filterParams?.state) {
      filteredResults = filteredResults?.filter(
        (post) =>
          post?.state?.toLowerCase() === filterParams?.state?.toLowerCase()
      );
    }
    if (filterParams?.lga) {
      filteredResults = filteredResults?.filter(
        (post) =>
          post?.lgarea?.toLowerCase() === filterParams?.lga?.toLowerCase()
      );
    }
    if (filterParams?.address) {
      filteredResults = filteredResults?.filter((post) =>
        post?.address
          ?.toLowerCase()
          .includes(filterParams?.address?.toLowerCase())
      );
    }
    if (filterParams?.schoolSize) {
      filteredResults = filteredResults?.filter(
        (post) =>
          Number(post?.studentPerClassroom) <= Number(filterParams?.schoolSize)
      );
    }
    if (filterParams?.priceRange) {
      filteredResults = filteredResults?.filter(
        (post) => post?.priceRange === filterParams?.priceRange
      );
    }

    setFilteredPosts(filteredResults);
  }, [filterParams, schoolProfiles]);

  const likePost = useCallback(
    async (postId: number) => {
      await likeMutation({
        variables: {
          schoolId: postId,
        },
      });

      setLikedPosts((prevState) => ({
        ...prevState,
        [postId]: true,
      }));

      setNumberOfLikes((prevState) => ({
        ...prevState,
        [postId]: (prevState[postId] || 0) + 1,
      }));
    },
    [likeMutation]
  );

  const unlikePost = useCallback(
    async (postId: number) => {
      await unlikeMutation({
        variables: {
          schoolId: postId,
        },
      });

      setLikedPosts((prevState) => ({
        ...prevState,
        [postId]: false,
      }));

      setNumberOfLikes((prevState) => ({
        ...prevState,
        [postId]: Math.max((prevState[postId] || 0) - 1, 0),
      }));
    },
    [unlikeMutation]
  );

  const isPostLiked = useCallback(
    (postId: number) => likedPosts[postId] || false,
    [likedPosts]
  );
  const getNumberOfLikes = useCallback(
    (postId: number) => numberOfLikes[postId] || 0,
    [numberOfLikes]
  );

  const fetchSchoolProfiles = useCallback(async () => {
    try {
      const response = await getSchools;
      if (response) {
        const filteredProfiles = response?.getSchools?.filter(
          (item: any) =>
            item?.schoolMedia !== null && item?.schoolMedia?.length > 0
        );
        setSchoolProfiles(filteredProfiles);
      }
    } catch (err: any) {
      console.log(err?.message);
    }
  }, [getSchools]);

  useEffect(() => {
    fetchSchoolProfiles();
  }, [fetchSchoolProfiles]);

  const contextValue: UserLikesContextProps = {
    likePost,
    unlikePost,
    isPostLiked,
    getNumberOfLikes,
    setLikedPosts,
    activeProfileIndex,
    setActiveProfileIndex,
    schoolProfiles,
    filteredPosts,
    setFilteredPosts,
    handleFilterChange,
    filterParams,
    setFilterParams,
    applyFilters,
  };

  return (
    <UserLikesContext.Provider value={contextValue}>
      {children}
    </UserLikesContext.Provider>
  );
};

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
