import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (token: string) => void;
    logout: () => void;
  }
  

export const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) setToken(storedToken);
    setLoading(false);
  }, []);

  const login = (jwt: string) => {
    localStorage.setItem('token', jwt);
    setToken(jwt);
    router.push('/');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token,loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
