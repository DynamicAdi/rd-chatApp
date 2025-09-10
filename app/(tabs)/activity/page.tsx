import { View, Text, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import ChatHeader from 'components/utils/ChatHeader';
import { AntDesign, Ionicons } from '@expo/vector-icons';

interface TaskObj {
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
}: {
  Props: TaskObj;
  isTaskExpand: string | null;
  setIsTaskExpand: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const { subject, status, assignedBy, deadline, description, projectName } = Props;
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => setIsTaskExpand(isTaskExpand === subject ? null : subject)}
      style={{ minHeight: isTaskExpand === subject ? undefined : 192 }}
      className={`w-auto relative mt-4 flex items-center justify-between rounded-2xl ${status.toLowerCase() === "completed" ? "bg-emerald-500/15" : "bg-pup-dark/50"} px-4 py-2.5 transition-all duration-300 ease-in-out`}>
      <View className="relative flex flex-row items-start justify-between">
        <View className="w-5/6">
          <Text
            className="w-[90%] font-grotesk-medium text-xl text-white"
            numberOfLines={isTaskExpand === subject ? undefined : 1}>
            {isTaskExpand !== subject ? `${subject.slice(0, 20)}...` : subject}
          </Text>
          <Text
            className={`w-[90%] font-dm-light text-sm ${isTaskExpand === subject ? "text-white" : "text-gray-600"}`}
            numberOfLines={isTaskExpand === subject ? undefined : 1}>
            {isTaskExpand !== subject ? `${description.slice(0, 80)}...` : description}
          </Text>
        </View>
        <View className="mt-1 h-7 w-7 ">
          <AntDesign name="down" size={20} color="gray" />
        </View>
        {isTaskExpand === subject && (
          <TouchableOpacity activeOpacity={status === "completed" ? 1 : 0.4} className={`absolute -bottom-10 right-0  flex flex-row gap-1 rounded-lg bg-emerald-600/25 px-3 py-2 ${status.toLowerCase() === "completed" ? "opacity-50" : "opacity-100"}`}>
            <Text className="font-dm-medium text-xs text-emerald-500">{status.toLowerCase() === "completed" ? "Done" : "Mark as Done"}</Text>
            <Ionicons name="checkmark-done-outline" size={14} color={'#10b981'} />
          </TouchableOpacity>
        )}
      </View>
      <View
        className={`${isTaskExpand === subject ? 'mt-12' : 'mt-4'} flex h-28 w-full flex-row items-start justify-between ${isTaskExpand === subject ? "opacity-100" : "opacity-65"}`}>
        <View className="flex h-full w-1/3 items-center justify-center">
          <Ionicons name="code-working-outline" size={24} color="white" />
          <Text className="mt-4 text-center font-dm-light text-xs text-gray-500">Project Name</Text>
          <Text className="mt-1 text-center font-dm-regular text-sm text-white">{projectName}</Text>
        </View>

        <View className="flex h-full w-1/3 items-center justify-center">
          <AntDesign name="clockcircleo" size={24} color="white" />
          <Text className="mt-4 text-center font-dm-light text-xs text-gray-500">Deadline</Text>
          <Text className="mt-1 text-center font-dm-regular text-sm text-white">{deadline}</Text>
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
  const [isLogin, setIsLogin] = useState(true);
  const [isCompletedTab, setIsCompletedTab] = useState(false);
  const [isTaskExpand, setIsTaskExpand] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false)

  const tasks: TaskObj[] = [
    {
      subject: 'Design Ready',
      description: 'Create wireframes and mockups for the homepage',
      status: 'Completed',
      projectName: 'Website Redesign',
      deadline: '2025-09-15',
      assignedBy: 'Alice Johnson',
    },
    {
      subject: 'API Integration',
      description: 'Integrate payment gateway API with backend',
      status: 'Completed',
      projectName: 'E-commerce Platform',
      deadline: '2025-09-20',
      assignedBy: 'Michael Smith',
    },
    {
      subject: 'Bug Fixes',
      description: 'Fix login authentication issues on mobile devices',
      status: 'Pending',
      projectName: 'Mobile App v2',
      deadline: '2025-09-05',
      assignedBy: 'David Brown',
    },
    {
      subject: 'Database Optimization',
      description: 'Improve query performance and add missing indexes',
      status: 'Pending',
      projectName: 'Analytics Dashboard',
      deadline: '2025-09-18',
      assignedBy: 'Sophia Martinez',
    },
    {
      subject: 'Content Writing',
      description: 'Write blog post on AI trends in 2025',
      status: 'Pending',
      projectName: 'Marketing Campaign',
      deadline: '2025-09-12',
      assignedBy: 'Emma Wilson',
    },
  ];

  const [Tasks, setTasks] = useState<{total: TaskObj[], pending: TaskObj[], completed: TaskObj[]}>({
    total: [],
    pending: [],
    completed: []
  })

  useEffect(() => {
   const completed =  tasks.filter(task => task.status.toLowerCase() === "completed")
   const pending = tasks.filter(task => task.status.toLowerCase() !== "completed")
   setTasks({
    completed: completed,
    pending: pending,
    total: tasks
   })
  }, [])
  return (
    <View>
      <ChatHeader title="Today's Activity" back={false} type='main' />
      <View style={{ flex: 1 }} className="-mt-12 min-h-[10%] px-3">
        <View className="flex h-full w-full flex-row items-center justify-between rounded-full bg-pup-dark p-8 py-3.5">
          <View className="px-2">
            <Text className="font-dm-semibold text-2xl text-white">Login</Text>
            <Text className="font-pop-light text-sm text-gray-400 ">Let's Start The Work</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsLogin(!isLogin)}
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
          <Text className="mt-1 font-pop-light text-sm text-gray-400">You have {isLoading ? (<ActivityIndicator size={14} color={"white"}/>) : Tasks.pending.length > 0 ? Tasks.pending.length : 0} tasks left...</Text>

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setIsCompletedTab(!isCompletedTab)}
            className={`my-4 flex h-14 w-3/4 flex-row items-center justify-between rounded-lg ${isCompletedTab ? "bg-emerald-700/20" : "bg-pup-dark"} px-2`}>
            <Text
              className={` rounded-lg p-4 py-3 font-dm-light text-sm text-gray-400 transition-all duration-200 ease-in ${isCompletedTab ? '' : 'bg-pup-300 font-dm-semibold text-white'}`}>
              Pending - {isLoading ? (<ActivityIndicator size={14} color={"white"}/>) : Tasks.pending.length > 0 ? Tasks.pending.length : 0}
            </Text>
            <Text
              className={` p-4 py-3 font-dm-light text-sm text-gray-400 transition-all duration-200 ease-in  ${isCompletedTab ? 'bg-emerald-700 font-dm-semibold  text-white' : ''} rounded-lg`}>
              Completed - {isLoading ? (<ActivityIndicator size={14} color={"white"}/>) : Tasks.completed.length > 0 ? Tasks.completed.length : 0}
            </Text>
          </TouchableOpacity>
          {
            tasks.length > 0 ? 
            (
                <FlatList
                  data={isCompletedTab ? Tasks.completed : Tasks.pending}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <ToggleCard
                      Props={item}
                      isTaskExpand={isTaskExpand}
                      setIsTaskExpand={setIsTaskExpand}
                    />
                  )}
                  showsVerticalScrollIndicator={false}
                  className="h-96"
                />
            ) 
            : (
              <Text className="mt-40 text-center font-grotesk-light text-xl text-gray-400">
                No Task has been assigned yet!{' '}
                <Text className="text-center font-grotesk-light text-base text-gray-600">
                  {' '}
                  {'\n'}Please wait a while or contact Team Leader or management {'\n'}{' '}
                </Text>
              </Text>
            )
            }
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
