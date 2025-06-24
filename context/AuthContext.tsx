import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router'
import axios from "axios";
import { API_URL } from 'context/env'

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  const router = useRouter()

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const apiCall = await axios.post(`${API_URL}/api/users/login`, {
        email: email.toLowerCase(),
        password: password
      })
      if (apiCall.status===200) {
        await AsyncStorage.setItem("userToken", apiCall.data.token);
        setUser(apiCall.data.token);
        router.replace("/(tabs)/main/page");
      }
    }
    catch (error) {
      alert(`It's not you, Its us!\n Error - ${error}`)
    }
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