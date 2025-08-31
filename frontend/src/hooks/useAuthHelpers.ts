import { useAuth } from './useAuth';

// Хук для получения заголовков авторизации
export const useAuthHeaders = () => {
  const { token } = useAuth();
  
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Хук для проверки, авторизован ли пользователь
export const useRequireAuth = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  return { isAuthenticated, isLoading };
};
