import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React, { useContext, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import Input from 'components/utils/Input';
import PupBtn from 'components/utils/PupBtn';
import { useRouter } from 'expo-router';
import { useAuth } from 'context/AuthContext';

const ClientLogin = () => {
  const router = useRouter();
  const { login } = useAuth() as any;

  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    where: '',
    bool: false,
    message: '',
  });

  const handleLogin = () => {
    if (!userDetails.email && !userDetails.password) {
      setError({
        where: 'both',
        bool: true,
        message: 'Please enter your Employee ID and Password',
      });
    }
    const email = userDetails.email.split('@')[1];
    const pass = userDetails.password.length;
    if (email !== 'therdgroupofindustries.app') {
      setError({
        where: 'email',
        bool: true,
        message: 'Please enter a valid Employee ID',
      });
    }
    if (pass < 7) {
      setError({
        where: 'password',
        bool: true,
        message: 'Password must be at least 7 characters long',
      });
    }
    if (email === 'therdgroupofindustries.app' && pass >= 7) {
      login(userDetails.email, userDetails.password);
    }
  };
  return (
    <View className="relative flex flex-1">
      <View className="absolute -left-1/3 -top-[45%] h-5/6 w-full rotate-[60deg] bg-pup-200"></View>
      <View className="flex h-1/4 w-3/5 items-start justify-start px-4 py-12">
        <Text className="font-grotesk-bold text-4xl text-white">Client Login</Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/EmployeeLogin/page')}>
          <Text className="font-dm-regular text-white underline">
            Employee Login <AntDesign name="arrowright" size={16} color={'white'} />
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex h-5/6 w-full items-start justify-start gap-4 px-6 py-8">
        <Text className="font-pop-medium text-3xl text-white">Your personalized dashboard.</Text>
        <Text className="mb-6 font-pop-light text-base text-pup-100">
          Your information stays secure with us.
        </Text>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} className='w-full'>
    <KeyboardAvoidingView
    className='w-full'
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 240}
    >

      <ScrollView className='w-full' style={{ flexGrow: 0 }}>
        <Input
          className='mb-4'
          warn={error.where === 'email' && error.bool}
          value={userDetails.email}
          setValue={(text) => setUserDetails({ ...userDetails, email: text as string })}
          placeholder="Your Email Address"
          />
          {
            error.where === 'email' && error.bool && (
              <Text className="text-red-800 text-xs leading-none">{error.message}</Text>
            )
          }
        <Input
          className='mb-1'
          warn={error.where === 'password' && error.bool}
          value={userDetails.password}
          setValue={(text) => setUserDetails({ ...userDetails, password: text as string })}
          placeholder="Your Password"
          />
        {
          error.where === 'password' && error.bool && (
            <Text className="text-red-800 text-xs leading-none">{error.message}</Text>
          )
        }
        <TouchableOpacity className="w-full">
          <Text className="w-full text-right font-dm-light text-pup-100">Forget Password?</Text>
        </TouchableOpacity>
        </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
        <PupBtn title="Login" className="w-full" onPress={() => handleLogin()} />
        {/* <TouchableOpacity className="w-full" onPress={() => router.push('/auth/NewUser/page')}>
          <Text className="w-full text-center font-dm-light text-pup-100 underline">
            New? Create Your Account
          </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};
export default ClientLogin;
