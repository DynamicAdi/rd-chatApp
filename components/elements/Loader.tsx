import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

export default function Loader({title}: {title: string}) {
  return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10}}>
      <ActivityIndicator color={"white"} size={32}/>
      <Text className='text-white text-xl font-grotesk-regular'>{title}</Text>
      </View>
  )
}