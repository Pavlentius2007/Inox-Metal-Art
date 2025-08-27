import React, { useState } from 'react';
import { Link, useLocation, Outlet, Routes, Route } from 'react-router-dom';  // Добавил Routes, Route для вложенных роутов
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  Image, 
  FolderOpen, 
  Award, 
  Users, 
  Settings, 
  BarChart3,
  FileText,
  LogOut,
  X
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Dashboard from './Dashboard';  // Импорт Dashboard
import ProductsManagement from './ProductsManagement';  // Импорт ProductsManagement

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/admin', label: 'Дашборд', icon: LayoutDashboard },
    { path: '/admin/products', label: 'Продукция', icon: Package },
    { path: '/admin/gallery', label: 'Галерея', icon: Image },
    { path: '/admin/projects', label: 'Проекты', icon: FolderOpen },
    { path: '/admin/certificates', label: 'Сертификаты', icon: Award },
    { path: '/admin/news', label: 'Новости', icon: FileText },
    { path: '/admin/users', label: 'Пользователи', icon: Users },
    { path: '/admin/analytics', label: 'Аналитика', icon: BarChart3 },
    { path: '/admin/settings', label: 'Настройки', icon: Settings }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">А</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">Админка</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="px-4 py-4 border-t border-gray-200">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={() => {/* Выход из админки */}}
            className="text-red-600 hover:text-red-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Выйти
          </Button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;