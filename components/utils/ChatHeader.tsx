import { Image, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Avatar from 'components/elements/Avatar';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


const ChatHeader = ({back = true, title="Announcements", id, image, type="other"}: {back?:boolean, title?: string, id?:string, image?: string, type?: "main" | "other"}) => {
    const router = useRouter()

    return (
    <>
      <LinearGradient
        colors={['#681CFF', '#1D006E']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        className="flex h-20 w-full justify-center"
        style={{ borderBottomRightRadius: 80 }}>
        <View className={`flex h-auto w-full flex-row items-center justify-start gap-10 ${back ? "px-4" : "px-6"} pr-10`}>
            <View className='flex flex-row justify-center items-center gap-0'>
                {back && 
                <AntDesign name="arrowleft" size={24} color="white" />
                }
            <View className='w-12 h-12 bg-white border border-white rounded-full overflow-hidden'>
              <TouchableOpacity onPress={title !== "Announcements" ? type === "main" ? () => router.push("profile/page") : () => {router.push(`/chats/details/${id}`)} : () => {}}>
                <Image
                source={{uri: image ? image : "https://picsum.photos/1080/1080"}}
                className='w-full h-full object-cover'
                />
                </TouchableOpacity>
            </View>
                </View>
            <Text className='font-grotesk-medium text-white text-2xl text-center w-3/5'>{title}</Text>
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
