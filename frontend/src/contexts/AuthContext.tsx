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
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
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

  // Выход из системы
  const logout = useCallback(() => {
    console.log('AuthContext: logout() called');
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
      console.error('Auth check failed:', error);
      logout();
      return false;
    }
  }, [logout]);

  // Инициализация при загрузке
  useEffect(() => {
    const initAuth = () => {
      console.log('AuthContext: Initializing...');
      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);
      
      if (storedToken && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setToken(storedToken);
          setUser(userData);
          console.log('AuthContext: Restored user from localStorage:', userData.email);
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(USER_KEY);
        }
      } else {
        console.log('AuthContext: No stored credentials found');
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // Вход в систему
  const login = useCallback((newToken: string, userData?: Partial<User>) => {
    console.log('AuthContext: login() called with token:', newToken.substring(0, 20) + '...');
    
    // Декодируем JWT токен для получения email
    try {
      const payload = JSON.parse(atob(newToken.split('.')[1]));
      const userInfo: User = {
        email: payload.sub,
        ...userData
      };
      
      console.log('AuthContext: Token decoded successfully, user email:', userInfo.email);
      
      setToken(newToken);
      setUser(userInfo);
      
      localStorage.setItem(TOKEN_KEY, newToken);
      localStorage.setItem(USER_KEY, JSON.stringify(userInfo));
      
      console.log('AuthContext: User authenticated, state updated');
      console.log('AuthContext: Current state - token:', !!newToken, 'user:', !!userInfo, 'isAuthenticated will be:', !!newToken);
    } catch (error) {
      console.error('AuthContext: Error decoding token:', error);
      // Fallback: используем только переданные данные
      const userInfo: User = {
        email: userData?.email || 'unknown',
        ...userData
      };
      
      setToken(newToken);
      setUser(userInfo);
      
      localStorage.setItem(TOKEN_KEY, newToken);
      localStorage.setItem(USER_KEY, JSON.stringify(userInfo));
      
      console.log('AuthContext: User authenticated with fallback data');
      console.log('AuthContext: Current state - token:', !!newToken, 'user:', !!userInfo, 'isAuthenticated will be:', !!newToken);
    }
  }, []);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    login,
    logout,
    checkAuth
  };

  console.log('AuthContext: Providing value:', {
    hasUser: !!user,
    hasToken: !!token,
    isAuthenticated: !!token,
    isLoading
  });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

