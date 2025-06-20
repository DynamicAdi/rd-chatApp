import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import Input from 'components/utils/Input'
import PupBtn from 'components/utils/PupBtn'
import { useRouter } from 'expo-router'

const NewClientLogin = () => {
    const router = useRouter()
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
    <Input placeholder='Your Name'/>
    <Input placeholder='Your Email Address'/>
    <Input placeholder='Your Password'/>
    <Input placeholder='Confirm Your Password'/>
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