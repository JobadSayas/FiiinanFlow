import React, { createContext, useContext, useEffect, useState } from 'react';
import {API_URL} from '../components/Utilities';

const MethodContext = createContext();

export const useMethodData = () => useContext(MethodContext);

export const MethodProvider = ({ children }) => {
  const [methodData, setMethodData] = useState(null);

  useEffect(() => {
    const fetchMethodData = async () => {
      try {
        const response = await fetch(`${API_URL}/NEWlistMethods.php`);
        const data = await response.json();
        setMethodData(data);
      } catch (error) {
        console.error('Error fetching method data:', error);
      }
    };

    fetchMethodData();
  }, []);

  return (
    <MethodContext.Provider value={methodData}>
      {children}
    </MethodContext.Provider>
  );
};