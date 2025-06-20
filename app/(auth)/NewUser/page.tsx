import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import Input from 'components/utils/Input'
import PupBtn from 'components/utils/PupBtn'
import { useRouter } from 'expo-router'
import { useState } from 'react'

const NewClientLogin = () => {
    const router = useRouter()
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
  return (
        <ScrollView>
    <View className='flex flex-1 relative mb-12'>

        <View className='w-full h-5/6 rotate-[60deg] bg-pup-200 absolute -top-[45%] -left-1/3'></View>
        <View className='w-3/5 h-1/4 flex justify-start py-12 items-start px-4'>
            <Text className='font-grotesk-bold text-4xl text-white'>Hey Welcome! {""}</Text>
            <TouchableOpacity onPress={() => router.push('/auth/EmployeeLogin/page')}>
                <Text className='underline text-white font-dm-regular'>Employee Login <AntDesign name='arrowright' size={16} color={"white"} /></Text>
            </TouchableOpacity>
        </View>

    <View className='w-full h-5/6 flex justify-start py-8 items-start px-6 gap-4'>
    <Text className='font-pop-medium text-3xl text-white'>We would love to connect with you!</Text>
    <Text className='font-pop-light text-base mb-6 text-pup-100'>Your information stays secure with us.</Text>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} className='w-full'>
        <KeyboardAvoidingView className='w-full' behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 240}>
    <ScrollView className='w-full' style={{ flexGrow: 0 }}>
    <Input value={userDetails.name} setValue={(text) => setUserDetails({...userDetails, name: text as string})} placeholder='Your Name'/>
    <Input value={userDetails.email} setValue={(text) => setUserDetails({...userDetails, email: text as string})} placeholder='Your Email Address'/>
    <Input value={userDetails.password} setValue={(text) => setUserDetails({...userDetails, password: text as string})} placeholder='Your Password'/>
    <Input value={userDetails.confirmPassword} setValue={(text) => setUserDetails({...userDetails, confirmPassword: text as string})} placeholder='Confirm Your Password'/>
    </ScrollView>
        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    <TouchableOpacity className='w-full'>
        <Text className='w-full text-right text-pup-100 font-dm-light'>Forget Password?</Text>
    </TouchableOpacity>
    <PupBtn title='Create Account' className='w-full' />
        <TouchableOpacity className='w-full' onPress={() => router.push('/auth/clientLogin/page')}>
        <Text className='w-full text-center text-pup-100 font-dm-light underline'>Already have an account? Login</Text>
    </TouchableOpacity>
    </View>
    </View>
        </ScrollView>
  )
}

export default NewClientLogin