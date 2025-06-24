import { View, Text, Image } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import PupBtn from 'components/utils/PupBtn';
import { useRouter } from 'expo-router';

const Welcome = () => {
  const router = useRouter();
  return (
    <View className="flex-1">
{/* U P P E R */}
      <View className="h-3/5 w-full px-4 relative py-8 pt-2 flex justify-center items-center flex-row">
        <View className='w-1/2 h-full flex justify-start p-4 px-2 gap-4'>
          <View className='w-full h-1/2 overflow-hidden rounded-lg'>
          <Image 
          source={{uri: "https://picsum.photos/1080/600"}}
          className='w-full h-full object-cover'
          />
          </View>
          <View className='w-full h-1/2 overflow-hidden rounded-lg'>
          <Image 
          source={{uri: "https://picsum.photos/1080/800"}}
          className='w-full h-full object-cover'
          />
          </View>
        </View>
        <View className='w-1/2 h-full justify-end p-4 px-2 gap-4'>
          <View className='w-full h-1/2 overflow-hidden rounded-lg'>
          <Image 
          source={{uri: "https://picsum.photos/1080/1080"}}
          className='w-full h-full object-cover'
          />
          </View>
          <View className='w-full h-1/2 overflow-hidden rounded-lg'>
          <Image 
          source={{uri: "https://picsum.photos/1080/1280"}}
          className='w-full h-full object-cover'
          />
          </View>
        </View>
      </View>
  
{/* L O W E R */}
      <View className="flex h-2/5 w-auto justify-end px-4">
        <Text className="font-grotesk-regular text-3xl text-white">
          Evaluate Your Experience with {'\n'}
          <Text className="font-grotesk-bold text-6xl uppercase">the rd group of industries</Text>
        </Text>
        <PupBtn onPress={() => router.push('(auth)/clientLogin/page')} title='Get Started' Icon={AntDesign} IconName='arrowright' />
      </View>
    </View>
  );
};

export default Welcome;