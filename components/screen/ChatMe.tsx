import GroupReply from 'components/elements/GroupReply';
import ChatHeader from 'components/utils/ChatHeader';
import TextTaker from 'components/utils/TextTaker';
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native';

function ChatMe({ data, loading }: { data: any, loading: boolean }) {
  const [input, setInput] = useState('');

  const handleClick = () => {};
  
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={'white'} />
        <Text className="font-dm-medium text-2xl text-white">Getting Messages</Text>
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
      <View style={{ flex: 1 }} className="max-h-[87%] min-h-[87%]">
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled">
          <ChatHeader back={false} title={data.name} image={data.image} id={data.id} />
          {/* {data.message.length > 0 && data.message.map && 
          <FlatList 
          data={data}
          keyExtractor={(key, index) => index.toString()}
          scrollEnabled={false}
          renderItem={(items) => (
            <GroupReply key={items.index} msgId={items.item.id} message={items.item.message} messageBy={items.item.messageBy} />
          )}
          />
          } */}
        </ScrollView>
        <TextTaker input={input} setInput={setInput} sendMessage={handleClick} />
      </View>
    </KeyboardAvoidingView>
  );
}

export default ChatMe;
