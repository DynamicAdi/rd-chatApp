import { Image, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Avatar from 'components/elements/Avatar';
import { AntDesign } from '@expo/vector-icons';


const ChatHeader = ({back = true}: {back?:boolean}) => {

    return (
    <>
      <LinearGradient
        colors={['#681CFF', '#1D006E']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        className="flex h-20 w-full justify-center"
        style={{ borderBottomRightRadius: 80 }}>
        <View className={`flex h-auto w-full flex-row items-center justify-start gap-10 ${back ? "px-4" : "px-6"} pr-10`}>
            <View className='flex flex-row justify-center items-center gap-1'>
                {back && 
                <AntDesign name="arrowleft" size={24} color="white" />
                }
            <View className='w-12 h-12 bg-white border border-white rounded-full overflow-hidden'>
                <Image
                source={{uri: "https://picsum.photos/1080/1080"}}
                className='w-full h-full object-cover'
                />
            </View>
                </View>
            <Text className='font-grotesk-medium text-white text-2xl'>Announcements</Text>
        </View>
      </LinearGradient>
      <LinearGradient
        colors={['#681CFF', '#1D006E']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        className="relative flex h-16 w-full justify-end">
        <View className="absolute right-0 flex h-full w-full items-end justify-end rounded-bl-none rounded-tl-full bg-primary-bg p-2"></View>
      </LinearGradient>
    </>
  );
};

export default ChatHeader;
