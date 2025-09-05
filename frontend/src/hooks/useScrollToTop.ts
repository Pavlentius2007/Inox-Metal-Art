import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Прокручиваем страницу наверх при изменении маршрута
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);
};
