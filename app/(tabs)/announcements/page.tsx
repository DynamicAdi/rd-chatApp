import { View, Text, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Announcements from 'components/screen/Announcements';
import axios from 'axios';
import { API_URL } from 'context/env';
import { useAuth } from 'context/AuthContext';
import Loader from 'components/elements/Loader';

const API = API_URL;
const page = () => {
  const [role, setRole] = useState({
    role: '',
    userId: '',
  });
  const { user } = useAuth() as any;
  const [isLoading, setLoading] = useState(false);
  const [msg, setMsg] = useState([]);
  const [input, setInput] = useState('');

  const [sendingMsg, sentMessage] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // const [currentUser, setCurrentUser] = useState("")

  const getProfile = async () => {
    try {
      setLoading(true);
      const msg = await axios.get(`${API}/api/announcements/get-all-msg`);
      const profile = await axios.get(`${API_URL}/api/profile/user`, {
        headers: {
          Authorization: user,
        },
      });
      if (profile.status === 200) {
        setRole((prev) => ({
          ...prev,
          role: profile.data.role,
          userId: profile.data.id,
        }));
      }
      if (msg.status === 200) {
        setMsg(msg.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, [refresh]);

  
  const handleClick = async () => {
    sentMessage(true);
    try {
      const res = await axios.post(
        `${API_URL}/api/announcements/add-msg`,
        {
          message: input,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${user}`,
          },
        }
      );
      if (res.status === 200) {
        setInput('');
        setRefresh(!refresh);
      }
    } catch (err) {
      console.log('error', err);
    } finally {
      sentMessage(false);
    }
  };

  if (isLoading) {
    return <Loader title="Getting Messages" />;
  }
  if (sendingMsg) {
    return <Loader title="Updating Message" />;
  }

  return (
    <Announcements
      role={role}
      data={msg}
      input={input}
      setInput={setInput}
      handleClick={handleClick}
    />
  );
};

export default page;
