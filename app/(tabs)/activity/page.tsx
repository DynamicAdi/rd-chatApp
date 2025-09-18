import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ChatHeader from 'components/utils/ChatHeader';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { API_URL } from 'context/env';
import { useAuth } from 'context/AuthContext';

interface TaskObj {
  id?: string;
  subject: string;
  description: string;
  status: string;
  projectName: string;
  deadline: string;
  assignedBy: string;
}

function ToggleCard({
  Props,
  isTaskExpand,
  setIsTaskExpand,
  updateFunc,
}: {
  Props: TaskObj;
  isTaskExpand: string | null;
  setIsTaskExpand: React.Dispatch<React.SetStateAction<string | null>>;
  updateFunc: (id: string) => void;
}) {
  const { id, subject, status, assignedBy, deadline, description, projectName } = Props;

  const alert = (title: string, id: string) => {
    Alert.alert(`${title}`, 'Are you sure to mark it as Done?', [
      { text: 'No', onPress: () => {} },
      {
        text: 'Yes',
        onPress: async () => {
          await updateFunc(id);
        },
      },
    ]);
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => setIsTaskExpand(isTaskExpand === subject ? null : subject)}
      style={{ minHeight: isTaskExpand === subject ? undefined : 192 }}
      className={`relative mt-4 flex w-auto items-center justify-between rounded-2xl ${status.toLowerCase() === 'completed' ? 'bg-emerald-500/15' : 'bg-pup-dark/50'} px-4 py-2.5 transition-all duration-300 ease-in-out`}>
      <View className="relative flex flex-row items-start justify-between">
        <View className="w-5/6">
          <Text
            className="w-[90%] font-grotesk-medium text-xl text-white"
            numberOfLines={isTaskExpand === subject ? undefined : 1}>
            {isTaskExpand !== subject ? `${subject.slice(0, 20)}...` : subject}
          </Text>
          <Text
            className={`w-[90%] font-dm-light text-sm ${isTaskExpand === subject ? 'text-white' : 'text-gray-600'}`}
            numberOfLines={isTaskExpand === subject ? undefined : 1}>
            {isTaskExpand !== subject ? `${description.slice(0, 80)}...` : description}
          </Text>
        </View>
        <View className="mt-1 h-7 w-7 ">
          <AntDesign name="down" size={20} color="gray" />
        </View>
        {isTaskExpand === subject && (
          <TouchableOpacity
            onPress={() => alert(projectName, id as string)}
            activeOpacity={status === 'completed' ? 1 : 0.4}
            className={`absolute -bottom-10 right-0  flex flex-row gap-1 rounded-lg bg-emerald-600/25 px-3 py-2 ${status.toLowerCase() === 'completed' ? 'opacity-50' : 'opacity-100'}`}>
            <Text className="font-dm-medium text-xs text-emerald-500">
              {status.toLowerCase() === 'completed' ? 'Done' : 'Mark as Done'}
            </Text>
            <Ionicons name="checkmark-done-outline" size={14} color={'#10b981'} />
          </TouchableOpacity>
        )}
      </View>
      <View
        className={`${isTaskExpand === subject ? 'mt-12' : 'mt-4'} flex h-28 w-full flex-row items-start justify-between ${isTaskExpand === subject ? 'opacity-100' : 'opacity-65'}`}>
        <View className="flex h-full w-1/3 items-center justify-center">
          <Ionicons name="code-working-outline" size={24} color="white" />
          <Text className="mt-4 text-center font-dm-light text-xs text-gray-500">Project Name</Text>
          <Text className="mt-1 text-center font-dm-regular text-sm text-white">{projectName}</Text>
        </View>

        <View className="flex h-full w-1/3 items-center justify-center">
          <AntDesign name="clockcircleo" size={24} color="white" />
          <Text className="mt-4 text-center font-dm-light text-xs text-gray-500">Deadline</Text>
          <Text className="mt-1 text-center font-dm-regular text-sm text-white">
            {new Date(deadline).toDateString()}
          </Text>
        </View>

        <View className="flex h-full w-1/3 items-center justify-center">
          <AntDesign name="user" size={24} color="white" />
          <Text className="mt-4 text-center font-dm-light text-xs text-gray-500">Assigned By</Text>
          <Text className="mt-1 text-center font-dm-regular text-sm text-white">{assignedBy}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const page = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isCompletedTab, setIsCompletedTab] = useState(false);
  const [isTaskExpand, setIsTaskExpand] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [Tasks, setTasks] = useState<{
    total: TaskObj[];
    pending: TaskObj[];
    completed: TaskObj[];
  }>({
    total: [],
    pending: [],
    completed: [],
  });
  const { user } = useAuth() as any;

  const handleLogin = async () => {
    setLoading(true);
    const req = await axios.post(
      `${API_URL}/api/users/update-via-app`,
      {
        isLogin: !isLogin,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${user}`,
        },
      }
    );

    if (req) {
      setLoading(false);
      return true;
    }
    setLoading(false);
    return false;
  };

  const updateStatusForWork = async (id: string) => {
    try {
      const req = await axios.put(`${API_URL}/api/work/update-work-status/${id}`, {
        status: 'Completed',
      });

      if (req.status === 200) {
        setTasks((prev) => {
          const task =
            prev.total.find((task) => task.id === id) ||
            prev.pending.find((task) => task.id === id);

          if (!task) return prev; // If task not found, skip

          const updatedTask = { ...task, status: 'Completed' };

          return {
            ...prev,
            pending: prev.pending.filter((task) => task.id !== id),
            completed: [...prev.completed, updatedTask],
          };
        });
      }
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  const alert = () => {
    Alert.alert('Login', isLogin ? 'Do You Want to Logout?' : 'Do You Want to Login?', [
      { text: 'No', onPress: () => {} },
      {
        text: 'Yes',
        onPress: async () => {
          const stat = await handleLogin();
          if (stat) {
            setIsLogin(!isLogin);
          }
        },
      },
    ]);
  };

  const getProfile = async () => {
    try {
      setLoading(true);
      const req = await axios.get(`${API_URL}/api/profile/user`, {
        headers: {
          Authorization: user,
        },
      });
      console.log(req);

      if (req.status === 200) {
        console.log(req.data);
        setIsLogin(req.data.isLogin);

        const filtered = req.data.WorkAssigned.filter((item: any) => {
  const createdAt = new Date(item.createdAt);
  const now = new Date();

  const diffInHours = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

  return !(item.status === "Completed" && diffInHours > 24);
});


        const completed = filtered.filter(
          (task: any) => task.status.toLowerCase() === 'completed'
        );
        const pending = filtered.filter(
          (task: any) => task.status.toLowerCase() !== 'completed'
        );
        setTasks((prev) => ({
          ...prev,
          total: filtered,
          completed: completed,
          pending: pending,
        }));
        setData(req.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProfile();
  }, [isLogin]);

  useEffect(() => {
    if (isLogin) {
    }
  }, [isLogin]);

  if (isLoading) {
    return (
      <View className="flex h-screen w-auto items-center justify-center">
        <ActivityIndicator size={32} color={'white'} />
      </View>
    );
  }

  const listData = isCompletedTab ? Tasks.completed : Tasks.pending;
const EmptyComponent = isCompletedTab 
  ? (            <Text className="mt-40 text-center font-grotesk-light text-lg text-gray-400">
              You have not compeleted Anything yet!{' '}
              <Text className="text-center font-grotesk-light text-sm text-gray-600">
                {' '}
                {'\n'}Please completed your task on specified deadlines. {'\n'}{' '}
              </Text>
            </Text>)
  : (            <Text className="mt-40 text-center font-grotesk-light text-xl text-gray-400">
              No Task has been assigned yet!{' '}
              <Text className="text-center font-grotesk-light text-base text-gray-600">
                {' '}
                {'\n'}Please wait a while or contact Team Leader or management {'\n'}{' '}
              </Text>
            </Text>);
  return (
    <View>
      <ChatHeader title="Today's Activity" back={false} type="main" />
      <View style={{ flex: 1 }} className="-mt-12 min-h-[10%] px-3">
        <View className="flex h-full w-full flex-row items-center justify-between rounded-full bg-pup-dark p-8 py-3.5">
          <View className="px-2">
            <Text className="font-dm-semibold text-2xl text-white">Login</Text>
            <Text className="font-pop-light text-sm text-gray-400 ">Let's Start The Work</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => alert()}
            className={`-mr-2 flex h-8 w-16 rounded-full ${isLogin ? 'justify-end bg-white' : 'justify-start bg-purple-400/20 '}  flex-row items-center px-1 transition-all duration-500 ease-in-out`}>
            <View className={`h-6 w-6 rounded-full ${isLogin ? 'bg-pup-100' : 'bg-white'}`}></View>
          </TouchableOpacity>
        </View>
      </View>
      {isLogin ? (
        <View className="p-4 py-6">
          <Text className="font-dm-bold text-2xl tracking-tighter text-white">
            Your Today's Work
          </Text>
          <Text className="mt-1 font-pop-light text-sm text-gray-400">
            You have{' '}
            {isLoading ? (
              <ActivityIndicator size={14} color={'white'} />
            ) : Tasks.pending.length > 0 ? (
              Tasks.pending.length
            ) : (
              0
            )}{' '}
            tasks left...
          </Text>

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setIsCompletedTab(!isCompletedTab)}
            className={`my-4 flex h-14 w-3/4 flex-row items-center justify-between rounded-lg ${isCompletedTab ? 'bg-emerald-700/20' : 'bg-pup-dark'} px-2`}>
            <Text
              className={` rounded-lg p-4 py-3 font-dm-light text-sm text-gray-400 transition-all duration-200 ease-in ${isCompletedTab ? '' : 'bg-pup-300 font-dm-semibold text-white'}`}>
              Pending -{' '}
              {isLoading ? (
                <ActivityIndicator size={14} color={'white'} />
              ) : Tasks.pending.length > 0 ? (
                Tasks.pending.length
              ) : (
                0
              )}
            </Text>
            <Text
              className={` p-4 py-3 font-dm-light text-sm text-gray-400 transition-all duration-200 ease-in  ${isCompletedTab ? 'bg-emerald-700 font-dm-semibold  text-white' : ''} rounded-lg`}>
              Completed -{' '}
              {isLoading ? (
                <ActivityIndicator size={14} color={'white'} />
              ) : Tasks.completed.length > 0 ? (
                Tasks.completed.length
              ) : (
                0
              )}
            </Text>
          </TouchableOpacity>
          {
          
          listData.length > 0 ? (
            <FlatList
              data={listData}
              keyExtractor={(index) => index.toString()}
              renderItem={({ item }) => (
                <ToggleCard
                  Props={item}
                  isTaskExpand={isTaskExpand}
                  setIsTaskExpand={setIsTaskExpand}
                  updateFunc={updateStatusForWork}
                />
              )}
              showsVerticalScrollIndicator={false}
              className="h-96"
            />
          ) : (
            EmptyComponent
          )}
        </View>
      ) : (
        <Text className="py-4 text-center text-xl text-gray-600">
          You are not logged in, {'\n'} <Text className="text-base">Please Login</Text>
        </Text>
      )}
    </View>
  );
};

export default page;
