import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';

import Materials from './pages/Materials';
import Projects from './pages/Projects';
import Contacts from './pages/Contacts';
import ApplicationForm from './components/ApplicationForm';
import ApplicationModal from './components/modals/ApplicationModal';

// Контекст для глобального состояния модального окна
interface ApplicationModalContextType {
  isApplicationModalOpen: boolean;
  setIsApplicationModalOpen: (open: boolean) => void;
}

const ApplicationModalContext = createContext<ApplicationModalContextType | undefined>(undefined);

// Хук для использования контекста
export const useApplicationModal = () => {
  const context = useContext(ApplicationModalContext);
  if (context === undefined) {
    throw new Error('useApplicationModal must be used within a ApplicationModalProvider');
  }
  return context;
};

// Admin pages
import AdminLayout from './pages/admin/AdminLayout';
import LoginPage from './pages/admin/LoginPage';
import PrivateRoute from './components/auth/PrivateRoute';

// Auth context
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  return (
    <AuthProvider>
      <ApplicationModalContext.Provider value={{ isApplicationModalOpen, setIsApplicationModalOpen }}>
        <Router>
          <Routes>
            {/* Auth routes */}
            <Route path="/admin/login" element={<LoginPage />} />
            
            {/* Protected Admin routes */}
            <Route 
              path="/admin/*" 
              element={
                <PrivateRoute>
                  <AdminLayout />
                </PrivateRoute>
              } 
            />

            {/* Public routes - с Header и Footer */}
            <Route element={<LayoutWithHeaderFooter />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />

              <Route path="/materials" element={<Materials />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/application" element={<ApplicationForm />} />
            </Route>
          </Routes>
          
          {/* Глобальное модальное окно поверх всего сайта */}
          <ApplicationModal
            isOpen={isApplicationModalOpen}
            onClose={() => {
              setIsApplicationModalOpen(false);
            }}
          />
        </Router>
      </ApplicationModalContext.Provider>
    </AuthProvider>
  );
};

// Вспомогательный компонент для публичных страниц
const LayoutWithHeaderFooter: React.FC = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default App;