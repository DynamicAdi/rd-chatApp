import { View, Text, Image } from 'react-native';
import React from 'react';
import DrkGrad from 'components/utils/DrkGrad';

const GroupReply = () => {
  return (
    <View
      style={{marginBottom: 20, paddingHorizontal: 14, flexDirection: 'row', gap: 6 }}>
      <View className="h-12 w-12 overflow-hidden rounded-full border border-gray-100">
        <Image
        source={{uri: "https://picsum.photos/900/900"}}
        className={"w-full h-full object-cover"}
        />
      </View>
      <View className="w-5/6">
        <Text className="font-dm-medium tracking-tighter text-2xl text-white" numberOfLines={1}>Adarsh Pandit</Text>
        <Text className="-mt-1 font-pop-regular text-base text-pup-100" numberOfLines={1}>CTO</Text>
        <DrkGrad className="my-0 -ml-5 mb-0 mt-1 w-[95%]" radius={12} style={{borderTopLeftRadius: 2, borderBottomLeftRadius: 22}}>
          <View className="w-full rounded-2xl p-3">
            <Text className='text-white font-dm-regular text-sm'>
             Lorem ipsum dolor sit amet consectetur. Amet neque
pellentesque ut auctor tellus mauris platea. Facilisi hac
pharetra consectetur quam sit nisl egestas gravida nunc. Sed
            </Text>
          </View>
        </DrkGrad>
      </View>
    </View>
  );
};

export default GroupReply;
