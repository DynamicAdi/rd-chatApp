import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SimpleLineIcons } from '@expo/vector-icons'
export interface Employee {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  bio: string | null;
  department: string | null;
  workingAs:  string | null;
  dob: string | null;
  employeeId: string | null;
  image: string | null;
  phone: string | null;
}

const EmployeeProfile = ({data}: {data: Employee}) => {

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} className='relative'>
      <View className='w-full h-16 rotate-45 absolute z-50 inset-0 top-6 bg-pup-dark rounded-br-full -left-32 flex justify-center items-center'><Text className='text-pup-100 text-center font-grotesk-medium text-xl'>The RD group of industries</Text></View>
      <View className='w-full h-16 -rotate-45 absolute -z-50 inset-0 top-6 bg-pup-dark rounded-br-full left-32 flex justify-center items-center'><Text className='text-pup-100 text-center font-grotesk-medium text-xl'>The RD group of industries</Text></View>
    
        <View className='w-[90%] h-full flex justify-center mt-[4.5rem] items-end'>
        {/* I CARD */}
          <View className='w-full h-[70%] bg-white rounded-3xl relative overflow-hidden flex justify-end items-center'>
            {/* UPPER PART */}
            <View className='w-full h-1/2 bg-pup-100 rounded-full rounded-t-none absolute -top-14 flex justify-end items-center'>
              <View className='w-36 h-36 mb-2 rounded-full border-2 border-white/40 flex justify-center items-center p-1 relative'>
              <TouchableOpacity className='w-8 h-8 bg-white absolute rounded-full bottom-2 right-2 z-50 flex justify-center items-center'>
            <SimpleLineIcons name="pencil" size={12} color="#8671FF" />
              </TouchableOpacity>
                <Image 
                source={{uri: data?.image ? data.image : `https://picsum.photos/1080/2000`}}
                className='w-full h-full rounded-full object-cover'
                />
              </View>
            </View>
            {/* CENTER GAP FOR RIBBON */}
            <View className='w-full h-6 absolute top-3 flex justify-center items-center'>
              <View className='w-1/3 h-full bg-primary-bg rounded-full'></View>
            </View>

            {/* LOWER PART */}
            <View className='w-full h-[22rem]'>
              <Text className='font-grotesk-semibold text-center text-4xl tracking-tighter'>{data.name}</Text>
              <Text className='font-dm-regular text-center text-xl text-neutral-400 tracking-tighter'>{data?.workingAs} • {data?.department}</Text>
            
            <View className='mt-2 px-4'>
            <Text className='font-dm-semibold text-lg text-gray-600 mb-2'>Bio - <Text className='font-dm-light text-sm tracking-tighter leading-none'>{data?.bio}</Text>
            {"  "}
            <TouchableOpacity>
            <SimpleLineIcons name="pencil" size={12} color="#8671FF" />
            </TouchableOpacity>
            </Text> 
            <Text className='font-dm-semibold my-1 text-lg text-gray-600'>Employee Id - <Text className='font-dm-regular text-base tracking-tighter leading-none'>{data?.employeeId}</Text></Text>
            <Text className='font-dm-semibold my-1 text-lg text-gray-600'>DOB - <Text className='font-dm-regular text-base tracking-tighter leading-none'>{data?.dob}</Text></Text>
            <Text className='font-dm-semibold my-1 text-lg text-gray-600'>Phone - <Text className='font-dm-regular text-base tracking-tighter leading-none'>{data?.phone}</Text>
                        {"  "}
            <TouchableOpacity>
            <SimpleLineIcons name="pencil" size={12} color="#8671FF" />
            </TouchableOpacity>
            </Text>
            <Text className='font-dm-semibold my-1 text-lg text-gray-600'>Email - <Text className='font-dm-regular text-base tracking-tighter leading-none'>{data?.email}</Text>
                        {"  "}
            <TouchableOpacity>
            <SimpleLineIcons name="pencil" size={12} color="#8671FF" />
            </TouchableOpacity>
            </Text>
        <View className='flex flex-row'>

        <TouchableOpacity>
            <Text className='font-dm-semibold my-4 text-sm text-pup-100'>Change Password</Text>
        </TouchableOpacity>
            <Text className='font-dm-semibold my-4 text-sm text-black'> | </Text>
                <TouchableOpacity>
            <Text className='font-dm-semibold my-4 text-sm text-red-400'>Logout</Text>
        </TouchableOpacity>
        </View>
            
            </View>
            </View>
          </View>
          {/* <TouchableOpacity className='w-full py-4 rounded-xl bg-pup-100 my-4'>
            <Text className='text-white text-center text-xl font-grotesk-medium'>Logout</Text>
            </TouchableOpacity> */}
        </View>
    </View>
  )
}

export default EmployeeProfile