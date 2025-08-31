import React, { useState } from 'react';
import { Link, useLocation, Outlet, Routes, Route, useNavigate } from 'react-router-dom';
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
  X,
  Download,
  User
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import Dashboard from './Dashboard';
import ProductsManagement from './ProductsManagement';
import ImportProducts from './ImportProducts';
import ImportProjects from './ImportProjects';
import MaterialsManagement from './MaterialsManagement';
import ImportMaterials from './ImportMaterials';
import GalleryManagement from './GalleryManagement';
import ProjectsManagement from './ProjectsManagement';

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin', label: 'Дашборд', icon: LayoutDashboard },
    { path: '/admin/products', label: 'Продукция', icon: Package },
    { path: '/admin/import', label: 'Импорт продуктов', icon: Download },
    { path: '/admin/import-projects', label: 'Импорт проектов', icon: Download },
    { path: '/admin/materials', label: 'Материалы', icon: FileText },
    { path: '/admin/import-materials', label: 'Импорт материалов', icon: Download },
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

        {/* User Info */}
        {user && (
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.name || user.email}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="px-4 py-6 space-y-2 flex-1">
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
            onClick={handleLogout}
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
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductsManagement />} />
            <Route path="import" element={<ImportProducts />} />
            <Route path="import-projects" element={<ImportProjects />} />
            <Route path="materials" element={<MaterialsManagement />} />
            <Route path="import-materials" element={<ImportMaterials />} />
            <Route path="gallery" element={<GalleryManagement />} />
            <Route path="projects" element={<ProjectsManagement />} />
            {/* Добавьте другие маршруты здесь */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;