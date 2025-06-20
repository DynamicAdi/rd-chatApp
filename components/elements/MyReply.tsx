import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import DrkGrad from 'components/utils/DrkGrad'

const MyReply = () => {
  return (
    <View className='w-full flex justify-end items-end my-1'>

        <LinearGradient 
        colors={['white', '#a4a4a4']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        style={{  borderRadius: 30, borderTopRightRadius: 2, borderBottomRightRadius: 30 }}
        className="my-0 w-3/4 mx-4">
          <View className="w-full rounded-2xl p-3 pl-5 pr-3">
            <Text className='text-black font-dm-medium text-sm'>
             Lorem ipsum dolor sit amet consectetur

            </Text>
          </View>
        </LinearGradient>
            </View>
  )
}

export default MyReply