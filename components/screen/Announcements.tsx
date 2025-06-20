import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ChatHeader from 'components/utils/ChatHeader'
import GroupReply from 'components/elements/GroupReply'
import MyReply from 'components/elements/MyReply'
import PvtReply from 'components/elements/PvtMsgBubble'

const Announcements = () => {
  return (
    <View style={{flex: 1}}>
    <ScrollView>
        <ChatHeader back={false}/>
        <GroupReply />
        {/* <MyReply /> */}
        {/* <PvtReply /> */}
    </ScrollView>
    </View>
  )
}

export default Announcements