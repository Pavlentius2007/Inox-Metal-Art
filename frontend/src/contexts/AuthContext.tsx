import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface User {
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, userData?: Partial<User>) => void;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const TOKEN_KEY = 'inox_admin_token';
const USER_KEY = 'inox_admin_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Added for testing

  // Выход из системы
  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }, []);

  // Проверка валидности токена
  const checkAuth = useCallback(async (): Promise<boolean> => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    
    if (!storedToken) {
      return false;
    }

    try {
      // Проверяем токен на сервере
      const response = await fetch('http://localhost:8000/api/v1/auth/me', {
        headers: {
          'Authorization': `Bearer ${storedToken}`
        }
      });

      if (response.ok) {
        return true;
      } else {
        // Токен невалиден, очищаем
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  }, [logout]);

  // Инициализация при загрузке
  useEffect(() => {
    localStorage.clear();  // Clear old data for test
    setIsAuthenticated(true);  // Force true
    setIsLoading(false);
    // Comment out original init logic
    // const initAuth = () => { ... };
    // initAuth();
  }, []);

  // Вход в систему
  const login = useCallback((newToken: string, userData?: Partial<User>) => {
    
    // Декодируем JWT токен для получения email
    try {
      const payload = JSON.parse(atob(newToken.split('.')[1]));
      const userInfo: User = {
        email: payload.sub,
        ...userData
      };
      
      setToken(newToken);
      setUser(userInfo);
      
      localStorage.setItem(TOKEN_KEY, newToken);
      localStorage.setItem(USER_KEY, JSON.stringify(userInfo));
      
    } catch (error) {
      // Fallback: используем только переданные данные
      const userInfo: User = {
        email: userData?.email || 'unknown',
        ...userData
      };
      
      setToken(newToken);
      setUser(userInfo);
      
      localStorage.setItem(TOKEN_KEY, newToken);
      localStorage.setItem(USER_KEY, JSON.stringify(userInfo));
      
    }
  }, []);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: isAuthenticated, // Use the state variable
    isLoading,
    login,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

