import React, { useEffect, createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);
export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(AsyncStorage.getItem('user') ?? null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [accessToken, setAccessToken] = useState(AsyncStorage.getItem('accessToken') ?? null);


  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
          setAccessToken(token);
          setIsAuthenticated(true);
          const localUser = await AsyncStorage.getItem('user');
          setUser(localUser ? JSON.parse(localUser) : null);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to check login status:', error);
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkLoginStatus();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
