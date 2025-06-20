import GroupReply from 'components/elements/GroupReply'
import ProfileAvatar from 'components/elements/ProfileAvatar'
import GrpList from 'components/utils/GrpListBubble'
import React, {ReactNode} from 'react'
import { View, Text, ScrollView } from 'react-native'


const Details = ({children}: {
    children: ReactNode
}) => {
    return (
        <View style={{ flex: 1 }}>
            <View className='w-full h-full flex justify-start py-8 items-center px-6 gap-4'>
            <ProfileAvatar
            image='https://picsum.photos/600/900'
            name='XNT project'
            type='10 Members'
            subType='9 Online'
            />
        <ScrollView className='w-full'>
            {children}
        </ScrollView>            
            </View>
        </View>
    )
}

export default Details