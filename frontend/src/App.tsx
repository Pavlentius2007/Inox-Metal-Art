import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Gallery from './pages/Gallery';
import Materials from './pages/Materials';
import Projects from './pages/Projects';
import Certificates from './pages/Certificates';
import Contacts from './pages/Contacts';
import ApplicationForm from './components/ApplicationForm';

// Admin pages
import AdminLayout from './pages/admin/AdminLayout';
import LoginPage from './pages/admin/LoginPage';
import PrivateRoute from './components/auth/PrivateRoute';

const App: React.FC = () => {
  return (
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
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/application" element={<ApplicationForm />} />
        </Route>
      </Routes>
    </Router>
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