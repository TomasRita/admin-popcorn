// src/context/AuthContext.tsx
import { clearCache, getCache, setCache } from "@/lib/Cache";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useAuthenticateUser, useRegisterUser } from "../hooks/DynamicApiHooks";

interface User {
  id_user?: number;
  name?: string;
  email?: string;
  telephone?: string;
  photo?: string;
  gender?: string;
  type: number;
  token?: string;
  latitude?: string;
  longitude?: string;
  created_in?: string;
  access_token?: string;
  Settings?: {
    language: string;
    id_user: number;
    location: number;
    id_setting: number;
    theme: number;
  };
}

interface Path {
  path: string;
}

interface AuthResponse {
  code: number;
  message: string;
  result: {
    token: string;
    type: number;
  };
}

export interface RegisterData {
  name: string;
  email: string;
  telephone: string;
  password: string;
  language: string;
  photo: string;
  code: string;
  gender: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  updateLastPath: (path: string) => Promise<Path>;
  login: (email: string, password: string) => Promise<User>;
  register: (data: RegisterData) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => getCache("isAuthenticated") === "true"
  );
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = getCache("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const { mutateAsync: authenticate } = useAuthenticateUser();
  const { mutateAsync: registerUser } = useRegisterUser();

  useEffect(() => {
    setCache("isAuthenticated", isAuthenticated ? "true" : "false");
    if (user) setCache("user", JSON.stringify(user));
  }, [isAuthenticated, user]);

  // useEffect(() => {
  //   const checkToken = () => {
  //     const token = getCache("token");
  //     if (token) {
  //       localStorage.setItem("hasSeenWelcome", "true");
  //     }
  //   };
  //   checkToken();
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const storedAuth = getCache("isAuthenticated");
      const storedUser = getCache("user");
      if (storedAuth !== (isAuthenticated ? "true" : "false")) {
        setIsAuthenticated(storedAuth === "true");
      }
      if (storedUser && !user) {
        setUser(JSON.parse(storedUser));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isAuthenticated, user]);

  const updateLastPath = async (path: string): Promise<Path> => {
    localStorage.setItem("lastPath", path);
    return { path };
  };

  const login = async (email: string, password: string): Promise<User> => {
    try {
      // const data: AuthResponse = await authenticate({ email, password });

      // setCache("token", data.result.token);
      const userData: User = {
        type: 1,
        token: "d",
      };
      setIsAuthenticated(true);
      setUser(userData);
      return userData;
    } catch (error: any) {
      throw error;
    }
  };

  const register = async (data: RegisterData): Promise<User> => {
    try {
      const response: AuthResponse = await registerUser(data);
      setCache("token", response.result.token);
      const userData: User = {
        type: response.result.type,
        token: response.result.token,
      };
      setIsAuthenticated(true);
      setUser(userData);
      return userData;
    } catch (error: any) {
      throw new Error("Erro ao registrar usuário");
    }
  };

  const logout = () => {
    clearCache();
    localStorage.removeItem("hasSeenWelcome");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        register,
        logout,
        updateLastPath,
        // getUserDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
