import { View, Text, ScrollView, KeyboardAvoidingView, Platform, FlatList } from 'react-native'
import React, { useState } from 'react'
import ChatHeader from 'components/utils/ChatHeader'
import GroupReply from 'components/elements/GroupReply'
import TextTaker from 'components/utils/TextTaker'

const Announcements = ({role, data, handleClick, input, setInput}: {
  role: {role: string, userId: string},
  data: any,
  input: string,
  setInput: any,
  handleClick: () => void
}) => {

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <View style={{ flex: 1 }} className='min-h-[87%] max-h-[87%]'>
        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <ChatHeader back={false}/>
          {data.length > 0 && data.map && 
          <FlatList 
          data={data}
          keyExtractor={(key, index) => index.toString()}
          scrollEnabled={false}
          renderItem={(items) => (
            <GroupReply delMsg={role.userId} msgId={items.item.id} message={items.item.message} messageBy={items.item.messageBy} />
          )}
          />
          }
          </ScrollView>
        {
          role.role === "Admin" &&
         <TextTaker 
        input={input}
        setInput={setInput}
        sendMessage={handleClick}
        />
      }
      </View>
    </KeyboardAvoidingView>
  )
}

export default Announcements