import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import LoginForm from './LoginForm';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Тестовый лог для проверки рендеринга
  console.log('PrivateRoute: Component rendered');

  console.log('PrivateRoute: isAuthenticated:', isAuthenticated, 'isLoading:', isLoading);

  // Показываем загрузку пока проверяем аутентификацию
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Проверка авторизации...</p>
        </motion.div>
      </div>
    );
  }

  // Если не авторизован, показываем форму входа
  if (!isAuthenticated) {
    console.log('PrivateRoute: User not authenticated, showing login form');
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
        <LoginForm
          onLoginSuccess={() => {
            console.log('LoginForm: Login successful, redirecting...');
            // После успешного входа перенаправляем на админ-панель
            navigate('/admin', { replace: true });
          }}
          onLoginError={(error) => {
            console.error('LoginForm: Login error:', error);
          }}
        />
      </div>
    );
  }

  // Если авторизован, показываем защищенный контент
  console.log('PrivateRoute: User authenticated, showing protected content');
  return <>{children}</>;
};

export default PrivateRoute;
