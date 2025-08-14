import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/admin';
import { authenticateUser, clearAuthData, getCurrentUser, AuthUserData } from '@/services/authService';

export interface AuthUser extends User {
  isAuthenticated: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const userData = getCurrentUser();
      if (userData) {
        setUser({
          id: userData.id,
          username: userData.username,
          loginTime: userData.loginTime,
          avatar: userData.avatar,
          isAuthenticated: userData.isAuthenticated,
          ...userData // Include any additional fields
        });
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      clearAuthData();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Use the authentication service to login
      const success = await authenticateUser(username, password);

      if (success) {
        // Get the user data that was saved by the auth service
        const userData = getCurrentUser();
        if (userData) {
          const newUser: AuthUser = {
            id: userData.id,
            username: userData.username,
            loginTime: userData.loginTime,
            avatar: userData.avatar,
            isAuthenticated: true,
            ...userData // Include any additional fields from the API response
          };

          setUser(newUser);
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    clearAuthData();
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user?.isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
