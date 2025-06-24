import React, { useEffect, useState } from 'react';
import EmployeeProfile, { Employee } from 'components/screen/EmployeeProfile';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from 'context/AuthContext';
import { API_URL } from 'context/env';
import { ActivityIndicator, Text, View } from 'react-native';
import ClientProfile from 'components/screen/ClientProfile';
import Loader from 'components/elements/Loader';

type roleType = 'Employee' | 'Client' | 'Admin';

const page = () => {
  const [isLoading, setLoading] = useState(true);
  const [role, setRole] = useState<roleType>();
  const [data, setData] = useState<Employee>();
  const { user } = useAuth() as any;

  const getProfile = async () => {
    try {
      setLoading(true);
      const req = await axios.get(`${API_URL}/api/profile/user`, {
        headers: {
          Authorization: user,
        },
      });
      if (req.status === 200) {
        setData(req.data);
        setRole(req.data.role);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (isLoading) {
    return <Loader title="Gettig Your Information" />;
  }
  return role === 'Client' ? <ClientProfile /> : <EmployeeProfile 
  data={data as Employee}
  />;
};

export default page;
