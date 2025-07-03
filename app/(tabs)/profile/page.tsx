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
  const [updating, setUpdating] = useState(false);
  const [updated, setUpdated] = useState(false)
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

  const [input, setInput] = useState("")

  
  const handleSubmit = async (title?: string) => {
    let key = title?.toLowerCase()
    try {
      setUpdating(true)
      // setLoading(true)
      const res = await axios.post(
        `${API_URL}/api/users/update-via-app`,
        {
          [key as string]: input,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${user}`,
          },
        }
      );
      if (res.status === 200) {
        setUpdating(false)
        setUpdated(!updated)
      }
    }
    catch (error) {
      console.log(error)
    }
    finally {
    }
  }
  
  useEffect(() => {
    getProfile();
  }, [updated]);

  if (isLoading) {
    return <Loader title="Gettig Your Information" />;
  }
  return role === 'Client' ? <ClientProfile /> : <EmployeeProfile 
  handleSubmit={handleSubmit}
  input={input}
  setInput={setInput}
  updating={updating}
  data={data as Employee}
  />;
};

export default page;
