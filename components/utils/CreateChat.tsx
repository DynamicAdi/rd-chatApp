import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import Input from './Input'

const CreateChat = ({setInput, UserInput, Dec, setDesc, Action, close}: {
    setInput: any
    UserInput: string
    Dec: string
    setDesc: (text: string) => void
    Action: () => void
    close: () => void
}) => {
  return (
          <View className='absolute w-screen h-screen bg-black/80 z-[99999] flex justify-center items-center mb-12'>
            <View className='w-5/6 h-[30rem] bg-pup-dark rounded-3xl flex justify-start py-6 px-4 items-center gap-6 mb-4 relative'>
        <TouchableOpacity className='absolute right-6 top-6' onPress={() => close()}>
        <AntDesign name="close" size={24} color="white" />
        </TouchableOpacity>
        
          <View className='w-28 h-28 bg-pup-100/30 rounded-full flex justify-center items-center'><Text className='text-pup-100 text-6xl font-grotesk-light'>{UserInput[1] ? UserInput[0] + UserInput[1] : "..."}</Text></View>
          <Input 
          maxValue={20}
          placeholder='Title for the group' setValue={(text) => setInput(text as string)} className='bg-pup-100/10' value={UserInput} />
          <Text className='absolute top-48 text-xs font-dm-light right-8 text-[#A78BFA80]'>{UserInput.length}/20</Text>
    
      
          <TextInput 
          maxLength={100}
          className={`w-full bg-pup-100/10 py-6 px-4 rounded-xl text-white h-36 relative`}
          placeholderTextColor={"#A78BFA40"}
          numberOfLines={4}
          textAlignVertical='top'
          multiline={true}
          placeholder='Description for group (optional)'
          value={Dec}
          onChangeText={setDesc}
          />
          <Text className='absolute bottom-[5.5rem] text-xs font-dm-light right-8 text-[#A78BFA40]'>{Dec.length}/100</Text>
          
          <TouchableOpacity className='px-4 py-2 bg-pup-200 rounded-xl' onPress={() => Action()}>
          <Text className='text-white text-lg'>Create</Text>
          </TouchableOpacity>
        
        </View>
        </View>
        
  )
}

export default CreateChat