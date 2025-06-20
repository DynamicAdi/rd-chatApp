import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router'

export const AuthContext = createContext({});


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  const router = useRouter()

  const login = async (email: string, password: string) => {
    
    setIsLoading(true);
    await AsyncStorage.setItem("userToken", "igiegngan");
    setUser("igiegngan");
    setIsLoading(false);
    router.replace("/(tabs)/main/page");
  };

  const logout = async () => {
    setIsLoading(true);
    await AsyncStorage.removeItem("userToken");
    setUser(null);
    setIsLoading(false);
    router.replace("/(auth)/welcome");
};

  const checkLoginStatus = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        setUser(token);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Error checking login status:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkLoginStatus(); // Run on mount
  }, [user]);

  return (
    <AuthContext.Provider value={{ isLoading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);