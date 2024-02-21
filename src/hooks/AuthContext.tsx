import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useQuery } from "@apollo/client";
import { GET_PARENT } from "@/gql/queries/queries";

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data: parent, loading } = useQuery(GET_PARENT);
  const [isAuthenticated, setIsAuthenticatedState] = useState(false);

  const setIsAuthenticated = (value: boolean) => {
    setIsAuthenticatedState(value);
    localStorage.setItem("isAuthenticated", value.toString());
  };

  useEffect(() => {
    try {
      if (parent) {
        const response = parent;
        if (response.parent.errors === null) {
          setIsAuthenticated(true);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, [parent]);

  useEffect(() => {
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated");
    if (storedIsAuthenticated) {
      setIsAuthenticatedState(storedIsAuthenticated === "true");
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
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
