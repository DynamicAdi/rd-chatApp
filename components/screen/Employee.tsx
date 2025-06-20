import { View, Text, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Keyboard, KeyboardAvoidingView, Platform, } from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import Input from 'components/utils/Input';
import PupBtn from 'components/utils/PupBtn';
import { useRouter } from 'expo-router';
import { useAuth } from 'context/AuthContext';

const EmployeeLogin = () => {
  const router = useRouter();
  const { login } = useAuth() as any;
  const [employeeDet, setEmployeeDet] = useState({
    employeeId: '' as string,
    password: '',
  });
  const [error, setError] = useState({
    where: '',
    bool: false,
    message: ''
  });

  const handleLogin = () => {
    if (!employeeDet.employeeId && !employeeDet.password) {
      setError({
        where: 'both',
        bool: true,
        message: 'Please enter your Employee ID and Password',
      });
    }
    const email = employeeDet.employeeId.split('@')[1];
    const pass = employeeDet.password.length;
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
      login(employeeDet.employeeId, employeeDet.password);
    }
  };
  return (
    <View className="relative flex flex-1">
      <View className="absolute -bottom-[45%] -right-1/3 h-5/6 w-full rotate-[60deg] bg-pup-100"></View>
      <View className="flex h-5/6 w-full items-start justify-center gap-4 px-6 py-8">
        <Text className="font-pop-medium text-4xl text-white">We’re glad you’re here.</Text>
        <Text className="mb-6 font-pop-light text-lg text-pup-100">
          Just a quick sign-in and you’re in!
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
          value={employeeDet.employeeId}
          setValue={(text) => setEmployeeDet({ ...employeeDet, employeeId: text as string })}
          placeholder="Employee ID"
          />
          {
            error.where === 'email' && error.bool && (
              <Text className="text-red-800 text-xs leading-none">{error.message}</Text>
            )
          }
        <Input
          className='mb-1'
          warn={error.where === 'password' && error.bool}
          value={employeeDet.password}
          setValue={(text) => setEmployeeDet({ ...employeeDet, password: text as string })}
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
      </View>
      <View className="flex h-1/4 w-full items-end justify-start px-4 py-8">
        <Text className="font-grotesk-bold text-4xl text-white">Client Login</Text>
        <TouchableOpacity onPress={() => router.push('/auth/clientLogin/page')}>
          <Text className="font-dm-regular text-white underline">
            Client Login <AntDesign name="arrowright" size={16} color={'white'} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmployeeLogin;
