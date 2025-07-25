import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

const Selector = ({setActive, active, setNew}: {
  setActive: any,
  active: boolean
  setNew: any
}) => {
  return (
    <View className='absolute bottom-24 right-10 z-[90]'>
    <Pressable onPress={() => setActive(!active)} className="flex h-16 w-16 items-center justify-center rounded-full bg-pup-100 ">
      <AntDesign name="plus" size={28} color="white" className={`${active ? "rotate-45" : "rotate-0"} transition-all duration-300`} />
    </Pressable>
    
    {
    <View className={`absolute bottom-[4.5rem] right-0 z-[90] bg-pup-100/20 px-4 w-36 py-2.5 rounded-xl gap-4 ${active ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"} transition-all duration-500`}>
        <TouchableOpacity onPress={() => setNew(true)}><Text className='text-pup-100 font-dm-light'>New Group</Text></TouchableOpacity>
        <TouchableOpacity><Text className='text-pup-100 font-dm-light'>Delete Group</Text></TouchableOpacity>
    </View>
    }
    </View>
  );
};

export default Selector;
