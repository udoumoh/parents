import { createContext, useContext, useEffect, ReactNode } from "react";
import { useQuery } from "@apollo/client";
import { GET_PARENT } from "@/gql/queries/queries";
import { useRouter } from "next/navigation";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const { data: parent, loading } = useQuery(GET_PARENT);

  const login = () => {
    if (loading) return <p>Loading...</p>;
    const response = parent;
    if (response && response.parent.errors === null) {
      // Set isAuthenticated to true in localStorage if on the client side
      if (typeof window !== "undefined") {
        localStorage.setItem("isAuthenticated", "true");
      }
      router.push("/dashboard/overview");
    }
  };

  const logout = () => {
    if (loading) return <p>Loading...</p>;
    // Clear isAuthenticated from localStorage if on the client side
    if (typeof window !== "undefined") {
      localStorage.removeItem("isAuthenticated");
    }
    router.push("/signin");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated:
          typeof window !== "undefined"
            ? Boolean(localStorage.getItem("isAuthenticated"))
            : false,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
