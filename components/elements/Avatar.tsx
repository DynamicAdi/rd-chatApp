import { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const Avatar = ({ uri }: { uri: string }) => {

    const welcomeString = ["Hey", "Hello", "Welcome", "Heya"]
    function getRandomString(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const [string, setString] = useState("")

useEffect(() => {
    const rndm = getRandomString(welcomeString)
    setString(rndm)
}, [])


  return (
    <View className='flex flex-row gap-2 justify-center items-center'>
      <TouchableOpacity className="flex h-24 w-24 items-end justify-center rounded-full border border-solid border-white/20">
        <View className="flex h-20 w-20 items-end justify-center rounded-full border border-solid border-white/40">
          <View className="flex h-16 w-16 items-end justify-center rounded-full border border-solid border-white/60">
            <View className="flex h-12 w-12 items-end justify-center overflow-hidden rounded-full border border-solid border-white/80">
              <Image source={{ uri: `${uri}` }} className="h-full w-full object-cover" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    
    <View>
        <Text className='font-grotesk-regular text-neutral-200 text-xl'>{string},</Text>
        <Text className='font-grotesk-bold text-white text-3xl'>Adarsh!</Text>
    </View>
    </View>
  );
};

export default Avatar;
