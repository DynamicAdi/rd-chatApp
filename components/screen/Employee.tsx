import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import Input from 'components/utils/Input'
import PupBtn from 'components/utils/PupBtn'
import { useRouter } from 'expo-router'

const EmployeeLogin = () => {
  const router = useRouter();
  return (
    <View className='flex flex-1 relative'>
        <View className='w-full h-5/6 rotate-[60deg] bg-pup-100 absolute -bottom-[45%] -right-1/3'></View>
                    <View className='w-full h-5/6 flex justify-center py-8 items-start px-6 gap-4'>
            <Text className='font-pop-medium text-4xl text-white'>We’re glad you’re
here.</Text>
            <Text className='font-pop-light text-lg mb-6 text-pup-100'>Just a quick sign-in and you’re in!</Text>
            <Input placeholder='Employee ID'/>
            <Input placeholder='Your Password'/>
            <TouchableOpacity className='w-full'>
                <Text className='w-full text-right text-pup-100 font-dm-light'>Forget Password?</Text>
            </TouchableOpacity>
            <PupBtn title='Login' className='w-full' />
            </View>
        <View className='w-full h-1/4 flex justify-start py-8 items-end px-4'>
            <Text className='font-grotesk-bold text-4xl text-white'>Client Login</Text>
            <TouchableOpacity onPress={() => router.push('/auth/clientLogin/page')}>
            <Text className='underline text-white font-dm-regular'>Employee Login <AntDesign name='arrowright' size={16} color={"white"} /></Text>
            </TouchableOpacity>
            </View>


    </View>
  )
}

export default EmployeeLogin