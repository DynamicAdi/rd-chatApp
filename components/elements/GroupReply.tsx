import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import DrkGrad from 'components/utils/DrkGrad';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { API_URL } from 'context/env';

const GroupReply = ({message, messageBy, delMsg, msgId}: {
  message: string,
  messageBy: any
  delMsg?: string
  msgId: string
}) => {

  const [isDeleted, setDeleted] = useState(false);

  const delMsgById = async (id: string) => {
    try {
      const res = await axios.delete(`${API_URL}/api/announcements/del-msg/${id}`)
      if (res.status === 200) {
        setDeleted(!isDeleted)
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <View
      style={{marginBottom: 10, paddingHorizontal: 14, flexDirection: 'row', gap: 6 }}>
      <View className="h-12 w-12 overflow-hidden rounded-full border border-gray-100">
        <Image
        source={messageBy?.image ? {uri: messageBy.image} : {uri: "https://picsum.photos/900/900"}}
        className={"w-full h-full object-cover"}
        />
      </View>
      <View className="w-5/6">
      <View className='flex-row justify-start items-center gap-2'>
        <Text className="font-dm-medium tracking-tighter text-2xl text-white" numberOfLines={1}>{messageBy.name}</Text> 
        {
          messageBy.id === delMsg &&
        <TouchableOpacity onPress={() => delMsgById(msgId)} className={`bg-red-400 p-1.5 rounded-full`}>
          {!isDeleted ? 
          <MaterialIcons name="delete-outline" size={18} color="white" />
          : <MaterialIcons name='check' size={18} color={"lightgreen"}/> 
          }
          </TouchableOpacity>
        }
      </View>
        <Text className="-mt-1 font-pop-regular text-base text-pup-100" numberOfLines={1}>{messageBy.workingAs}</Text>
        <DrkGrad className="my-0 -ml-5 mb-0 mt-1 w-[95%]" radius={22} style={{borderTopLeftRadius: 2, borderBottomLeftRadius: 22}}>
          <View className="w-full rounded-2xl p-3 pl-4">
            <Text className='text-white font-dm-regular text-sm'>
              {message}
            </Text>
          </View>
        </DrkGrad>
      </View>
    </View>
  );
};

export default GroupReply;
