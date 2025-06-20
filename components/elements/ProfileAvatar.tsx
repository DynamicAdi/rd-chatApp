import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

const ProfileAvatar = ({image, name, type, subType}: {
    image: string,
    name: string,
    type: string,
    subType: string
}) => {
  return (
        <>
        {/*  */}
            <View style={{alignItems: 'center'}}>
                <View className='w-full h-40 flex justify-center items-center'>
                            <View className="flex h-48 w-48 items-center justify-center rounded-full border border-solid border-white/20">
                              <View className="flex h-40 w-40 items-center justify-center rounded-full border border-solid border-white/40">
                                <View className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border border-solid border-white/60">
                                <View className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-solid border-white/80">
                                <Image 
                                source={{uri: image}}
                                className='w-full h-full object-cover'
                                />
                                </View>
                                </View>
                              </View>
                            </View>
                </View>
            <View>
                <Text className='font-grotesk-semibold text-white text-3xl my-4 mb-1 text-center' numberOfLines={1}>{name}</Text>
                <Text className='font-dm-regular text-center text-neutral-500 text-xl' numberOfLines={1}>{type} • {subType}</Text>
            </View>
                </View>
                <TouchableOpacity className='absolute left-8 top-6'>
                <AntDesign name='arrowleft' size={24} color={"white"}/>
                </TouchableOpacity>
<View className='w-5/6 h-0.5 bg-pup-dark'></View>
</>
  )
}

export default ProfileAvatar