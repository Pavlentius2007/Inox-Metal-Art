import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoginForm from '../../components/auth/LoginForm';
import { useAuth } from '../../hooks/useAuth';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginSuccess = (token: string) => {
    console.log('LoginPage: Login successful, calling login() and navigating...');
    login(token);
    // Перенаправляем на дашборд после успешного входа
    console.log('LoginPage: Navigating to /admin...');
    navigate('/admin', { replace: true });
  };

  const handleLoginError = (error: string) => {
    console.error('LoginPage: Login failed:', error);
    // Можно добавить toast уведомление об ошибке
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <LoginForm
          onLoginSuccess={handleLoginSuccess}
          onLoginError={handleLoginError}
        />
        
        {/* Дополнительная информация */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-500">
            Нужна помощь? Обратитесь к администратору
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
