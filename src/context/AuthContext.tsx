import { ReactNode, createContext, useContext, useState, useEffect, useRef } from 'react';
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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const timestamp = localStorage.getItem('token_timestamp');
  
    if (token && timestamp) {
      const now = Date.now();
      const loginTime = Number(timestamp);
      const oneHour = 60 * 60 * 1000;
      const age = now - loginTime;
  
      if (age < oneHour) {
        setToken(token);
  
        const remainingTime = oneHour - age;
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          logout();
          alert('Session expired. Please log in again.');
        }, remainingTime);
      } else {
        logout();
      }
    }
  
    setLoading(false);
  
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  
  

  const login = (jwt: string) => {
    const now = Date.now();
    localStorage.setItem('token', jwt);
    localStorage.setItem('token_timestamp', now.toString());
    setToken(jwt);
  
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  
    timeoutRef.current = setTimeout(() => {
      logout();
      alert('Session expired. Please log in again.');
    }, 60 * 60 * 1000);
  
    router.push('/');
  };
  
  

  const logout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    localStorage.removeItem('token');
    localStorage.removeItem('token_timestamp');
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
