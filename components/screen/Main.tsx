import ChatBubble from 'components/elements/ChatBubble';
import GradBox from 'components/elements/GradBox';
import { ScrollView, Text, View } from 'react-native';

export default function Main() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <GradBox />
        <View className="px-4">
          <Text className="py-2 font-pop-semibold text-3xl tracking-[-1px] text-white">
            All Chats
          </Text>

          <ChatBubble />
          <ChatBubble />
        </View>
      </ScrollView>
    </View>
  );
}
