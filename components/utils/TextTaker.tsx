import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import React, {useState} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';

const emoji = require('../../assets/emoji.png');

const TextTaker = ({input, setInput, sendMessage}: {
  input: string,
  setInput: any,
  sendMessage: () => void
}) => {
    // const [input, setInput] = useState("")
  return (
    <View className="flex h-14 w-full items-center justify-center">
      <View className="h-full w-[95%] flex-row justify-between rounded-full bg-pup-dark px-0">
        <View className="h-full w-[12%]">
          <TouchableOpacity className="h-full w-full items-center justify-center">
            <Image
              source={emoji}
              style={{
                width: '90%',
                height: '80%',
                resizeMode: 'cover',
                tintColor: '#8671FF',
              }}
              className="scale-75"
            />
          </TouchableOpacity>
        </View>
        <View className="h-full w-[8%]">
          <TouchableOpacity className="h-full w-full items-center justify-center">
            <SimpleLineIcons name="paper-clip" size={22} color="#8671FF" />
          </TouchableOpacity>
        </View>

        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type Your Message..."
          className="h-full w-[64%] px-2 text-white placeholder:text-pup-100/60"></TextInput>

        <View className="flex h-full w-1/6 items-center justify-center">
          <LinearGradient
            colors={input.length > 0 ? ["#8A31FF", '#240059'] : ["#200F43", "#200F43"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={{ borderRadius: 100 }}>
            <TouchableOpacity onPress={() => sendMessage()} className="rounded-full p-2.5 pl-3">
              <Ionicons name="send" color={'white'} size={22} />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

export default TextTaker;