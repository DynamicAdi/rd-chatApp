import axios from 'axios';
import Details from 'components/utils/Details';
import GrpList from 'components/utils/GrpListBubble';
import { useAuth } from 'context/AuthContext';
import { API_URL } from 'context/env';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

const KnowMoreScreen = () => {
  const params = useLocalSearchParams();
  const id = params.chatId;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);

  const { user } = useAuth() as any;
  const [role, setRole] = useState('');

  const getRole = async () => {
    const profile = await axios.get(`${API_URL}/api/profile/user`, {
        headers: {
          Authorization: user,
        },
      })
      if (profile.status === 200) {
        setRole(profile.data.role);
      }
  }
  const getAll = async () => {
    const getChatData = await axios.get(`${API_URL}/api/manage/get-by-id/${id}`);
    if (getChatData.status === 200) {
      setData(getChatData.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAll();
    getRole()
  }, []);

  return loading ? (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color={'white'} />
      <Text className="font-dm-medium text-2xl text-white">Getting Details</Text>
    </View>
  ) : (
    <Details role={role} name={data.name} type={data.description} image={data.image}>
      <GrpList />
    </Details>
  );
};

export default KnowMoreScreen;
