import { useState, useEffect, useCallback } from 'react';

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

export const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Выход из системы
  const logout = useCallback(() => {
    console.log('useAuth: logout() called');
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
      // Проверяем токен на сервере (опционально)
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
      console.log('useAuth: Initializing...');
      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);
      
      if (storedToken && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setToken(storedToken);
          setUser(userData);
          console.log('useAuth: Restored user from localStorage:', userData.email);
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(USER_KEY);
        }
      } else {
        console.log('useAuth: No stored credentials found');
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // Вход в систему
  const login = useCallback((newToken: string, userData?: Partial<User>) => {
    console.log('useAuth: login() called with token:', newToken.substring(0, 20) + '...');
    
    // Декодируем JWT токен для получения email
    try {
      const payload = JSON.parse(atob(newToken.split('.')[1]));
      const userInfo: User = {
        email: payload.sub,
        ...userData
      };
      
      console.log('useAuth: Token decoded successfully, user email:', userInfo.email);
      
      setToken(newToken);
      setUser(userInfo);
      
      localStorage.setItem(TOKEN_KEY, newToken);
      localStorage.setItem(USER_KEY, JSON.stringify(userInfo));
      
      console.log('useAuth: User authenticated, state updated');
    } catch (error) {
      console.error('useAuth: Error decoding token:', error);
      // Fallback: используем только переданные данные
      const userInfo: User = {
        email: userData?.email || 'unknown',
        ...userData
      };
      
      setToken(newToken);
      setUser(userInfo);
      
      localStorage.setItem(TOKEN_KEY, newToken);
      localStorage.setItem(USER_KEY, JSON.stringify(userInfo));
      
      console.log('useAuth: User authenticated with fallback data');
    }
  }, []);

  return {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    login,
    logout,
    checkAuth
  };
};
