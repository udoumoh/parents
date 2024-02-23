import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery } from "@apollo/client";
import { GET_PARENT } from "@/gql/queries/queries";
import { useRouter } from "next/navigation";

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  login: () => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const router = useRouter()
  const { data: parent, loading } = useQuery(GET_PARENT);  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    if(loading) return (<p>Loading...</p>)
    const response = parent
    if (response && response.parent.errors === null){
        setIsAuthenticated(true)
    }
    router.push("/dashboard/overview")
  }
  console.log(isAuthenticated)
  const logout = () => {
    if (loading) return <p>Loading...</p>;
    const response = parent;
    if (response && response.parent.errors !== null) {
      setIsAuthenticated(false);
    }
    router.push("/signin")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout }}>
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
