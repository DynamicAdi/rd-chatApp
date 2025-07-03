import ChatBubble from 'components/elements/ChatBubble';
import GradBox from 'components/elements/GradBox';
import { useAuth } from 'context/AuthContext';
import { Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function Main() {
  const {logout} = useAuth() as any;
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <GradBox />
        <View className="px-4">
          <Text className="py-2 font-pop-semibold text-3xl tracking-[-1px] text-white">
            All Chats
          </Text>
          <Pressable onPress={logout}>
          <Text className="py-2 font-pop-semibold text-3xl tracking-[-1px] text-white">
            Logout
          </Text>
          </Pressable>
          <ChatBubble />
          <ChatBubble />
        </View>
      
      {/* <Navbar /> */}
      </ScrollView>
    </View>
  );
}
