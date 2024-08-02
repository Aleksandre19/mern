import { createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';

const LocationContext = createContext();

const LocationProvider = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const categories = location.pathname.includes('/category/');
  const search = location.pathname.includes('/search/');

  return (
    <LocationContext.Provider value={{ isHomePage, categories, search }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => useContext(LocationContext);
export default LocationProvider;
