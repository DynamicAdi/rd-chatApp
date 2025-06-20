import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import DrkGrad from 'components/utils/DrkGrad'

const PvtReply = () => {
  return (
    <View className='w-full flex justify-start items-start my-2'>
        <LinearGradient 
        colors={['#681CFF', '#1D006E']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        style={{ borderRadius: 30, borderTopLeftRadius: 2, borderBottomLeftRadius: 30 }}
        className="my-0 w-3/4 mx-4">
          <View className="w-full rounded-2xl p-3 pr-3 pl-5">
            <Text className='text-white font-dm-medium text-sm'>
             Lorem ipsum dolor sit amet consectetur. Amet neque
            </Text>
          </View>
        </LinearGradient>
            </View>
  )
}

export default PvtReply