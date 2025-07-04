import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const ChatBubble = () => {
  return (
        <TouchableOpacity className="my-2 flex h-20 w-full flex-row items-center gap-3 rounded-full border border-pup-100 bg-pup-dark px-2 py-2">
          <View className="relative h-16 w-16 rounded-full border border-white">
            <Image 
            source={{uri: "https://picsum.photos/800/800"}}
            className='w-full h-full object-cover rounded-full'
            />
            <View className='absolute right-0 bottom-0 bg-green-500 rounded-full h-4 w-4'></View>
          </View>
          <View className='flex justify-start items-start'>
          <View className='w-[86%] justify-between items-center flex-row'>
            <Text className='text-xl text-white font-grotesk-semibold relative' numberOfLines={1}>Project Rebirth</Text>
              <Text className='text-sm font-pop-light text-neutral-400'>03:48PM</Text>

          </View>
            <Text className='text-base text-neutral-500 font-dm-regular' numberOfLines={1}>Project Reverant</Text>
          </View>
        </TouchableOpacity>
  )
}

export default ChatBubble